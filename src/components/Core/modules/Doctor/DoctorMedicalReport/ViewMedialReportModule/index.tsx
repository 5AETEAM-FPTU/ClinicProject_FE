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
    quantiry: number
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

export default function ViewMedicalReportModule() {
    const searchParam = useSearchParams()
    const reportId = searchParam.get('id')
    const router = useRouter();

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
                    <div className='w-full flex justify-between'>
                        <h3 className="text-[20px] font-semibold text-secondarySupperDarker">
                            Xem phiếu khám
                        </h3>
                        <div>
                            <Button type='default' className='border-none shadow-third' onClick={() => {router.back()}}> <MoveLeft size={18} />Quay lại</Button>
                        </div>
                    </div>
                    <div className="h-fit w-full rounded-xl bg-white p-5 shadow-third">
                        <PatientViewInformation
                            payload={report?.patientInfor}
                            isFetching={isFetching}
                        />
                    </div>
                    <MainMedicalReportViewInformation
                        payload={report?.medicalReport}
                        patientInfor={report?.patientInfor}
                        isFetching={isFetching}
                        serviceOrderId={report?.service?.serviceOrderId}
                        medicineOrderId={report?.medicine?.medicineOrderId}
                    />
                </motion.div>
            )}
        </div>
    )
}
