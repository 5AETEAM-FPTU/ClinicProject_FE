'use client'

import { Button, Input, Layout, message, Skeleton } from 'antd'
import { motion } from 'framer-motion'
import { ScanSearch } from 'lucide-react'
import DoctorAbsentInformation, {
    ICancelAppointment,
} from './DoctorAbsentInformation'
import { useGetCancelAppointmentQuery } from '@/stores/services/doctor/doctorTreatmentTurn'
import _ from 'lodash'
import { useUpdateAppointmentStatusMutation } from '@/stores/services/appointment'
import { useGetAllAppointmentStatusQuery } from '@/stores/services/enum/enum'
import { useEffect } from 'react'

const { Content } = Layout
export default function DoctorCancelAppointmentModule() {
    const { result, isFetching, refetch } = useGetCancelAppointmentQuery(
        undefined,
        {
            selectFromResult: ({ data, isFetching }) => {
                return {
                    result:
                        (data?.body?.appointment as ICancelAppointment[]) ?? [],
                    isFetching: isFetching,
                }
            },
        },
    )

    console.log(result)

    useEffect(() => {
        refetch()
    }, [])

    return (
        <motion.div
            initial={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            exit={{ opacity: 0 }}
        >
            <Layout className="bg-dashboardBackground">
                <Content style={{ padding: '0px' }}>
                    <div className="mr-2 flex flex-col items-center justify-between gap-2 xl:flex-row">
                        <h3 className="text-xl font-semibold text-[#003553]">
                            Các lượt khám bị hủy bỏ
                        </h3>
                        <Input
                            prefix={<ScanSearch size={18} className="mr-2" />}
                            placeholder="Tìm lượt khám bị hủy"
                            className="shadow-sm w-full rounded-full border-2 border-blue-300 text-[14px] font-bold text-[#003553] focus:border-blue-400 xl:w-1/4"
                        />
                    </div>
                    <div className="grid w-full grid-cols-1 gap-5 pt-[20px] sm:grid-cols-2">
                        {isFetching ? (
                            <>
                                {Array.from({ length: 6 }).map((_, index) => (
                                    <Skeleton.Button
                                        key={index}
                                        active
                                        className="min-h-[205px] w-full rounded-[12px]"
                                    />
                                ))}
                            </>
                        ) : (
                            <>
                                {result.length === 0 && (
                                    <p className='text-[16px] font-bold text-secondarySupperDarker opacity-80'>
                                        Chưa có nội dung
                                    </p>
                                )}

                                {result?.map((appointment, index) => {
                                    return (
                                        <DoctorAbsentInformation
                                            payload={appointment}
                                            key={index}
                                            refetch={refetch}
                                        />
                                    )
                                })}
                            </>
                        )}
                    </div>
                </Content>
            </Layout>
        </motion.div>
    )
}
