'use client'
import { Button, message, Skeleton } from 'antd'
import { Edit, FileDown, Printer } from 'lucide-react'
import { usePathname, useSearchParams } from 'next/navigation'
import React, { useState } from 'react'
import { TMedicalReport, TPatientInfo } from '..'
import dayjs from 'dayjs'
import { useRouter } from 'next-nprogress-bar'
import { generateReportCode } from '@/utils/generateCode'
import webStorageClient from '@/utils/webStorageClient'
import { constants } from '@/settings'
import { useGetServiceOrderDetailQuery } from '@/stores/services/report/serviceOrder'
import index from '@/components/Core/modules/User'
import { useGetMedicineOrderByIdQuery } from '@/stores/services/report/medicineOrder'
import { useGetGeneralMedicalReportPdfMutation } from '@/stores/services/report/generatePdf'

type TProps = {
    payload: TMedicalReport
    isFetching: boolean
    patientInfor?: TPatientInfo
    serviceOrderId?: string
    medicineOrderId?: string
}
type Services = {
    index: number
    code: string
    name: string
    price: string
}
type Medicines = {
    index: number
    name: string
    quantity: string
    usage: string
}
type GenderalMedicalReport = {
    reportCode: string
    patientName: string
    age: string
    gender: string
    patientAddress: string
    historyOfIllness: string
    overallStatus: string
    height: string
    pulse: string
    temperature: string
    bloodPressure: string
    weight: string
    services: Services[]
    medicines: Medicines[]
    finalConsultation: string
    year: string
    day: string
    month: string
    doctorName: string
}

export default function MainMedicalReportViewInformation({
    payload,
    isFetching,
    patientInfor,
    serviceOrderId,
    medicineOrderId,
}: TProps) {
    const searchParam = useSearchParams()
    const router = useRouter()
    const pathname = usePathname()
    const { serviceOrder } = useGetServiceOrderDetailQuery(serviceOrderId!, {
        skip: !serviceOrderId,
        selectFromResult: ({ data }) => ({
            serviceOrder: data?.body?.serviceOrder,
        }),
    })
    const { medicineOrder } = useGetMedicineOrderByIdQuery(medicineOrderId!, {
        skip: !medicineOrderId,
        selectFromResult: ({ data }) => ({
            medicineOrder: data?.body?.medicineOrder ?? {},
        }),
    })

    const handleEditMedicalReport = () => {
        router.push(pathname.replace('view', `?id=${searchParam.get('id')}`))
    }

    const doctorName = webStorageClient.get(constants.USER_FULLNAME)
    const [generateGeneralMedicalReportPdf] =
        useGetGeneralMedicalReportPdfMutation()
    const [pdfBlob, setPdfBlob] = useState<Blob | null>(null)
    const [isLoadingPdf, setIsLoadingPdf] = useState(false)
    const handlePrintMedicalReport = async () => {
        try {
            setIsLoadingPdf(true)
            const loadingMessage = message.loading("Đang tiến hành phân tích...", 0);
            const servicesList: Services[] = serviceOrder?.items?.map(
                (item: any, index: number) => ({
                    index: index + 1,
                    code: item.service.code,
                    name: item.service.name,
                    price: item.priceAtOrder,
                }),
            )
            const medicineList: Medicines[] = medicineOrder?.items?.map(
                (item: any, index: number) => ({
                    index: index + 1,
                    name: item.medicine.name,
                    quantity: item.quantity,
                    usage: item.description,
                }),
            )
            const data: GenderalMedicalReport = {
                reportCode: generateReportCode(),
                patientName: patientInfor?.fullName!,
                age: dayjs().diff(patientInfor?.dob!, 'years').toString(),
                gender: patientInfor?.gender!,
                patientAddress: patientInfor?.address!,
                historyOfIllness: payload?.medicalHistory!,
                overallStatus: payload?.generalCondition!,
                bloodPressure: payload?.bloodPressure!,
                height: payload?.height!,
                pulse: payload?.pulse!,
                temperature: payload?.temperature!,
                weight: payload?.weight!,
                services: servicesList ?? [],
                medicines: medicineList ?? [],
                finalConsultation: payload?.diagnosis!,
                year: dayjs().format('YYYY'),
                day: dayjs().format('DD'),
                month: dayjs().format('MM'),
                doctorName: doctorName,
            }
            console.log(data)
            const res = await generateGeneralMedicalReportPdf(data).unwrap()
            loadingMessage();
            setIsLoadingPdf(false)
            if (res instanceof Blob) {
                setPdfBlob(res)
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
        } catch (error) {}
    }

    return (
        <div className="flex w-full flex-col gap-5 rounded-xl bg-white p-5 shadow-third">
            <div className="flex w-full flex-col gap-4">
                <div className="flex w-full flex-row justify-between">
                    <div className="flex flex-col gap-2">
                        {isFetching ? (
                            <Skeleton.Input className="h-[20px] w-[244px]" />
                        ) : (
                            <p className="font-bold">
                                Mã phiếu khám:{' '}
                                <span className="font-medium">
                                    {searchParam.get('id')}
                                </span>
                            </p>
                        )}
                        {isFetching ? (
                            <Skeleton.Input className="h-[20px] w-[244px]" />
                        ) : (
                            <p className="font-bold">
                                Thời gian khám:{' '}
                                <span className="font-medium">
                                    {dayjs(payload?.date).format('HH:mm') +
                                        ' ' +
                                        dayjs(payload?.date).format(
                                            'DD/MM/YYYY',
                                        )}
                                </span>
                            </p>
                        )}
                    </div>
                </div>
                <div className="flex w-full flex-col gap-5">
                    <div className="flex h-fit w-full flex-col gap-5 sm:flex-row">
                        <div className="flex flex-col">
                            {isFetching ? (
                                <Skeleton.Input className="w-full sm:w-[224px]" />
                            ) : (
                                <>
                                    {' '}
                                    <span className="text-[12px] text-secondarySupperDarker">
                                        Tiền sử bệnh án
                                    </span>
                                    <p className="w-full rounded-[6px] bg-[#E9ECEF] px-[10px] py-[4px] text-[12px] font-semibold text-secondarySupperDarker sm:w-[224px]">
                                        {payload?.medicalHistory
                                            ? payload?.medicalHistory
                                            : 'Chưa có thông tin'}
                                    </p>
                                </>
                            )}
                        </div>
                        <div className="flex flex-col">
                            {isFetching ? (
                                <Skeleton.Input className="w-full sm:w-[224px]" />
                            ) : (
                                <>
                                    {' '}
                                    <span className="text-[12px] text-secondarySupperDarker">
                                        Tổng trạng chung
                                    </span>
                                    <p className="w-full rounded-[6px] bg-[#E9ECEF] px-[10px] py-[4px] text-[12px] font-semibold text-secondarySupperDarker sm:w-[224px]">
                                        {payload?.generalCondition
                                            ? payload?.generalCondition
                                            : 'Chưa có thông tin'}
                                    </p>
                                </>
                            )}
                        </div>
                        <div className="flex flex-col">
                            {isFetching ? (
                                <Skeleton.Input className="w-full sm:w-[224px]" />
                            ) : (
                                <>
                                    {' '}
                                    <span className="text-[12px] text-secondarySupperDarker">
                                        Chiều cao
                                    </span>
                                    <p className="w-full rounded-[6px] bg-[#E9ECEF] px-[10px] py-[4px] text-[12px] font-semibold text-secondarySupperDarker sm:w-[224px]">
                                        {payload?.height
                                            ? payload?.height
                                            : 'Chưa có thông tin'}
                                    </p>
                                </>
                            )}
                        </div>
                        <div className="flex flex-col">
                            {isFetching ? (
                                <Skeleton.Input className="w-full sm:w-[224px]" />
                            ) : (
                                <>
                                    <span className="text-[12px] text-secondarySupperDarker">
                                        Cân nặng
                                    </span>
                                    <p className="w-full rounded-[6px] bg-[#E9ECEF] px-[10px] py-[4px] text-[12px] font-semibold text-secondarySupperDarker sm:w-[224px]">
                                        {payload?.weight
                                            ? payload?.weight
                                            : 'Chưa có thông tin'}
                                    </p>
                                </>
                            )}
                        </div>
                    </div>
                    <div className="flex h-fit w-full flex-col gap-5 sm:flex-row">
                        <div className="flex flex-col">
                            {isFetching ? (
                                <Skeleton.Input className="w-full sm:w-[224px]" />
                            ) : (
                                <>
                                    <span className="text-[12px] text-secondarySupperDarker">
                                        Mạch
                                    </span>
                                    <p className="w-full rounded-[6px] bg-[#E9ECEF] px-[10px] py-[4px] text-[12px] font-semibold text-secondarySupperDarker sm:w-[224px]">
                                        {payload?.pulse
                                            ? payload?.pulse
                                            : 'Chưa có thông tin'}
                                    </p>
                                </>
                            )}
                        </div>
                        <div className="flex flex-col">
                            {isFetching ? (
                                <Skeleton.Input className="w-full sm:w-[224px]" />
                            ) : (
                                <>
                                    {' '}
                                    <span className="text-[12px] text-secondarySupperDarker">
                                        Nhiệt
                                    </span>
                                    <p className="w-full rounded-[6px] bg-[#E9ECEF] px-[10px] py-[4px] text-[12px] font-semibold text-secondarySupperDarker sm:w-[224px]">
                                        {payload?.temperature
                                            ? payload?.temperature
                                            : 'Chưa có thông tin'}
                                    </p>
                                </>
                            )}
                        </div>
                        <div className="flex flex-col">
                            {isFetching ? (
                                <Skeleton.Input className="w-full sm:w-[224px]" />
                            ) : (
                                <>
                                    <span className="text-[12px] text-secondarySupperDarker">
                                        Huyết áp
                                    </span>
                                    <p className="w-full rounded-[6px] bg-[#E9ECEF] px-[10px] py-[4px] text-[12px] font-semibold text-secondarySupperDarker sm:w-[224px]">
                                        {payload?.bloodPressure
                                            ? payload?.bloodPressure
                                            : 'Chưa có thông tin'}
                                    </p>
                                </>
                            )}
                        </div>
                    </div>
                    <div>
                        <div className="flex flex-col">
                            {isFetching ? (
                                <Skeleton.Input className="w-full sm:w-[224px]" />
                            ) : (
                                <>
                                    {' '}
                                    <span className="text-[12px] text-secondarySupperDarker">
                                        Chuẩn đoán
                                    </span>
                                    <p
                                        className="w-full rounded-[6px] bg-[#E9ECEF] px-[10px] py-[4px] text-[12px] font-semibold text-secondarySupperDarker sm:w-[224px]"
                                        dangerouslySetInnerHTML={{
                                            __html: payload?.diagnosis
                                                ? payload?.diagnosis
                                                : 'Chưa có thông tin',
                                        }}
                                    ></p>
                                </>
                            )}
                        </div>
                    </div>
                    <div className="flex flex-col gap-5 sm:flex-row">
                        <Button
                            type="primary"
                            className="rounded-xl bg-secondaryDark !p-[20px] font-semibold shadow-third"
                            onClick={() => handleEditMedicalReport()}
                        >
                            Chỉnh sửa
                            <Edit size={18} />
                        </Button>
                        <Button
                            loading={isLoadingPdf}
                            type="primary"
                            className="rounded-xl border-2 border-secondaryDark bg-white !p-[20px] font-semibold text-secondarySupperDarker shadow-third"
                            onClick={() => handlePrintMedicalReport()}
                        >
                            In phiếu khám
                            <Printer size={18} />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
