import { Typography, Input, Button, List, Avatar, Modal, Form } from 'antd'
import { useState } from 'react'
const { Title, Text } = Typography
const { Search } = Input
import { useUserContext } from '@/core/context'
import dayjs from 'dayjs'
import { useLocation, useNavigate, useParams } from '@remix-run/react'
import { useUploadPublic } from '@/plugins/upload/client'
import { SocketClient } from '@/plugins/socket/client'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function HomePage() {
  const { user } = useUserContext()
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [isStatusModalVisible, setIsStatusModalVisible] = useState(false)
  const [statusContent, setStatusContent] = useState('')

  // Fetch conversations with participants and last message
  const { data: conversations } = Api.conversation.findMany.useQuery({
    include: {
      conversationParticipants: {
        include: {
          user: true,
        },
      },
      messages: {
        orderBy: {
          createdAt: 'desc',
        },
        take: 1,
      },
    },
  })

  // Fetch contacts
  const { data: contacts } = Api.contact.findMany.useQuery({
    where: {
      userId: user?.id,
    },
    include: {
      contact: true,
    },
  })

  // Fetch user statuses
  const { data: statuses } = Api.status.findMany.useQuery({
    where: {
      userId: user?.id,
    },
  })

  // Create new status
  const { mutateAsync: createStatus } = Api.status.create.useMutation()

  const handleNewConversation = () => {
    navigate('/conversations/new')
  }

  const handleConversationClick = (conversationId: string) => {
    navigate(`/conversations/${conversationId}`)
  }

  const handleStatusSubmit = async () => {
    if (statusContent.trim()) {
      await createStatus({
        data: {
          content: statusContent,
          type: 'TEXT',
          userId: user?.id || '',
        },
      })
      setStatusContent('')
      setIsStatusModalVisible(false)
    }
  }

  const filteredConversations = conversations?.filter(
    conv =>
      conv.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.messages[0]?.content
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase()),
  )

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '20px' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 20,
          }}
        >
          <Title level={2}>Messages</Title>
          <div>
            <Button
              type="primary"
              onClick={() => setIsStatusModalVisible(true)}
              icon={<i className="las la-plus" />}
              style={{ marginRight: 10 }}
            >
              Post Status
            </Button>
            <Button
              type="primary"
              onClick={handleNewConversation}
              icon={<i className="las la-comment" />}
            >
              New Conversation
            </Button>
          </div>
        </div>

        <Search
          placeholder="Search conversations..."
          onChange={e => setSearchQuery(e.target.value)}
          style={{ marginBottom: 20 }}
          prefix={<i className="las la-search" />}
        />

        <div style={{ display: 'flex', gap: 20 }}>
          <div style={{ flex: 2 }}>
            <Title level={4}>Recent Conversations</Title>
            <List
              dataSource={filteredConversations}
              renderItem={conversation => (
                <List.Item
                  onClick={() => handleConversationClick(conversation.id)}
                  style={{ cursor: 'pointer' }}
                >
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        src={
                          conversation.conversationParticipants[0]?.user
                            ?.pictureUrl
                        }
                      />
                    }
                    title={conversation.name || 'Unnamed Conversation'}
                    description={
                      <Text type="secondary">
                        {conversation.messages[0]?.content || 'No messages yet'}{' '}
                        -
                        {dayjs(conversation.messages[0]?.createdAt).format(
                          'MMM D, HH:mm',
                        )}
                      </Text>
                    }
                  />
                </List.Item>
              )}
            />
          </div>

          <div style={{ flex: 1 }}>
            <Title level={4}>Active Contacts</Title>
            <List
              dataSource={contacts}
              renderItem={contact => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar src={contact.contact?.pictureUrl} />}
                    title={contact.contact?.name}
                    description={
                      <Text type="success">
                        <i
                          className="las la-circle"
                          style={{ color: 'green' }}
                        />{' '}
                        Online
                      </Text>
                    }
                  />
                </List.Item>
              )}
            />
          </div>
        </div>

        <Modal
          title="Post Status"
          open={isStatusModalVisible}
          onOk={handleStatusSubmit}
          onCancel={() => setIsStatusModalVisible(false)}
        >
          <Form layout="vertical">
            <Form.Item label="Status">
              <Input.TextArea
                value={statusContent}
                onChange={e => setStatusContent(e.target.value)}
                placeholder="What's on your mind?"
                rows={4}
              />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </PageLayout>
  )
}
