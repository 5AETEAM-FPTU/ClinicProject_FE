'use client'
import NotFound from '@/components/Core/common/NotFound'
import { motion } from 'framer-motion'
import { useSearchParams } from 'next/navigation'
import MainMedicalReport from './MainMedicalReport'
import PatientInforComponent from './PatientInforComponents'

export default function CreateMedicalReport() {
    const searchParam = useSearchParams()
    const reportId = searchParam.get('id')
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
                    <div>
                        <h3 className="text-[20px] font-semibold text-secondarySupperDarker">
                            Tạo phiếu khám
                        </h3>
                    </div>
                    <div className="h-fit w-full rounded-xl p-5 shadow-third bg-white">
                        <PatientInforComponent />
                    </div>
                    <MainMedicalReport />
                </motion.div>
            )}
        </motion.div>
    )
}
