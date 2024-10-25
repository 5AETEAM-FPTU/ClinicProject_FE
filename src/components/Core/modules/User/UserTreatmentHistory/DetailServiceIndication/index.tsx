'use client'

import React, { useEffect, useState } from 'react'
import { Table, Card, Button, Typography, Skeleton } from 'antd'
import { Eye, MoveLeft, Printer } from 'lucide-react'
import { useRouter } from 'next-nprogress-bar'
import { useSearchParams } from 'next/navigation'
import { useGetServiceOrderDetailQuery } from '@/stores/services/report/serviceOrder'

interface IService {
    id: string
    code: string
    name: string
    description: string
    group: string
}

interface IItem {
    isUpdate: boolean
    priceAtOrder: number
    service: IService
}

interface IServiceOrder {
    id: string
    quantity: number
    totalPrice: number
    isAllUpdated: boolean
    items: IItem[]
}

export type TableServiceIndication = {
    key: React.Key
    serviceCode: string
    serviceName: string
    price: number
}

export default function DetailPrescription() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const reportId = searchParams.get('reportId')
    const doctorName = searchParams.get('doctor')
    const examinedDate = searchParams.get('date')
    const medicineOrderid = searchParams.get('serviceOrderId')
    const [prescriptionData, setPrescriptionData] = useState<
        TableServiceIndication[]
    >([])
    const { Title, Text } = Typography
    const columns = [
        {
            title: 'STT',
            dataIndex: 'key',
            key: 'key',
            width: '10%',
            render: (value: any, record: any) => <p>{record.key + 1}</p>,
        },
        {
            title: 'Mã dịch vụ',
            dataIndex: 'serviceCode',
            key: 'serviceCode',
            render: (value: any, record: any) => <p>{record.serviceCode}</p>,
        },
        {
            title: 'Tên dịch vụ',
            dataIndex: 'serviceName',
            key: 'serviceName',
            render: (value: any, record: any) => <p>{record.serviceName}</p>,
        },
        {
            title: 'Đơn giá',
            dataIndex: 'price',
            key: 'price',
            render: (value: any, record: any) => (
                <div>
                    <span className="mr-10">
                        {new Intl.NumberFormat('vi-VN').format(
                            record.priceAtOrder,
                        )}
                    </span>
                    <span>VNĐ</span>
                </div>
            ),
        },
        {
            title: 'Kết quả',
            dataIndex: 'result',
            width: '15%',
            render: (value: any, record: any) => <Eye />,
        },
    ]

    const { medicineOrder, isFetching } = useGetServiceOrderDetailQuery(
        medicineOrderid!,
        {
            selectFromResult: ({ data, isFetching }) => ({
                medicineOrder:
                    (data?.body?.serviceOrder as IServiceOrder) ?? {},
                isFetching: isFetching,
            }),
        },
    )

    useEffect(() => {
        const result: TableServiceIndication[] = medicineOrder?.items?.map(
            (item: IItem, index: number) => {
                return {
                    ...item,
                    key: index,
                    serviceCode: item.service.code,
                    serviceName: item.service.name,
                    price: item.priceAtOrder,
                }
            },
        )
        setPrescriptionData(result)
    }, [medicineOrder])

    return (
        <>
            <div className="flex select-none justify-between pb-4">
                <h3 className="text-[20px] font-bold text-[#003553]">
                    Dịch vụ đã khám
                </h3>
                <Button
                    type="default"
                    className="border-none shadow-third"
                    onClick={() => {
                        router.back()
                    }}
                >
                    {' '}
                    <MoveLeft size={18} />
                    Quay lại
                </Button>
            </div>
            {!isFetching ? (
                <div>
                    <div>
                        <Title level={4} className="pb-2 text-[16px] font-bold">
                            Từ phiếu khám
                        </Title>
                        <Card className="shadow-third">
                            <div>
                                <Text strong>Mã phiếu khám:</Text> {reportId}
                            </div>
                            <div>
                                <Text strong>Bác sĩ:</Text> {doctorName}
                            </div>
                            <div>
                                <Text strong>Ngày khám:</Text> {examinedDate}
                            </div>
                        </Card>
                    </div>

                    <div className="pt-4">
                        <Title level={4} className="pb-2 text-[16px] font-bold">
                            Đơn dịch vụ
                        </Title>
                        <Card className="shadow-third">
                            <Table
                                className="border-none text-center"
                                dataSource={prescriptionData}
                                columns={columns}
                                pagination={false}
                            />
                        </Card>
                    </div>
                    <div className="gap-4 pt-8">
                        <Button type="primary" className="py-4 font-bold bg-secondaryDark">
                            In đơn dịch vụ khám <Printer size={20} />
                        </Button>
                    </div>
                </div>
            ) : (
                <Skeleton active />
            )}
        </>
    )
}
