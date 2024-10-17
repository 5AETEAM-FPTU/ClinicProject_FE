import { Layout, List, Avatar, Input, Button, Space, Typography } from 'antd'
import { ChatRoom, UserInformationChatRoom } from '..'

const { Title, Text, Paragraph } = Typography

const { Sider, Content } = Layout
export default function ChatRooms({
    chatRooms,
    setChatRoomTransfer,
}: {
    chatRooms: ChatRoom[]
    setChatRoomTransfer: (chatRoomId: string, doctorId: string) => void
}) {
    return (
        <div>
            <Sider
                width={320}
                className="h-full rounded-[12px] bg-white p-4 shadow-third"
            >
                <List
                    itemLayout="horizontal"
                    dataSource={chatRooms}
                    renderItem={(doctor) => (
                        <List.Item
                            onClick={() => setChatRoomTransfer(doctor.chatRoomId, doctor.doctorId)}
                            className="group mb-[10px] cursor-pointer rounded-lg border-none from-[#00B5F1] to-[#0284C7] p-2 hover:bg-gradient-to-r"
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
                                    <span className="text-base font-semibold text-secondarySupperDarker group-hover:text-white">
                                        {doctor.fullName}
                                    </span>
                                }
                                description={
                                    <span className="text-base text-secondarySupperDarker group-hover:text-white">
                                        {doctor.isEndConversation
                                            ? 'Đã kết thuộc'
                                            : 'Bác sĩ tư vấn trực tuyến'}
                                    </span>
                                }
                            />
                        </List.Item>
                    )}
                />
            </Sider>
        </div>
    )
}
