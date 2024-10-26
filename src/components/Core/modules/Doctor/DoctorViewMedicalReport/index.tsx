'use client'
import React, { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import UnAccessable from '@/components/Core/common/UnAccesable'
import NotFound from '@/components/Core/common/NotFound'
import { motion } from 'framer-motion'
import PatientViewInformation from './PatientViewInformation'
import MainMedicalReportViewInformation from './MainMedicalReportViewInformation'
import { useGetMedicalReportByIdQuery } from '@/stores/services/report/medicalReport'
import { useRouter } from 'next-nprogress-bar'
import { Button } from 'antd'
import { MoveLeft } from 'lucide-react'

export type TMedicalReport = {
    reportId: string
    date: string
    medicalHistory: string
    generalCondition: string
    weight: string
    height: string
    pulse: string
    temperature: string
    bloodPressure: string
    diagnosis: string
}

export type TPatientInfo = {
    patientId: string
    fullName: string
    dob: string
    avatar: string
    address: string
    gender: string
    phoneNumber: string
}

export type TService = {
    serviceOrderId: string
    quantity: number
    totalPrice: number
}

export type TMedicine = {
    medicineOrderId: string
}

export type MedicalReportResponseBody = {
    patientInfor: TPatientInfo
    medicalReport: TMedicalReport
    service: TService
    medicine: TMedicine
}

export function DoctorViewMedicalReport() {
    const searchParam = useSearchParams()
    const reportId = searchParam.get('id')
    const router = useRouter();

    const { report, refetch, isFetching } = useGetMedicalReportByIdQuery(
        reportId!,
        {
            skip: !reportId,
            selectFromResult: ({ data, isFetching }) => ({
                report: data?.body as MedicalReportResponseBody ?? {},
                isFetching: isFetching,
            }),
        },
    )

    useEffect(() => {
        refetch()
    }, [reportId])


    return (
        <div>
            {!reportId && report ? (
                <NotFound />
            ) : (
            <motion.div
                initial={{ opacity: 0, translateY: 20 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                exit={{ opacity: 0 }}
                className="flex h-fit w-full flex-col gap-5"
            >
                <div className="flex w-full justify-between">
                    <h3 className="text-[20px] font-semibold text-secondarySupperDarker">
                        Xem phiếu khám
                    </h3>
                    <div>
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
                </div>
                <div className="h-fit w-full rounded-xl bg-white p-5 shadow-third">
                    <PatientViewInformation
                        payload={report?.patientInfor}
                       
                        isFetching={false}
                    />
                </div>
                <MainMedicalReportViewInformation
                    payload={report?.medicalReport}
                    service={report?.service}
                    medicine={report?.medicine}
                    isFetching={isFetching}
                    patientInfor={report?.patientInfor}
                />
            </motion.div>
            )}
        </div>
    )
}
