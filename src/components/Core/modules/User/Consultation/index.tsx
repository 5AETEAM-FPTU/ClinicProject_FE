'use client'
import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import {
    Layout,
    List,
    Avatar,
    Input,
    Button,
    Space,
    Typography,
    Modal,
} from 'antd'
import { House, Phone, PhoneOff, Send, Settings, User } from 'lucide-react'
import { jwtDecode, JwtPayload } from 'jwt-decode'
import webStorageClient from '@/utils/webStorageClient'
import Image from 'next/image'
import ProfileBackground from '@public/landing/images/profile-background.png'
import {
    MessageOutlined,
    SettingOutlined,
    UserOutlined,
} from '@ant-design/icons'
import { DefaultImage, UserRole } from '@/helpers/data/Default'
import { useRouter } from 'next-nprogress-bar'
import { JwtPayloadUpdated } from '../../Auth/SignIn'
import { useLocale } from 'next-intl'
import ChatRooms from './ChatRooms'
import {
    useGetUserProfileQuery,
    useLazyGetUserProfileQuery,
} from '@/stores/services/user/userSettings'
import dayjs from 'dayjs'
import ChatContent from './ChatContent'
import { useGetChatRoomByUserQuery } from '@/stores/services/chat/chats'
const { Text } = Typography

export interface ChatRoom {
    doctorId: string
    chatRoomId: string
    fullName: string
    isEndConversation: boolean
    avatar: string
}

export interface UserInformationChatRoom {
    fullName: string
    gender: {
        genderName: string
    }
    avatarUrl: string
    dob: string
}

export interface ChatRoomTransfer {
    chatRoomId?: string
    doctorId?: string
}

interface IncomingCallPopupProps {
    isVisible: boolean
    callerName: string | null
    callerNumber: string | null
    avatar: string | null
    onAnswer: () => void
    onDecline: () => void
}

export function IncomingCallPopup({
    isVisible,
    callerName,
    callerNumber,
    avatar,
    onAnswer,
    onDecline,
}: IncomingCallPopupProps) {
    const audioRef = useRef<HTMLAudioElement | null>(null)
    useEffect(() => {
        if (audioRef.current && isVisible) {
            audioRef.current.play()
        }
    }, [isVisible])
    const handleAnswer = () => {
        if (audioRef.current) {
            audioRef.current.pause()  
            audioRef.current.currentTime = 0 
        }
        onAnswer() 
    }

    const handleDecline = () => {
        if (audioRef.current) {
            audioRef.current.pause()  
            audioRef.current.currentTime = 0  
        }
        onDecline() 
    }

    return (
        <Modal
            open={isVisible}
            footer={null}
            closable={false}
            centered
            className="wave-effect w-[400px]"
            modalRender={(modal) => (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                >
                    {modal}
                </motion.div>
            )}
        >
            <div className="flex flex-col items-center rounded-t-lg bg-gradient-to-b from-blue-500 to-blue-600 p-6 text-white">
                <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-white">
                    {avatar ? (
                        <img
                            src={avatar}
                            className="h-full w-full rounded-full object-cover text-blue-500"
                        />
                    ) : (
                        <User className="h-12 w-12 text-blue-500" />
                    )}
                </div>
                <h2 className="mb-1 text-center text-2xl font-bold">
                    {callerName}
                </h2>
                <p className="text-lg opacity-80">{callerNumber}</p>
            </div>
            <div className="flex justify-around rounded-b-lg bg-gradient-to-b from-blue-500 to-seco p-4">
                <audio
                    ref={audioRef}
                    preload="auto"
                    loop
                    src="/assets/calling.wav"
                />
                <Button
                    type="primary"
                    shape="circle"
                    icon={<Phone className="h-6 w-6" />}
                    size="large"
                    className="flex h-12 w-12 items-center justify-center rounded-full border-none bg-green-500 hover:bg-green-600"
                    onClick={handleAnswer}
                />
                <Button
                    type="primary"
                    danger
                    shape="circle"
                    icon={<PhoneOff className="h-6 w-6" />}
                    size="large"
                    className="flex h-12 w-12 items-center justify-center rounded-full"
                    onClick={handleDecline}
                />
            </div>
        </Modal>
    )
}

export default function ConsultationComponent() {
    const router = useRouter()
    const locale = useLocale()
    const _accessToken = webStorageClient.getToken()!.toString()
    const [chatRoomTransfer, setChatRoomTransfer] = useState<ChatRoomTransfer>()

    const { userInformationResult, isFetching } = useGetUserProfileQuery(
        undefined,
        {
            selectFromResult: ({ data, isFetching }) => {
                return {
                    userInformationResult: data?.body
                        ?.user as UserInformationChatRoom,
                    isFetching: isFetching,
                }
            },
        },
    )

    const { chatRoomResult, isChatRoomFetching } = useGetChatRoomByUserQuery(
        undefined,
        {
            selectFromResult: ({ data, isFetching }) => {
                return {
                    chatRoomResult: data?.body?.chatRooms as ChatRoom[],
                    isChatRoomFetching: isFetching,
                }
            },
        },
    )

    return (
        <Layout className="flex h-fit flex-col bg-transparent">
            <div className="relative mb-[85px] h-[150px]">
                <Image
                    className="z-1 h-[100%] w-full rounded-2xl object-cover"
                    src={ProfileBackground}
                    alt="background"
                />
                <div
                    className="z-2 absolute bottom-0 left-[50%] mb-0 flex w-[90%] translate-x-[-50%] translate-y-[50%] items-center justify-between rounded-2xl bg-white bg-opacity-85 p-5"
                    style={{ marginBottom: '24px' }}
                >
                    <Space size="large" align="center">
                        <Avatar
                            shape="square"
                            className="size-16 rounded-xl sm:size-20"
                            icon={<UserOutlined />}
                            src={`${userInformationResult?.avatarUrl ?? DefaultImage}`}
                        />
                        <div className="">
                            <p
                                className="font-bold text-secondarySupperDarker sm:text-lg md:text-2xl"
                                style={{ margin: 0 }}
                            >
                                {`${userInformationResult?.fullName ?? 'Ẩn Danh'}`}
                            </p>
                            <Text
                                className="sm:text-md font-medium text-secondarySupperDarker md:text-lg"
                                type="secondary"
                            >
                                {`${userInformationResult?.gender?.genderName ?? 'Ẩn Danh'}`}
                            </Text>
                            <br />
                            <Text
                                className="md:text-md font-medium text-secondarySupperDarker sm:text-sm"
                                type="secondary"
                            >
                                {`${dayjs(userInformationResult?.dob).format('DD/MM/YYYY') ?? 'Ẩn ngày sinh'}`}
                            </Text>
                        </div>
                    </Space>
                    <Space
                        className="flex h-full flex-col sm:flex-row"
                        style={{ marginLeft: 'auto' }}
                    >
                        <Button
                            type="default"
                            className="border-2 border-secondaryDark font-semibold text-secondaryDarker"
                            icon={<House size={18} />}
                            onClick={() =>
                                router.push(
                                    `/${locale}/${jwtDecode<JwtPayloadUpdated>(_accessToken!).role}/overview`,
                                )
                            }
                        >
                            Tổng quan
                        </Button>
                        <Button
                            type="default"
                            className="border-2 border-secondaryDark font-semibold text-secondaryDarker"
                            icon={<Settings size={18} />}
                            onClick={() =>
                                router.push(
                                    `/${locale}/${jwtDecode<JwtPayloadUpdated>(_accessToken!).role}/account/settings`,
                                )
                            }
                        >
                            Cài đặt
                        </Button>
                    </Space>
                </div>
            </div>
            <div className="flex w-full flex-row gap-5">
                <ChatRooms
                    chatRooms={chatRoomResult}
                    setChatRoomTransfer={(chatRoomId, doctorId) =>
                        setChatRoomTransfer({ chatRoomId, doctorId })
                    }
                />
                <div className="w-[calc(100%-370px)]">
                    <ChatContent />
                </div>
            </div>
        </Layout>
    )
}
