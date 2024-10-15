'use client'
import NotFound from '@/components/Core/common/NotFound'
import { motion } from 'framer-motion'
import { useSearchParams } from 'next/navigation'
import MainMedicalReport from './MainMedicalReport'
import PatientInforComponent from './PatientInforComponents'
import { useGetMedicalReportByIdQuery } from '@/stores/services/report/medicalReport'
import { useEffect } from 'react'
import { Button } from 'antd'
import { MoveLeft } from 'lucide-react'
import { useRouter } from 'next-nprogress-bar'

export default function CreateMedicalReport() {
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
        refetch();
    }, [])

    return (
        <motion.div>
            {!reportId ? (
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
                            Tạo phiếu khám
                        </h3>
                        <div>
                            <Button type='default' className='border-none shadow-third' onClick={() => {router.back()}}> <MoveLeft size={18} />Quay lại</Button>
                        </div>
                    </div>
                    <div className="h-fit w-full rounded-xl p-5 shadow-third bg-white">
                        <PatientInforComponent payload={report?.patientInfor} refetch={refetch} isFetching={isFetching}/>
                    </div>
                    <MainMedicalReport payload={report?.medicalReport} refetch={refetch} isFetching={isFetching}/>
                </motion.div>
            )}
        </motion.div>
    )
}
