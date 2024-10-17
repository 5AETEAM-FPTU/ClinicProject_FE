'use client'
import React, { useEffect, useRef, useState } from 'react'
import { Layout, List, Avatar, Input, Button, Space, Typography } from 'antd'
import { House, Send, Settings } from 'lucide-react'
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
const {  Text } = Typography

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
                </div>
            </div>
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
        </Layout>
    )
}
