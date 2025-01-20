import { Typography, Form, Input, Select, Button, message } from 'antd'
import { useState } from 'react'
const { Title, Text } = Typography
import { useUserContext } from '@/core/context'
import dayjs from 'dayjs'
import { useLocation, useNavigate, useParams } from '@remix-run/react'
import { useUploadPublic } from '@/plugins/upload/client'
import { SocketClient } from '@/plugins/socket/client'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function NewConversationPage() {
  const { user } = useUserContext()
  const navigate = useNavigate()
  const [isGroup, setIsGroup] = useState(false)
  const [form] = Form.useForm()

  // Fetch all users for participant selection
  const { data: users } = Api.user.findMany.useQuery({
    where: {
      NOT: {
        id: user?.id,
      },
    },
  })

  // Create conversation mutation
  const { mutateAsync: createConversation } =
    Api.conversation.create.useMutation()

  // Create conversation participant mutation
  const { mutateAsync: createParticipant } =
    Api.conversationParticipant.createMany.useMutation()

  const handleSubmit = async (values: any) => {
    try {
      // Create the conversation
      const conversation = await createConversation({
        data: {
          name: isGroup ? values.name : undefined,
          type: isGroup ? 'GROUP' : 'PRIVATE',
        },
      })

      // Prepare participants data
      const participantsData = {
        data: [
          // Current user
          {
            userId: user?.id as string,
            conversationId: conversation.id,
            role: 'ADMIN',
          },
          // Selected participants
          ...(Array.isArray(values.participants)
            ? values.participants
            : [values.participants]
          ).map((participantId: string) => ({
            userId: participantId,
            conversationId: conversation.id,
            role: 'MEMBER',
          })),
        ],
      }

      // Create participants
      await createParticipant(participantsData)

      message.success('Conversation created successfully!')
      navigate(`/conversations/${conversation.id}`)
    } catch (error) {
      message.error('Failed to create conversation')
    }
  }

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: 600, margin: '0 auto', padding: '20px' }}>
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <Title level={2}>
            <i className="las la-comments" style={{ marginRight: '8px' }}></i>
            New Conversation
          </Title>
          <Text>Create a private chat or group conversation</Text>
        </div>

        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            label="Conversation Type"
            name="type"
            initialValue="private"
          >
            <Select
              onChange={value => setIsGroup(value === 'group')}
              options={[
                { label: 'Private Chat', value: 'private' },
                { label: 'Group Chat', value: 'group' },
              ]}
            />
          </Form.Item>

          {isGroup && (
            <Form.Item
              label="Group Name"
              name="name"
              rules={[{ required: true, message: 'Please enter a group name' }]}
            >
              <Input
                prefix={<i className="las la-users"></i>}
                placeholder="Enter group name"
              />
            </Form.Item>
          )}

          <Form.Item
            label="Participants"
            name="participants"
            rules={[
              {
                required: true,
                message: 'Please select at least one participant',
              },
            ]}
          >
            <Select
              mode={isGroup ? 'multiple' : undefined}
              placeholder="Select participants"
              showSearch
              filterOption={(input, option) =>
                (option?.label ?? '')
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={users?.map(u => ({
                label: u.name || u.email || 'Unnamed User',
                value: u.id,
              }))}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              icon={<i className="las la-paper-plane"></i>}
            >
              Create Conversation
            </Button>
          </Form.Item>
        </Form>
      </div>
    </PageLayout>
  )
}
