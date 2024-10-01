'use client'
import { Button, Layout, Typography } from 'antd'
import { motion } from 'framer-motion'
import AppointmentPending, { IAppointmentOnDay } from './AppointmentPending'
import AppointmentDone from './AppointmentDone'
import { useState } from 'react'
import { useGetAllAppointmentStatusQuery } from '@/stores/services/enum/enum'
import { useGetAppointmentOnDayQuery } from '@/stores/services/doctor/doctorTreatmentTurn'
import dayjs from 'dayjs'
const { Content } = Layout

interface StatusOption {
    id: string
    statusName: string
    constant: string
}

export default function DoctorVisitInDayModule() {
    const { appointments, refetch, isFetching } = useGetAppointmentOnDayQuery(
        { date: '2024-10-01T21:29:16' },
        {
            selectFromResult: ({ data, isFetching }) => ({
                appointments: data?.body?.appointment ?? [],
                isFetching: isFetching,
            }),
        },
    )

    console.log(appointments)

    return (
        <motion.div
            initial={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            exit={{ opacity: 0 }}
        >
            <Layout
                style={{ minHeight: '100vh' }}
                className="bg-dashboardBackground"
            >
                <Content style={{ padding: '0px' }}>
                    <div className="px-2">
                        <h3 className="text-xl font-semibold text-[#003553]">
                            Lượt khám hôm nay
                        </h3>
                        <h6 className="my-5 text-base font-semibold text-[#0284C7]">
                            {dayjs(Date.now()).format('DD/MM/YYYY')}
                        </h6>
                    </div>
                    <div className="px flex w-full flex-grow gap-5">
                        <div className="w-full">
                            <span className="mb-2 block px-2 text-[16px] font-semibold text-[#003553]">
                                Đang chờ khám
                            </span>
                            <div className="flex flex-col gap-5">
                                {/* {
                                appointments.map((appointment: IAppointmentOnDay, index: number) => {
                                    return (
                                        <AppointmentPending payload={appointment} key={index}/>
                                    )
                                })} */}

                                {appointments
                                    .filter(
                                        (appointment: IAppointmentOnDay) =>
                                            appointment.appointmentStatus
                                                .constant === 'Pending',
                                    )
                                    .map(
                                        (
                                            appointment: IAppointmentOnDay,
                                            index: number,
                                        ) => {
                                            return (
                                                <AppointmentPending
                                                    payload={appointment}
                                                    key={index}
                                                />
                                            )
                                        },
                                    )}
                            </div>
                        </div>
                        <div className="w-full">
                            <span className="mb-2 block px-2 text-[16px] font-semibold text-[#003553]">
                                Đã khám xong
                            </span>
                            <div className="flex flex-col gap-5">
                                <AppointmentDone />
                            </div>
                        </div>
                    </div>
                </Content>
            </Layout>
        </motion.div>
    )
}

export function AppointmentStatus() {
    const [selectedStatus, setSelectedStatus] = useState<string>('waiting')
    const { statusOptions } = useGetAllAppointmentStatusQuery(undefined, {
        selectFromResult: ({ data }) => {
            return {
                statusOptions: data?.body?.appointmentStatuses ?? [],
            }
        },
    })

    const handleStatusChange = (id: string) => {
        setSelectedStatus(id)
    }

    return (
        <div className="flex w-48 flex-col gap-2 rounded-md">
            {statusOptions.map((option: StatusOption) => (
                <Button
                    key={option.id}
                    onClick={() => handleStatusChange(option.id)}
                    className={`w-full border-none px-4 py-2 text-left transition-colors ${
                        selectedStatus === option.id
                            ? 'bg-blue-100 text-secondaryDark'
                            : 'hover:bg-gray-50'
                    }`}
                >
                    {option.statusName}
                </Button>
            ))}
        </div>
    )
}
