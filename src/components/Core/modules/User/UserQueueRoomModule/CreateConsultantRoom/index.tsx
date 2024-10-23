'use client'
import EditorTinymce, {
    getEditorHtmlContent,
} from '@/components/Core/common/EditorTinymce'
import { Button, Form, FormProps, Input, message } from 'antd'
import { Save, SendHorizontal, SquarePen } from 'lucide-react'
import { useRef, useState } from 'react'
import Image from 'next/image'
import { useAddQueueRoomMutation } from '@/stores/services/chat/chats'
import { useAppSelector } from '@/hooks/redux-toolkit'

export default function CreateConsultantRoom({
    refetch,
}: {
    refetch: () => void
}) {
    const [myForm] = Form.useForm()
    const [addQueueRoomFunc, { isLoading }] = useAddQueueRoomMutation()
    const editorRef = useRef<any>(null)
    const [isEditVisible, setIsEditVisible] = useState<boolean>(false)
    const onFinish: FormProps<any>['onFinish'] = async (values: any) => {
        try {
            const editorContent = getEditorHtmlContent(editorRef)
            const payload = { title: values.title, message: editorContent }
            await addQueueRoomFunc(payload).unwrap()
            message.success('Gửi yêu cầu thành công!')
            refetch()
        } catch (error) {
            message.error('Gửi yêu cầu thất bại!')
        }
    }
    const {user} = useAppSelector((state) => state.auth)

    return (
        <div className="mt-4 flex w-full flex-col gap-5 rounded-xl bg-white p-5 shadow-third">
            <Form
                name="basic"
                layout="vertical"
                form={myForm}
                className="flex w-full flex-col gap-4"
                onFinish={onFinish}
            >
                <div className="flex w-full flex-col  sm:flex-row items-start sm:items-center justify-start sm:justify-between">
                    <div className="flex w-full flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-14">
                        <div className="flex items-center justify-center gap-4 text-[14px] font-medium text-[#003553]">
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
                            <div className="rounded-lg w-full sm:w-fit bg-[#E9ECEF] px-4 py-2 text-[14px] font-medium text-[#003553]">
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
                            <div className="rounded-lg w-full sm:w-fit bg-[#E9ECEF] px-4 py-2 text-[14px] font-medium text-[#003553]">
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
