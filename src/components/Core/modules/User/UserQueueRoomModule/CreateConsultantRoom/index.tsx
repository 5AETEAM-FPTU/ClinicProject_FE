'use client'
import EditorTinymce, {
    getEditorHtmlContent,
} from '@/components/Core/common/EditorTinymce'
import { useAppSelector } from '@/hooks/redux-toolkit'
import { constants } from '@/settings'
import { useAddQueueRoomMutation } from '@/stores/services/chat/chats'
import { useLazyGetAllDoctorIdsQuery } from '@/stores/services/notification'
import webStorageClient from '@/utils/webStorageClient'
import { api } from '@convex/_generated/api'
import { Button, Form, FormProps, Input, message } from 'antd'
import { useMutation } from 'convex/react'
import { jwtDecode } from 'jwt-decode'
import { SendHorizontal } from 'lucide-react'
import Image from 'next/image'
import { useRef, useState } from 'react'
import { JwtPayloadUpdated } from '../../../Auth/SignIn'

export default function CreateConsultantRoom({
    refetch,
}: {
    refetch: () => void
}) {
    const [myForm] = Form.useForm()
    const [addQueueRoomFunc, { isLoading }] = useAddQueueRoomMutation()
    const editorRef = useRef<any>(null)
    const [isEditVisible, setIsEditVisible] = useState<boolean>(false)

    const { user } = useAppSelector((state) => state.auth)

    const userId = jwtDecode<JwtPayloadUpdated>(
        webStorageClient.getToken()!,
    ).sub
    const sendToUserNotification = useMutation(
        api._user_notifications.functions.sendUserNotification,
    )
    const [lazyGetAllDoctorIds] = useLazyGetAllDoctorIdsQuery()
    const onFinish: FormProps<any>['onFinish'] = async (values: any) => {
        try {
            const editorContent = getEditorHtmlContent(editorRef)
            const payload = { title: values.title, message: editorContent }
            await addQueueRoomFunc(payload).unwrap()
            //notification here
            const doctorIds = await (await lazyGetAllDoctorIds()).data?.body?.doctors
            console.log(doctorIds)
            for (const doctorId of doctorIds) {
                await handleCreateNotificationToAllDoctorStaff(doctorId?.id);
            }
            message.success('Gửi yêu cầu thành công!')
            refetch()
        } catch (error) {
            message.error('Gửi yêu cầu thất bại!')
        }
    }
    const handleCreateNotificationToAllDoctorStaff = async (
        doctorId: string,
    ) => {
        try {
        
            const domain =
                process.env.NEXT_PUBLIC_FE_DOMAIN ?? 'http://localhost:3000'
            await sendToUserNotification({
                receiverId: doctorId,
                message: 'Yêu cầu tư vấn mới',
                type: constants.NOTIFICATION_TYPES.SUCCESS,
                description: `Có yêu cầu tư vấn mới từ người dùng ${user?.fullName}, hãy vào phòng chờ và chấp nhận yêu cầu tư vấn này!`,
                senderAvatarUrl: `${user.avatarUrl}`,
                senderId: `${userId}`,
                senderName: 'Người dùng',
                topic: 'Tư vấn',
                href: `/`,
            })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="mt-4 flex w-full flex-col gap-5 rounded-xl bg-white p-5 shadow-third">
            <Form
                name="basic"
                layout="vertical"
                form={myForm}
                className="flex w-full flex-col gap-4"
                onFinish={onFinish}
            >
                <div className="flex w-full flex-col items-start justify-start sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex w-full flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-14">
                        <div className="flex items-center justify-center gap-4 text-[14px] font-medium text-[#003553]">
                            <Image
                                src={user.avatarUrl!}
                                alt={''}
                                height={200}
                                width={200}
                                className="h-[60px] w-[60px] rounded-full object-cover"
                            />
                            <div className="text-[14px]">
                                <p className="font-bold">Nguyễn Văn Đạt </p>
                                <p>
                                    Giới tính: <span>Nam</span>
                                </p>
                            </div>
                        </div>

                        {isEditVisible ? (
                            <Form.Item
                                className="width-full"
                                label="Chủ đề yêu cầu"
                                name={'title'}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Không được để trống',
                                    },
                                ]}
                            >
                                <Input
                                    className="border-[1.2px] border-neutral-400"
                                    placeholder="Nhập số điện thoại của bạn"
                                />
                            </Form.Item>
                        ) : (
                            <div className="w-full rounded-lg bg-[#E9ECEF] px-4 py-2 text-[14px] font-medium text-[#003553] sm:w-fit">
                                <p>
                                    Số điện thoại: <span>09483712312</span>
                                </p>{' '}
                            </div>
                        )}

                        {isEditVisible ? (
                            <Form.Item
                                className="width-full"
                                label="Chủ đề yêu cầu"
                                name={'title'}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Không được để trống',
                                    },
                                ]}
                            >
                                <Input
                                    className="border-[1.2px] border-neutral-400"
                                    placeholder="Nhập chủ đề yêu cầu"
                                />
                            </Form.Item>
                        ) : (
                            <div className="w-full rounded-lg bg-[#E9ECEF] px-4 py-2 text-[14px] font-medium text-[#003553] sm:w-fit">
                                <p>
                                    Địa chỉ: <span>Hòa hải, TP Đà Nẵng</span>
                                </p>{' '}
                            </div>
                        )}
                    </div>
                </div>
                <div className="w-full flex-col gap-5">
                    <div className="flex h-fit w-full flex-row gap-5">
                        <Form.Item
                            className="w-full"
                            label="Chủ đề yêu cầu"
                            name={'title'}
                            rules={[
                                {
                                    required: true,
                                    message: 'Không được để trống',
                                },
                            ]}
                        >
                            <Input
                                className="border-[1.2px] border-neutral-400"
                                placeholder="Nhập chủ đề bạn muốn được bác sĩ tư vấn"
                            />
                        </Form.Item>
                    </div>

                    <div>
                        <Form.Item
                            label="Mô tả"
                            name={'message'}
                            className="!mb-0"
                            rules={[
                                {
                                    required: false,
                                    message: 'Không được để trống',
                                },
                            ]}
                        >
                            <EditorTinymce editorRef={editorRef} />
                        </Form.Item>
                    </div>
                </div>

                <div className="flex flex-row justify-end gap-5">
                    <Button
                        htmlType="submit"
                        type="primary"
                        className="rounded-xl bg-secondaryDark !p-[14px] font-semibold shadow-third"
                    >
                        Gửi yêu cầu <SendHorizontal size={18} />
                    </Button>
                </div>
            </Form>
        </div>
    )
}
