'use client'
import { useTrigger } from '@/hooks/useTrigger'
import { Divider } from 'antd'
import { ChevronsDown } from 'lucide-react'
import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import dayjs from 'dayjs'
import { getTimeAgo } from '@/utils/time'
import { useMutation } from 'convex/react'
import { api } from '@convex/_generated/api'
import { Id } from '@convex/_generated/dataModel'

export type UserNofiticationPayload = {
    _id: string
    _creationTime: string
    type: string
    senderName: string
    senderId: string
    senderAvatarUrl: string
    receiverId: string
    message: string
    topic: string
    description: string
    isRead: boolean
}
type TProps = {
    payload: UserNofiticationPayload[]
}
export default function Notifications({ payload }: TProps) {
    return (
        <div className="flex w-fit flex-col">
            <h3 className="mb-2 text-[20px] font-semibold text-secondarySupperDarker">
                Thông báo
            </h3>
            <div className="flex max-h-[600px] min-w-[500px] flex-col overflow-hidden overflow-y-auto">
                {payload.map((item, index) => {
                    return <NotificationItem key={index} item={item} />
                })}
                {payload.length == 0 && (
                    <p className="text-start text-secondarySupperDarker">
                        Không có thông báo
                    </p>
                )}
            </div>
        </div>
    )
}

function NotificationItem({ item }: { item: UserNofiticationPayload }) {
    const { handleTrigger, trigger } = useTrigger()
    const markNotificationAsRead = useMutation(
        api._user_notifications.functions.markNotificationAsRead,
    )

    const handleMarkNotificationAsRead = async () => {
        try {
            await markNotificationAsRead({
                id: item._id as Id<'user_notifications'>,
            })
        } catch (error) {
            // console.log(error)
        }
    }
    return (
        <>
            <div
                className="max-w-[500px] cursor-pointer border-t-[1px] px-2 py-2 transition hover:bg-slate-100"
                onClick={() => {
                    handleTrigger()
                    handleMarkNotificationAsRead()
                }}
            >
                <div className="flex w-full flex-row items-center justify-between">
                    <div className="w-full">
                        <div className="flex w-full items-center justify-between gap-5">
                            <div className="relative w-fit">
                                <p className="w-fit text-[16px] font-semibold text-secondarySupperDarker">
                                    {item.topic}
                                </p>
                                {
                                    !item.isRead && <div className="absolute right-[-25px] top-[8px] h-[8px] w-[8px] rounded-full bg-secondaryDark"></div>
                                }
                            </div>
                            <p className="px-5">
                                {getTimeAgo(item._creationTime)}
                            </p>
                        </div>
                        <p className="font-semibold text-secondarySupperDarker">
                            {item.message}
                        </p>
                    </div>
                    <div
                        className={cn(
                            `${trigger ? 'rotate-180' : ''}`,
                            'transition-all',
                        )}
                    >
                        <ChevronsDown size={18} />
                    </div>
                </div>
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{
                        height: trigger ? 'auto' : 0,
                        opacity: trigger ? 1 : 0,
                    }}
                    transition={{ duration: 0.2 }}
                    className="mt-2 flex w-[100%] flex-col items-center justify-center overflow-hidden text-[14px] text-secondarySupperDarker"
                >
                    <div className="w-[90%]">
                        <p className="w-full break-words">{item.description}</p>
                    </div>
                </motion.div>
            </div>
        </>
    )
}
