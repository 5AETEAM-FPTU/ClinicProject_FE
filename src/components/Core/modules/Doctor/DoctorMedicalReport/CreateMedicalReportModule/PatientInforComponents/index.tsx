'use client'
import {
    Avatar,
    Button,
    DatePicker,
    Form,
    Input,
    message,
    Select,
    Skeleton,
} from 'antd'
import { FormProps } from 'antd/lib'
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { CircleFadingArrowUp, Edit } from 'lucide-react'
import { TPatientInfo } from '../../ViewMedialReportModule'
import dayjs from 'dayjs'
import { useUpdateMedicalReportPatientInformationMutation } from '@/stores/services/report/medicalReport'

type TProps = {
    payload: TPatientInfo
    refetch: () => void
    isFetching: boolean
}

export default function PatientInforComponent({
    payload,
    refetch,
    isFetching,
}: TProps) {
    const [isEditPatientInfor, setIsEditPatientInfor] = useState<boolean>(false)
    const [myForm] = Form.useForm()
    const [updateMedicalReportPatientInformation, { isLoading, isSuccess }] =
        useUpdateMedicalReportPatientInformationMutation()
    const onFinish: FormProps<any>['onFinish'] = async (values) => {
        // setIsEditPatientInfor(false)
        try {
            console.log(values)
            const data = {
                ...values,
                dob: values.dob
                    ? dayjs(values.dob).format('YYYY-MM-DDTHH:mm:ss')
                    : null,
                patientId: payload?.patientId,
            }
            await updateMedicalReportPatientInformation(data).unwrap()
            message.success('Cập nhật thành công!')
            setIsEditPatientInfor(false)
            refetch()
        } catch (error) {
            message.error('Cập nhật thất bại!')
        }
    }
    useEffect(() => {
        myForm.setFieldsValue({
            fullName: payload?.fullName,
            phoneNumber: payload?.phoneNumber,
            dob: payload?.dob !== null ? dayjs(payload?.dob) : null,
            gender: payload?.gender,
            address: payload?.address,
        })
    }, [payload])

    return (
        <div>
            {' '}
            {!isEditPatientInfor ? (
                <motion.div className="flex flex-col items-center justify-between sm:flex-row">
                    <div className="flex flex-col items-start sm:items-center gap-5 sm:flex-row sm:gap-20">
                        <div className="flex flex-row items-center gap-5 sm:gap-10">
                            <div>
                                {isFetching ? (
                                    <Avatar size={80} />
                                ) : (
                                    <Avatar size={80} src={payload?.avatar} />
                                )}
                            </div>
                            <div className="flex flex-col gap-2">
                                {isFetching ? (
                                    <Skeleton.Input className="w-[244px]" />
                                ) : (
                                    <p className="font-bold text-secondarySupperDarker">
                                        Họ và tên:{' '}
                                        <span>{payload?.fullName}</span>
                                    </p>
                                )}
                                <p className="text-secondarySupperDarker">
                                    {isFetching ? (
                                        <Skeleton.Input className="w-[244px]" />
                                    ) : (
                                        <span>
                                            Ngày sinh:{' '}
                                            {dayjs(payload?.dob).format(
                                                'DD/MM/YYYY',
                                            )}{' '}
                                            <span>
                                                {dayjs(payload?.dob).diff(
                                                    dayjs(),
                                                    'year',
                                                )}{' '}
                                                tuổi
                                            </span>
                                        </span>
                                    )}
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-5 sm:gap-20">
                            <div className="flex flex-col gap-5 sm:gap-2">
                                {isFetching ? (
                                    <Skeleton.Input className="w-[244px]" />
                                ) : (
                                    <p className="font-bold text-secondarySupperDarker">
                                        Địa chỉ:{' '}
                                        <span className="font-medium">
                                            {payload?.address}
                                        </span>
                                    </p>
                                )}
                                {isFetching ? (
                                    <Skeleton.Input className="w-[244px]" />
                                ) : (
                                    <p className="font-bold text-secondarySupperDarker">
                                        Giới tính:{' '}
                                        <span className="font-medium">
                                            {payload?.gender}
                                        </span>
                                    </p>
                                )}
                            </div>
                            <div className="flex flex-col gap-2">
                                {isFetching ? (
                                    <Skeleton.Input className="w-[244px]" />
                                ) : (
                                    <p className="font-bold text-secondarySupperDarker">
                                        Số điện thoại:{' '}
                                        <span className="font-medium">
                                            {payload?.phoneNumber}
                                        </span>
                                    </p>
                                )}
                            </div>
                        </div>
                        <div></div>
                    </div>
                    <div>
                        <Button
                            type="primary"
                            className="rounded-lg !bg-secondaryDark"
                            onClick={() => {
                                setIsEditPatientInfor(true)
                            }}
                        >
                            Chỉnh sửa
                            <Edit size={18} />
                        </Button>
                    </div>
                </motion.div>
            ) : (
                <motion.div className="flex w-full flex-col sm:flex-row gap-5 sm:gap-10">
                    <div className="flex flex-row gap-10">
                        <div>
                            <Avatar size={80} src={payload?.avatar}></Avatar>
                        </div>
                    </div>
                    <div className="w-full">
                        <Form
                            name="create-medical-report"
                            onFinish={onFinish}
                            layout="vertical"
                            style={{
                                width: '100%',
                                display: 'flex',
                            }}
                            form={myForm}
                        >
                            <div className="flex w-full flex-col sm:gap-0 gap-5 sm:flex-row justify-between">
                                <div className="flex flex-col sm:flex-row gap-5 sm:gap-10">
                                    <div className="flex flex-col gap-0">
                                        <Form.Item
                                            label="Tên bệnh nhân"
                                            name={'fullName'}
                                        >
                                            <Input
                                                placeholder="Nhập họ tên"
                                                className="sm:w-[240px] w-full"
                                            ></Input>
                                        </Form.Item>
                                        <Form.Item
                                            label="Ngày sinh"
                                            name={'dob'}
                                            style={{ marginBottom: '0px' }}
                                        >
                                            <DatePicker
                                                size="large"
                                                placeholder="Chọn ngày sinh"
                                                className="sm:w-[240px] w-full"
                                            ></DatePicker>
                                        </Form.Item>
                                    </div>
                                    <div className="flex flex-col gap-0">
                                        <Form.Item
                                            label="Địa chỉ"
                                            name={'address'}
                                        >
                                            <Input
                                                placeholder="Nhập địa chỉ"
                                                className="sm:w-[240px] w-full"
                                            ></Input>
                                        </Form.Item>
                                        <Form.Item
                                            label="Giới tính"
                                            name={'gender'}
                                            style={{ marginBottom: '0px' }}
                                        >
                                            <Select
                                                className="sm:w-[240px] w-full"
                                                placeholder="Chọn giới tính"
                                            >
                                                <Select.Option value="Khác">
                                                    Khác
                                                </Select.Option>
                                                <Select.Option value="Nam">
                                                    Nam
                                                </Select.Option>
                                                <Select.Option value="Nữ">
                                                    Nữ
                                                </Select.Option>
                                            </Select>
                                        </Form.Item>
                                    </div>
                                    <div className="flex flex-col gap-0">
                                        <Form.Item
                                            label="Số điện thoại"
                                            name={'phoneNumber'}
                                            style={{ marginBottom: '0px' }}
                                        >
                                            <Input
                                                placeholder="Số điện thoại"
                                                className="sm:w-[240px] w-full"
                                            ></Input>
                                        </Form.Item>
                                    </div>
                                </div>
                                <Form.Item className='mb-0 flex justify-end '>
                                    <Button
                                        htmlType="submit"
                                        type="primary"
                                        className="rounded-lg bg-secondaryDark"
                                        loading={isLoading}
                                    >
                                        Cập nhật
                                        <CircleFadingArrowUp size={18} />
                                    </Button>
                                </Form.Item>
                            </div>
                        </Form>
                    </div>
                </motion.div>
            )}
        </div>
    )
}
