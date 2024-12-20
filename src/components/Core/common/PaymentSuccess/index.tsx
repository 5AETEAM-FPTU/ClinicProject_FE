"use client"
import { Result, Typography, Button, Card } from 'antd';
import { CheckCircleFilled, ArrowLeftOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import webStorageClient from '@/utils/webStorageClient';
import { constants } from '@/settings';
import { useAppSelector } from '@/hooks/redux-toolkit';
import { jwtDecode } from 'jwt-decode';
import { JwtPayloadUpdated } from '../../modules/Auth/SignIn';
import { useMutation } from 'convex/react';
import { api } from '@convex/_generated/api';
import dayjs from 'dayjs';
import { useEffect } from 'react';

const { Title, Text } = Typography;

interface PaymentSuccessProps {
    transactionId: string | null;
    amount: string | null;
    date: string | null;
    appointmentDate: string;
    doctorName: string | null;
}

export default function PaymentSuccess({ transactionId, amount, date, appointmentDate, doctorName }: PaymentSuccessProps) {
    const year = date?.substring(0, 4);
    const month = date?.substring(4, 6);
    const day = date?.substring(6, 8);
    const hours = date?.substring(8, 10);
    const minutes = date?.substring(10, 12);
    const doctorId = webStorageClient.get(constants.BOOKED_ID);
    const { user } = useAppSelector((state) => state.auth);

    const userId = jwtDecode<JwtPayloadUpdated>(
        webStorageClient.getToken()!,
    ).sub
    const sendToUserNotification = useMutation(
        api._user_notifications.functions.sendUserNotification,
    )

    // in cookie
    const vnPayUrl = webStorageClient.remove(constants.VNPAY_PAYMENT_URL);
    console.log(appointmentDate);
    const [dateAppointment, timeAppointment, slot] = appointmentDate?.split(' ');
    const formattedDateTimeAppointment = `${timeAppointment} ${slot} ${dateAppointment}`;

    const formattedDate = `${hours}:${minutes} ${day}/${month}/${year}`;

    const handleCreateNotificationToPatient = async (
        doctorId: string,

    ) => {
        try {
            await sendToUserNotification({
                receiverId: doctorId,
                message: 'Có lịch khám mới',
                type: constants.NOTIFICATION_TYPES.SUCCESS,
                description: `Bạn vừa có lịch đặt hẹn khám từ bệnh nhân ${user?.fullName} vào lúc: ${dayjs(appointmentDate).format("HH:mm DD/MM/YYYY")}`,
                senderAvatarUrl: `${user.avatarUrl}`,
                senderId: `${userId}`,
                senderName: 'Người dùng',
                topic: 'Đặt lịch',
                href: `/`,
            })
        } catch (error) { }
    }

    useEffect(() => {
        handleCreateNotificationToPatient(doctorId!)
    }, [transactionId])

    return (
        <div className="flex items-center justify-center">
            <Card className="w-full shadow-third rounded-2xl overflow-hidden" bordered={false}>
                <Result
                    icon={<CheckCircleFilled className="text-7xl text-green-500" />}
                    title={
                        <Title level={2} className="text-green-700 mb-0">
                            Thanh toán thành công!
                        </Title>
                    }
                    subTitle={
                        <Text className="text-secondarySupperDarker text-lg">
                            Cảm ơn bạn đã tin tưởng. Thanh toán đã xử lý thành công.
                        </Text>
                    }
                    extra={[
                        <Link href="/user/overview" key="dashboard">
                            <Button
                                type="primary"
                                icon={<ArrowLeftOutlined />}
                                size="large"
                                className="mt-4 bg-gradient-to-r from-green-400 to-blue-500 border-0 hover:from-green-500 hover:to-blue-600 transition duration-300 ease-in-out transform hover:scale-105"
                            >
                                Trở về trang
                            </Button>
                        </Link>
                    ]}
                    className="pt-8 pb-0"
                />
                <div className="px-8">
                    <Card className="mt-6 mx-auto w-[306px] bg-[#DBDBDB50] shadow-inner">
                        <div>
                            <div className="mt-1 flex justify-between items-center">
                                <Text strong className="text-secondarySupperDarker text-[12px]">Giao dịch ID:</Text>
                                <Text className="text-secondarySupperDarker text-secondarySupperDarker">{transactionId}</Text>
                            </div>
                            <div className="mt-1 flex justify-between items-center">
                                <Text strong className="text-secondarySupperDarker text-[12px]">Giá:</Text>
                                <Text className="text-secondarySupperDarker text-[12px]">{amount} vnđ</Text>
                            </div>
                            <div className="mt-1 flex justify-between items-center">
                                <Text strong className="text-secondarySupperDarker text-[12px]">Ngày thanh toán:</Text>
                                <Text className="text-secondarySupperDarker text-[12px]">{formattedDate}</Text>
                            </div>
                            <div className="mt-1 flex justify-between items-center">
                                <Text strong className="text-secondarySupperDarker text-[12px]">Giờ hẹn:</Text>
                                <Text className="text-secondarySupperDarker text-[12px]">{formattedDateTimeAppointment}</Text>
                            </div>
                            <div className="mt-1 flex justify-between items-center">
                                <Text strong className="text-secondarySupperDarker text-[12px]">Bác sĩ:</Text>
                                <Text className="text-secondarySupperDarker text-[12px]">{doctorName}</Text>
                            </div>
                        </div>
                    </Card>
                </div>
            </Card>
        </div>
    );
}