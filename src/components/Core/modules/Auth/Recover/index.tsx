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
        <div className="w-full h-screen lg:w-1/2 p-8 flex justify-center items-center">
            <div className="mb-8 flex justify-center items-center w-80">
                <div className="w-full max-w-md">
                    <div className="mb-8 flex justify-center items-center">
                        <span className="text-4xl font-bold text-blue-500">P-CLINIC</span>
                    </div>
                    <p className="mb-6 text-lg text-gray-700 text-center">Vui lòng đổi lại mật khẩu</p>
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
                            <Input className='p-4' type="password" placeholder="OTP" />
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
                            <Input className='p-4' type="password" placeholder="Mật khẩu mới" />
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
                            <Input className='p-4' type="password" placeholder="Nhập lại mật khẩu" />
                        </Form.Item>
                        <Form.Item>
                            <Button size='large' className="w-full bg-blue-500 text-white hover:bg-blue-600" htmlType="submit">
                                Đổi mật khẩu
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div >
    )
}
