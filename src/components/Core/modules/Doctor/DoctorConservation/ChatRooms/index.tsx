'use client'
import { Avatar, Layout, List } from 'antd'
import { useRouter, useSearchParams } from 'next/navigation'
import { ChatRoom } from '..'
import { useEffect, useState } from 'react'
import { useAppDispatch } from '@/hooks/redux-toolkit'
import webStorageClient from '@/utils/webStorageClient'
import { jwtDecode, JwtPayload } from 'jwt-decode'
import createChatService from '@/stores/services/chat/signalService'
import { set } from 'lodash'

const { Sider, Content } = Layout
const { startConnection, sendMessage, sendTypingMessage, sendRemovedMessage } =
    createChatService();

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
    const dispatch = useAppDispatch();
    const _userId = jwtDecode<JwtPayload>(webStorageClient.getToken()!).sub!
    const _accessToken = webStorageClient.getToken()!.toString()
    const [chatRoomList, setChatRoomList] = useState<ChatRoom[]>(chatRooms);

    const handleChangeRoute = (chatRoomId: string, userId: string, peerAvt:string, fullName:string, title: string) => {
       
        route.push('?chat=' + chatRoomId + '&user=' + userId + '&peerAvt=' + peerAvt+ '&peerName=' + fullName + '&title=' + title)
    }
    const handleFirstChat = (chatRoomId: string, userId: string, peerAvt: string) => {
        handleChangeRoute(chatRoomId, userId, peerAvt, '', '')
    }
    // useEffect(() => {
    //     if(chatRooms?.length > 0) {
    //         handleFirstChat(chatRooms[0]?.chatRoomId, chatRooms[0]?.userId, chatRooms[0]?.avatar)
    //     }
    // }, [chatRooms])

    useEffect(() => {
        startConnection(
            _accessToken,
            null!,
            null!,
            null!,
            (chatRoomId, latestMessage) => {
                console.log(`New message in chat room ${chatRoomId}: ${latestMessage}`);
                setChatRoomList(prevRooms => {
                    const updatedRooms = [...prevRooms];
                    const roomIndex = updatedRooms.findIndex(room => room.chatRoomId === chatRoomId);

                    if (roomIndex !== -1) {
                        const [room] = updatedRooms.splice(roomIndex, 1);
                        updatedRooms.unshift(room);
                    }

                    return updatedRooms;
                });
            }
        );
    }, [_accessToken])
    
    useEffect(() => {
        setChatRoomList(chatRooms)
    },[chatRooms])

    return (
        <div className='min-w-[350px]'>
            <div
                className="h-full !w-[100%] rounded-[12px] bg-white p-4 shadow-third"
            >
                <List
                    className='max-h-[570px] overflow-y-auto'
                    itemLayout="horizontal"
                    dataSource={chatRoomList}
                    renderItem={(user) => {
                        const isSelected =
                            user.chatRoomId === chatRoomId &&
                            user.userId === userId;

                        return (
                           <>
                             <List.Item
                                onClick={() => {
                                    handleChangeRoute(user.chatRoomId, user.userId, user.avatar, user.fullName, user.title)
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
                                            {user.title ? user.title.split(':')[0] : 'Không có tiêu đề'}
                                        </span>
                                    }
                                />
                            </List.Item>
                           
                           </>
                        )
                    }}
                />
            </div>
        </div>
    )
}
