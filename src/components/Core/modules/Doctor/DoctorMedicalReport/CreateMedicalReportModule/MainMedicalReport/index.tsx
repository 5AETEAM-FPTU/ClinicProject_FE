'use client'

import { useUpdateMainMedicalReportInformationMutation } from '@/stores/services/report/medicalReport'
import { Button, Form, Input, message, Skeleton } from 'antd'
import { FormProps } from 'antd/lib'
import dayjs from 'dayjs'
import { Save } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import CreateMedicalServiceModal from '../../ModalMedicalReport/CreateMedidalServiceModal'
import CreatePrescriptionModal from '../../ModalMedicalReport/CreatePrescriptionModal'
import UpdateMedicalServiceModal from '../../ModalMedicalReport/UpdateMedicalServiceModal'
import { MedicalReportResponseBody } from '../../ViewMedialReportModule'

type TProps = {
    payload: MedicalReportResponseBody
    refetch: () => void
    isFetching: boolean
}

export default function MainMedicalReport({
    payload,
    refetch,
    isFetching,
}: TProps) {
    const [myForm] = Form.useForm()
    const editorRef = useRef<any>(null)
    const router = useRouter();

    const [openCreateMedicalServiceModal, setOpenCreateMedicalServiceModal] =
        useState<boolean>(false)
    const [openUpdateMedicalServiceModal, setOpenUpdateMedicalServiceModal] =
        useState<boolean>(false)
    const [openCreatePrescriptionModal, setOpenCreatePrescriptionModal] =
        useState<boolean>(false)

    const searchParam = useSearchParams()

    const [updateMainMedicalReportInformation, { isLoading }] =
        useUpdateMainMedicalReportInformationMutation()

    const onFinish: FormProps<any>['onFinish'] = async (values: any) => {
        try {
            console.log(values)
            const data = {
                ...values,
                reportId: searchParam.get('id'),
            }
            await updateMainMedicalReportInformation(data).unwrap()
            message.success('Cập nhật thành công!')
        } catch (error) {
            message.error('Cập nhật thất bại!')
        }
    }

    useEffect(() => {
        myForm.setFieldsValue({
            medicalHistory: payload?.medicalReport?.medicalHistory,
            generalCondition: payload?.medicalReport?.generalCondition,
            weight: payload?.medicalReport?.weight,
            height: payload?.medicalReport?.height,
            pulse: payload?.medicalReport?.pulse,
            temperature: payload?.medicalReport?.temperature,
            bloodPresser: payload?.medicalReport?.bloodPressure,
            diagnosis: payload?.medicalReport?.diagnosis,
        })
    }, [])

    return (
        <>
            <div className="flex w-full flex-col gap-5 rounded-xl bg-white p-5 shadow-third">
                <Form
                    name="basic"
                    layout="vertical"
                    form={myForm}
                    className="flex w-full flex-col gap-4"
                    onFinish={onFinish}
                >
                    <div className="flex w-full flex-row justify-between">
                        <div className="flex flex-col gap-2">
                            {isFetching ? (
                                <Skeleton.Input className="h-[20px] w-[244px]" />
                            ) : (
                                <p className="font-bold">
                                    Mã phiếu khám:{' '}
                                    <span className="font-medium">
                                        {searchParam.get('id')}
                                    </span>
                                </p>
                            )}
                            {isFetching ? (
                                <Skeleton.Input className="h-[20px] w-[244px]" />
                            ) : (
                                <p className="font-bold">
                                    Thời gian khám:{' '}
                                    <span className="font-medium">
                                        {dayjs(payload?.medicalReport?.date).format('HH:mm') +
                                            ' ' +
                                            dayjs(payload?.medicalReport?.date).format(
                                                'DD/MM/YYYY',
                                            )}
                                    </span>
                                </p>
                            )}
                        </div>
                        <Form.Item className="!mb-0">
                            <Button
                                htmlType="submit"
                                type="primary"
                                className="rounded-lg bg-secondaryDark shadow-third"
                                loading={isLoading}
                            >
                                Lưu
                                <Save size={18} />
                            </Button>
                        </Form.Item>
                    </div>
                    <div className="w-full flex-col gap-5">
                        <div className="flex h-fit w-full flex-col gap-0 sm:flex-row sm:gap-5">
                            <Form.Item
                                label="Tiền sử bệnh án"
                                name={'medicalHistory'}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Không được để trống',
                                    },
                                ]}
                            >
                                <Input
                                    className="w-full sm:w-[224px]"
                                    placeholder="Nhập thông tin..."
                                ></Input>
                            </Form.Item>
                            <Form.Item
                                label="Tổng trạng chung"
                                name={'generalCondition'}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Không được để trống',
                                    },
                                ]}
                            >
                                <Input
                                    className="w-full sm:w-[224px]"
                                    placeholder="Nhập thông tin..."
                                ></Input>
                            </Form.Item>
                            <Form.Item
                                label="Chiều cao"
                                name={'height'}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Không được để trống',
                                    },
                                ]}
                            >
                                <Input
                                    className="w-full sm:w-[224px]"
                                    placeholder="Nhập thông tin..."
                                ></Input>
                            </Form.Item>
                            <Form.Item
                                label="Cân nặng"
                                name={'weight'}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Không được để trống',
                                    },
                                ]}
                            >
                                <Input
                                    className="w-full sm:w-[224px]"
                                    placeholder="Nhập thông tin..."
                                ></Input>
                            </Form.Item>
                        </div>
                        <div className="flex h-fit w-full flex-col gap-0 sm:flex-row sm:gap-5">
                            <Form.Item
                                label="Mạch"
                                name={'pulse'}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Không được để trống',
                                    },
                                ]}
                            >
                                <Input
                                    className="w-full sm:w-[224px]"
                                    placeholder="Nhập thông tin..."
                                ></Input>
                            </Form.Item>
                            <Form.Item
                                label="Nhiệt"
                                name={'temperature'}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Không được để trống',
                                    },
                                ]}
                            >
                                <Input
                                    className="w-full sm:w-[224px]"
                                    placeholder="Nhập thông tin..."
                                ></Input>
                            </Form.Item>
                            <Form.Item
                                label="Huyết áp"
                                name={'bloodPresser'}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Không được để trống',
                                    },
                                ]}
                            >
                                <Input
                                    className="w-full sm:w-[224px]"
                                    placeholder="Nhập thông tin..."
                                ></Input>
                            </Form.Item>
                        </div>
                        <div>
                            <Form.Item
                                label="Chuẩn đoán"
                                name={'diagnosis'}
                                className="!mb-0"
                            >
                                {/* <EditorTinymce
                                    content={payload?.medicalReport?.diagnosis}
                                    editorRef={editorRef}
                                /> */}
                                <Input.TextArea placeholder="Nhập thông tin..."></Input.TextArea>
                            </Form.Item>
                        </div>
                    </div>
                </Form>
                <div className="flex flex-col gap-5 sm:flex-row">
                    <Button
                        type="primary"
                        className="rounded-xl bg-secondaryDark !p-[20px] font-semibold shadow-third"
                        onClick={() => {
                            setOpenCreateMedicalServiceModal(true)
                        }}
                    >
                        Thêm dịch vụ khám
                    </Button>
                    <CreateMedicalServiceModal
                        open={openCreateMedicalServiceModal}
                        setOpen={setOpenCreateMedicalServiceModal}
                        serviceOrderId={payload?.service?.serviceOrderId}
                    />
                    <Button
                        type="primary"
                        className="rounded-xl bg-[#15803D] !p-[20px] font-semibold shadow-four"
                        onClick={() => setOpenUpdateMedicalServiceModal(true)}
                    >
                        Cập nhật kết quả
                    </Button>
                    <UpdateMedicalServiceModal
                        open={openUpdateMedicalServiceModal}
                        setOpen={setOpenUpdateMedicalServiceModal}
                        serviceOrderId={payload?.service?.serviceOrderId}
                        payload={payload}
                    />
                    <Button
                        type="primary"
                        className="rounded-xl bg-secondaryDark !p-[20px] font-semibold shadow-third"
                        onClick={() => setOpenCreatePrescriptionModal(true)}
                    >
                        Tạo đơn thuốc
                    </Button>
                    <CreatePrescriptionModal
                        open={openCreatePrescriptionModal}
                        setOpen={setOpenCreatePrescriptionModal}
                        medicineOrderId={payload?.medicine?.medicineOrderId}
                    />
                </div>
                <div>
                    <p className="text-[14px] font-semibold text-secondarySupperDarker">
                        Tổng số xét nghiệm: 6
                    </p>
                    <p className="text-[14px] font-semibold text-secondarySupperDarker">
                        Tổng phí xét nghiệm: 840.000 đ
                    </p>{' '}
                    <p className="text-[14px] font-semibold text-secondarySupperDarker">
                        Đã trả chi phí khám: 200.000đ
                    </p>
                    <p className="text-[14px] font-bold text-secondarySupperDarker">
                        Tổng cộng: 640.000 đ
                    </p>
                </div>
            </div>
        </>
    )
}
