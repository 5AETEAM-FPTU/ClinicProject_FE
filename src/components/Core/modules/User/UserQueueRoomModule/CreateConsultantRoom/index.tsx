'use client'
import EditorTinymce, {
    getEditorHtmlContent,
} from '@/components/Core/common/EditorTinymce'
import { Button, Form, FormProps, Input, message } from 'antd'
import { Save, SendHorizontal, SquarePen } from 'lucide-react'
import { useRef, useState } from 'react'
import Image from 'next/image'
import { useAddQueueRoomMutation } from '@/stores/services/chat/chats'

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
            console.log(error)
            message.error('Gửi yêu cầu thất bại!')
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
                <div className="flex w-full flex-row items-center justify-between">
                    <div className="flex flex-row items-center justify-around gap-14">
                        <div className="flex items-center justify-center gap-4 text-[14px] font-medium text-[#003553]">
                            <Image
                                src={
                                    'https://kynguyenlamdep.com/wp-content/uploads/2022/06/avatar-de-thuong-cho-cap-doi.jpg'
                                }
                                alt={''}
                                height={60}
                                width={60}
                                className="h-[60px] w-[60px] rounded-full"
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
                            <div className="rounded-lg bg-[#E9ECEF] px-4 py-2 text-[14px] font-medium text-[#003553]">
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
                            <div className="rounded-lg bg-[#E9ECEF] px-4 py-2 text-[14px] font-medium text-[#003553]">
                                <p>
                                    Địa chỉ: <span>Hòa hải, TP Đà Nẵng</span>
                                </p>{' '}
                            </div>
                        )}
                    </div>
                    <Form.Item className="!mb-0 !mr-8">
                        <Button
                            htmlType="submit"
                            type="primary"
                            className="rounded-lg bg-white p-4 text-[#003553] shadow-third"
                        >
                            Chỉnh sửa
                            <SquarePen size={18} />
                        </Button>
                    </Form.Item>
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
