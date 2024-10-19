'use client'
import { Avatar, Layout, List } from 'antd'
import { useRouter, useSearchParams } from 'next/navigation'
import { ChatRoom } from '..'

const { Sider, Content } = Layout

export default function ChatRooms({
    chatRooms,
    setChatRoomTransfer,
}: {
    chatRooms: ChatRoom[]
    setChatRoomTransfer: (chatRoomId: string, userId: string) => void
}) {
    const route = useRouter()
    const searchParams = useSearchParams();
    const chatRoomId = searchParams.get('chat');
    const userId = searchParams.get('user');

    const handleChangeRoute = (chatRoomId: string, userId: string) => {
        route.push('?chat=' + chatRoomId + '&user=' + userId)
    }

    return (
        <div className='min-w-[350px]'>
            <div
                className="h-full !w-[100%] rounded-[12px] bg-white p-4 shadow-third"
            >
                <List
                    itemLayout="horizontal"
                    dataSource={chatRooms}
                    renderItem={(user) => {
                        const isSelected =
                            user.chatRoomId === chatRoomId &&
                            user.userId === userId;

                        return (
                            <List.Item
                                onClick={() => {
                                    handleChangeRoute(user.chatRoomId, user.userId)
                                }}
                                className={`group mb-[10px] cursor-pointer rounded-lg border-none from-[#00B5F1] to-[#0284C7] p-2 hover:bg-gradient-to-r
                                    ${isSelected ? 'bg-gradient-to-r text-white' : 'bg-white'}
                                    transition-all duration-500 ease-in-out
                                `}
                            >
                                <List.Item.Meta
                                    avatar={
                                        <Avatar
                                            size={48}
                                            shape="square"
                                            src={user.avatar}
                                        />
                                    }
                                    title={
                                        <span
                                            className={`text-base font-semibold text-secondarySupperDarker group-hover:text-white
                                                ${isSelected ? 'text-white' : ''}
                                                transition-all duration-500 ease-in-out
                                            `}
                                        >
                                            {user.fullName}
                                        </span>
                                    }
                                    description={
                                        <span
                                            className={`text-base text-secondarySupperDarker group-hover:text-white line-clamp-2
                                                ${isSelected ? 'text-white' : ''}
                                                transition-all duration-500 ease-in-out
                                            `}
                                        >
                                            {user.isEndConversation
                                                ? 'Đã kết thuộc'
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
