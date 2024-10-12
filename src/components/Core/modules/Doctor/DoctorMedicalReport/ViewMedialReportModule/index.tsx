'use client'
import React, { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import UnAccessable from '@/components/Core/common/UnAccesable'
import NotFound from '@/components/Core/common/NotFound'
import { motion } from 'framer-motion'
import PatientViewInformation from './PatientViewInformation'
import MainMedicalReportViewInformation from './MainMedicalReportViewInformation'
import { useGetMedicalReportByIdQuery } from '@/stores/services/report/medicalReport'

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
    quantiry: number
    totalPrice: number
}

export type TMedicine = {
    medicineOrderId: string
}

export type MedicalReportResponseBody = {
    patientInfor: TPatientInfo
    medicalReport: TMedicalReport
    services: TService
    medicines: TMedicine
}

export default function ViewMedicalReportModule() {
    const searchParam = useSearchParams()
    const reportId = searchParam.get('id')

    const { report, refetch, isFetching } = useGetMedicalReportByIdQuery(
        reportId!,
        {
            selectFromResult: ({ data, isFetching }) => ({
                report: data?.body ?? {},
                isFetching: isFetching,
            }),
        },
    )

    useEffect(() => {
        refetch()
    }, [])

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
                    <div>
                        <h3 className="text-[20px] font-semibold text-secondarySupperDarker">
                            Xem phiếu khám
                        </h3>
                    </div>
                    <div className="h-fit w-full rounded-xl bg-white p-5 shadow-third">
                        <PatientViewInformation
                            payload={report?.patientInfor}
                            isFetching={isFetching}
                        />
                    </div>
                    <MainMedicalReportViewInformation
                        payload={report?.medicalReport}
                        isFetching={isFetching}
                    />
                </motion.div>
            )}
        </div>
    )
}
