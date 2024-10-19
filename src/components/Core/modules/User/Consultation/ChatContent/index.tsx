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
    Popover,
    Image,
} from 'antd'
import {
    CircleX,
    EllipsisVertical,
    Paperclip,
    Send,
    Settings,
} from 'lucide-react'
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
import { useSearchParams } from 'next/navigation'
import { cn } from '@/lib/utils'
import MessageFileShower from '../../../Doctor/DoctorConservation/ChatContent/ImageFileShower'
import { BeatLoader } from 'react-spinners'
import {motion} from 'framer-motion'

const { Content } = Layout
const { startConnection, sendMessage, sendTypingMessage, sendRemovedMessage } =
    createChatService()

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

export default function ChatRooms() {
    const searchParams = useSearchParams()
    const chatRoomId = searchParams.get('chat')
    const doctorId = searchParams.get('user')
    const peerAvatar = searchParams.get('peerAvt')

    // State, ref, others
    const [messages, setMessages] = useState<Message[]>([])
    const [inputMessage, setInputMessage] = useState<string>('')
    const [actionMessageId, setActionMessageId] = useState<string | null>(null)
    const [threeDot, setThreeDot] = useState<boolean>(false)
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

    const divRef = useRef<HTMLDivElement | null>(null)
    const [prevScrollTop, setPrevScrollTop] = useState(0)
    console.log(prevScrollTop)
    const [isInitial, setIsInitial] = useState(false)
    useEffect(() => {
        setIsInitial(false)
    }, [doctorId, chatRoomId])

    const handleDeleteChatContent = async () => {
        try {
            console.log('deleteMessageId', actionMessageId)
            await deleteMessageIdFunc(actionMessageId!).unwrap()
            message.success('Xóa tin nhắn thành công')

            const updateMessage = messages.map((value) =>
                value.chatContentId === actionMessageId
                    ? { ...value, isRemoved: true }
                    : value,
            )

            setMessages(updateMessage)
            setIsDeleteConfirmModalVisible(false)
            sendRemovedMessage(_userId, doctorId!, actionMessageId!)
        } catch (error) {
            console.log(error)
            message.error('Xóa tin nhắn thất bại!')
            setIsDeleteConfirmModalVisible(false)
        }
    }
    const [currentDay, setCurrentDay] = useState(
        dayjs(Date.now()).format('YYYY-MM-DDTHH:mm:ss'),
    )
    const handleScrollToBottomOnInitial = () => {
        if (divRef.current) {
            console.log(divRef.current)
            const { current: container } = divRef
            container.scrollTop = container.scrollHeight
        }
    }

    const handleFetchChatContentInitial = async () => {
        try {
            const result = await useGetChatContentByUserQuery({
                lastReportDate: currentDay,
                chatRoomId: chatRoomId!,
                pageSize: 10,
            })
            const resultMessages: Message[] = result.data.body.messages
            if (result) {
                setMessages(resultMessages)
                setLastTimeMessage(
                    resultMessages[resultMessages.length - 1]?.time,
                )
                setIsInitial(true)
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        handleScrollToBottomOnInitial()
    }, [isInitial])

    useEffect(() => {
        handleFetchChatContentInitial()
    }, [currentDay, doctorId, chatRoomId])

    useEffect(() => {
        const handleScroll = (event: Event) => {
            const target = event.target as HTMLDivElement
            const currentScrollTop = target.scrollTop
            setPrevScrollTop(currentScrollTop)
        }

        const divElement = divRef.current

        if (divElement) {
            divElement.addEventListener('scroll', handleScroll)
        }

        return () => {
            if (divElement) {
                divElement.removeEventListener('scroll', handleScroll)
            }
        }
    }, [prevScrollTop])

    const handleFetchDataWithLastTimeMessage = async () => {
        try {
            const result = await useGetChatContentByUserQuery({
                lastReportDate: lastTimeMessage,
                chatRoomId: chatRoomId!,
                pageSize: 10,
            })
            console.log(
                'Continue fetching message => ',
                result?.data?.body?.messages,
            )
            const resultMessages: Message[] = result.data.body.messages
            if (resultMessages) {
                setMessages((prev) => {
                    return [...prev, ...resultMessages]
                })
                setLastTimeMessage(
                    resultMessages[resultMessages.length - 1]?.time,
                )
            }
        } catch (error) {}
    }
    useEffect(() => {
        if (prevScrollTop) {
            console.log(prevScrollTop)
            if (prevScrollTop <= 3) {
                handleFetchDataWithLastTimeMessage()
            }
        }
    }, [prevScrollTop])

    const handleOnTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputMessage(e.target.value)
        sendTypingMessage(_userId, doctorId!)
    }
    const [isUpdateImageToCloud, setIsUpdateImageToCloud] = useState(false)
    const handleSendMessage = async () => {
       
        if (inputMessage.trim()) {
            setIsUpdateImageToCloud(true);
            const urls = await handleGetListImageUrl()
            const chatContentId = uuidv4()

            const newMessage = {
                chatContentId: chatContentId,
                senderId: _userId,
                content: inputMessage,
                time: dayjs(Date.now()).format('YYYY-MM-DDTHH:mm:ss'),
                isRemoved: false,
                assetUrl: urls,
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
                urls,
            )
            setIsUpdateImageToCloud(false); 
            setFileStorage(null)
            setUploadedImageUrls([])
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
                    }, 100)
                },
                (senderId: string) => {
                    if (senderId == doctorId) {
                        setIsTyping(true)
                    }
                    setTimeout(() => {
                        setIsTyping(false)
                    }, 3000)
                },
                (senderId: string, chatContentId: string) => {
                    if (senderId == doctorId) {
                        setMessages(
                            messages.map((msg) => {
                                if (msg.chatContentId == chatContentId) {
                                    return { ...msg, isRemoved: true }
                                }
                                return msg
                            }),
                        )
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

    const [fileStorage, setFileStorage] = useState<FileList | null>(null)
    const [isDragging, setIsDragging] = useState<boolean>(false)
    console.log(fileStorage)
    const handleOnChangeSeleteFile = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const files: FileList | null = event.target.files
        if (files) {
            setFileStorage((prevFileStorage) => {
                if (prevFileStorage) {
                    const combinedFiles = new DataTransfer()
                    Array.from(prevFileStorage).forEach((file) =>
                        combinedFiles.items.add(file),
                    )
                    Array.from(files).forEach((file) =>
                        combinedFiles.items.add(file),
                    )
                    return combinedFiles.files
                } else {
                    return files
                }
            })
        }
    }
    const removeItemFromStorage = (index: number) => {
        if (fileStorage) {
            const updatedFiles = new DataTransfer()
            Array.from(fileStorage).forEach((file, i) => {
                if (i !== index) {
                    updatedFiles.items.add(file)
                }
            })
            setFileStorage(updatedFiles.files)
        }
    }
    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault()
        setIsDragging(true)
        event.dataTransfer.dropEffect = 'copy'
    }
    const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault()
        setIsDragging(false)
    }

    const handleDrogFile = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault()
        setIsDragging(true)
        const file = event.dataTransfer.files
        if (file) {
            setFileStorage(file)
        }
    }

    const handleUploadAndGetImageUrl = async (file: File) => {
        const CLOUD_NAME = 'dy1uuo6ql'
        const UPLOAD_PRESET = 'pclinic'
        try {
            const formData = new FormData()
            formData.append('file', file)
            formData.append('upload_preset', UPLOAD_PRESET)
            const responseData = await axios.post(
                `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
                formData,
            )
            if (responseData) {
                setIsUploading(false)
            }
            return responseData.data.secure_url
        } catch (error) {
            return null
        }
    }
    const handleGetListImageUrl = async () => {
        const listImageUrl: string[] = []
        if (fileStorage) {
            setIsUploading(true)
            for (let i = 0; i < fileStorage.length; i++) {
                console.log(fileStorage[i])
                const imageUrl = await handleUploadAndGetImageUrl(
                    fileStorage[i],
                )
                if (imageUrl) {
                    listImageUrl.push(imageUrl)
                }
            }
        }
        return listImageUrl
    }

    return (
        <div>
            {
                doctorId && chatRoomId ? <div className="h-[600px] w-full overflow-x-hidden rounded-[12px] bg-white p-4 shadow-third">
                <div className="flex h-full flex-col">
                    <div className="flex items-center justify-between border-b pb-4">
                        <div className="flex items-center">
                            <Avatar size={48} shape="square" src={peerAvatar} />
                            <div className="ml-3">
                                <h2 className="text-base font-semibold text-secondarySupperDarker">
                                    Tư vấn khám tổng quát
                                </h2>
                                <p className="text-[14px] text-secondarySupperDarker">
                                    Bác sĩ: ...
                                </p>
                            </div>
                        </div>
                        {/* <Button
                            className="shadow-third"
                            icon={<Settings className="h-4 w-4" />}
                            type="text"
                        >
                            Cài đặt
                        </Button> */}
                    </div>
                    <div
                        ref={divRef}
                        className="flex-1 space-y-4 overflow-y-auto overflow-x-hidden p-4 pb-0"
                        onDrop={(event) => {
                            handleDrogFile(event)
                        }}
                        onDragLeave={(event) => {
                            handleDragLeave(event)
                        }}
                        onDragOver={(event) => {
                            handleDragOver(event)
                        }}
                    >
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
                            .map((message: Message, index: number) => (
                                <div
                                    key={index}
                                    className={`relative flex overflow-x-hidden break-normal break-words ${message.senderId === _userId ? 'justify-end' : 'justify-start'}`}
                                    onMouseEnter={() =>
                                        setActionMessageId(
                                            message.chatContentId,
                                        )
                                    }
                                >
                                    {message.isSending && (
                                        <div className="ml-3 mr-5 mt-2">
                                            <Spin />
                                        </div>
                                    )}
                                    {!message.isRemoved ? (
                                        <>
                                            {message.senderId === _userId &&
                                                actionMessageId ===
                                                    message.chatContentId && (
                                                    <Popover
                                                        trigger="click"
                                                        content={
                                                            <Button
                                                                type="text"
                                                                className="text-secondarySupperDarker"
                                                                onClick={() => {
                                                                    setActionMessageId(
                                                                        message.chatContentId,
                                                                    )
                                                                    setIsDeleteConfirmModalVisible(
                                                                        !isDeleteConfirmModalVisible,
                                                                    )
                                                                }}
                                                            >
                                                                Xóa tin nhắn
                                                            </Button>
                                                        }
                                                        placement="left"
                                                    >
                                                        <button className="mr-2 cursor-pointer text-gray-500">
                                                            <EllipsisVertical />
                                                        </button>
                                                    </Popover>
                                                )}
                                            <div
                                                className={`h-fit w-fit max-w-[650px] rounded-lg px-[10px] py-[6px] ${
                                                    message.senderId === _userId
                                                        ? 'bg-secondaryDark text-white'
                                                        : 'bg-slate-200 text-secondarySupperDarker'
                                                }`}
                                            >
                                                <p>{message.content}</p>
                                                <div
                                                    className={cn(
                                                        'flex w-full flex-wrap gap-[10px]',
                                                        `${message?.assetUrl?.length! > 0 ? 'mt-2' : ''}`,
                                                    )}
                                                >
                                                    {message?.assetUrl
                                                        ?.length! > 0 &&
                                                        message?.assetUrl?.map(
                                                            (asset) => (
                                                                <Image
                                                                    src={asset}
                                                                    alt="uploaded"
                                                                    className="h-[150px] w-[150px] rounded-lg object-cover"
                                                                />
                                                            ),
                                                        )}
                                                </div>
                                                <span
                                                    className={`mt-1 block text-xs ${
                                                        message.senderId ===
                                                        _userId
                                                            ? 'text-white-200 float-right'
                                                            : 'float-left text-secondarySupperDarker'
                                                    }`}
                                                ></span>
                                            </div>
                                        </>
                                    ) : (
                                        <p className="rounded-lg border-2 bg-slate-100 px-4 py-2 italic shadow-primary">
                                            Tin nhắn đã bị xóa
                                        </p>
                                    )}
                                </div>
                            ))}
                        <div ref={messagesEndRef} />
                        {isTyping && <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className='w-fit px-4 py-2 bg-slate-200 rounded-lg'
                        ><BeatLoader                        size={6} color='#0284C7'/></motion.div>}{' '}
                    </div>
                    <div className="border-t pt-4">
                        <div
                            className="chat-input-container relative"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                            }}
                        >
                            <div>
                                <input
                                    type="file"
                                    className="hidden"
                                    id="image-input"
                                    accept="image/*, audio/*, video/*, .txt,"
                                    multiple
                                    onChange={(event) =>
                                        handleOnChangeSeleteFile(event)
                                    }
                                />
                                <label htmlFor="image-input">
                                    <div className="rounded-lg bg-slate-200 px-4 py-2">
                                        <Paperclip
                                            size={18}
                                            className="cursor-pointer text-secondarySupperDarker"
                                        />
                                    </div>
                                </label>
                            </div>
                            <Input
                                placeholder="Nhập tin nhắn"
                                value={inputMessage}
                                onChange={(e) => handleOnTyping(e)}
                                onPressEnter={handleSendMessage}
                                style={{ flex: 1 }} // Chiếm hết không gian còn lại
                            />

                            <Button
                                className="bg-secondaryDarker font-bold"
                                iconPosition="start"
                                type="primary"
                                icon={<Send className="h-4 w-4" />}
                                onClick={handleSendMessage}
                                loading={isUpdateImageToCloud}
                            >
                                Gửi
                            </Button>
                            {fileStorage && (
                                <MessageFileShower
                                    fileStorage={fileStorage!}
                                    setFileStorage={setFileStorage}
                                    removeItemFromStorage={
                                        removeItemFromStorage
                                    }
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div> : <div className='w-full h-[600px] bg-white shadow-third rounded-lg'>
            </div>
            }
            <Modal
                title="Bạn có muốn xóa tin nhắn này không?"
                open={isDeleteConfirmModalVisible}
                onOk={handleDeleteChatContent}
                confirmLoading={isLoading}
                onCancel={() =>
                    setIsDeleteConfirmModalVisible(!isDeleteConfirmModalVisible)
                }
                okButtonProps={{
                    danger: true,
                }}
            >
                <p>
                    Khi xóa tin nhắn này bạn và đối phương không thể nhìn thấy
                    lại được, hãy cân nhắc!
                </p>
            </Modal>
        </div>
    )
}
