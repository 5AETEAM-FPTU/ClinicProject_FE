'use client'
import { Avatar, Layout, List, Typography } from 'antd'
import { useRouter, useSearchParams } from 'next/navigation'
import { ChatRoom } from '..'
import { useEffect } from 'react'

const { Sider } = Layout
export default function ChatRooms({
    chatRooms,
    setChatRoomTransfer,
}: {
    chatRooms: ChatRoom[]
    setChatRoomTransfer: (chatRoomId: string, doctorId: string) => void
}) {
    const route = useRouter()
    const searchParams = useSearchParams()
    const chatRoomId = searchParams.get('chat')
    const userId = searchParams.get('user')

    const handleChangeRoute = (chatRoomId: string, userId: string, peerAvt: string) => {
        route.push('?chat=' + chatRoomId + '&user=' + userId + '&peerAvt=' + peerAvt)
    }
    const handleFirstChat = (chatRoomId: string, userId: string, peerAvt: string) => {
        handleChangeRoute(chatRoomId, userId, peerAvt)
    }
    useEffect(() => {
        if(chatRooms?.length > 0) {
            handleFirstChat(chatRooms[0]?.chatRoomId, chatRooms[0]?.doctorId, chatRooms[0]?.avatar)
        }
    }, [chatRooms])
    return (
        <div className="min-w-[350px]">
            <div className="h-full !w-[100%] rounded-[12px] bg-white p-4 shadow-third">
                <List
                    itemLayout="horizontal"
                    dataSource={chatRooms}
                    renderItem={(doctor) => {
                        const isSelected =
                            doctor.chatRoomId === chatRoomId &&
                            doctor.doctorId === userId

                        return (
                            <List.Item
                                onClick={() => {
                                    handleChangeRoute(
                                        doctor.chatRoomId,
                                        doctor.doctorId,
                                        doctor.avatar
                                    )
                                }}
                                className={`group mb-[10px] cursor-pointer rounded-lg border-none from-[#00B5F1] to-[#0284C7] p-2 hover:bg-gradient-to-r ${isSelected ? 'bg-gradient-to-r text-white' : 'bg-white'} transition-all duration-500 ease-in-out`}
                            >
                                <List.Item.Meta
                                    avatar={
                                        <Avatar
                                            size={48}
                                            shape="square"
                                            src={doctor.avatar}
                                        />
                                    }
                                    title={
                                        <span
                                            className={`text-base font-semibold text-secondarySupperDarker group-hover:text-white ${isSelected ? 'text-white' : ''} transition-all duration-500 ease-in-out`}
                                        >
                                            {doctor.fullName}
                                        </span>
                                    }
                                    description={
                                        <span
                                            className={`line-clamp-2 text-base text-secondarySupperDarker group-hover:text-white ${isSelected ? 'text-white' : ''} transition-all duration-500 ease-in-out`}
                                        >
                                            {doctor.isEndConversation
                                                ? 'Đã kết thúc'
                                                : 'Bác sĩ tư vấn trực tuyến'}
                                        </span>
                                    }
                                />
                            </List.Item>
                        )
                    }}
                />
            </div>
        </div>
    )
}
