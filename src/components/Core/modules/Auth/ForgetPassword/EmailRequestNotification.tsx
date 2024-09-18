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
            <div className="mb-12 flex justify-center items-center">
                <span className="text-4xl font-bold text-blue-500">P-CLINIC</span>
            </div>
            <div className="mb-4 flex justify-center items-center">
                <Image src={RequestEmail} alt="Request email" />
            </div>
            <h2 className="mb-1 text-2xl font-semibold text-center">Xác thực email của bạn</h2>
            <p className="mb-8 text-gray-600 text-center">
                Mã đã gửi đến email của bạn: <strong>{email}</strong>, vui lòng kiểm tra email.
            </p>
            <Button className="w-full h-10 bg-blue-500 text-white hover:bg-blue-600" onClick={() => router.push(`/recover-password?email=${email}`)}>Đổi mật khẩu</Button>
        </div>
    )
}