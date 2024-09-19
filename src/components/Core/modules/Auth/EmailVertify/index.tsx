'use client'
// import constants from '@/settings/constants'
// import { setCookie } from 'cookies-next'
// import { useRouter } from 'next/navigation'
// import React from 'react'
import { Button, Input } from 'antd'
import { useParams } from 'next/navigation'
import { useTranslation } from '@/app/i18n/client'
import { useRouter, useSearchParams } from 'next/navigation'
import RequestEmail from '@public/landing/icons/request-vertifying-email.svg'
import EmailSuccess from '@public/landing/icons/vertify-email-success.svg'
import Image from 'next/image';
import { useLazyRequestConfirmEmailQuery, useResendEmailMutation } from '@/stores/services/auth'
import { useEffect, useState } from 'react'


export default function EmailVertify() {
    const params = useParams();
    const { t } = useTranslation(params?.locale as string, 'Landing');
    const [requestConfirmEmail] = useLazyRequestConfirmEmailQuery();
    const [isSuccess, setIsSuccess] = useState(false);
    const searchParams = useSearchParams();
    const email = searchParams.get('email') as string;
    const token = searchParams.get('token') as string;
    const handleConfirmEmail = async () => {
        const result = await requestConfirmEmail({
            token
        });
        if (result.error) {
            console.log('Confirm email failed', result.error);
        } else {
            setIsSuccess(true);
        }
    }

    useEffect(() => {
        if (token) handleConfirmEmail();
    }, [token])
    return (
        <div className="w-full lg:w-1/2 p-8 flex justify-center items-center">
            <div className="mb-8 flex justify-center items-center">
                {!isSuccess ? <VertifyEmailRequest email={email} /> :
                    <VertifyEmailSuccess />}
            </div>
        </div >
    )
}

export function VertifyEmailRequest({ email }: { email: string }) {
    const params = useParams();
    const { t } = useTranslation(params?.locale as string, 'Landing')
    const [resendEmail] = useResendEmailMutation();
    const handleResend = async () => {
        const result = await resendEmail({
            email
        });
        if (result.error) {
            console.log('Resend email failed', result.error);
        } else {
            alert("Gửi lại email thành công");
        }
    }
    return (
        <div className="w-full max-w-md">
            <div className="mb-6">
                <span className="text-4xl text-[30px] text-[#003553] font-bold">
                    Xác thực email của bạn
                </span>
            </div>
            <p className="mb-12 text-[#003553] text-left text-base ">
                Hãy kiểm tra email để tiến hành xác thực tài khoản
            </p>
            <div className="mb-12 flex justify-center items-center">
                <Image src={RequestEmail} alt="Request email" />
            </div>
            <h1 className="text-4xl mb-5 w-full text-center text-[24px] text-[#003553] font-bold">
                Kiểm tra email của bạn
            </h1>
            <p className="mb-12 text-[#003553] text-center text-base ">
                Bạn đã sử dụng <strong>quoch147@gmail.com</strong> như là email của tài khoản
            </p>
            <Button
                size="large"
                className="w-full bg-[#0284C7] rounded-[16px] text-white font-bold text-md py-[10px] box-content h-[31px] px-0"
                onClick={handleResend}
            >
                Gửi lại
            </Button>
        </div>
    )
}

export function VertifyEmailSuccess() {
    const router = useRouter();
    return (
        <div className="w-full max-w-md">
            <div className="mb-2 flex justify-center items-center">
                <Image src={EmailSuccess} alt="Email success" />
            </div>
            <h2 className="text-2xl font-semibold text-center"></h2>
            <div className="mb-2">
                <h2 className="mb-1 text-[30px] text-[#003553] font-bold">
                    Xác thực email thành công
                </h2>
            </div>
            <p className="mb-8 text-[#003553] text-center text-base text-gray-700">
                Bây giờ bạn có thể đăng nhập và tận hưởng dịch vụ
            </p>
            <Button
                size="large"
                className="w-full bg-[#0284C7] rounded-[16px] text-white font-bold text-md py-[10px] box-content h-[31px] px-0"
                onClick={() => router.replace('sign-in')}
            >
                Đăng nhập ngay
            </Button>
        </div>
    )
}
