'use client'
import { useGetAppointmentOnDayForStaffQuery } from '@/stores/services/doctor/doctorTreatmentTurn'
import { Avatar, Button, Layout, Skeleton } from 'antd'
import dayjs from 'dayjs'
import { motion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import AppointmentDone from './AppointmentDone'
import AppointmentPending, { IAppointmentOnDay } from './AppointmentPending'
import { useSearchParams } from 'next/navigation'
import { Calendar } from 'lucide-react'
const { Content } = Layout

type TProps = {
    doctorId: string
}

export default function StaffDoctorVisitInDayModule({ doctorId }: TProps) {
    const searchParams = useSearchParams()
    const { doctorName, specialties, dutyStatus, avatarUrl } = {
        doctorName: searchParams.get('doctorName') || 'Tên bác sĩ',
        specialties: searchParams.get('specialties') || 'Nội tim mạch',
        dutyStatus:
            searchParams.get('isOnDuty') == 'true'
                ? 'Đang trực'
                : 'Đang nghỉ ngơi',
        avatarUrl: searchParams.get('avatarUrl') || '',
    }
    const now = useMemo(() => dayjs(new Date(Date.now())).toISOString(), [])

    const { appointments, refetch, isFetching } =
        useGetAppointmentOnDayForStaffQuery(
            { date: new Date().toDateString(), doctorId: doctorId },
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
                    <div className="relative mb-5 w-[100%] cursor-pointer flex-row gap-5 rounded-xl bg-white p-5 shadow-third transition-all hover:bg-slate-50">
                        <div className="flex">
                            <div>
                                <Avatar
                                    size={80}
                                    shape="square"
                                    src={avatarUrl}
                                />
                            </div>
                            <div className="relative ml-4 w-full">
                                <p className="text-[16px] font-semibold text-secondarySupperDarker">
                                    {doctorName}
                                </p>
                                <p className="text-[16px] font-semibold text-[#00355380]">
                                    Chuyên khoa: {specialties}
                                </p>
                                <p className="text-[16px] font-semibold text-[#00355380]">
                                    Trạng thái: {dutyStatus}
                                </p>
                            </div>
                            <div
                                className={`absolute right-5 top-5 h-[12px] w-[12px] rounded-full bg-secondaryDarker ${!searchParams.get('isOnDuty') && 'opacity-40'}`}
                            ></div>
                            <div className="self-end">
                                <Button
                                    type="primary"
                                    onClick={() => { }}
                                    className="float-end h-[33px] bg-[#0284C7] text-white"
                                    iconPosition="end"
                                    icon={<Calendar size={18} />}
                                >
                                    Xem lượt khám
                                </Button>
                            </div>
                        </div>
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
                                            <p className="ml-2 font-semibold text-secondarySupperDarker">
                                                Chưa có lượt khám trong ngày hôm
                                                nay.
                                            </p>
                                        ) : (
                                            <>
                                                {appointmentPendingList?.map(
                                                    (appointment, index) => {
                                                        return (
                                                            <AppointmentPending
                                                                refetch={
                                                                    refetch
                                                                }
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
                                            <p className="ml-2 font-semibold text-secondarySupperDarker">
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
                                                                refetch={
                                                                    refetch
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
                    </div>
                </Content>
            </Layout>
        </motion.div>
    )
}
