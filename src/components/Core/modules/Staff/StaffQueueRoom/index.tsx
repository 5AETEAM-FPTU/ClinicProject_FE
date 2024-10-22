'use client'
import React, { useEffect, useState } from 'react'
import { MessageCircle, MessageCircleReply } from 'lucide-react'
import { Button, message, Pagination, Skeleton } from 'antd'
import {
    useAddChatRoomMutation,
    useLazyGetAllQueueRoomsQuery,
} from '@/stores/services/chat/chats'
import Image from 'next/image'
import { set } from 'lodash'
import { useRouter } from 'next-nprogress-bar'
import webStorageClient from '@/utils/webStorageClient'
import { JwtPayloadUpdated } from '../../Auth/SignIn'
import { jwtDecode } from 'jwt-decode'
import { useAppDispatch, useAppSelector } from '@/hooks/redux-toolkit'
import { motion } from 'framer-motion'
import { useMutation } from 'convex/react'
import { api } from '@convex/_generated/api'
import { constants } from '@/settings'
import dayjs from 'dayjs'

interface PatientQueue {
    patientId: string
    queueRoomId: string
    patientName: string
    patientAvatar: string
    message: string
}

interface ApiResponse {
    contents: PatientQueue[]
    pageIndex: number
    pageSize: number
    totalPages: number
    hasPreviousPage: boolean
    hasNextPage: boolean
}

export default function StaffQueueRoom() {
    const pageSizeDefault = 7
    const [patientQueues, setPatientQueues] = useState<PatientQueue[]>([])
    const [page, setPage] = useState<number>(1)
    const [totalPages, setTotalPages] = useState<number>(0)
    const [queueRoomFunc, { data, isFetching }] = useLazyGetAllQueueRoomsQuery()
    const [
        addChatRoomFunc,
        { data: addChatRoomData, isLoading: addChatRoomLoading },
    ] = useAddChatRoomMutation()
    const router = useRouter()

    const handleFetchQueueRooms = async (page: number, pageSize: number) => {
        const result = await queueRoomFunc({
            pageIndex: page,
            pageSize: pageSizeDefault,
        })

        const apiResponse = result?.data?.body?.patientQueues as ApiResponse

        if (result) {
            setPatientQueues(apiResponse.contents)
            setTotalPages(apiResponse.totalPages)
        }
    }
    const { user } = useAppSelector((state) => state.auth)
    const userId = jwtDecode<JwtPayloadUpdated>(
        webStorageClient.getToken()!,
    ).sub
    const sendToUserNotification = useMutation(
        api._user_notifications.functions.sendUserNotification,
    )
    const handleCreateNotificationToPatient = async (
        patientId: string,
        initialMessge: string,
        chat: string,
        peerAvatar: string,
        peerName: string,
    ) => {
        try {
            const domain =
                process.env.NEXT_PUBLIC_FE_DOMAIN ?? 'http://localhost:3000'
            await sendToUserNotification({
                receiverId: patientId,
                message: 'Yêu cầu tư vấn đã được chấp nhận',
                type: constants.NOTIFICATION_TYPES.SUCCESS,
                description: `Yêu cần tư vấn của bạn đã được phản hồi bởi ${user?.fullName}`,
                senderAvatarUrl: `${user.avatarUrl}`,
                senderId: `${userId}`,
                senderName: 'Nhân viên y tế',
                topic: 'Tư vấn',
                href: `${domain}/consultation/conversation/?chat=${chat}&user=${patientId}&peerAvt=${peerAvatar}&peerName=${peerName}&title=${initialMessge}`,
            })
        } catch (error) {}
    }

    const handleFetchChatRoom = async (
        patientId: string,
        queueRoomId: string,
        initialMessage: string,
        peerAvatar: string,
        fullname: string,
    ) => {
        const _accessToken = webStorageClient.getToken()
        const role = jwtDecode<JwtPayloadUpdated>(_accessToken!).role
        try {
            const result = await addChatRoomFunc({
                patientId: patientId,
                queueRoomId: queueRoomId,
                initialMessage: initialMessage,
            }).unwrap()

            console.log('assignChatRoomId', result.body.assignChatRoomId)

            router.push(
                `/${role}/consultation/conversation/?chat=${result?.body?.assignChatRoomId}&user=${patientId}&peerAvt=${peerAvatar}&peerName=${fullname}&title=${initialMessage}`,
            )
            handleCreateNotificationToPatient(
                patientId,
                initialMessage,
                result?.body?.assignChatRoomId,
                peerAvatar,
                fullname,
            )
            message.success('Tạo đoạn hội thoại thành công!')
        } catch (error) {
            console.log(error)
            message.error('Tạo đoạn hội thoại thểat bị!')
        }
    }

    useEffect(() => {
        handleFetchQueueRooms(page, pageSizeDefault)
    }, [page])

    const handlePageChange = (page: number) => {
        setPage(page)
        handleFetchQueueRooms(page, pageSizeDefault)
    }

    const handleAcceptReply = (message: string) => {}

    return (
        <motion.div
            initial={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            exit={{ opacity: 0 }}
            className="mx-auto max-w-full"
        >
            <h3 className="mb-4 text-[20px] font-semibold text-[#003553]">
                Tin nhắn chờ
            </h3>
            {isFetching ? (
                <div className="flex w-full flex-col gap-2">
                    {Array.from({ length: 7 }).map((_, index) => (
                        <Skeleton.Button
                            className="h-[70px] w-full"
                            key={index}
                            active
                        />
                    ))}
                </div>
            ) : (
                <div className="w-full">
                    <div>
                        {patientQueues.length > 0 ? (
                            <div>
                                <ul className="space-y-1">
                                    {patientQueues.map((queue) => (
                                        <li
                                            key={queue.queueRoomId}
                                            className="shadow-sm flex items-center justify-between rounded-lg bg-white px-4 lg:flex-row lg:h-[70px] flex-col h-fit"
                                        >
                                            <div className="flex pt-2 lg:pt-2 min-w-[250px] items-center gap-2">
                                                <Image
                                                    src={queue.patientAvatar}
                                                    alt="Avatar"
                                                    width={200}
                                                    height={200}
                                                    className="mr-4 h-10 w-10 rounded-full object-cover"
                                                />
                                                <div className="flex flex-col gap-[2px]">
                                                    <div className="text-sm text-[#003553]">
                                                        Yêu cầu tư vấn từ:
                                                    </div>
                                                    <span className="ml-1 text-[16px] font-semibold text-black">
                                                        {queue.patientName}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="mt-2 flex lg:w-[60%] w-[80%] items-center">
                                                <div className="mr-[6px] h-6 w-1 bg-[#003553]"></div>
                                                <p
                                                    className=""
                                                    dangerouslySetInnerHTML={{
                                                        __html: queue.message,
                                                    }}
                                                ></p>
                                            </div>
                                            <Button
                                                onClick={() =>
                                                    handleFetchChatRoom(
                                                        queue.patientId,
                                                        queue.queueRoomId,
                                                        queue.message,
                                                        queue.patientAvatar,
                                                        queue.patientName,
                                                    )
                                                }
                                                type="primary"
                                                className="flex items-center rounded-xl bg-secondaryDark px-5 py-5 m-3 font-bold text-white"
                                            >
                                                <MessageCircleReply size={24} />
                                                Trả lời
                                            </Button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ) : (
                            <div>Hiện không có yêu cầu tư vấn</div>
                        )}
                    </div>
                </div>
            )}
            <div className="mt-5 flex w-full items-center justify-center">
                {patientQueues.length > 1 && (
                    <Pagination
                        current={page}
                        pageSize={pageSizeDefault}
                        total={totalPages + 10}
                        onChange={handlePageChange}
                    />
                )}
            </div>
        </motion.div>
    )
}
