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
        <div className="w-full lg:w-1/2 p-8">
            <ConfigProvider wave={{ disabled: true }}>
                <Button className="m-8 p-0 border-none" onClick={() => router.back()}>
                    <ArrowLeft className="h-4 w-4" />
                </Button>
            </ConfigProvider>
            <div className="mb-8 flex justify-center items-center">
                {!isSuccess ?
                    <div className="w-full max-w-md">
                        <div className="mb-8 flex justify-center items-center">
                            <span className="text-4xl font-bold text-blue-500">P-CLINIC</span>
                        </div>
                        <p className="mb-6 text-lg text-gray-700 text-center">Vui lòng nhập email</p>
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
                                <Input className='p-4' placeholder="Email" />
                            </Form.Item>
                            <Form.Item>
                                <Button size='large' className="w-full bg-blue-500 text-white hover:bg-blue-600" htmlType="submit">
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
