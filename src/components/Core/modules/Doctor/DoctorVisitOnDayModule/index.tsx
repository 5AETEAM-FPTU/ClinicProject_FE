'use client'
import { Button, Layout, Skeleton, Typography } from 'antd'
import { motion } from 'framer-motion'
import AppointmentPending, { IAppointmentOnDay } from './AppointmentPending'
import AppointmentDone from './AppointmentDone'
import { useEffect, useMemo, useState } from 'react'
import { useGetAllAppointmentStatusQuery } from '@/stores/services/enum/enum'
import { useGetAppointmentOnDayQuery } from '@/stores/services/doctor/doctorTreatmentTurn'
import dayjs from 'dayjs'
const { Content } = Layout

export default function DoctorVisitInDayModule() {
    const now = useMemo(() => dayjs(new Date(Date.now())).toISOString(), []);

    const { appointments, refetch, isFetching } = 
    useGetAppointmentOnDayQuery(
        { date: '2024-10-06T08:30:00' },
        {
            selectFromResult: ({ data, isFetching }) => ({
                appointments: data?.body?.appointment ?? [],
                isFetching: isFetching,
            }),
        },
    )
    
    const [appointmentPendingList, SetAppointmentPendingList] = useState<
        IAppointmentOnDay[] | null
    >(null)
    const [appointmentDoneList, SetAppointmentDoneList] = useState<
        IAppointmentOnDay[] | null
    >(null)

    useEffect(() => {
        var newPendingList = appointments?.filter(
            (appointment: IAppointmentOnDay) =>
                appointment?.appointmentStatus.constant === 'Pending',
        )
        var newDoneList = appointments?.filter(
            (appointment: IAppointmentOnDay) =>
                appointment?.appointmentStatus.constant === 'Completed',
        )
        SetAppointmentPendingList(newPendingList)
        SetAppointmentDoneList(newDoneList)
    }, [refetch, isFetching])

    return (
        <motion.div
            initial={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            exit={{ opacity: 0 }}
        >
            <Layout className="bg-dashboardBackground">
                <Content style={{ padding: '0px' }}>
                    <div className="px-2">
                        <h3 className="text-xl font-semibold text-[#003553]">
                            Lượt khám hôm nay
                        </h3>
                        <h6 className="my-5 text-base font-semibold text-[#0284C7]">
                            {dayjs(Date.now()).format('DD/MM/YYYY')}
                        </h6>
                    </div>
                    <div className="px flex w-full flex-col gap-5 sm:flex-row">
                        <div className="w-full">
                            <span className="mb-2 block px-2 text-[16px] font-semibold text-[#003553]">
                                Đang chờ khám
                            </span>
                            <div className="flex flex-col gap-5">
                                {isFetching ? (
                                    <>
                                        {Array.from({ length: 6 }).map(
                                            (_, index) => {
                                                return (
                                                    <Skeleton.Button
                                                        key={index}
                                                        active
                                                        className="min-h-[205px] w-full rounded-[12px]"
                                                    />
                                                )
                                            },
                                        )}
                                    </>
                                ) : (
                                    <>
                                        {appointmentPendingList?.length == 0 ? (
                                            <p className='font-semibold text-secondarySupperDarker ml-2'>
                                                Chưa có lượt khám trong ngày hôm
                                                nay.
                                            </p>
                                        ) : (
                                            <>
                                                {appointmentPendingList?.map(
                                                    (appointment, index) => {
                                                        return (
                                                            <AppointmentPending
                                                                refetch={refetch}
                                                                payload={
                                                                    appointment
                                                                }
                                                                key={index}
                                                            />
                                                        )
                                                    },
                                                )}
                                            </>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                        <div className="w-full">
                            <span className="mb-2 block px-2 text-[16px] font-semibold text-[#003553]">
                                Đã khám xong
                            </span>
                            <div className="flex flex-col gap-5">
                                {isFetching ? (
                                    <>
                                        {Array.from({ length: 6 }).map(
                                            (_, index) => {
                                                return (
                                                    <Skeleton.Button
                                                        key={index}
                                                        active
                                                        className="min-h-[205px] w-full rounded-[12px]"
                                                    />
                                                )
                                            },
                                        )}
                                    </>
                                ) : (
                                    <>
                                        {appointmentDoneList?.length == 0 ? (
                                            <p className='ml-2 font-semibold text-secondarySupperDarker'>
                                                Chưa có bệnh nhân khám xong
                                                trong ngày
                                            </p>
                                        ) : (
                                            <>
                                                {appointmentDoneList?.map(
                                                    (appointment, index) => {
                                                        return (
                                                            <AppointmentDone
                                                                payload={
                                                                    appointment
                                                                }
                                                                refetch={refetch}
                                                                key={index}
                                                            />
                                                        )
                                                    },
                                                )}
                                            </>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </Content>
            </Layout>
        </motion.div>
    )
}