'use client'
import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Layout, List, Avatar, Input, Button, Space, Typography, Modal } from 'antd'
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
    isVisible: boolean;
    callerName: string | null;
    callerNumber: string | null;
    avatar: string | null;
    onAnswer: () => void;
    onDecline: () => void;
}

export function IncomingCallPopup({
    isVisible,
    callerName,
    callerNumber,
    avatar,
    onAnswer,
    onDecline
}: IncomingCallPopupProps) {
    return (
        <Modal
            open={isVisible}
            footer={null}
            closable={false}
            centered
            className='w-[400px] wave-effect'
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
            <div className="flex flex-col items-center bg-gradient-to-b from-blue-500 to-blue-600 text-white p-6 rounded-t-lg">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-4">
                    {avatar ? <img src={avatar} className="w-full h-full text-blue-500 object-cover rounded-full" /> : <User className="w-12 h-12 text-blue-500" />}
                </div>
                <h2 className="text-2xl font-bold mb-1 text-center">{callerName}</h2>
                <p className="text-lg opacity-80">{callerNumber}</p>
            </div>
            <div className="flex justify-around p-4 bg-gray-100 rounded-b-lg">
                <Button
                    type="primary"
                    shape="circle"
                    icon={<Phone className="w-6 h-6" />}
                    size="large"
                    className="bg-green-500 hover:bg-green-600 border-none flex items-center justify-center w-12 h-12 rounded-full"
                    onClick={onAnswer}
                />
                <Button
                    type="primary"
                    danger
                    shape="circle"
                    icon={<PhoneOff className="w-6 h-6" />}
                    size="large"
                    className="flex items-center justify-center w-12 h-12 rounded-full"
                    onClick={onDecline}
                />
            </div>
        </Modal>
    );
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
        <Layout className="flex h-[600px] flex-col bg-transparent overflow-y-hidden">
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
                            className="border border-secondaryDarker"
                            icon={<House />}
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
                            className="border border-secondaryDarker"
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
                </div >
            </div >
            <div className="flex w-full">
                <ChatRooms
                    chatRooms={chatRoomResult}
                    setChatRoomTransfer={(chatRoomId, doctorId) =>
                        setChatRoomTransfer({ chatRoomId, doctorId })
                    }
                />
                <div className="flex-1">
                    {chatRoomTransfer?.chatRoomId ? (
                        <ChatContent
                            chatRoomId={chatRoomTransfer?.chatRoomId!}
                            doctorId={chatRoomTransfer?.doctorId!}
                        />
                    ) : (
                        <p className="mt-8 text-center text-xl text-[#9E9E9E]">
                            Vui lòng chọn đoạn hội thoại để có thể được bác sĩ
                            tư vấn trực tiếp
                        </p>
                    )}
                </div>
            </div>
        </Layout >
    )
}
