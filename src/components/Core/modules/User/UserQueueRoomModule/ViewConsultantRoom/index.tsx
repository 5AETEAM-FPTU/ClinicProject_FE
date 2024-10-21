import EditorTinymce from '@/components/Core/common/EditorTinymce'
import { Button, Form, FormProps, Input, message } from 'antd'
import { CircleX, Save, SendHorizontal, SquarePen } from 'lucide-react'
import { useRef, useState } from 'react'
import Image from 'next/image'
import { handleClientScriptLoad } from 'next/script'
import { UserInformationQueueRoom, UserQueueRoom } from '..'
import { useRemoveQueueByIdMutation } from '@/stores/services/chat/chats'
import { useAppSelector } from '@/hooks/redux-toolkit'

interface IProps {
    data: UserQueueRoom
    user: UserInformationQueueRoom
    refetch: () => void
}

export default function ViewConsultantRoom(payload: IProps) {
    const [myForm] = Form.useForm()
    const onFinish: FormProps<any>['onFinish'] = async (values: any) => {
        console.log(values)
    }
    const editorRef = useRef<any>(null)
    const [isEditVisible, setIsEditVisible] = useState<boolean>(false)
    const  [removeQueueRoom, {isLoading}] = useRemoveQueueByIdMutation();
    const handleRemoveQueueRoom = async () => {
        try {
            await removeQueueRoom(payload?.data?.queueRoomId).unwrap();
            message.success('Cập nhật thành công!')
            payload.refetch()
            
        } catch (error) {
            console.log(error)
            payload.refetch()
            message.error('Cập nhật thất bại!')
        }
    }
    const {user} = useAppSelector((state) => state.auth)

    return (
        <div className="mt-4 flex w-full flex-col gap-5 rounded-xl bg-white p-5 shadow-third">
            <div className="flex w-full flex-col items-center justify-between xl:flex-row">
                <div className="flex flex-col items-center justify-around gap-14 xl:flex-row">
                    <div className="flex flex-col items-center justify-center gap-4 text-[14px] font-medium text-[#003553] xl:flex-row">
                        <Image
                            src={
                                user.avatarUrl!
                            }
                            alt={''}
                            height={200}
                            width={200}
                            className="h-[60px] w-[60px] rounded-full object-cover"
                        />
                        <div className="text-[14px]">
                            <p className="font-bold">
                                {payload?.user?.fullName}{' '}
                            </p>
                            <p>
                                Giới tính:{' '}
                                <span>{payload?.user?.gender?.genderName}</span>
                            </p>
                        </div>
                    </div>

                    <div className="rounded-lg bg-[#E9ECEF] px-4 py-2 text-[14px] font-medium text-[#003553]">
                        <p>
                            Số điện thoại:{' '}
                            <span>{payload?.user?.phoneNumber}</span>
                        </p>{' '}
                    </div>

                    <div className="rounded-lg bg-[#E9ECEF] px-4 py-2 text-[14px] font-medium text-[#003553]">
                        <p>
                            Địa chỉ: <span>{payload?.user?.address}</span>
                        </p>{' '}
                    </div>
                </div>
                <div className="!mb-0 !mr-8 mt-3 flex items-center justify-between xl:mt-0">
                    <Button
                        loading={isLoading}
                        type="primary"
                        className="rounded-xl bg-[#DA0000] p-4 text-white shadow-third"
                        onClick={handleRemoveQueueRoom}
                    >
                        Hủy bỏ tin nhắn này
                        <CircleX size={18} />
                    </Button>
                </div>
            </div>
            <div className="h-[1px] w-full bg-[#6b7075]"></div>
            <div className="w-full flex-col gap-5">
                <h3 className="pb-4 text-[16px] font-semibold text-black">
                    Chủ đề yêu cầu: {payload.data.title}{' '}
                </h3>
                <p
                    dangerouslySetInnerHTML={{
                        __html: payload.data.description,
                    }}
                ></p>
            </div>
        </div>
    )
}


