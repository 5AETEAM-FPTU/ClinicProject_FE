'use client'
// import constants from '@/settings/constants'
// import { setCookie } from 'cookies-next'
// import { useRouter } from 'next/navigation'
// import React from 'react'
import { Button, Input, ConfigProvider, Form, message } from 'antd'
import { ArrowLeft } from "lucide-react"
import { useParams } from 'next/navigation'
import { useTranslation } from '@/app/i18n/client'
import { useRouter } from 'next/navigation'
import { useForm } from 'antd/es/form/Form'
import { useRequestAuthGoogleMutation, useRequestLoginMutation, useRequestSignUpMutation } from '@/stores/services/auth'
import Image from 'next/image'
import Google from '@public/icons/google-icon.svg'
import CustomInputPassword from '@/components/Core/common/CustomInputPassword'
import { signIn, useSession } from 'next-auth/react'
import { useEffect } from 'react'
import { useLocale } from 'next-intl'
import { jwtDecode } from 'jwt-decode'
import { JwtPayloadUpdated } from '../SignIn'
import { AppDispatch } from '@/stores'
import { useDispatch } from 'react-redux'
import { setLoading } from '@/stores/features/loading'

export default function SignUpComponent() {
    const params = useParams();
    const [form] = useForm();
    const { t } = useTranslation(params?.locale as string, 'Landing')
    const router = useRouter();
    const locale = useLocale();
    const [requestSignUp] = useRequestSignUpMutation();
    const {data: session} = useSession();
    const [requestLogin] = useRequestLoginMutation()
    const [requestAuthGoogle] = useRequestAuthGoogleMutation();
    const dispatch: AppDispatch = useDispatch()

    const handleSubmit = async (values: any) => {
        dispatch(setLoading());
        const dataMapping = {
            fullName: values.name,
            email: values.email,
            phoneNumber: values.phone,
            password: values.password
        }
        const result = await requestSignUp(dataMapping);
        if (result.error) {
            console.log(result.error)
            message.error("Không thể đăng ký! Vui lòng xác nhận lại thông tin!")
            dispatch(setLoading());
        } else {
            dispatch(setLoading());
            router.push('/vertify-email?email=' + values.email);
        }
    }

    const handleLoginWithGoogle = async () => {
        try {
            await signIn('google', {
                redirect: true,
                prompt: 'select_account',
            })

        } catch (error) {
        }
    }

    const handleLoginByGoogleIdToken = async (value: string) => {
        const result = await requestAuthGoogle({
            idToken: value
        });
        const accessToken = result?.data?.body?.accessToken ?? ''

        if(result.error) {
            if((result.error as any).status !== 500) {
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
                <Button className="p-0 border-none bg-transparent" onClick={() => router.back()}>
                    <ArrowLeft className="h-4 w-4" />
                </Button>
            </ConfigProvider>
            <div className="h-full flex justify-center items-center">
                <div className="w-full max-w-md">
                    <div className="mb-6">
                        <span className="text-4xl text-[30px] text-[#003553] font-bold">
                            Đăng ký
                        </span>
                    </div>
                    <p className="mb-5 text-left text-base text-gray-700">
                        Hãy nhập các thông tin cần thiết để tiến hành đăng ký tài khoản
                    </p>
                    <Form className="space-y-4" form={form} onFinish={handleSubmit}>
                        <Form.Item
                            className='mb-0'
                            validateTrigger="onBlur"
                            name="name"
                            rules={[
                                { required: true, message: "Vui lòng nhập họ và tên" },
                            ]}
                        >
                            <div>
                                <label htmlFor="name" className='text-base font-medium mb-2 block text-[#003553]'>Họ và tên</label>
                                <Input className="border-[#003553] placeholder:text-[#003553] placeholder:text-opacity-60 bg-transparent py-3 px-5 text-base font-medium text-[#003553] " type="text" placeholder="Nguyen Van A" />
                            </div>
                        </Form.Item>
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
                                            return Promise.resolve();
                                        }

                                        // Email regex
                                        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                                        if (emailRegex.test(value)) {
                                            return Promise.resolve();
                                        }

                                        return Promise.reject(new Error('Vui lòng nhập email hợp lệ'));
                                    }
                                }
                            ]}
                        >
                            <div>
                                <label htmlFor="email" className='text-base font-medium mb-2 block text-[#003553]'>Email</label>
                                <Input className="border-[#003553] placeholder:text-[#003553] placeholder:text-opacity-60 bg-transparent py-3 px-5 text-base font-medium text-[#003553] " placeholder="abc@gmail.com" />
                            </div>
                        </Form.Item>
                        <Form.Item
                            name="phone"
                            validateTrigger="onBlur"
                            rules={[
                                // {
                                //     required: true,
                                //     message: "Vui lòng nhập số điện thoại"
                                // },
                                {
                                    validator(_, value) {
                                        if (!value) {
                                            return Promise.resolve(); // If empty, handled by 'required'
                                        }

                                        // Vietnamese phone number regex (starts with +84 or 0 and has 9 or 10 digits)
                                        const phoneRegex = /^(?:\+84|0)(?:3[2-9]|5[6|8|9]|7[0|6-9]|8[1-5]|9[0-9])[0-9]{7}$/;

                                        if (phoneRegex.test(value)) {
                                            return Promise.resolve();
                                        }

                                        return Promise.reject(new Error('Vui lòng nhập số điện thoại hợp lệ'));
                                    }
                                }
                            ]}
                        >

                            <div>
                                <label htmlFor="phone" className='text-base font-medium mb-2 block text-[#003553]'>Số điện thoại (Không bắt buộc)</label>
                                <Input className="border-[#003553] placeholder:text-[#003553] placeholder:text-opacity-60 bg-transparent py-3 px-5 text-base font-medium text-[#003553] " placeholder="Số điện thoại" />
                            </div>
                        </Form.Item>
                        <Form.Item
                            hasFeedback
                            validateDebounce={500}
                            name="password"
                            rules={[
                                { required: true, message: "Vui lòng nhập mật khẩu" },
                                {
                                    pattern:  /^(?=.*[a-z])(?=.*[!@#?])[A-Za-z!@#?.0-9]{8,100}$/,
                                    message: "Mật khẩu phải chứa ít nhất 8 ký tự, chữ cái viết hoa, chữ cái viết thường và ít nhất 1 chữ số"
                                }
                            ]}
                        >
                            <div>
                                <label htmlFor="password" className='text-base font-medium mb-2 block text-[#003553]'>Mật khẩu</label>
                                <CustomInputPassword placeholder='Ít nhất 8 ký tự'/>
                            </div>
                        </Form.Item>
                        <Form.Item
                            hasFeedback
                            validateDebounce={500}
                            name="confirmPassword"
                            dependencies={['password']}
                            rules={[
                                { required: true, message: "Vui lòng nhập lại mật khẩu" },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('Mật khẩu không khớp'));
                                    },
                                }),
                            ]}
                        >
                            <div>
                                <label htmlFor="confirmPassword" className='text-base font-medium mb-2 block text-[#003553]'>Mật khẩu xác nhận</label>
                               <CustomInputPassword placeholder='Nhập lại mật khẩu'/>
                            </div>
                        </Form.Item>
                        <div className='flex' style={{ marginTop: '20px !important' }}>
                            <Form.Item name="submit" className='w-4/5'>
                                <Button size='large' className="w-full bg-[#0284C7] rounded-[16px] text-white font-bold !border-[#0284C7] text-md py-[10px] box-content h-[31px] px-0" htmlType="submit">
                                    Đăng ký
                                </Button>
                            </Form.Item>
                            <Button
                                size="large"
                                ghost
                                type='primary'
                                className="cursor-pointer placeholder:text-[#003553] placeholder:text-opacity-60 bg-transparent ml-5 w-[75px] text-[#003553] rounded-[16px] !border-[#003553] font-bold text-md py-[10px] box-content h-[31px] px-0 border-2"
                                onClick={() => {
                                    handleLoginWithGoogle();
                                }}
                            >
                                <Image src={Google} alt="google" />
                            </Button>
                        </div>

                    </Form>
                </div>
            </div>
        </div >
    )
}
