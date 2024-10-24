'use client'

import React, { useEffect, useState } from 'react'
import { Table, Card, Button, Typography, Skeleton } from 'antd'
import { AlignCenter, MoveLeft, Printer } from 'lucide-react'
import { useRouter } from 'next-nprogress-bar'
import { useSearchParams } from 'next/navigation'
import { useGetMedicineOrderByIdQuery } from '@/stores/services/report/medicineOrder'

interface IMedicineTye {
    id: string
    name: string
    constant: string
}

interface IMedicine {
    id: string
    name: string
    type: IMedicineTye
}

interface IItem {
    quantity: number
    description: string
    medicine: IMedicine
}

interface IMedicineOrder {
    id: string
    totalItem: number
    note: string
    items: IItem[]
}

export type TablePrescription = {
    key: React.Key
    medicineName: string
    quantity: number
    usage: string
    medicineType: string
}

export default function DetailPrescription() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const reportId = searchParams.get('reportId')
    const doctorName = searchParams.get('doctor')
    const examinedDate = searchParams.get('date')
    const medicineOrderid = searchParams.get('medicineOrderId')
    const [prescriptionData, setPrescriptionData] = useState<
        TablePrescription[]
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
            title: 'Tên Thuốc',
            dataIndex: 'medicineName',
            key: 'medicineName',
            render: (value: any, record: any) => <p>{record.medicineName}</p>,
        },
        {
            title: 'Cách Sử Dụng',
            dataIndex: 'usage',
            key: 'usage',
            render: (value: any, record: any) => <p>{record.usage}</p>,
        },
        {
            title: 'Số Lượng',
            dataIndex: 'quantity',
            key: 'quantity',
            render: (value: any, record: any) => <p>{record.quantity}</p>,
        },
        {
            title: 'Dạng',
            dataIndex: 'medicineType',
            key: 'medicineType',
            render: (value: any, record: any) => <p>{record.medicineType}</p>,
        },
    ]

    const { medicineOrder, isFetching } = useGetMedicineOrderByIdQuery(
        medicineOrderid!,
        {
            selectFromResult: ({ data, isFetching }) => ({
                medicineOrder:
                    (data?.body?.medicineOrder as IMedicineOrder) ?? {},
                isFetching: isFetching,
            }),
        },
    )

    useEffect(() => {
        const result: TablePrescription[] = medicineOrder?.items?.map(
            (item: IItem, index: number) => {
                return {
                    ...item,
                    key: index,
                    medicineName: item.medicine.name,
                    quantity: item.quantity,
                    usage: item.description,
                    medicineType: item.medicine.type.name,
                }
            },
        )
        setPrescriptionData(result)
    })

    return (
        <>
            <div className="flex select-none justify-between pb-4">
                <h3 className="text-[20px] font-bold text-[#003553]">
                    Đơn thuốc được bác sĩ kê
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
                            Phiếu khám
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
                            Đơn thuốc
                        </Title>
                        <Card className="shadow-third">
                            <Table
                                className="border-none"
                                dataSource={prescriptionData}
                                columns={columns}
                                pagination={false}
                            />

                            <div className="gap-4 pt-6">
                                <Text strong>Dặn dò:</Text> {medicineOrder.note}
                            </div>
                        </Card>
                    </div>
                    <div className="gap-4 pt-8">
                        <Button type="primary" className="py-4 font-bold">
                            In đơn thuốc <Printer size={20} />
                        </Button>
                    </div>
                </div>
            ) : (
                <Skeleton active />
            )}
        </>
    )
}
