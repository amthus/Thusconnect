import { Typography, Input, List, Avatar, Button, Space, Card } from 'antd'
import { useState } from 'react'
const { Title, Text } = Typography
import { useUserContext } from '@/core/context'
import dayjs from 'dayjs'
import { useLocation, useNavigate, useParams } from '@remix-run/react'
import { useUploadPublic } from '@/plugins/upload/client'
import { SocketClient } from '@/plugins/socket/client'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function ContactsPage() {
  const { user } = useUserContext()
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')

  // Fetch contacts with their related user information
  const { data: contacts } = Api.contact.findMany.useQuery({
    where: {
      userId: user?.id,
    },
    include: {
      contact: true,
    },
  })

  // Fetch online status for all contacts
  const { data: statuses } = Api.status.findMany.useQuery({
    where: {
      userId: {
        in: contacts?.map(contact => contact.contactId) || [],
      },
    },
  })

  // Filter contacts based on search term
  const filteredContacts = contacts?.filter(contact => {
    const searchLower = searchTerm.toLowerCase()
    return (
      contact.contact?.name?.toLowerCase().includes(searchLower) ||
      contact.contact?.email?.toLowerCase().includes(searchLower)
    )
  })

  // Start a new conversation with a contact
  const { mutateAsync: createConversation } =
    Api.conversation.create.useMutation()
  const { mutateAsync: createParticipant } =
    Api.conversationParticipant.createMany.useMutation()

  const handleStartConversation = async (contactId: string) => {
    try {
      // Create new conversation
      const conversation = await createConversation({
        data: {
          type: 'private',
        },
      })

      // Add both users as participants
      await createParticipant({
        data: [
          {
            userId: user?.id || '',
            conversationId: conversation.id,
            role: 'member',
          },
          {
            userId: contactId,
            conversationId: conversation.id,
            role: 'member',
          },
        ],
      })

      // Navigate to the new conversation
      navigate(`/conversations/${conversation.id}`)
    } catch (error) {
      console.error('Error creating conversation:', error)
    }
  }

  const isOnline = (userId: string) => {
    return statuses?.some(
      status => status.userId === userId && status.type === 'online',
    )
  }

  return (
    <PageLayout layout="full-width">
      <Card style={{ maxWidth: 800, margin: '0 auto', padding: '20px' }}>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div>
            <Title level={2}>
              <i
                className="las la-address-book"
                style={{ marginRight: '8px' }}
              ></i>
              Contacts
            </Title>
            <Text type="secondary">
              Manage your contacts and start conversations
            </Text>
          </div>

          <Input
            placeholder="Search by name or email..."
            prefix={<i className="las la-search"></i>}
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            style={{ marginBottom: '20px' }}
          />

          <List
            itemLayout="horizontal"
            dataSource={filteredContacts}
            renderItem={contact => (
              <List.Item
                actions={[
                  <Button
                    key="message"
                    type="primary"
                    icon={<i className="las la-comment"></i>}
                    onClick={() => handleStartConversation(contact.contactId)}
                  >
                    Message
                  </Button>,
                ]}
              >
                <List.Item.Meta
                  avatar={<Avatar src={contact.contact?.pictureUrl} />}
                  title={
                    <Space>
                      <Text strong>{contact.contact?.name}</Text>
                      {isOnline(contact.contactId) && (
                        <Text type="success">
                          <i className="las la-circle"></i> Online
                        </Text>
                      )}
                    </Space>
                  }
                  description={contact.contact?.email}
                />
              </List.Item>
            )}
          />
        </Space>
      </Card>
    </PageLayout>
  )
}
