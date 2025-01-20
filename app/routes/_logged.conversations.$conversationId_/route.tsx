import {
  Typography,
  Input,
  Button,
  List,
  Avatar,
  message,
  Upload,
  Modal,
} from 'antd'
import { useState, useEffect, useRef } from 'react'
const { Title, Text } = Typography
import { useUserContext } from '@/core/context'
import dayjs from 'dayjs'
import { useLocation, useNavigate, useParams } from '@remix-run/react'
import { useUploadPublic } from '@/plugins/upload/client'
import { SocketClient } from '@/plugins/socket/client'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function ConversationPage() {
  const { conversationId } = useParams()
  const { user } = useUserContext()
  const [messageText, setMessageText] = useState('')
  const [isRecording, setIsRecording] = useState(false)
  const [audioStream, setAudioStream] = useState<MediaRecorder | null>(null)
  const [audioChunks, setAudioChunks] = useState<Blob[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { mutateAsync: upload } = useUploadPublic()

  // Fetch conversation and messages
  const { data: conversation, refetch: refetchConversation } =
    Api.conversation.findFirst.useQuery({
      where: { id: conversationId },
      include: {
        conversationParticipants: {
          include: { user: true },
        },
        messages: {
          include: { user: true },
        },
      },
    })

  // Socket for real-time updates
  const { emit } = SocketClient.useEvent('new-message', () => {
    refetchConversation()
  })

  // Mutations
  const { mutateAsync: sendMessage } = Api.message.create.useMutation()
  const { mutateAsync: deleteMessage } = Api.message.delete.useMutation()

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [conversation?.messages])

  // Handle text message
  const handleSendMessage = async () => {
    if (!messageText.trim()) return

    try {
      const newMessage = await sendMessage({
        data: {
          content: messageText,
          type: 'text',
          status: 'sent',
          conversationId: conversationId!,
          userId: user!.id,
        },
      })

      emit({
        payload: { messageId: newMessage.id },
        userIds:
          conversation?.conversationParticipants.map(p => p.userId) || [],
      })

      setMessageText('')
      refetchConversation()
    } catch (error) {
      message.error('Failed to send message')
    }
  }

  // Handle image upload
  const handleImageUpload = async (file: File) => {
    try {
      const { url } = await upload({ file })
      await sendMessage({
        data: {
          content: url,
          type: 'image',
          status: 'sent',
          conversationId: conversationId!,
          userId: user!.id,
        },
      })
      refetchConversation()
    } catch (error) {
      message.error('Failed to upload image')
    }
  }

  // Handle audio recording
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const recorder = new MediaRecorder(stream)
      const chunks: Blob[] = []

      recorder.ondataavailable = e => chunks.push(e.data)
      recorder.onstop = async () => {
        const audioBlob = new Blob(chunks, { type: 'audio/wav' })
        const file = new File([audioBlob], 'audio-message.wav')
        const { url } = await upload({ file })

        await sendMessage({
          data: {
            content: url,
            type: 'audio',
            status: 'sent',
            conversationId: conversationId!,
            userId: user!.id,
          },
        })
        refetchConversation()
      }

      recorder.start()
      setAudioStream(recorder)
      setIsRecording(true)
    } catch (error) {
      message.error('Failed to start recording')
    }
  }

  const stopRecording = () => {
    audioStream?.stop()
    setIsRecording(false)
  }

  // Handle message deletion
  const handleDeleteMessage = async (messageId: string) => {
    try {
      await deleteMessage({ where: { id: messageId } })
      refetchConversation()
    } catch (error) {
      message.error('Failed to delete message')
    }
  }

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
        <Title level={2}>
          <i className="las la-comments"></i> Conversation
        </Title>

        <div
          style={{
            background: '#fff',
            padding: '20px',
            borderRadius: '8px',
            marginBottom: '20px',
          }}
        >
          <Text>Participants:</Text>
          {conversation?.conversationParticipants.map(participant => (
            <Avatar.Group key={participant.id}>
              <Avatar src={participant.user?.pictureUrl}>
                {participant.user?.name?.[0]}
              </Avatar>
              <Text style={{ marginLeft: '8px' }}>
                {participant.user?.name}
              </Text>
            </Avatar.Group>
          ))}
        </div>

        <div
          style={{
            height: '400px',
            overflowY: 'auto',
            marginBottom: '20px',
            padding: '20px',
            background: '#f0f2f5',
            borderRadius: '8px',
          }}
        >
          <List
            dataSource={conversation?.messages}
            renderItem={message => (
              <List.Item
                style={{
                  justifyContent:
                    message.userId === user?.id ? 'flex-end' : 'flex-start',
                }}
              >
                <div
                  style={{
                    maxWidth: '70%',
                    background:
                      message.userId === user?.id ? '#1890ff' : '#fff',
                    color: message.userId === user?.id ? '#fff' : '#000',
                    padding: '10px 15px',
                    borderRadius: '8px',
                    position: 'relative',
                  }}
                >
                  {message.type === 'text' && (
                    <Text style={{ color: 'inherit' }}>{message.content}</Text>
                  )}
                  {message.type === 'image' && (
                    <img src={message.content} style={{ maxWidth: '200px' }} />
                  )}
                  {message.type === 'audio' && (
                    <audio controls src={message.content} />
                  )}

                  <div style={{ fontSize: '12px', marginTop: '4px' }}>
                    {dayjs(message.createdAt).format('HH:mm')}
                    {message.userId === user?.id && (
                      <Button
                        type="text"
                        size="small"
                        danger
                        onClick={() => handleDeleteMessage(message.id)}
                        icon={<i className="las la-trash"></i>}
                      />
                    )}
                  </div>
                </div>
              </List.Item>
            )}
          />
          <div ref={messagesEndRef} />
        </div>

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <Input.TextArea
            value={messageText}
            onChange={e => setMessageText(e.target.value)}
            placeholder="Type a message..."
            autoSize={{ minRows: 1, maxRows: 4 }}
            onPressEnter={e => {
              if (!e.shiftKey) {
                e.preventDefault()
                handleSendMessage()
              }
            }}
          />

          <Upload
            showUploadList={false}
            beforeUpload={file => {
              handleImageUpload(file)
              return false
            }}
          >
            <Button icon={<i className="las la-image"></i>} />
          </Upload>

          <Button
            icon={
              <i
                className={`las ${isRecording ? 'la-stop' : 'la-microphone'}`}
              ></i>
            }
            onClick={isRecording ? stopRecording : startRecording}
            danger={isRecording}
          />

          <Button
            type="primary"
            onClick={handleSendMessage}
            icon={<i className="las la-paper-plane"></i>}
          >
            Send
          </Button>
        </div>
      </div>
    </PageLayout>
  )
}
