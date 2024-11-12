'use client'

import {
    useGetChatRoomByUserQuery,
    useGetQueueRoomByUserQuery,
} from '@/stores/services/chat/chats'
import { Button, Skeleton } from 'antd'
import { UserQueueRoom } from '../../UserQueueRoomModule'
import { useRouter } from 'next-nprogress-bar'
import { ChatRoom } from '../../Consultation'
import dayjs from 'dayjs'
import { jwtDecode } from 'jwt-decode'
import { JwtPayloadUpdated } from '../../../Auth/SignIn'
import webStorageClient from '@/utils/webStorageClient'

export default function UserMedicalHistory() {
    const router = useRouter()
    const { queueRoomResult, isFetching: queueRoomIsFetching } =
        useGetQueueRoomByUserQuery(undefined, {
            selectFromResult: ({ data, isFetching, isSuccess }) => ({
                queueRoomResult: (data?.body.queueRoom as UserQueueRoom) ?? {},
                isSuccess: isSuccess,
                isFetching: isFetching,
            }),
        })
    const handleChangeRouteToQueueRoom = () => {
        router.push('consultation/pending-room')
    }
    const role = jwtDecode<JwtPayloadUpdated>(webStorageClient.getToken()!).role

    const handleChangeRouteToChatRoom = (
        chatRoomId: string,
        patientId: string,
        peerAvatar: string,
        fullname: string,
        initialMessage: string,
    ) => {
        router.push(
            `/${role}/consultation/conversation/?chat=${chatRoomId}&user=${patientId}&peerAvt=${peerAvatar}&peerName=${fullname}&title=${initialMessage}`,
        )
    }

    const { chatRoomResult, isChatRoomFetching } = useGetChatRoomByUserQuery(
        {
            lastConversationTime: dayjs(Date.now()).format(
                'YYYY-MM-DDTHH:mm:ss',
            ),
            pageSize: 10,
        },
        {
            selectFromResult: ({ data, isFetching }) => {
                return {
                    chatRoomResult: data?.body?.chatRooms as ChatRoom[],
                    isChatRoomFetching: isFetching,
                }
            },
        },
    )

    return (
        <>
            {queueRoomIsFetching && isChatRoomFetching ? (
                <Skeleton.Button className='w-full h-full'/>
            ) : (
                <div className="rounded-xl bg-white py-4 shadow-third">
                    <div className="px-5">
                        <p className="text[16px] pb-[5px] font-bold text-[#003553]">
                            Đang chờ tư vấn
                        </p>
                        {queueRoomResult.title ? (
                            <div className="flex items-center justify-between rounded-md bg-[#F7F7F7] py-[5px]">
                                <div className="pl-[10px] font-semibold">
                                    <p className="text-[14px]" dangerouslySetInnerHTML={{ __html: queueRoomResult.title }}>
                                       
                                    </p>
                                    <p className="text-[10px] font-normal" dangerouslySetInnerHTML={{ __html: queueRoomResult.description }}>
                                        
                                    </p>
                                </div>
                                <Button
                                    type="primary"
                                    className="mr-[10px] rounded-xl bg-[#0284C7] text-[14px] font-bold"
                                    onClick={() =>
                                        handleChangeRouteToQueueRoom()
                                    }
                                >
                                    Chi tiết
                                </Button>
                            </div>
                        ) : (
                            <div className="rounded-md bg-[#F7F7F7] px-2 py-2 pb-[5px] text-[14px] font-semibold text-secondarySupperDarker">
                                Tạm chưa có
                            </div>
                        )}
                    </div>

                    <div className="px-5">
                        <p className="text[16px] pb-[5px] pt-4 font-bold text-[#003553]">
                            Lịch sử tư vấn
                        </p>
                        <div className="flex flex-col gap-2">
                            {chatRoomResult?.length > 0 ? (
                                <>
                                    {chatRoomResult
                                        .slice(0, 2)
                                        .map((chatRoom: ChatRoom) => (
                                            <div key={chatRoom?.chatRoomId}>
                                                <div className="flex items-center justify-between rounded-md bg-[#F7F7F7] py-[5px]">
                                                    <div className="pl-[10px] font-semibold">
                                                        <p className="text-[14px]" dangerouslySetInnerHTML={{__html: chatRoom?.title}}>
                                                        </p>
                                                        <p className="text-[10px] font-normal">
                                                            Bác sĩ :{' '}
                                                            {chatRoom?.fullName}{' '}
                                                            đã tư vấn
                                                        </p>
                                                    </div>
                                                    <Button
                                                        type="primary"
                                                        className="mr-[10px] rounded-lg bg-[#0284C7] text-[14px] font-bold"
                                                        onClick={() =>
                                                            handleChangeRouteToChatRoom(
                                                                chatRoom.chatRoomId,
                                                                chatRoom.fullName,
                                                                chatRoom.avatar,
                                                                chatRoom.fullName,
                                                                chatRoom.title,
                                                            )
                                                        }
                                                    >
                                                        Chi tiết
                                                    </Button>
                                                </div>
                                            </div>
                                        ))}
                                </>
                            ) : (
                                <div className="rounded-md bg-[#F7F7F7] px-2 py-2 pb-[5px] text-[14px] font-semibold text-secondarySupperDarker">
                                    Tạm chưa có
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
