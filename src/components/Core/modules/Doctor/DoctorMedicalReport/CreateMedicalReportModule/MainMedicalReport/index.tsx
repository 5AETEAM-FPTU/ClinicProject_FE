'use client'

import EditorTinymce from '@/components/Core/common/EditorTinymce'
import { Button, Form, Input } from 'antd'
import { FormProps } from 'antd/lib'
import { useSearchParams } from 'next/navigation'
import { useRef, useState } from 'react'
import CreateMedicalServiceModal from '../../ModalMedicalReport/CreateMedidalServiceModal'
import { Save } from 'lucide-react'
import UpdateMedicalServiceModal from '../../ModalMedicalReport/UpdateMedicalServiceModal'

export default function MainMedicalReport() {
    const [myForm] = Form.useForm()
    const editorRef = useRef<any>(null)

    const [openCreateMedicalServiceModal, setOpenCreateMedicalServiceModal] =
        useState<boolean>(false)
    const [openUpdateMedicalServiceModal, setOpenUpdateMedicalServiceModal] =
        useState<boolean>(false)
    const [openCreatePrescriptionModal, setOpenCreatePrescriptionModal] =
        useState<boolean>(false)

    const searchParam = useSearchParams()
    console.log(searchParam.get('id'))

    const onFinish: FormProps<any>['onFinish'] = async (values: any) => {
        console.log(values)
    }

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
                            <p className="font-bold">
                                Mã phiếu khám:{' '}
                                <span className="font-medium">
                                    {searchParam.get('id')}
                                </span>
                            </p>
                            <p className="font-bold">
                                Ngày khám:{' '}
                                <span className="font-medium">22/02/2022</span>
                            </p>
                        </div>
                        <Form.Item className="!mb-0">
                            <Button
                                htmlType="submit"
                                type="primary"
                                className="rounded-lg bg-secondaryDark shadow-third"
                            >
                                Lưu
                                <Save size={18} />
                            </Button>
                        </Form.Item>
                    </div>
                    <div className="w-full flex-col gap-5">
                        <div className="flex h-fit w-full flex-row gap-5">
                            <Form.Item
                                label="Tiền sử bệnh án"
                                name={'examinationFee'}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Không được để trống',
                                    },
                                ]}
                            >
                                <Input
                                    className="w-[224px]"
                                    placeholder="Nhập thông tin..."
                                ></Input>
                            </Form.Item>
                            <Form.Item
                                label="Tổng trạng chung"
                                name={'genderalStatus'}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Không được để trống',
                                    },
                                ]}
                            >
                                <Input
                                    className="w-[224px]"
                                    placeholder="Nhập thông tin..."
                                ></Input>
                            </Form.Item>
                            <Form.Item
                                label="Chiều cao"
                                name={'genderalStatus'}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Không được để trống',
                                    },
                                ]}
                            >
                                <Input
                                    className="w-[224px]"
                                    placeholder="Nhập thông tin..."
                                ></Input>
                            </Form.Item>
                            <Form.Item
                                label="Cân nặng"
                                name={'genderalStatus'}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Không được để trống',
                                    },
                                ]}
                            >
                                <Input
                                    className="w-[224px]"
                                    placeholder="Nhập thông tin..."
                                ></Input>
                            </Form.Item>
                        </div>
                        <div className="flex h-fit w-full flex-row gap-5">
                            <Form.Item
                                label="Mạch"
                                name={'examinationFee'}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Không được để trống',
                                    },
                                ]}
                            >
                                <Input
                                    className="w-[224px]"
                                    placeholder="Nhập thông tin..."
                                ></Input>
                            </Form.Item>
                            <Form.Item
                                label="Nhiệt"
                                name={'genderalStatus'}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Không được để trống',
                                    },
                                ]}
                            >
                                <Input
                                    className="w-[224px]"
                                    placeholder="Nhập thông tin..."
                                ></Input>
                            </Form.Item>
                            <Form.Item
                                label="Huyết áp"
                                name={'genderalStatus'}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Không được để trống',
                                    },
                                ]}
                            >
                                <Input
                                    className="w-[224px]"
                                    placeholder="Nhập thông tin..."
                                ></Input>
                            </Form.Item>
                            <Form.Item
                                label="Cân nặng"
                                name={'genderalStatus'}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Không được để trống',
                                    },
                                ]}
                            >
                                <Input
                                    className="w-[224px]"
                                    placeholder="Nhập thông tin..."
                                ></Input>
                            </Form.Item>
                        </div>
                        <div>
                            <Form.Item
                                label="Chuẩn đoán"
                                name={'genderalStatus'}
                                className="!mb-0"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Không được để trống',
                                    },
                                ]}
                            >
                                <EditorTinymce editorRef={editorRef} />
                            </Form.Item>
                        </div>
                    </div>
                </Form>
                <div className="flex flex-row gap-5">
                    <Button
                        type="primary"
                        className="rounded-xl bg-secondaryDark !p-[20px] font-semibold shadow-third"
                        onClick={() => setOpenCreateMedicalServiceModal(true)}
                    >
                        Thêm dịch vụ khám
                    </Button>
                    <CreateMedicalServiceModal
                        open={openCreateMedicalServiceModal}
                        setOpen={setOpenCreateMedicalServiceModal}
                    />
                    <Button
                        type="primary"
                        className="shadow-four rounded-xl bg-[#15803D] !p-[20px] font-semibold"
                        onClick={() => setOpenUpdateMedicalServiceModal(true)}
                    >
                        Cập nhật kết quả
                    </Button>
                    <UpdateMedicalServiceModal
                        open={openUpdateMedicalServiceModal}
                        setOpen={setOpenUpdateMedicalServiceModal}
                    />
                    <Button
                        type="primary"
                        className="rounded-xl bg-secondaryDark !p-[20px] font-semibold shadow-third"
                    >
                        Tạo đơn thuốc
                    </Button>
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
