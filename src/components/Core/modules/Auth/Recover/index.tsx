'use client'
// import constants from '@/settings/constants'
// import { setCookie } from 'cookies-next'
// import { useRouter } from 'next/navigation'
// import React from 'react'
import { Button, Input, Form } from 'antd'
import { useParams } from 'next/navigation'
import { useTranslation } from '@/app/i18n/client'
import { useRouter, useSearchParams } from 'next/navigation'
import { useRequestChangePasswordMutation } from '@/stores/services/auth'
import CustomInputPassword from '@/components/Core/common/CustomInputPassword'

export default function RecoverComponent() {
    const params = useParams();
    const { t } = useTranslation(params?.locale as string, 'Landing');
    const [requestChangePassword] = useRequestChangePasswordMutation();
    const router = useRouter();
    const searchParams = useSearchParams();
    const [form] = Form.useForm();
    const handleSubmit = async (values: any) => {
        const result = await requestChangePassword({
            resetPasswordToken: values.OTP,
            newPassword: values.password,
            email: searchParams.get('email') as string
        });
        if (result.error) {
            console.log('Change password failed', result.error);
        } else {
            router.push('/sign-in');
        }
    }
    return (
        <div className="w-full lg:w-1/2 p-8 flex justify-center items-center bg-[#F7FBFC]">
            <div className="mb-8 flex justify-center items-center w-80">
                <div className="w-full max-w-md">
                    <div className="mb-6">
                        <span className="text-4xl text-[30px] text-[#003553] font-bold">
                            Thay đổi mật khẩu
                        </span>
                    </div>
                    <p className="mb-12 text-left text-base text-gray-700">
                        Sử dụng mã OTP mà chúng tôi đã cung cấp cho bạn để thay đổi mật khẩu
                    </p>
                    <Form
                        className="space-y-4"
                        form={form}
                        onFinish={handleSubmit}
                    >
                        <Form.Item
                            hasFeedback
                            validateDebounce={500}
                            name="OTP"
                            rules={[
                                { required: true, message: "Vui lòng nhập mật khẩu" },
                                {
                                    len: 5,
                                    message: "Mã OTP phải có 5 ký tự"
                                }
                            ]}
                        >
                            <div>
                                <label htmlFor="OTP" className='text-base font-medium mb-2 block text-[#003553]'>OTP</label>
                                <CustomInputPassword placeholder='OTP code'/>
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
                                <label htmlFor="password" className='text-base font-medium mb-2 block text-[#003553]'>Nhập mật khẩu</label>
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
                                <label htmlFor="confirmPassword" className='text-base font-medium mb-2 block text-[#003553]'>Xác nhận mật khẩu</label>
                                <CustomInputPassword placeholder='Nhập lại mật khẩu mới'/>
                            </div>
                        </Form.Item>
                        <Form.Item className='my-5'>
                            <Button
                                size="large"
                                className="w-full bg-[#0284C7] rounded-[16px] text-white font-bold text-md py-[10px] box-content h-[31px] px-0"
                                htmlType="submit"
                            >
                                Đổi mật khẩu
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div >
    )
}
