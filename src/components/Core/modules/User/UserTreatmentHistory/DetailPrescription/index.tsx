'use client'

import React, { useEffect, useState } from 'react'
import { Table, Card, Button, Typography, Skeleton, message } from 'antd'
import { AlignCenter, MoveLeft, Printer } from 'lucide-react'
import { useRouter } from 'next-nprogress-bar'
import { useSearchParams } from 'next/navigation'
import { useGetMedicineOrderByIdQuery } from '@/stores/services/report/medicineOrder'
import { useGetUserProfileQuery } from '@/stores/services/user/userSettings'
import { UserProfileTypes } from '../..'
import dayjs from 'dayjs'
import { generateReportCode } from '@/utils/generateCode'
import { useGetMedicineReportPdfMutation } from '@/stores/services/report/generatePdf'

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
type Medicine = {
    index: number
    name: string
    quantity: string
    usage: string
}
type MedicinesItemListReportType = {
    reportCode: string
    patientName: string
    age: string
    gender: string
    patientAddress: string
    medicines: Medicine[]
    notice: string
    year: string
    day: string
    month: string
    doctorName: string
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
    const { profile } = useGetUserProfileQuery(undefined, {
        selectFromResult: ({ data, isFetching }) => {
            return {
                profile: (data?.body?.user as UserProfileTypes) ?? {},
                isFetching: isFetching,
            }
        },
    })

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
    }, [medicineOrder])
    const [getMedicineReportPdf] = useGetMedicineReportPdfMutation()
    const [isLoadingPdf, setIsLoadingPdf] = useState(false)
    const [pdfBlob, setPdfBlob] = useState<Blob | null>(null)

    const handlePrintMedicineList = async () => {
        try {
            setIsLoadingPdf(true)
            const loadingMessage = message.loading(
                'Đang tiến hành tạo đơn thuốc...',
                0,
            )
            const medicineList: Medicine[] = medicineOrder?.items?.map(
                (item: any, index: number) => ({
                    index: index + 1,
                    name: item.medicine.name,
                    quantity: item.quantity,
                    usage: item.description,
                }),
            )
            const data: MedicinesItemListReportType = {
                age: dayjs().diff(profile?.dob!, 'years').toString(),
                day: dayjs().format('DD'),
                doctorName: doctorName!,
                gender: profile?.gender?.genderName,
                month: dayjs().format('MM'),
                notice: medicineOrder?.note ?? '',
                patientAddress: profile?.address ?? '',
                patientName: profile?.fullName ?? '',
                reportCode: generateReportCode(),
                year: dayjs().format('YYYY'),
                medicines: medicineList,
            }
            const res = await getMedicineReportPdf({
                data,
            }).unwrap()
            setIsLoadingPdf(false)
            loadingMessage()
            setIsLoadingPdf(false)
            if (res instanceof Blob) {
                setPdfBlob(res)
                console.log('Pass through')
                const url = URL.createObjectURL(res)
                const pdfWindow = window.open(url)
                if (pdfWindow) {
                    pdfWindow.onload = () => {
                        pdfWindow.focus()
                        pdfWindow.print()
                    }
                }
                URL.revokeObjectURL(url)
            }
        } catch (error) {
            message.error('Tạo đơn thuốc thất bại')
        }
    }
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
                        <Button
                            type="primary"
                            className="bg-secondaryDark py-4 font-bold"
                            onClick={handlePrintMedicineList}
                            loading={isLoadingPdf}
                        >
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
