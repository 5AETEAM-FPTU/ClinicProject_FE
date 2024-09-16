'use client'
// import constants from '@/settings/constants'
// import { setCookie } from 'cookies-next'
// import { useRouter } from 'next/navigation'
// import React from 'react'
import { Button, Input, ConfigProvider } from 'antd'
import { ArrowLeft } from "lucide-react"
import { useParams } from 'next/navigation'
import { useTranslation } from '@/app/i18n/client'
import { useRouter } from 'next/navigation'

export default function SignInComponent() {
    const params = useParams();
    const { t } = useTranslation(params?.locale as string, 'Landing')
    const router = useRouter();
    return (
        <div className="w-full lg:w-1/2 p-8">
            <ConfigProvider wave={{ disabled: true }}>
                <Button className="m-8 p-0 border-none" onClick={() => router.push('/home')}>
                    <ArrowLeft className="h-4 w-4" />
                </Button>
            </ConfigProvider>
            <div className="mb-8 flex justify-center items-center">
                <div className="w-full max-w-md">
                    <div className="mb-8 flex justify-center items-center">
                        <span className="text-4xl font-bold text-blue-500">P-CLINIC</span>
                    </div>
                    <p className="mb-6 text-lg text-gray-700 text-center">Vui lòng nhập email hoặc số điện thoại và mật khẩu</p>
                    <form className="space-y-4">
                        <Input placeholder="Email hoặc số điện thoại" />
                        <Input type="password" placeholder="Mật khẩu" />
                        <Button size='large' className="w-full bg-[#1DA1F2] !important text-white hover:bg-blue-600">Đăng nhập</Button>
                    </form>
                    <p className="mt-4 text-right text-sm text-blue-500 cursor-pointer" onClick={() => router.push('sign-up')}>Bạn chưa có tài khoản ?</p>
                    <p className="mt-6 text-center text-sm text-gray-600">Hoặc đăng nhập bằng tài khoản</p>
                    <Button size='large' className="mt-4 w-full bg-red-500 text-white hover:bg-red-600">
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
