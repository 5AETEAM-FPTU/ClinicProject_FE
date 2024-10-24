'use client'

import { Button, Input, ConfigProvider, Form, message } from 'antd'
import { ArrowLeft } from 'lucide-react'
import { redirect, useParams } from 'next/navigation'
import { useTranslation } from '@/app/i18n/client'
import { useRouter } from 'next/navigation'
import { useRequestAuthGoogleMutation, useRequestLoginMutation } from '@/stores/services/auth'
import { AppDispatch } from '@/stores'
import { useDispatch } from 'react-redux'
import { useLocale } from 'next-intl'
import { jwtDecode, JwtPayload } from 'jwt-decode'
import { getSession, signIn, useSession } from 'next-auth/react'
import { useEffect } from 'react'
import webStorageClient from '@/utils/webStorageClient'
import Image from 'next/image'
import Google from '@public/icons/google-icon.svg'
import { result } from 'lodash'
import CustomInputPassword from '@/components/Core/common/CustomInputPassword'
import { setLoaded, setLoading } from '@/stores/features/loading'
import { error } from 'console'
import { constants } from '@/settings'

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
    const [requestAuthGoogle] = useRequestAuthGoogleMutation();

    const { data: session, status } = useSession()
    const handleSubmit = async (values: any) => {
        dispatch(setLoading());
        const result = await requestLogin({
            username: values.username,
            password: values.password,
            isRemember: true,
        })
        dispatch(setLoaded());
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

        console.log(result);

        if (result.error) {
            console.log(result.error)
            if ((result.error as any)?.data?.appCode === 'LoginFeature: USER_IS_NOT_FOUND') {
                message.error("Không tìm thấy tài khoản!")
                return
            }
            if ((result.error as any)?.data?.appCode === "LoginFeature: USER_PASSWORD_IS_NOT_CORRECT") {
                message.error("Mật khẩu không chính xác!")
                return
            }
            message.error("Đăng nhập không thành công!")
        } else {
            const accessToken = webStorageClient.get(constants.ACCESS_TOKEN);
            const role = jwtDecode<JwtPayloadUpdated>(accessToken).role;
            message.success("Đăng nhập thành công!")
            const redirectUrl = webStorageClient.get(constants.REDIRECT_URL);
            if (redirectUrl && role == 'user') {
                router.push(redirectUrl);
                webStorageClient.remove(constants.REDIRECT_URL);
                return;
            }
            router.push(
                `/${locale}/${role}/overview`,
            )
        }
    }

    const handleLoginWithGoogle = async () => {
        try {
            dispatch(setLoading());
            const googleLogin = await signIn('google', {
                redirect: true,
                prompt: 'select_account',
            })
            console.log(googleLogin);
        } catch (error) {
            
        } finally {
            dispatch(setLoaded());
        }
    }

    const handleLoginByGoogleIdToken = async (value: string) => {
        dispatch(setLoading());
        const result = await requestAuthGoogle({
            idToken: value
        });
        console.log(result);
        dispatch(setLoaded());
        const accessToken = result?.data?.body?.accessToken ?? ''

        if (result.error) {
            if ((result.error as any).status !== 500) {
                message.error("Đăng nhập không thành công")
            }
        } else {
            message.success("Đăng nhập thành công")
            router.push(
                `/${locale}/${jwtDecode<JwtPayloadUpdated>(accessToken).role}/overview`,
            )
        }
    }

    useEffect(() => {
        if (session) {
            handleLoginByGoogleIdToken(session?.idToken!);
        }
    }, [session])
    return (
        <div className="w-full p-8 lg:w-1/2 bg-[#F7FBFC]">
            <ConfigProvider wave={{ disabled: true }}>
                <Button
                    className="border-none p-0 bg-transparent"
                    onClick={() => router.push('/home')}
                >
                    <ArrowLeft className="h-4 w-4" />
                </Button>
            </ConfigProvider>
            <div className="h-full flex items-center justify-center">
                <div className="w-full max-w-md">
                    <div className="mb-6">
                        <span className="text-4xl text-[30px] text-[#003553] font-bold">
                            Đăng nhập
                        </span>
                    </div>
                    <p className="mb-12 text-left text-base text-gray-700">
                        Đăng nhập với thông tin bạn đã đăng ký với hệ thống
                    </p>
                    <Form
                        className="space-y-4"
                        form={form}
                        onFinish={handleSubmit}
                    >
                        <Form.Item
                            className='mb-6'
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
                            <div>
                                <label htmlFor="username" className='text-base font-medium mb-2 block text-[#003553]'>Email hoặc số điện thoại</label>
                                <Input
                                    className="!border-[#003553] placeholder:!text-[#003553] placeholder:!text-opacity-60 bg-transparent py-3 px-5 text-base font-medium text-[#003553]"
                                    placeholder="abc@gmail.com"
                                />
                            </div>
                        </Form.Item>
                        <Form.Item
                            hasFeedback
                            validateDebounce={500}
                            name="password"
                            className='!m-0'
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
                            <div>
                                <label htmlFor="password" className='text-base font-medium mb-2 block text-[#003553]'>Mật khẩu</label>
                                {/* <Input.Password
                                    className="!border-[#003553] placeholder:!text-[#003553] placeholder:!text-opacity-60 bg-transparent py-3 px-5 text-base font-medium !text-[#003553]"
                                    type="password"
                                    placeholder="Mật khẩu"
                                /> */}
                                <CustomInputPassword placeholder='Ít nhất 8 ký tự' />
                            </div>
                        </Form.Item>
                        <div className="flex justify-between !mt-0">
                            <p
                                className="cursor-pointer text-base font-medium mb-2 block mt-1 text-[#003553]"
                                onClick={() => router.push('forget-password')}
                            >
                                Quên khật khẩu
                            </p>
                            <p
                                className="cursor-pointer text-base font-medium mb-2 block mt-1 text-[#003553]"
                                onClick={() => router.push('sign-up')}
                            >
                                Bạn chưa có tài khoản ?
                            </p>
                        </div>
                        <Form.Item className='my-5'>
                            <Button
                                size="large"
                                className="w-full bg-[#0284C7] rounded-[16px] text-white font-bold text-md py-[10px] box-content h-[31px] px-0"
                                htmlType="submit"
                            >
                                Đăng nhập
                            </Button>
                        </Form.Item>
                        <Button
                            size="large"
                            ghost
                            type='primary'
                            className="w-full text-[#003553] rounded-[16px] border-[#003553] font-bold text-md py-[10px] box-content h-[31px] px-0 border-2"
                            onClick={() => {
                                handleLoginWithGoogle()
                            }}
                        >
                            <Image src={Google} alt="google" />
                            Đăng nhập với Google
                        </Button>
                    </Form>
                </div>
            </div>
        </div>
    )
}
