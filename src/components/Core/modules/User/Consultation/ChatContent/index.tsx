import webStorageClient from '@/utils/webStorageClient'
import { Layout, Avatar, Input, Button, Spin, Skeleton, Space } from 'antd'
import { jwtDecode, JwtPayload } from 'jwt-decode'
import { Send, Settings } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import createChatService from '@/stores/services/chat/signalService'
import { useLazyGetChatContentByChatRoomQuery } from '@/stores/services/user/userChats'
import dayjs from 'dayjs'
import { v4 as uuidv4 } from 'uuid'
import { LoadingOutlined } from '@ant-design/icons'
import { InView, useInView } from 'react-intersection-observer'

const { Content } = Layout
const { sendMessage, startConnection } = createChatService()

let a = 0
export interface Message {
    chatContentId: string
    senderId: string
    content: string
    time: string
    isRemoved: boolean
    assetUrl?: string[]
    isSending: boolean
}

export default function ChatRooms({
    chatRoomId,
    doctorId,
}: {
    chatRoomId: string
    doctorId: string
}) {
    // State, ref, others
    const [messages, setMessages] = useState<Message[]>([])
    const [inputMessage, setInputMessage] = useState('')
    const connectionRef = useRef<any>(null)
    const messagesEndRef = useRef<HTMLDivElement>(null)
    const [lastTimeMessage, setLastTimeMessage] = useState<string>(
        dayjs(Date.now()).format('YYYY-MM-DDTHH:mm:ss'),
    )
    const { ref, inView } = useInView({ threshold: 1 })
    const _userId = jwtDecode<JwtPayload>(webStorageClient.getToken()!).sub!
    const _accessToken = webStorageClient.getToken()!.toString()

    const [useGetChatContentByUserQuery, { data, isFetching }] =
        useLazyGetChatContentByChatRoomQuery()

    console.log(chatRoomId)

    const handleFetchChatContent = async () => {
        if (isFetching) return
        ++a
        console.log(a, lastTimeMessage)
        const result = await useGetChatContentByUserQuery({
            lastReportDate: lastTimeMessage,
            chatRoomId: chatRoomId!,
            pageSize: 4,
        })
        const messages: Message[] = result.data.body.messages

        if (messages.length > 0) {
            setMessages((prev) => {
                console.log('meessage', messages)
                console.log('prev', prev)
                return [...prev, ...messages]
            })
            console.log(messages[messages.length - 1]?.time)
            setLastTimeMessage(messages[messages.length - 1]?.time)
        }
    }

    useEffect(() => {
        const fetchChatContent = async () => {
            setMessages([])
            setLastTimeMessage(dayjs(Date.now()).format('YYYY-MM-DDTHH:mm:ss'))
            await handleFetchChatContent()
        }

        fetchChatContent()
    }, [chatRoomId, doctorId])

    useEffect(() => {
        if (inView) {
            handleFetchChatContent()
        }
    }, [inView])

    const handleSendMessage = async () => {
        if (inputMessage.trim()) {
            const chatContentId = uuidv4()

            const newMessage = {
                chatContentId: chatContentId,
                senderId: _userId,
                content: inputMessage,
                time: new Date().toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                }),
                isRemoved: false,
                assetUrl: [],
                isSending: true,
            }
            setInputMessage('')
            setMessages([newMessage, ...messages])

            await sendMessage(
                chatContentId,
                _userId,
                doctorId!,
                inputMessage,
                chatRoomId!,
            )

            handleScrollToBottom()
        }
    }

    useEffect(() => {
        const initializeConnection = async () => {
            if (connectionRef.current) return

            connectionRef.current = await startConnection(
                _accessToken,
                (chatContent) => {
                    setMessages((prev) => {
                        const exists = prev.some(
                            (msg) =>
                                msg.chatContentId == chatContent.chatContentId,
                        )

                        if (exists) {
                            return prev.map((msg) =>
                                msg.chatContentId === chatContent.chatContentId
                                    ? { ...msg, isSending: false }
                                    : msg,
                            )
                        }

                        return [
                            {
                                chatContentId: chatContent.chatContentId,
                                content: chatContent.message,
                                senderId: chatContent.senderId,
                                time: new Date().toLocaleTimeString([], {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                }),
                                isRemoved: false,
                                assetUrl: chatContent.imageUrls.concat(
                                    chatContent.videoUrls,
                                ),
                                isSending: false,
                            },
                            ...prev,
                        ]
                    })

                    handleScrollToBottom()
                },
            )
        }

        initializeConnection()

        return () => {
            if (connectionRef.current) {
                connectionRef.current.stop()
                connectionRef.current = null
            }
        }
    }, [_accessToken])

    const handleScrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    useEffect(() => {
        handleScrollToBottom()
    }, [])

    return (
        <div>
            <Content className="w-100% ml-5 h-[600px] flex-1 rounded-[12px] bg-white p-4 shadow-third">
                <div className="flex h-full flex-col">
                    <div className="flex items-center justify-between border-b p-4">
                        <div className="flex items-center">
                            <Avatar
                                size={48}
                                shape="square"
                                src="/placeholder.svg?height=40&width=40"
                            />
                            <div className="ml-3">
                                <h2 className="text-base font-semibold text-secondarySupperDarker">
                                    Tư vấn khám tổng quát
                                </h2>
                                <p className="text-[14px] text-secondarySupperDarker">
                                    Bác sĩ: ...
                                </p>
                            </div>
                        </div>
                        <Button
                            className="shadow-third"
                            icon={<Settings className="h-4 w-4" />}
                            type="text"
                        >
                            Cài đặt
                        </Button>
                    </div>
                    {isFetching &&
                        messages.length === 0 &&
                        Array.from({ length: 6 }).map(() => (
                            <>
                                <Skeleton.Button
                                    active
                                    size={'large'}
                                    shape={'round'}
                                    block
                                    className="my-[5px]"
                                />
                            </>
                        ))}

                    <div className="flex-1 space-y-4 overflow-y-auto p-4">
                        {messages.length > 0 && (
                            <div ref={ref}>
                                {isFetching && (
                                    <div className='text-center my-2'>
                                        <Spin
                                            indicator={<LoadingOutlined spin />}
                                        />
                                    </div>
                                )}
                            </div>
                        )}
                        {messages
                            ?.slice()
                            .reverse()
                            .map((message: Message) => (
                                <div
                                    key={message.chatContentId}
                                    className={`flex ${message.senderId === _userId ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-[75%] rounded-lg px-4 py-2 shadow-primary ${
                                            message.senderId === _userId
                                                ? 'bg-blue-500 text-white'
                                                : 'bg-gray-200 text-secondarySupperDarker'
                                        }`}
                                    >
                                        <p className="text-base">
                                            {message.content}
                                        </p>
                                        <span
                                            className={`mt-1 block text-xs ${message.senderId === _userId ? 'text-white-200 float-right' : 'float-left text-gray-500'}`}
                                        >
                                            {dayjs(message.time).format('HH:mm')}
                                        </span>
                                    </div>
                                    {message.isSending && (
                                        <div className="ml-3 mt-4">
                                            <Spin />
                                        </div>
                                    )}
                                </div>
                            ))}
                        <div ref={messagesEndRef} />
                    </div>
                    <div className="border-t p-4">
                        <Input
                            placeholder="Nhập tin nhắn"
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            onPressEnter={handleSendMessage}
                            suffix={
                                <Button
                                    className="font-bold"
                                    iconPosition="start"
                                    type="primary"
                                    icon={<Send className="h-4 w-4" />}
                                    onClick={handleSendMessage}
                                >
                                    Gửi
                                </Button>
                            }
                        />
                    </div>
                </div>
            </Content>
        </div>
    )
}
