'use client'
import { Button, message, Skeleton } from 'antd'
import { LucideView, Printer } from 'lucide-react'
import { usePathname, useSearchParams } from 'next/navigation'
import React, { useState } from 'react'
import { TMedicalReport, TMedicine, TService } from '..'
import dayjs from 'dayjs'
import { useRouter } from 'next/navigation'
import MedicineIndicationView from './MedicinIndicationView'
import ServiceIndicationView from './ServiceIndicationView'
import { useGetServiceOrderDetailQuery } from '@/stores/services/report/serviceOrder'
import { useGetMedicineOrderByIdQuery } from '@/stores/services/report/medicineOrder'
import { TPatientInfo } from '../../DoctorMedicalReport/ViewMedialReportModule'
import webStorageClient from '@/utils/webStorageClient'
import { useGetGeneralMedicalReportPdfMutation } from '@/stores/services/report/generatePdf'
import { generateReportCode } from '@/utils/generateCode'
import { constants } from '@/settings'

type TProps = {
    payload: TMedicalReport
    isFetching: boolean
    service: TService
    medicine: TMedicine
    patientInfor?: TPatientInfo
}

export type Medicine = {
    id: number
    name: string
    usage: string
    quantity: number
    form: string
}

export type MedicineDetail = {
    description: string
    medicines: Medicine[]
}

export type MProps = {
    payload: MedicineDetail
    isFetching: boolean
}

export type Test = {
    id: number
    code: string
    name: string
    price: number
}

export type ServiceDetail = {
    tests: Test[]
}

export type SProps = {
    payload: ServiceDetail[]
    isFetching: boolean
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
export type Prescription = {
    id: string
    totalItem: number
    note: string
    items: {
        quantity: number
        description: string
        medicine: {
            id: string
            name: string
            type: {
                id: string
                name: string
                constant: string
            }
        }
    }[]
}
export interface ServiceOrder {
    id: string
    quantity: number
    totalPrice: number
    isAllUpdated: boolean
    items: {
        isUpdated: boolean
        priceAtOrder: number
        service: {
            id: string
            code: string
            name: string
            description: string
            group: string
        }
    }[]
}
export default function MainMedicalReportViewInformation({
    payload,
    service,
    medicine,
    isFetching,
    patientInfor,
}: TProps) {
    const [activeButton, setActiveButton] = useState<string | null>(null)
    const searchParam = useSearchParams()
    const router = useRouter()

    const handleIndication = () => {
        setActiveButton('indication')
    }

    const handlePrescription = () => {
        setActiveButton('prescription')
    }

    const { serviceOrder } = useGetServiceOrderDetailQuery(
        service?.serviceOrderId!,
        {
            skip: !service?.serviceOrderId,
            selectFromResult: ({ data }) => ({
                serviceOrder: (data?.body?.serviceOrder as ServiceOrder) ?? {},
            }),
        },
    )
    const { medicineOrder } = useGetMedicineOrderByIdQuery(
        medicine?.medicineOrderId!,
        {
            skip: !medicine?.medicineOrderId,
            selectFromResult: ({ data }) => ({
                medicineOrder:
                    (data?.body?.medicineOrder as Prescription) ?? {},
            }),
        },
    )

    const doctorName = webStorageClient.get(constants.USER_FULLNAME)
    const [generateGeneralMedicalReportPdf] =
        useGetGeneralMedicalReportPdfMutation()
    const [pdfBlob, setPdfBlob] = useState<Blob | null>(null)
    const [isLoadingPdf, setIsLoadingPdf] = useState(false)
    const handlePrintMedicalReport = async () => {
        try {
            setIsLoadingPdf(true)
            const loadingMessage = message.loading(
                'Đang tiến hành tạo kết quả...',
                0,
            )
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
            loadingMessage()
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
                            className={`rounded-xl !p-[20px] font-semibold shadow-third ${activeButton === 'indication' ? 'bg-secondaryDark text-white' : 'bg-white text-secondarySupperDarker'}`}
                            onClick={handleIndication}
                        >
                            Xem chỉ định
                            <LucideView size={18} />
                        </Button>
                        <Button
                            type="primary"
                            className={`rounded-xl !p-[20px] font-semibold shadow-third ${activeButton === 'prescription' ? 'bg-secondaryDark text-white' : 'bg-white text-secondarySupperDarker'}`}
                            onClick={handlePrescription}
                        >
                            Xem đơn thuốc
                            <LucideView size={18} />
                        </Button>
                        <Button
                            loading={isLoadingPdf}
                            onClick={handlePrintMedicalReport}
                            type="primary"
                            className="rounded-xl border-2 border-secondaryDark bg-white !p-[20px] font-semibold text-secondarySupperDarker shadow-third"
                        >
                            Xuất phiếu khám
                            <Printer size={18} />
                        </Button>
                    </div>
                    <div>
                        {activeButton === 'indication' ? (
                            <ServiceIndicationView service={serviceOrder} />
                        ) : activeButton === 'prescription' ? (
                            <MedicineIndicationView medicine={medicineOrder} />
                        ) : (
                            <></>
                        )}
                    </div>
                    <div>
                        <div className="mt-4 text-left text-[#003553]">
                            <strong>Tổng số xét nghiệm: </strong>{' '}
                            {serviceOrder?.quantity}
                        </div>
                        <div className="mt-4 text-left text-[#003553]">
                            <strong>Tổng cộng: </strong>{' '}
                            {new Intl.NumberFormat('vi-VN', {
                                style: 'currency',
                                currency: 'VND',
                            }).format(serviceOrder?.totalPrice)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
