'use client'
import { useEffect, useRef, useState } from 'react'
import webStorageClient from '@/utils/webStorageClient'
import {
    Layout,
    Avatar,
    Input,
    Button,
    Spin,
    Skeleton,
    Upload,
    Modal,
    message,
} from 'antd'
import { CircleX, Paperclip, Send, Settings } from 'lucide-react'
import { jwtDecode, JwtPayload } from 'jwt-decode'
import createChatService from '@/stores/services/chat/signalService'
import {
    useLazyGetChatContentByChatRoomQuery,
    useRemoveChatContentByIdMutation,
} from '@/stores/services/chat/chats'
import dayjs from 'dayjs'
import { v4 as uuidv4 } from 'uuid'
import { LoadingOutlined } from '@ant-design/icons'
import { useInView } from 'react-intersection-observer'
import axios from 'axios'
import Image from 'next/image'

const { Content } = Layout
const { startConnection, sendMessage, sendTypingMessage, sendRemovedMessage } = createChatService()

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
    userId,
}: {
    chatRoomId: string
    userId: string
}) {
    // State, ref, others
    const [messages, setMessages] = useState<Message[]>([])
    const [inputMessage, setInputMessage] = useState('')
    const [deleteMessageId, setDeleteMessageId] = useState<string | null>(null)
    const [isTyping, setIsTyping] = useState<boolean>(false)
    const [isUploading, setIsUploading] = useState<boolean>(false)
    const [uploadedImageUrls, setUploadedImageUrls] = useState<string[]>([])
    const [isDeleteConfirmModalVisible, setIsDeleteConfirmModalVisible] =
        useState<boolean>(false)
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
    const [deleteMessageIdFunc, { isLoading }] =
        useRemoveChatContentByIdMutation()

    const handleDeleteChatContent = async () => {
        try {
            console.log('deleteMessageId', deleteMessageId)
            await deleteMessageIdFunc(deleteMessageId!).unwrap()
            message.success('Xóa tin nhắn thành công')

            const updateMessage = messages.map((value) =>
                value.chatContentId === deleteMessageId
                    ? { ...value, isRemoved: true }
                    : value,
            )

            setMessages(updateMessage)
            setIsDeleteConfirmModalVisible(false)
            sendRemovedMessage(_userId, userId!, deleteMessageId!)
        } catch (error) {
            console.log(error)
        }
    }

    const handleFetchChatContent = async () => {
        const result = await useGetChatContentByUserQuery({
            lastReportDate: lastTimeMessage,
            chatRoomId: chatRoomId!,
            pageSize: 6,
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
    }, [chatRoomId, userId])

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
                time: dayjs(Date.now()).format('YYYY-MM-DDTHH:mm:ss'),
                isRemoved: false,
                assetUrl: uploadedImageUrls,
                isSending: true,
            }
            setInputMessage('')
            setMessages([newMessage, ...messages])

            await sendMessage(
                chatContentId,
                _userId,
                userId!,
                inputMessage,
                chatRoomId!,
                uploadedImageUrls,
            )

            handleScrollToBottom()
        }
    }

    const handleUpload = async ({
        onSuccess,
        onError,
        file,
        onProgress,
    }: any) => {
        const fmData = new FormData()
        const config = {
            headers: { 'content-type': 'multipart/form-data' },
            onUploadProgress: (event: any) => {
                onProgress({ percent: (event.loaded / event.total) * 100 })
                setIsUploading(true)
            },
        }

        fmData.append('image', file)
        fmData.append('album', 'PClinic')
        try {
            const res = await axios.post(
                'https://api.imgbb.com/1/upload?key=488e7d944b2bedd5020e1ace8585d1df',
                fmData,
                config,
            )
            const uploadedUrl = res?.data?.data?.url
            setUploadedImageUrls((prevUrls) => [...prevUrls, uploadedUrl])
            onSuccess('Ok')
            console.log(uploadedUrl)
            setIsUploading(false)
        } catch (err) {
            const error = new Error('Upload Failed.')
            onError({ error })
        }
    }

    const handleRemoveImage = (url: string) => {
        setUploadedImageUrls((prevUrls) => prevUrls.filter((u) => u !== url))
    }

    const handleOnTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputMessage(e.target.value)
        console.log('handleOnTyping');
        sendTypingMessage(_userId, userId!)
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
                                time: chatContent.time,
                                isRemoved: false,
                                assetUrl: chatContent.imageUrls,
                                isSending: false,
                            },
                            ...prev,
                        ]
                    })
                   
                    setTimeout(() => {
                        handleScrollToBottom()
                    }, 100);
                },
                (senderId: string) => {
                    console.log('Not in set typing')
                    if (senderId == userId) {
                        console.log('In set typing')
                        setIsTyping(true)
                    }
                    setTimeout(() => {
                        setIsTyping(false)
                    }, 5000)
                },
                (senderId: string, chatContentId: string) => {
                    
                    if (senderId == userId) {
                        console.log('Not in remove typing')
                        setMessages(messagePrev => messagePrev.map((msg) => {
                            if (msg.chatContentId == chatContentId) {
                                return { ...msg, isRemoved: true }
                            }
                            return msg
                        }))
                    }
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
            <Content className="w-100% ml-5 h-[600px] w-full overflow-x-hidden rounded-[12px] bg-white p-4 shadow-third">
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

                    <div className="flex-1 space-y-4 overflow-y-auto overflow-x-hidden p-4">
                        {messages.length > 0 && (
                            <div ref={ref}>
                                {isFetching && (
                                    <div className="my-2 text-center">
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
                                    className={`relative flex overflow-x-hidden break-normal break-words ${message.senderId === _userId ? 'justify-end' : 'justify-start'}`}
                                    onMouseEnter={() =>
                                        setDeleteMessageId(
                                            message.chatContentId,
                                        )
                                    }
                                >
                                    {!message.isRemoved ? (
                                        <>
                                            {message.senderId === _userId &&
                                                deleteMessageId ===
                                                    message.chatContentId && (
                                                    <button
                                                        onClick={() => {
                                                            setDeleteMessageId(
                                                                message.chatContentId,
                                                            )
                                                            setIsDeleteConfirmModalVisible(
                                                                !isDeleteConfirmModalVisible,
                                                            )
                                                        }}
                                                        className="mr-2 cursor-pointer text-gray-500"
                                                    >
                                                        <CircleX />
                                                    </button>
                                                )}
                                            <div
                                                className={`max-w-[75%] rounded-lg px-4 py-2 shadow-primary ${
                                                    message.senderId === _userId
                                                        ? 'bg-blue-500 text-white'
                                                        : 'bg-gray-200 text-secondarySupperDarker'
                                                }`}
                                            >
                                                <p>{message.content}</p>
                                                {message?.assetUrl?.length! >
                                                    0 &&
                                                    message?.assetUrl?.map(
                                                        (asset) => (
                                                            <Image
                                                                src={asset}
                                                                alt="uploaded"
                                                                className="z-1 mt-2 h-[80px] w-[80px] max-w-full rounded-lg object-cover"
                                                                width={200}
                                                                height={200}
                                                            />
                                                        ),
                                                    )}

                                                <span
                                                    className={`mt-1 block text-xs ${
                                                        message.senderId ===
                                                        _userId
                                                            ? 'text-white-200 float-right'
                                                            : 'float-left text-gray-200'
                                                    }`}
                                                >
                                                    {dayjs(message.time).format(
                                                        'HH:mm',
                                                    )}
                                                </span>
                                            </div>
                                        </>
                                    ) : (
                                        <p>tin nhắn đã bị xóa</p>
                                    )}
                                    {message.isSending && (
                                        <div className="ml-3 mt-4">
                                            <Spin />
                                        </div>
                                    )}
                                </div>
                            ))}
                        <div ref={messagesEndRef} />
                        {isTyping && <p>đang nhập tin nhắn</p>}{' '}

                    </div>
                    <div className="border-t p-4">
                        <div
                            className="chat-input-container"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                            }}
                        >
                            {uploadedImageUrls.map(
                                (url: string, index: number) => (
                                    <div className="relative">
                                        <Image
                                            className="z-1 h-[32px] w-[32px] object-cover"
                                            width={200}
                                            height={200}
                                            src={
                                                'https://i.ibb.co/Z69GVwx/463388459-1005180744955626-6095023535141555471-n.jpg'
                                            }
                                            alt="background"
                                        />
                                        <Button
                                            onClick={() =>
                                                handleRemoveImage(url)
                                            }
                                            className="absolute right-0 top-0 h-4 w-5 rounded-full bg-gray-500 p-1 text-white transition hover:bg-gray-600"
                                        >
                                            <CircleX />
                                        </Button>
                                    </div>
                                ),
                            )}
                            <Input
                                placeholder="Nhập tin nhắn"
                                value={inputMessage}
                                onChange={(e) =>
                                    handleOnTyping(e)
                                }
                                onPressEnter={handleSendMessage}
                                style={{ flex: 1 }} // Chiếm hết không gian còn lại
                            />

                            <Upload
                                name="file"
                                action={
                                    'https://api.imgbb.com/1/upload/key=488e7d944b2bedd5020e1ace8585d1df'
                                }
                                headers={{
                                    authorization: 'authorization-text',
                                }}
                                customRequest={handleUpload}
                                multiple={false}
                                fileList={[]}
                            >
                                <Button
                                    type="default"
                                    icon={<Paperclip size={20} />}
                                    size="middle"
                                    loading={isUploading}
                                ></Button>
                            </Upload>
                            <Button
                                className="font-bold"
                                iconPosition="start"
                                type="primary"
                                icon={<Send className="h-4 w-4" />}
                                onClick={handleSendMessage}
                            >
                                Gửi
                            </Button>
                        </div>
                    </div>
                </div>
                <Modal
                    title="Bạn có muốn xóa tin nhắn này không?"
                    open={isDeleteConfirmModalVisible}
                    onOk={handleDeleteChatContent}
                    confirmLoading={isLoading}
                    onCancel={() =>
                        setIsDeleteConfirmModalVisible(
                            !isDeleteConfirmModalVisible,
                        )
                    }
                    okButtonProps={{
                        danger: true,
                    }}
                >
                    <p>
                        Khi xóa tin nhắn này bạn và đối phương không thể nhìn
                        thấy lại được, hãy cân nhắc!
                    </p>
                </Modal>
            </Content>
        </div>
    )
}
