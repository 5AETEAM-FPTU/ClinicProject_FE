'use client'
import { Button, Skeleton } from 'antd'
import { LucideView, Printer } from 'lucide-react'
import { usePathname, useSearchParams } from 'next/navigation'
import React, { useState } from 'react'
import { TMedicalReport, TMedicine, TService } from '..'
import dayjs from 'dayjs'
import { useRouter } from 'next-nprogress-bar'
import MedicineIndicationView from './MedicinIndicationView'
import ServiceIndicationView from './ServiceIndicationView'

type TProps = {
    payload: TMedicalReport
    isFetching: boolean
    service: TService
    medicine: TMedicine
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


export default function MainMedicalReportViewInformation({
    payload,
    service,
    medicine,
    isFetching,
}: TProps) {
    const [activeButton, setActiveButton] = useState<string | null>(null)
    const searchParam = useSearchParams()
    const router = useRouter()
    const pathname = usePathname()

    console.log(pathname)
    const handleIndication = () => {
        setActiveButton('indication')
    }

    const handlePrescription = () => {
        setActiveButton('prescription')
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
                            type="primary"
                            className="rounded-xl border-2 border-secondaryDark bg-white !p-[20px] font-semibold text-secondarySupperDarker shadow-third"
                        >
                            Xuất phiếu khám
                            <Printer size={18} />
                        </Button>
                    </div>
                    <div>
                        {activeButton === 'indication' ? (
                            <ServiceIndicationView
                                payload={service}
                                isFetching={false}
                            />
                        ) : activeButton === 'prescription' ? (
                            <MedicineIndicationView
                                payload={medicine}
                                isFetching={false}
                            />
                        ) : (
                            <></>
                        )}
                    </div>
                    <div>
                        <div className="mt-4 text-left text-[#003553]">
                            <strong>Tổng số xét nghiệm: </strong> {service?.quantity}
                        </div>
                        <div className="mt-4 text-left text-[#003553]">
                            <strong>Tổng cộng: </strong> {service?.totalPrice}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
