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
    const handleChangeRoute = (chatRoomId: string, userId: string) => {
        route.push('?chat=' + chatRoomId + '&user=' + userId)
    }
    const searchParams = useSearchParams();
    const chatRoomId = searchParams.get('chat');
    const userId = searchParams.get('user');
    return (
        <div className='min-w-[350px]'>
            <div
                className="h-full !w-[100%] rounded-[12px] bg-white p-4 shadow-third"
            >
                <List
                    itemLayout="horizontal"
                    dataSource={chatRooms}
                    renderItem={(user) => (
                        <List.Item
                            onClick={() => {
                                handleChangeRoute(user.chatRoomId, user.userId)
                            }}
                            className="group mb-[10px] cursor-pointer rounded-lg border-none from-[#00B5F1] to-[#0284C7] p-2 hover:bg-gradient-to-r"
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
                                    <span className="text-base font-semibold text-secondarySupperDarker group-hover:text-white">
                                        {user.fullName}
                                    </span>
                                }
                                description={
                                    <span className="text-base text-secondarySupperDarker group-hover:text-white line-clamp-2">
                                        {user.isEndConversation
                                            ? 'Đã kết thuộc'
                                            : 'Bác sĩ tư vấn trực tuyến'}
                                    </span>
                                }
                            />
                        </List.Item>
                    )}
                />
            </div>
        </div>
    )
}
