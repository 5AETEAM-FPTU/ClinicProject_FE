'use client'
import React, { useState } from 'react'
import {
    Layout,
    Card,
    Avatar,
    Button,
    Typography,
    List,
    Divider,
    Row,
    Col,
    Space,
} from 'antd'
import { motion } from 'framer-motion'
import { BadgePlus, Settings } from 'lucide-react'
import _ from 'lodash'
import CreateConsultantRoom from './CreateConsultantRoom'
import ViewConsultantRoom from './ViewConsultantRoom'
import { useGetQueueRoomByUserQuery } from '@/stores/services/chat/chats'
import { useGetUserProfileQuery } from '@/stores/services/user/userSettings'
const { Header, Content } = Layout

export interface UserQueueRoom {
    queueRoomId: string
    title: string
    description: string
}

export interface UserInformationQueueRoom {
    fullName: string
    gender: {
        genderName: string
    }
    address: string
    avatarURL: string
    phoneNumber: string
}

export default function UserQueueRoomModule() {
    const [isCreateConsultantRoomVisible, setIsCreateConsultantRoomVisible] =
        useState<boolean>(false)
    const [isExistAnyConsultantRoom, setIsExistAnyConsultantRoom] =
        useState<boolean>(false)
    const { queueRoomResult, isSuccess, isFetching, refetch } =
        useGetQueueRoomByUserQuery(undefined, {
            selectFromResult: ({ data, isFetching, isSuccess }) => ({
                queueRoomResult: (data?.body.queueRoom as UserQueueRoom) ?? {},
                isSuccess: isSuccess,
                isFetching: isFetching,
            }),
        })

    const { userResult } = useGetUserProfileQuery(undefined, {
        selectFromResult: ({ data, isFetching }) => {
            return {
                userResult: data?.body?.user as UserInformationQueueRoom,
                isFetching: isFetching,
            }
        },
    })

    console.log(queueRoomResult)

    return (
        <motion.div
            initial={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            exit={{ opacity: 0 }}
        >
            <Layout
                className="bg-dashboardBackground"
            >
                <Content style={{ padding: '0px' }}>
                    <div className="mb-4">
                        <h2 className="text-[20px] font-semibold text-[#003553]">
                            Tin nhắn chờ
                        </h2>
                        {!isSuccess && (
                            <div>
                                <p className="my-3 text-[16px] font-semibold text-[#003553]">
                                    Bạn không có yêu cầu tư vấn nào đang chờ
                                </p>
                                <Button
                                    onClick={() =>
                                        setIsCreateConsultantRoomVisible(
                                            !isCreateConsultantRoomVisible,
                                        )
                                    }
                                    className={`mt-3 h-[48px] rounded-xl text-[14px] font-bold text-[#003553] shadow-third shadow-[#a7dcf7] ${
                                        isCreateConsultantRoomVisible
                                            ? 'bg-[#0284C7] text-white'
                                            : 'bg-white'
                                    }`}
                                >
                                    Tạo yêu cầu tư vấn
                                    <BadgePlus size={22} />
                                </Button>
                                {isCreateConsultantRoomVisible && (
                                    <CreateConsultantRoom refetch={refetch} />
                                )}
                            </div>
                        )}

                        {isSuccess && (
                            <ViewConsultantRoom
                                data={queueRoomResult}
                                user={userResult}
                                refetch={refetch}
                            />
                        )}
                    </div>
                </Content>
            </Layout>
        </motion.div>
    )
}
