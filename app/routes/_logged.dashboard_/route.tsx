import { Card, Row, Col, Statistic, Typography } from 'antd'
const { Title } = Typography
import { useUserContext } from '@/core/context'
import dayjs from 'dayjs'
import { useLocation, useNavigate, useParams } from '@remix-run/react'
import { useUploadPublic } from '@/plugins/upload/client'
import { SocketClient } from '@/plugins/socket/client'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function DashboardPage() {
  // Fetch active users
  const { data: users } = Api.user.findMany.useQuery({
    where: { status: 'VERIFIED' },
  })

  // Fetch messages with types
  const { data: messages } = Api.message.findMany.useQuery({
    include: { user: true },
  })

  // Fetch recent conversations
  const { data: conversations } = Api.conversation.findMany.useQuery({
    include: {
      conversationParticipants: true,
      messages: true,
    },
    orderBy: { updatedAt: 'desc' },
    take: 10,
  })

  // Calculate statistics
  const activeUsers = users?.length || 0

  const messageTypes = {
    text: messages?.filter(m => m.type === 'text').length || 0,
    image: messages?.filter(m => m.type === 'image').length || 0,
    audio: messages?.filter(m => m.type === 'audio').length || 0,
  }

  const recentConversations = conversations?.length || 0
  const totalMessages = messages?.length || 0

  const averageMessagesPerConversation =
    conversations && conversations.length > 0
      ? (messages?.length || 0) / conversations.length
      : 0

  const lastDayMessages =
    messages?.filter(m =>
      dayjs(m.createdAt).isAfter(dayjs().subtract(1, 'day')),
    ).length || 0

  return (
    <PageLayout layout="full-width">
      <div style={{ padding: '24px', maxWidth: 1200, margin: '0 auto' }}>
        <Title level={2}>
          <i className="las la-chart-line" style={{ marginRight: 8 }}></i>
          Platform Dashboard
        </Title>
        <p style={{ marginBottom: 24 }}>
          Monitor platform usage and engagement metrics
        </p>

        <Row gutter={[16, 16]}>
          {/* User Statistics */}
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title={
                  <>
                    <i className="las la-users"></i> Active Users
                  </>
                }
                value={activeUsers}
                valueStyle={{ color: '#3f8600' }}
              />
            </Card>
          </Col>

          {/* Message Types */}
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title={
                  <>
                    <i className="las la-comment"></i> Text Messages
                  </>
                }
                value={messageTypes.text}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title={
                  <>
                    <i className="las la-image"></i> Image Messages
                  </>
                }
                value={messageTypes.image}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title={
                  <>
                    <i className="las la-microphone"></i> Audio Messages
                  </>
                }
                value={messageTypes.audio}
              />
            </Card>
          </Col>

          {/* Conversation Metrics */}
          <Col xs={24} sm={12} lg={8}>
            <Card>
              <Statistic
                title={
                  <>
                    <i className="las la-comments"></i> Recent Conversations
                  </>
                }
                value={recentConversations}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={8}>
            <Card>
              <Statistic
                title={
                  <>
                    <i className="las la-chart-bar"></i> Avg
                    Messages/Conversation
                  </>
                }
                value={averageMessagesPerConversation}
                precision={2}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={8}>
            <Card>
              <Statistic
                title={
                  <>
                    <i className="las la-clock"></i> Messages Last 24h
                  </>
                }
                value={lastDayMessages}
                valueStyle={{ color: '#cf1322' }}
              />
            </Card>
          </Col>

          {/* Overall Engagement */}
          <Col xs={24}>
            <Card>
              <Statistic
                title={
                  <>
                    <i className="las la-chart-area"></i> Total Platform
                    Messages
                  </>
                }
                value={totalMessages}
                suffix="messages"
              />
            </Card>
          </Col>
        </Row>
      </div>
    </PageLayout>
  )
}
