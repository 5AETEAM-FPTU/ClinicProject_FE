import { useParams } from 'next/navigation';
import { useTranslation } from '@/app/i18n/client'
import RequestEmail from '@public/landing/icons/request-vertifying-email.svg'
import Image from 'next/image';
import { Button } from 'antd';
import { useRouter } from 'next/navigation';

export default function EmailRequestNotification({ email }: { email: string }) {
    const params = useParams();
    const router = useRouter();
    const { t } = useTranslation(params?.locale as string, 'Landing');
    return (
        <div className="w-full max-w-md">
            <div className="mb-4 flex justify-center items-center">
                <Image src={RequestEmail} alt="Request email" />
            </div>
            <div className="mb-6">
                <h1 className="text-center text-[30px] text-[#003553] font-bold">
                    Xác thực email của bạn
                </h1>
            </div>
            <p className="mb-12 text-[#003553] text-center text-base text-gray-700">
                Mã đã gửi đến email của bạn: <strong>{email}</strong>, vui lòng kiểm tra email.
            </p>
            <Button
                size="large"
                className="w-full bg-[#0284C7] rounded-[16px] text-white font-bold text-md py-[10px] box-content h-[31px] px-0"
                htmlType="submit"
                onClick={() => router.push(`/recover-password?email=${email}`)}
            >
                Đổi mật khẩu
            </Button>
        </div>
    )
}