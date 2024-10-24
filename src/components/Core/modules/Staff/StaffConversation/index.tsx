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
import {
    useGetChatRoomByDoctorQuery,
    useGetChatRoomByUserQuery,
} from '@/stores/services/chat/chats'
import { useGetDoctorProfileQuery } from '@/stores/services/doctor/doctorSettings'
import { useSearchParams } from 'next/navigation'
const { Text } = Typography
import { motion } from 'framer-motion'

export interface ChatRoom {
    userId: string
    chatRoomId: string
    fullName: string
    isEndConversation: boolean
    avatar: string
    title: string
    latestMessageTime: string
}

export interface DoctorInformationChatRoom {
    fullName: string
    gender: {
        genderName: string
    }
    avatarUrl: string
    dob: string
}

export interface ChatRoomTransfer {
    chatRoomId?: string
    userId?: string
}

export default function StaffConservation() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const locale = useLocale()
    const _accessToken = webStorageClient.getToken()!.toString()
    const [chatRoomTransfer, setChatRoomTransfer] = useState<ChatRoomTransfer>()
    const [lastChatRoomTime, setLastChatRoomTime] = useState<string>(dayjs(Date.now()).format('YYYY-MM-DDTHH:mm:ss'))
    const [isLoadingChatRoom, setIsLoadingChatRoom] = useState<boolean>(false)
    let pageSize = 10
    const [isEndChatRoom, setIsEndChatRoom] = useState<boolean>(false)


    const { doctorInformationResult, isFetching } = useGetDoctorProfileQuery(
        undefined,
        {
            selectFromResult: ({ data, isFetching }) => {
                return {
                    doctorInformationResult: data?.body
                        ?.user as DoctorInformationChatRoom,
                    isFetching: isFetching,
                }
            },
        },
    )
    const newChatId = searchParams.get('chat')
    const { chatRoomResult, isChatRoomFetching, refetch } =
        useGetChatRoomByDoctorQuery({lastConversationTime: lastChatRoomTime, pageSize: pageSize}, {
            selectFromResult: ({ data, isFetching }) => {
                return {
                    chatRoomResult: data?.body?.chatRooms as ChatRoom[],
                    isChatRoomFetching: isFetching,
                }
            },
        })
    useEffect(() => {
        refetch()
    }, [newChatId])
    return (
        <motion.div
            initial={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            exit={{ opacity: 0 }}
        >
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
                                src={`${doctorInformationResult?.avatarUrl ?? DefaultImage}`}
                            />
                            <div className="">
                                <p
                                    className="font-bold text-secondarySupperDarker sm:text-lg md:text-2xl"
                                    style={{ margin: 0 }}
                                >
                                    {`${doctorInformationResult?.fullName ?? 'Ẩn Danh'}`}
                                </p>
                                <Text
                                    className="sm:text-md font-medium text-secondarySupperDarker md:text-lg"
                                    type="secondary"
                                >
                                    {`${doctorInformationResult?.gender?.genderName ?? 'Ẩn Danh'}`}
                                </Text>
                                <br />
                                <Text
                                    className="md:text-md font-medium text-secondarySupperDarker sm:text-sm"
                                    type="secondary"
                                >
                                    {`${dayjs(doctorInformationResult?.dob).format('DD/MM/YYYY') ?? 'Ẩn ngày sinh'}`}
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
                        setLastChatRoomTime={(time: string) =>
                            setLastChatRoomTime(time)
                        }
                        refetch={refetch}
                        isChatRoomFetching={isChatRoomFetching}
                        setIsLoadingChatRoom={setIsLoadingChatRoom}
                        setIsEndChatRoom={setIsEndChatRoom}
                    />
                    <div className="w-[calc(100%-370px)]">
                        <ChatContent isEndConversation={isEndChatRoom} setIsEndConversation={setIsEndChatRoom} />
                    </div>
                </div>
            </Layout>
        </motion.div>
    )
}
