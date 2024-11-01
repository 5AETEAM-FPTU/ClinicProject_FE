'use client'
import { Avatar, Badge, Layout, List, Skeleton, Typography } from 'antd'
import { useRouter, useSearchParams } from 'next/navigation'
import { ChatRoom } from '..'
import { useEffect, useRef, useState } from 'react'
import webStorageClient from '@/utils/webStorageClient'
import createChatService from '@/stores/services/chat/signalService'
import { ClockCircleOutlined } from '@ant-design/icons';

const { startConnection } =
    createChatService();
const { Sider } = Layout
export default function ChatRooms({
    chatRooms,
    setLastChatRoomTime,
    refetch,
    isChatRoomFetching,
    setIsLoadingChatRoom,
    setIsEndChatRoom
}: {
    chatRooms: ChatRoom[]
    setLastChatRoomTime: (date: string) => void
    refetch: () => void,
    isChatRoomFetching: boolean
    setIsLoadingChatRoom: any
    setIsEndChatRoom: any
}) {
    const route = useRouter()
    const searchParams = useSearchParams()
    const chatRoomId = searchParams.get('chat')
    const userId = searchParams.get('user')
    const _accessToken = webStorageClient.getToken()!.toString()
    const [chatRoomList, setChatRoomList] = useState<ChatRoom[]>(chatRooms);
    const observerRef = useRef<IntersectionObserver | null>(null)
    const loadMoreRef = useRef<HTMLDivElement>(null)

    const handleLoadMore = async () => {
        try {
            setIsLoadingChatRoom((prev: boolean) => !prev);

            if (chatRooms.length === 0) {
                setIsLoadingChatRoom(false);
                return;
            }

            setChatRoomList((prev) => Array.isArray(prev) ? [...prev, ...chatRooms] : [...chatRooms]);
            if (chatRooms.length > 0) {
                setLastChatRoomTime(chatRooms[chatRooms.length - 1].latestMessageTime)
            }
        } catch (error) {
            console.error('Error loading more chat rooms:', error)
        }
    }

    useEffect(() => {
        observerRef.current = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !isChatRoomFetching) {
                    handleLoadMore()
                }
            },
            { threshold: 1.0 }
        )

        if (loadMoreRef.current) {
            observerRef.current.observe(loadMoreRef.current)
        }

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect()
            }
        }
    }, [isChatRoomFetching])



    useEffect(() => {
        if (chatRoomId && chatRooms?.length > 0) {
            const selectedChatRoom = chatRooms?.find((user) => user.chatRoomId === chatRoomId);
            console.log('selectedChatRoom', selectedChatRoom);
            if (selectedChatRoom) {
                setIsEndChatRoom(selectedChatRoom.isEndConversation);
            } else {
                setIsEndChatRoom(false);
            }
        }
    }, [chatRoomId, chatRooms]);


    const handleSelectChatRoom = (user: ChatRoom) => {
        handleChangeRoute(user.chatRoomId, user.doctorId, user.avatar, user.fullName, user.title)
        setIsEndChatRoom(user.isEndConversation)
    }

    // useEffect(() => {
    //     setChatRoomList(chatRooms)
    // },[chatRooms])

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

    const handleChangeRoute = (chatRoomId: string, userId: string, peerAvt: string, fullname: string, title: string) => {
        route.push('?chat=' + chatRoomId + '&user=' + userId + '&peerAvt=' + peerAvt + '&peerName=' + fullname + '&title=' + title)
    }
    // const handleFirstChat = (chatRoomId: string, userId: string, peerAvt: string,  fullname: string, title: string) => {
    //     handleChangeRoute(chatRoomId, userId, peerAvt, fullname, title)
    // }
    // useEffect(() => {
    //     if(chatRooms?.length > 0) {
    //         handleFirstChat(chatRooms[0]?.chatRoomId, chatRooms[0]?.doctorId, chatRooms[0]?.avatar, chatRooms[0]?.fullName, chatRooms[0]?.title)
    //     }
    // }, [chatRooms])
    return (
        <div className="min-w-full sm:min-w-[350px]">
            <div className="h-full !w-[100%] rounded-[12px] bg-white p-4 shadow-third">
                <List
                    className=' max-h-[300px] sm:max-h-[570px] overflow-y-auto'
                    itemLayout="horizontal"
                    dataSource={chatRoomList}
                    footer={
                        chatRooms && <>
                            <div ref={loadMoreRef} className="" />
                            {isChatRoomFetching && (<>
                                <Skeleton active className='my-4 w-full' />
                                <Skeleton active className='my-4 w-full' />
                            </>
                            )}
                        </>

                    }
                    renderItem={(doctor) => {
                        const isSelected =
                            doctor.chatRoomId === chatRoomId &&
                            doctor.doctorId === userId

                        return (
                            <List.Item
                                onClick={() => {
                                    handleSelectChatRoom(doctor)
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
                                            {doctor.fullName ? doctor.fullName : 'Không tên'}
                                        </span>
                                    }
                                    description={
                                        <div className='flex items-center justify-between'>
                                            <span
                                                className={`line-clamp-2 text-base text-secondarySupperDarker group-hover:text-white ${isSelected ? 'text-white' : ''} transition-all duration-500 ease-in-out`}
                                            >
                                                {doctor.title ? doctor.title.split(':')[0] : 'Không có tiêu đề'}
                                            </span>
                                            <Badge count={doctor.isEndConversation ? <ClockCircleOutlined className='text-secondaryDarkerOpacity' /> : null} />

                                        </div>

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
