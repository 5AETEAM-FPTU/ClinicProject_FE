'use client'
import { useAppDispatch, useAppSelector } from '@/hooks/redux-toolkit'
import { updateStorage } from '@/stores/features/auth'
import {
    useGetAbdominalUltrasoundReportQuery,
    useUpdateAdominalUltrasoundReportMutation,
} from '@/stores/services/report/formService'
import { useUpdateServiceOrderStatusItemMutation } from '@/stores/services/report/serviceOrder'
import {
    Button,
    Col,
    Form,
    Image,
    Input,
    message,
    Modal,
    Row,
    Upload,
} from 'antd'
import axios from 'axios'
import { Paperclip } from 'lucide-react'
import React, { useEffect, useState } from 'react'
type TProps = {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    serviceOrderedId: string
    refetch: () => void
}
export type UpdateAdominalReportType = {
    serviceOrderedId: string
    liver: string | null
    gallbladderBiliaryTract: string | null
    bladder: string | null
    milt: string | null
    pancreas: string | null
    mucus: string | null
    kidney: string | null
    other: string
    finalConclusion: string | null
    image: string | null
}

export default function UpdateAdominalUtrasound({
    open,
    setOpen,
    serviceOrderedId,
    refetch,
}: TProps) {
    const [myForm] = Form.useForm()
    const [isUploading, setIsUploading] = useState(false)
    // const [fileStorage, setFileStorage] = useState<File | null>(null)
    const { storage } = useAppSelector((state) => state.auth)
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(updateStorage(null))
    }, [open])
    const { report, refetch: reportRefetch } =
        useGetAbdominalUltrasoundReportQuery(serviceOrderedId, {
            selectFromResult: ({ data }) => ({
                report: (data?.body?.result as any) || {},
            }),
        })
    useEffect(() => {
        if (open) {
            reportRefetch()
        }
    }, [open])
    const handleOnChangeSelectFile = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const files: FileList | null = event.target.files
        if (files && files.length > 0) {
            // setFileStorage(files[0])
            dispatch(updateStorage(files[0]))
        }
    }
    const handleUploadAndGetImageUrl = async (file: File) => {
        const CLOUD_NAME = 'dy1uuo6ql'
        const UPLOAD_PRESET = 'pclinic'
        try {
            if (!file) return
            const formData = new FormData()
            formData.append('file', file)
            formData.append('upload_preset', UPLOAD_PRESET)
            const responseData = await axios.post(
                `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
                formData,
            )
            if (responseData) {
                setIsUploading(false)
            }
            return responseData.data.secure_url
        } catch (error) {
            return null
        }
    }
    const [updateAdominalUltrasoundReport] =
        useUpdateAdominalUltrasoundReportMutation()
    const [updateServiceOrderStatusItem] =
        useUpdateServiceOrderStatusItemMutation()
    const [loading, setLoading] = useState(false); 
    console.log(storage.selectedId);
    const onFinish = async (values: any) => {
        try {
            setLoading(true)
            const imageUrl = await handleUploadAndGetImageUrl(
                storage.fileStorage!,
            )
            const updateLoadData: UpdateAdominalReportType = {
                serviceOrderedId: serviceOrderedId,
                liver: values.liver,
                gallbladderBiliaryTract: values.gallbladderBiliaryTract,
                bladder: values.bladder,
                milt: values.milt,
                pancreas: values.pancreas,
                mucus: values.mucus,
                kidney: values.kidney,
                other: values.other,
                finalConclusion: values?.finalConclusion,
                image: imageUrl ?? report?.image,
            }
            const response = await updateAdominalUltrasoundReport({
                payload: updateLoadData,
            }).unwrap()
            await updateServiceOrderStatusItem({
                serviceOrderId: serviceOrderedId,
                serviceId: storage.selectedId,
            })
            refetch()
            message.success('Cập nhật thành công!')
            setOpen(false)
            setLoading(false)
        } catch (error) {
            message.error('Cập nhật thất bại!')
        }
    }
    useEffect(() => {
        myForm.setFieldsValue({
            liver: report?.liver,
            gallbladderBiliaryTract: report?.gallbladderBiliaryTract,
            bladder: report?.bladder,
            milt: report?.milt,
            pancreas: report?.pancreas,
            mucus: report?.mucus,
            kidney: report?.kidney,
            other: report?.other,
            finalConclusion: report?.finalConclusion,
        })
    }, [report])

    return (
        <Modal
            title={[
                <p className="text-[26px] font-bold text-secondarySupperDarker">
                    Siêu âm bụng
                </p>,
            ]}
            style={{ top: 20 }}
            centered
            footer={null}
            open={open}
            onOk={() => setOpen(false)}
            onCancel={() => setOpen(false)}
            destroyOnClose
            className="w-fit rounded-xl !bg-white !shadow-third"
        >
            <Form
                name="updateadominalUtrasound"
                layout="vertical"
                onFinish={onFinish}
                form={myForm}
                className="w-[700px]"
            >
                <Row gutter={24}>
                    <Col span={12}>
                        <Form.Item
                            label="Gan"
                            name={'liver'}
                            rules={[
                                {
                                    required: true,
                                    message: 'Không được để trống',
                                },
                            ]}
                        >
                            <Input.TextArea placeholder="Nhập kết quả"></Input.TextArea>
                        </Form.Item>
                        <Form.Item
                            label="Túi mật - Đường mật"
                            name={'gallbladderBiliaryTract'}
                            rules={[
                                {
                                    required: true,
                                    message: 'Không được để trống',
                                },
                            ]}
                        >
                            <Input.TextArea placeholder="Nhập kết quả"></Input.TextArea>
                        </Form.Item>
                        <Form.Item
                            label="Lách"
                            name={'milt'}
                            rules={[
                                {
                                    required: true,
                                    message: 'Không được để trống',
                                },
                            ]}
                        >
                            <Input.TextArea placeholder="Nhập kết quả"></Input.TextArea>
                        </Form.Item>
                        <Form.Item
                            label="Tụy"
                            name={'pancreas'}
                            rules={[
                                {
                                    required: true,
                                    message: 'Không được để trống',
                                },
                            ]}
                        >
                            <Input.TextArea placeholder="Nhập kết quả"></Input.TextArea>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Thận"
                            name={'kidney'}
                            rules={[
                                {
                                    required: true,
                                    message: 'Không được để trống',
                                },
                            ]}
                        >
                            <Input.TextArea placeholder="Nhập kết quả"></Input.TextArea>
                        </Form.Item>
                        <Form.Item
                            label="Dịch tự do"
                            name={'mucus'}
                            rules={[
                                {
                                    required: true,
                                    message: 'Không được để trống',
                                },
                            ]}
                        >
                            <Input.TextArea placeholder="Nhập kết quả"></Input.TextArea>
                        </Form.Item>
                        <Form.Item
                            label="Bàn quang"
                            name={'bladder'}
                            rules={[
                                {
                                    required: true,
                                    message: 'Không được để trống',
                                },
                            ]}
                        >
                            <Input.TextArea placeholder="Nhập kết quả"></Input.TextArea>
                        </Form.Item>
                        <Form.Item
                            label="Các cơ quan khác"
                            name={'other'}
                            rules={[
                                {
                                    required: true,
                                    message: 'Không được để trống',
                                },
                            ]}
                        >
                            <Input.TextArea placeholder="Nhập kết quả"></Input.TextArea>
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item
                    label="Kết luận"
                    name={'finalConclusion'}
                    rules={[
                        {
                            required: true,
                            message: 'Không được để trống',
                        },
                    ]}
                >
                    <Input.TextArea placeholder="Nhập kết quả"></Input.TextArea>
                </Form.Item>
                <Form.Item>
                    <div className="">
                        <p>Hình ảnh</p>
                        <div className="flex flex-row gap-5">
                            <div>
                                <Image
                                    width={360}
                                    height={200}
                                    src={
                                        storage.fileStorage
                                            ? URL.createObjectURL(
                                                  storage.fileStorage,
                                              )
                                            : report?.image
                                              ? report?.image
                                              : 'https://www.contentviewspro.com/wp-content/uploads/2017/07/default_image.png'
                                    }
                                    className="rounded-lg object-cover"
                                />
                            </div>
                            <Input
                                type="file"
                                className="hidden"
                                id="image-report"
                                accept="image/*, audio/*, video/*, .txt,"
                                onChange={(event) =>
                                    handleOnChangeSelectFile(event)
                                }
                            />
                            <label htmlFor="image-report">
                                <div className="w-fit rounded-lg bg-secondaryDark px-4 py-[6px] font-semibold text-white">
                                    Tải lên hình ảnh
                                </div>
                            </label>
                        </div>
                    </div>
                </Form.Item>
                <div className="flex justify-end">
                    <Button
                        type="default"
                        className="mr-4"
                        onClick={() => setOpen(false)}
                    >
                        Hủy
                    </Button>
                    <Button
                        loading={loading}
                        type="primary"
                        htmlType="submit"
                        className="bg-secondaryDark"
                    >
                        Cập nhật
                    </Button>
                </div>
            </Form>
        </Modal>
    )
}
