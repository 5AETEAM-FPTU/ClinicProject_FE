"use client"
import { Result, Typography, Button, Card } from 'antd';
import { CheckCircleFilled, ArrowLeftOutlined } from '@ant-design/icons';
import Link from 'next/link';

const { Title, Text } = Typography;

export default function PaymentSuccess() {
    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <Card className="w-full shadow-2xl rounded-2xl overflow-hidden">
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
                        <Link href="/dashboard" key="dashboard">
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
                                <Text className="text-secondarySupperDarker text-secondarySupperDarker">TRX123456789</Text>
                            </div>
                            <div className="mt-1 flex justify-between items-center">
                                <Text strong className="text-secondarySupperDarker text-[12px]">Giá:</Text>
                                <Text className="text-secondarySupperDarker text-[12px]">150.00vnđ</Text>
                            </div>
                            <div className="mt-1 flex justify-between items-center">
                                <Text strong className="text-secondarySupperDarker text-[12px]">Ngày thanh toán:</Text>
                                <Text className="text-secondarySupperDarker text-[12px]">9/28/2024</Text>
                            </div>
                            <div className="mt-1 flex justify-between items-center">
                                <Text strong className="text-secondarySupperDarker text-[12px]">Giờ hẹn:</Text>
                                <Text className="text-secondarySupperDarker text-[12px]">7:00-7:30 9/28/2024</Text>
                            </div>
                            <div className="mt-1 flex justify-between items-center">
                                <Text strong className="text-secondarySupperDarker text-[12px]">Bác sĩ:</Text>
                                <Text className="text-secondarySupperDarker text-[12px]">Nguyễn Văn A</Text>
                            </div>
                        </div>
                    </Card>
                </div>
            </Card>
        </div>
    );
}