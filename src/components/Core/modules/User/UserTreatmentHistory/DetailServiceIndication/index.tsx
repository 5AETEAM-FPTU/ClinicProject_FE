'use client'

import React, { useEffect, useState } from 'react'
import { Table, Card, Button, Typography, Skeleton, message } from 'antd'
import { Eye, MoveLeft, Printer, View } from 'lucide-react'
import { useRouter } from 'next-nprogress-bar'
import { useSearchParams } from 'next/navigation'
import { useGetServiceOrderDetailQuery } from '@/stores/services/report/serviceOrder'
import { useGetAdominalUltrasoundPdfMutation, useGetElectrocarDiographyPdfMutation, useGetServiceReportPdfMutation } from '@/stores/services/report/generatePdf'
import dayjs from 'dayjs'
import { generateReportCode } from '@/utils/generateCode'
import { useGetUserProfileQuery } from '@/stores/services/user/userSettings'
import { UserProfileTypes } from '../..'

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
type Services = {
    index: number
    code: string
    name: string
    price: string
}
type ServicesItemListReportType = {
    reportCode: string
    patientName: string
    age: string
    gender: string
    patientAddress: string
    services: Services[]
    year: string
    day: string
    month: string
    doctorName: string
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
    const { servicesOrder, isFetching } = useGetServiceOrderDetailQuery(
        medicineOrderid!,
        {
            selectFromResult: ({ data, isFetching }) => ({
                servicesOrder:
                    (data?.body?.serviceOrder as IServiceOrder) ?? {},
                isFetching: isFetching,
            }),
        },
    )

    useEffect(() => {
        const result: TableServiceIndication[] = servicesOrder?.items?.map(
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
    }, [servicesOrder])
    const handleGeneratePdf = (code: string) => {
        if (code.toUpperCase() === 'SAB') {
            handleGetAbdominalUltraSoundReportPdf()
        } else if (code.toUpperCase() === 'DTD') {
            handleGetElectrocarDiogramReportPdf()
        }
    }
    const [getAbdominalUltrasoundPdfMutation] =
        useGetAdominalUltrasoundPdfMutation()
    const handleGetAbdominalUltraSoundReportPdf = async () => {
        try {
            const loadingMessage = message.loading(
                'Đang tiến hành tạo kết quả...',
                0,
            )
            const res = await getAbdominalUltrasoundPdfMutation({
                serviceOrderedId: servicesOrder?.id!,
            }).unwrap()
            if (res instanceof Blob) {
                const url = URL.createObjectURL(res)
                const pdfWindow = window.open(url)
                if (pdfWindow) {
                    pdfWindow.onload = () => {
                        pdfWindow.focus()
                        // pdfWindow.print()
                    }
                }
                URL.revokeObjectURL(url)
            }
            loadingMessage()
            message.success('Tạo kết quả dịch vụ thành công!')
        } catch (error) {
            message.error('Tạo kết quả dịch vụ thất bại')
        }
    }
    const [getElectrocarDiogramPdfMutation] =
        useGetElectrocarDiographyPdfMutation()
    const handleGetElectrocarDiogramReportPdf = async () => {
        try {
            const loadingMessage = message.loading(
                'Đang tiến hành tạo kết quả...',
                0,
            )
            const res = await getElectrocarDiogramPdfMutation({
                serviceOrderedId: servicesOrder?.id!,
            }).unwrap()
            if (res instanceof Blob) {
                const url = URL.createObjectURL(res)
                const pdfWindow = window.open(url)
                if (pdfWindow) {
                    pdfWindow.onload = () => {
                        pdfWindow.focus()
                        // pdfWindow.print()
                    }
                }
                URL.revokeObjectURL(url)
            }
            loadingMessage()
            message.success('Tạo kết quả dịch vụ thành công!')
        } catch (error) {
            message.error('Tạo kết quả dịch vụ thất bại')
        }
    }
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
            render: (value: any, record: any) => (
                <Button type="text"
                    onClick={() => handleGeneratePdf(record.serviceCode)}
                >
                    <View size={18} className="text-secondaryDark" />
                </Button>
            ),
        },
    ]


    const [getServiceReportPdf] = useGetServiceReportPdfMutation()
    const [isLoadingPdf, setIsLoadingPdf] = useState(false)
    const { profile } = useGetUserProfileQuery(undefined, {
        selectFromResult: ({ data, isFetching }) => {
            return {
                profile: (data?.body?.user as UserProfileTypes) ?? {},
                isFetching: isFetching,
            }
        },
    })

    const handlePrintServiceList = async () => {
        try {
            setIsLoadingPdf(true)
            const loadingMessage = message.loading(
                'Đang tiến hành tạo đơn dịch vụ đã khám...',
                0,
            )
            const serviceList: Services[] = servicesOrder?.items?.map(
                (item: any, index: number) => ({
                    index: index + 1,
                    code: item.service.code,
                    name: item.service.name,
                    price: item.priceAtOrder,
                }),
            )
            const data: ServicesItemListReportType = {
                age: dayjs().diff(profile?.dob!, 'years').toString(),
                day: dayjs().format('DD'),
                doctorName: doctorName!,
                gender: profile?.gender?.genderName,
                month: dayjs().format('MM'),
                patientAddress: profile?.address ?? '',
                patientName: profile?.fullName ?? '',
                reportCode: generateReportCode(),
                year: dayjs().format('YYYY'),
                services: serviceList,
            }
            const res = await getServiceReportPdf({
                data,
            }).unwrap()
            setIsLoadingPdf(false)
            loadingMessage()
            setIsLoadingPdf(false)
            if (res instanceof Blob) {
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
            message.error('Tạo đơn dịch vụ đã khám thất bại')
        }
    }

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
                        <Button
                            type="primary"
                            className="bg-secondaryDark py-4 font-bold"
                            loading={isLoadingPdf}
                            onClick={handlePrintServiceList}
                        >
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
