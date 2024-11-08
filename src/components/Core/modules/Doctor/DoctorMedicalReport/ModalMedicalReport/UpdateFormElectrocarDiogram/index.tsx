'use client'
import { useAppDispatch, useAppSelector } from '@/hooks/redux-toolkit'
import { updateStorage } from '@/stores/features/auth'
import {
    useGetAbdominalUltrasoundReportQuery,
    useGetElectrocarDiographyReportQueryQuery,
    useUpdateAdominalUltrasoundReportMutation,
    useUpdateElectrocarDiographyReportMutationMutation,
} from '@/stores/services/report/formService'
import { useUpdateServiceOrderStatusItemMutation } from '@/stores/services/report/serviceOrder'
import { Button, Col, Form, Image, Input, message, Modal, Row, Upload } from 'antd'
import axios from 'axios'
import { Paperclip } from 'lucide-react'
import React, { useEffect, useState } from 'react'
type TProps = {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    serviceOrderedId: string
    refetch: () => void
}
export type UpdateElectrocarDiogramReportType = {
    serviceOrderedId: string
    sampleTransfer: string | null
    heartRate: string | null
    frequency: string | null
    heartPosition: string | null
    axis: string | null
    corner: string | null
    waveP: string | null
    intervalPR: string | null
    qrs: string | null
    ST: string | null
    waveT: string | null
    intervalQT: string | null
    precordialLeads: string | null
    finalConclusion: string | null
    image: string | null
}

export default function UpdateElectrocarDiogram({
    open,
    setOpen,
    serviceOrderedId,
    refetch,
}: TProps) {
    const [myForm] = Form.useForm()
    const [isUploading, setIsUploading] = useState(false)
    const [fileElectrocarDiogram, setFileElectrocarDiogram] =
        useState<File | null>(null)
    const { storage } = useAppSelector((state) => state.auth)
    console.log(storage.selectedId);
    const dispacth = useAppDispatch()
    useEffect(() => {
        dispacth(updateStorage(null))
    }, [open])

    const { report, refetch: reportRefetch } =
        useGetElectrocarDiographyReportQueryQuery(serviceOrderedId, {
            selectFromResult: ({ data }) => ({
                report: (data?.body?.result as any) || {},
            }),
        })
    useEffect(() => {
        if (open) {
            reportRefetch()
        }
    }, [open])
    const handleOnChangeSelectFileElectrocarDiogram = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const files: FileList | null = event.target.files
        if (files && files.length > 0) {
            // setFileElectrocarDiogram(files[0])
            dispacth(updateStorage(files[0]))
        }
    }
    const handleUploadAndGetImageUrlElectrocarDiogram = async (file: File) => {
        const CLOUD_NAME = 'dy1uuo6ql'
        const UPLOAD_PRESET = 'pclinic'
        try {
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
    const [updateElectrocarDiogramReport] =
        useUpdateElectrocarDiographyReportMutationMutation()
    const [updateServiceOrderStatusItem] =
        useUpdateServiceOrderStatusItemMutation()
    const [loading, setLoading] = useState(false)
    const onFinish = async (values: any) => {
        try {
            setLoading(true)
            const imageUrl = await handleUploadAndGetImageUrlElectrocarDiogram(
                storage.fileStorage!,
            )
            const updateLoadData: UpdateElectrocarDiogramReportType = {
                serviceOrderedId: serviceOrderedId,
                sampleTransfer: values.sampleTransfer,
                heartRate: values.heartRate,
                frequency: values.frequency,
                heartPosition: values.heartPosition,
                axis: values.axis,
                corner: values.corner,
                waveP: values.waveP,
                intervalPR: values.intervalPR,
                qrs: values.qrs,
                ST: values.ST,
                waveT: values.waveT,
                intervalQT: values.intervalQT,
                precordialLeads: values.precordialLeads,
                finalConclusion: values.finalConclusion,
                image: imageUrl ?? report?.image,
            }
            const response = await updateElectrocarDiogramReport({
                payload: updateLoadData,
            }).unwrap()
            await updateServiceOrderStatusItem({
                serviceOrderId: serviceOrderedId,
                serviceId: storage.selectedId,
            }).unwrap()
            refetch()
            message.success('Cập nhật thành công!')
            setOpen(false);
            setLoading(false);
        } catch (error) {
            message.error('Cập nhật thất bại!')
        }
    }
    useEffect(() => {
        myForm.setFieldsValue({
            sampleTransfer: report?.sampleTransfer,
            heartRate: report?.heartRate,
            frequency: report?.frequency,
            heartPosition: report?.heartPosition,
            axis: report?.axis,
            corner: report?.corner,
            waveP: report?.waveP,
            intervalPR: report?.intervalPR,
            qrs: report?.qrs,
            ST: report?.ST,
            waveT: report?.waveT,
            intervalQT: report?.intervalQT,
            precordialLeads: report?.precordialLeads,
            finalConclusion: report?.finalConclusion,
        })
    }, [report])

    return (
        <Modal
            title={[
                <p className="text-[26px] font-bold text-secondarySupperDarker">
                    Điện tâm đồ
                </p>,
            ]}
            style={{ top: 20 }}
            centered
            footer={null}
            open={open}
            onClose={() => setOpen(false)}
            onOk={() => setOpen(false)}
            onCancel={() => setOpen(false)}
            className="w-fit rounded-xl !bg-white !shadow-third"
            destroyOnClose
        >
            <Form
                name="updateElectrocarDiogram"
                layout="vertical"
                onFinish={onFinish}
                form={myForm}
                className="w-[800px]"
            >
                <Row gutter={24}>
                    <Col span={8}>
                        <Form.Item
                            label="Chuyển đạo mẫu"
                            name={'sampleTransfer'}
                        >
                            <Input placeholder="Nhập kết quả"></Input>
                        </Form.Item>
                        <Form.Item label="Nhịp" name={'heartRate'}>
                            <Input placeholder="Nhập kết quả"></Input>
                        </Form.Item>
                        <Form.Item label="Tần số" name={'frequency'}>
                            <Input placeholder="Nhập kết quả"></Input>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="Tư thế tim" name={'heartPosition'}>
                            <Input placeholder="Nhập kết quả"></Input>
                        </Form.Item>
                        <Form.Item label="Trục" name={'axis'}>
                            <Input placeholder="Nhập kết quả"></Input>
                        </Form.Item>
                        <Form.Item label="Góc" name={'corner'}>
                            <Input placeholder="Nhập kết quả"></Input>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="Sóng P" name={'waveP'}>
                            <Input placeholder="Nhập kết quả"></Input>
                        </Form.Item>
                        <Form.Item label="Khoảng PR" name={'intervalPR'}>
                            <Input placeholder="Nhập kết quả"></Input>
                        </Form.Item>
                        <Form.Item label="QRS" name={'qrs'}>
                            <Input placeholder="Nhập kết quả"></Input>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="ST" name={'ST'}>
                            <Input placeholder="Nhập kết quả"></Input>
                        </Form.Item>
                        <Form.Item
                            label="Chuyển đạo trước tim"
                            name={'precordialLeads'}
                        >
                            <Input placeholder="Nhập kết quả"></Input>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        {' '}
                        <Form.Item label="Sóng T" name={'waveT'}>
                            <Input placeholder="Nhập kết quả"></Input>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        {' '}
                        <Form.Item label="Khoảng QT" name={'intervalQT'}>
                            <Input placeholder="Nhập kết quả"></Input>
                        </Form.Item>
                    </Col>
                    <Col span={24}>
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
                    </Col>
                </Row>
                <div className="">
                    <p>Hình ảnh</p>
                    <div className="flex flex-row gap-5">
                        <div>
                            <Image
                                src={
                                    storage.fileStorage
                                        ? URL.createObjectURL(
                                              storage.fileStorage,
                                          )
                                        : report?.image
                                          ? report?.image
                                          : 'https://www.contentviewspro.com/wp-content/uploads/2017/07/default_image.png'
                                }
                                width={360}
                                height={200}
                                className="rounded-lg object-cover"
                                alt="image"
                            />
                        </div>
                        <Input
                            type="file"
                            className="hidden"
                            id="image-report-1"
                            accept="image/*"
                            onChange={(event) =>
                                handleOnChangeSelectFileElectrocarDiogram(event)
                            }
                        />
                        <label htmlFor="image-report-1">
                            <div className="w-fit rounded-lg bg-secondaryDark px-4 py-[6px] font-semibold text-white">
                                Tải lên hình ảnh
                            </div>
                        </label>
                    </div>
                </div>
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
