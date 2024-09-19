'use client'
// import constants from '@/settings/constants'
// import { setCookie } from 'cookies-next'
// import { useRouter } from 'next/navigation'
// import React from 'react'
import { Button, Input, ConfigProvider, Form, message } from 'antd'
import { ArrowLeft } from 'lucide-react'
import { redirect, useParams } from 'next/navigation'
import { useTranslation } from '@/app/i18n/client'
import { useRouter } from 'next/navigation'
import { useRequestLoginMutation } from '@/stores/services/auth'
import { AppDispatch } from '@/stores'
import { useDispatch } from 'react-redux'
import { useLocale } from 'next-intl'
import { jwtDecode, JwtPayload } from 'jwt-decode'
import { getSession, signIn, useSession } from 'next-auth/react'
import { useEffect } from 'react'
import webStorageClient from '@/utils/webStorageClient'

export interface JwtPayloadUpdated extends JwtPayload {
    role: string
}

export default function SignInComponent() {
    const params = useParams()
    const [form] = Form.useForm()
    const dispatch: AppDispatch = useDispatch()
    const locale = useLocale()
    const { t } = useTranslation(params?.locale as string, 'Landing')
    const router = useRouter()
    const [requestLogin] = useRequestLoginMutation()

    const { data: session } = useSession()

    const handleSubmit = async (values: any) => {
        const result = await requestLogin({
            username: values.username,
            password: values.password,
            isRemember: true,
        })
        const accessToken = result?.data?.body?.accessToken ?? ''

        if (accessToken) {
            const role = jwtDecode<JwtPayloadUpdated>(accessToken).role
            if (role === 'admin') {
                webStorageClient.removeAll();
                message.warning(
                    'Admin không được phép đăng nhập vào trang này!',
                )
                return
            }
        }

        if (result.error) {
            message.error('Đăng nhập không thành công!')
        } else {
            router.push(
                `/${locale}/${jwtDecode<JwtPayloadUpdated>(accessToken).role}/overview`,
            )
        }
    }

    const handleLoginWithGoogle = async () => {
        try {
            await signIn('google', {
                redirect: false,
                prompt: 'select_account',
            })
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (session) {
            console.log(session);
        }
    }, [session])
    return (
        <div className="w-full p-8 lg:w-1/2">
            <ConfigProvider wave={{ disabled: true }}>
                <Button
                    className="m-8 border-none p-0"
                    onClick={() => router.push('/home')}
                >
                    <ArrowLeft className="h-4 w-4" />
                </Button>
            </ConfigProvider>
            <div className="mb-8 flex items-center justify-center">
                <div className="w-full max-w-md">
                    <div className="mb-8 flex items-center justify-center">
                        <span className="text-4xl font-bold text-blue-500">
                            P-CLINIC
                        </span>
                    </div>
                    <p className="mb-6 text-center text-lg text-gray-700">
                        Vui lòng nhập email hoặc số điện thoại và mật khẩu
                    </p>
                    <Form
                        className="space-y-4"
                        form={form}
                        onFinish={handleSubmit}
                    >
                        <Form.Item
                            name="username"
                            validateTrigger="onBlur"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập username',
                                },
                                // {
                                //     validator(_, value) {
                                //         if (!value) {
                                //             return Promise.resolve(); // If empty, handled by 'required'
                                //         }

                                //         // Email regex
                                //         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                                //         // Vietnamese phone number regex (starts with +84 or 0 and has 9 or 10 digits)
                                //         const phoneRegex = /^(?:\+84|0)(?:3[2-9]|5[6|8|9]|7[0|6-9]|8[1-5]|9[0-9])[0-9]{7}$/;

                                //         if (emailRegex.test(value) || phoneRegex.test(value)) {
                                //             return Promise.resolve();
                                //         }

                                //         return Promise.reject(new Error('Vui lòng nhập email hoặc số điện thoại hợp lệ'));
                                //     }
                                // }
                            ]}
                        >
                            <Input
                                className="p-4"
                                placeholder="Email hoặc số điện thoại"
                            />
                        </Form.Item>
                        <Form.Item
                            className="mb-12"
                            hasFeedback
                            validateDebounce={500}
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập mật khẩu',
                                },
                                // {
                                //     pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                                //     message: "Mật khẩu phải chứa ít nhất 8 ký tự, chữ cái viết hoa, chữ cái viết thường và ít nhất 1 chữ số"
                                // }
                            ]}
                        >
                            <Input.Password
                                className="p-4"
                                type="password"
                                placeholder="Mật khẩu"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button
                                size="large"
                                className="w-full bg-blue-500 text-white hover:bg-blue-600"
                                htmlType="submit"
                            >
                                Đăng nhập
                            </Button>
                        </Form.Item>
                    </Form>
                    <div className="flex justify-between">
                        <p
                            className="mt-4 cursor-pointer text-sm text-blue-500"
                            onClick={() => router.push('forget-password')}
                        >
                            Quên khật khẩu
                        </p>
                        <p
                            className="mt-4 cursor-pointer text-sm text-blue-500"
                            onClick={() => router.push('sign-up')}
                        >
                            Bạn chưa có tài khoản ?
                        </p>
                    </div>
                    <p className="mt-6 text-center text-sm text-gray-600">
                        Hoặc đăng nhập bằng tài khoản
                    </p>
                    <Button
                        size="large"
                        className="mt-4 w-full bg-red-500 text-white hover:bg-red-600"
                        onClick={() => {
                            handleLoginWithGoogle()
                        }}
                    >
                        <svg
                            className="mr-2 h-5 w-5"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                        ĐĂNG NHẬP VỚI GOOGLE
                    </Button>
                </div>
            </div>
        </div>
    )
}
