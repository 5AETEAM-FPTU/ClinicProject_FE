'use client'
import { Avatar, Button, DatePicker, Form, Input, Select } from 'antd'
import { FormProps } from 'antd/lib'
import React, { useState } from 'react'
import {motion} from 'framer-motion'
import { CircleFadingArrowUp, Edit } from 'lucide-react'

export type PatitenMedicalReportInfoTypes = {
    
}

export default function PatientInforComponent() {
    const [isEditPatientInfor, setIsEditPatientInfor] = useState<boolean>(false)
    const [myForm] = Form.useForm()
    const onFinish: FormProps<any>['onFinish'] = async (values) => {
        console.log(values)
        setIsEditPatientInfor(false)
    }
    return (
        <div>
            {' '}
            {!isEditPatientInfor ? (
                <motion.div
                    
                    className="flex flex-row items-center justify-between"
                >
                    <div className="flex flex-row gap-20">
                        <div className="flex flex-row items-center gap-10">
                            <div>
                                <Avatar
                                    size={50}
                                    src={
                                        'https://variety.com/wp-content/uploads/2021/04/Avatar.jpg?w=800&h=533&crop=1'
                                    }
                                ></Avatar>
                            </div>
                            <div className="flex flex-col gap-2">
                                <p className="font-bold text-secondarySupperDarker">
                                    Họ và tên: <span>Nguyen Van A</span>
                                </p>
                                <p className="text-secondarySupperDarker">
                                    Ngày sinh:{' '}
                                    <span>
                                        01/01/2000 <span>20 tuổi</span>
                                    </span>
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-row gap-20">
                            <div className="flex flex-col gap-2">
                                <p className="font-bold text-secondarySupperDarker">
                                    Địa chỉ:{' '}
                                    <span className="font-medium">
                                        24 Nam Kỳ Khỡi Nghĩa, Hòa Hải, TP Đà
                                        Nẵng
                                    </span>
                                </p>
                                <p className="font-bold text-secondarySupperDarker">
                                    Giới tính:{' '}
                                    <span className="font-medium">Nữ</span>
                                </p>
                            </div>
                            <div className="flex flex-col gap-2">
                                <p className="font-bold text-secondarySupperDarker">
                                    Số điện thoại:{' '}
                                    <span className="font-medium">
                                        024548349
                                    </span>
                                </p>
                            </div>
                        </div>
                        <div></div>
                    </div>
                    <div>
                        <Button
                            type="primary"
                            className="!bg-secondaryDark rounded-lg"
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
                <motion.div
                  
                    className="flex w-full flex-row gap-10"
                >
                    <div className="flex flex-row gap-10">
                        <div>
                            <Avatar
                                size={50}
                                src={
                                    'https://variety.com/wp-content/uploads/2021/04/Avatar.jpg?w=800&h=533&crop=1'
                                }
                            ></Avatar>
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
                            <div className="flex w-full flex-row justify-between">
                                <div className="flex flex-row gap-20">
                                    <div className="flex flex-col gap-0">
                                        <Form.Item
                                            label="Tên bệnh nhân"
                                            name={'fullname'}
                                        >
                                            <Input
                                                placeholder="Nhập họ tên"
                                                className="w-[240px]"
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
                                                className="w-[240px]"
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
                                                className="w-[240px]"
                                            ></Input>
                                        </Form.Item>
                                        <Form.Item
                                            label="Giới tính"
                                            name={'gender'}
                                            style={{ marginBottom: '0px' }}
                                        >
                                            <Select
                                                className="w-[240px]"
                                                placeholder="Chọn giới tính"
                                            >
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
                                            name={'phone'}
                                            style={{ marginBottom: '0px' }}
                                        >
                                            <Input
                                                placeholder="Số điện thoại"
                                                className="w-[240px]"
                                            ></Input>
                                        </Form.Item>
                                    </div>
                                </div>
                                <Form.Item>
                                    <Button
                                        htmlType="submit"
                                        type="primary"
                                        className="bg-secondaryDark rounded-lg"
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
