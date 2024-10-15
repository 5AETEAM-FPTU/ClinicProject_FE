"use client"
import { Result, Typography, Button, Card } from 'antd';
import { RotateCcw } from 'lucide-react'
import { CloseCircleFilled, ReloadOutlined } from '@ant-design/icons';
import Link from 'next/link';

const { Title, Text } = Typography;

export default function FailedPayment() {
    return (
        <div className="h-full flex items-center justify-center">
            <Card className="w-full shadow-third rounded-2xl overflow-hidden" bordered={false} >
                <Result
                    icon={<CloseCircleFilled className="text-7xl text-red-500" />}
                    title={
                        <Title level={2} className="text-red-700 mb-0">
                            Thanh toán thất bại!
                        </Title>
                    }
                    subTitle={
                        <p className="text-balance mx-auto text-[16px] w-[295px] text-secondarySupperDarker">
                            Chúng tôi xin lỗi bạn. Thanh toán của bản không thể xử lý. Hãy thử lại hoặc liên hệ để được hỗ trợ
                        </p>
                    }
                    extra={[
                        <Link href="/support" key="support">
                            <Button
                                key="tryAgain"
                                type="primary"
                                icon={<RotateCcw height={16} width={16} />}
                                size="large"
                                className="mt-4 bg-gradient-to-r from-[#EF4444] to-[#0284C7] border-0 hover:from-red-500 hover:to-red-600 transition duration-300 ease-in-out transform hover:scale-105"
                            >
                                Thử lại
                            </Button>
                        </Link>,

                        <Link href="/support" key="support">
                            <Button
                                type="default"
                                size="large"
                                className="mt-4 ml-4 border-red-400 text-red-500 hover:border-red-500 hover:text-red-600 transition duration-300 ease-in-out"
                            >
                                Liên hệ hỗ trợ
                            </Button>
                        </Link>
                    ]}
                    className="pt-8 pb-0"
                />
            </Card>
        </div>
    );
}