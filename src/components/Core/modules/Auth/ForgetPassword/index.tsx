'use client'
// import constants from '@/settings/constants'
// import { setCookie } from 'cookies-next'
// import { useRouter } from 'next/navigation'
// import React from 'react'
import { Button, Input, ConfigProvider, Form } from 'antd'
import { ArrowLeft } from "lucide-react"
import { redirect, useParams } from 'next/navigation'
import { useTranslation } from '@/app/i18n/client'
import { useRouter } from 'next/navigation'
import { useRequestForgetPasswordMutation } from '@/stores/services/auth'
import { AppDispatch } from '@/stores'
import { useDispatch } from 'react-redux'
import { useState } from 'react';
import EmailRequestNotification from './EmailRequestNotification'

export default function ForgetPassword() {
    const params = useParams();
    const [isSuccess, setIsSuccess] = useState(false);
    const [email, setEmail] = useState('');
    const [form] = Form.useForm();
    const dispatch: AppDispatch = useDispatch();
    const { t } = useTranslation(params?.locale as string, 'Landing')
    const router = useRouter();
    const [requestForgetPassword] = useRequestForgetPasswordMutation();
    const handleSubmit = async (values: any) => {
        const result = await requestForgetPassword({
            email: values.email
        });

        if (result.error) {
            console.error('Send email failed', result.error);
        } else {
            console.log('Send email success', result.data);
            setIsSuccess(true);
            setEmail(values.email);
            // dispatch(initAuth(result.data.body));

        }
    }
    return (
        <div className="w-full lg:w-1/2 p-8 bg-[#F7FBFC]">
            <ConfigProvider wave={{ disabled: true }}>
                <Button className=" p-0 border-none bg-transparent" onClick={() => router.back()}>
                    <ArrowLeft className="h-4 w-4" />
                </Button>
            </ConfigProvider>
            <div className="flex justify-center items-center h-full">
                {!isSuccess ?
                    <div className="w-full max-w-md">
                        <div className="mb-6">
                            <span className="text-4xl text-[30px] text-[#003553] font-bold">
                                Nhập email của bạn để thay đổi mật khẩu
                            </span>
                        </div>
                        <p className="mb-12 text-[#003553] text-left text-base text-gray-700">
                            Chúng tôi sẽ gửi OTP thông qua email của bạn, hãy sử dụng mã này để thay đổi mật khẩu.<br /> Lưu ý không để lộ mã này ra bên ngoài
                        </p>
                        <Form className="space-y-4" form={form} onFinish={handleSubmit}>
                            <Form.Item
                                name="email"
                                validateTrigger="onBlur"
                                rules={[
                                    {
                                        required: true,
                                        message: "Vui lòng nhập email"
                                    },
                                    {
                                        validator(_, value) {
                                            if (!value) {
                                                return Promise.resolve(); // If empty, handled by 'required'
                                            }

                                            // Email regex
                                            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                                            // Vietnamese phone number regex (starts with +84 or 0 and has 9 or 10 digits)
                                            // const phoneRegex = /^(?:\+84|0)(?:3[2-9]|5[6|8|9]|7[0|6-9]|8[1-5]|9[0-9])[0-9]{7}$/;

                                            if (emailRegex.test(value)) {
                                                return Promise.resolve();
                                            }

                                            return Promise.reject(new Error('Vui lòng nhập email hợp lệ'));
                                        }
                                    }
                                ]}
                            >
                                <div>
                                    <label htmlFor="email" className='text-base font-medium mb-2 block text-[#003553]'>Nhập email của bạn</label>
                                    <Input
                                        className="border-[#003553] placeholder:text-[#003553] placeholder:text-opacity-60 bg-transparent py-3 px-5 text-base font-medium text-[#003553] text-opacity-60"
                                        placeholder="Email"
                                    />
                                </div>
                            </Form.Item>
                            <Form.Item>
                                <Button
                                    size="large"
                                    className="w-full bg-[#0284C7] rounded-[16px] text-white font-bold text-md py-[10px] box-content h-[31px] px-0"
                                    htmlType="submit"
                                >
                                    Gửi yêu cầu
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                    : <EmailRequestNotification email={email} />}
            </div>
        </div>
    )
}
