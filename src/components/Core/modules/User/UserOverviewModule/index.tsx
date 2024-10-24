'use client'

import { Layout, Skeleton } from 'antd'
import { Content } from 'antd/es/layout/layout'
import { motion } from 'framer-motion'
import DoctorIncomingCalender from './UserIncomingCalender'
import UserExaminedTurn from './UserExaminedTurn'
import UserIncomingCalender from './UserIncomingCalender'
import UserAvailableDoctor from './UserAvailableDoctor'
import UserProfile from './UserProfile'
import UserMedicalHistory from './UserMedicalHistory'
import UserRecentlyAction from './UserRencentlyAction'
import { useGetAppointmentUpcomingQuery } from '@/stores/services/user/userAppointments'

interface AppointmentUpcoming {
    upcomingDate: string
    totalAppointmentedPation: number
}

export default function UserOverViewModule() {
    const { results, isFetching } = useGetAppointmentUpcomingQuery(undefined, {
        selectFromResult: ({ data, isFetching }) => ({
            results: (data?.body as AppointmentUpcoming) ?? [],
            isFetching: isFetching,
        }),
    })

    return (
        <motion.div
            initial={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            exit={{ opacity: 0 }}
        >
            <Layout className="bg-dashboardBackground">
                <Content style={{ padding: '0px' }}>
                    <div className="flex w-full flex-col gap-5 xl:flex-row">
                        <div className="order-2 flex w-full flex-col gap-5 xl:order-none xl:w-1/2">
                            <div className="flex h-[166px] w-full flex-row gap-5">
                                {isFetching ? (
                                    <Skeleton.Button className="h-full w-full" />
                                ) : (
                                    <UserIncomingCalender
                                        upcomingDate={results.upcomingDate}
                                    />
                                )}
                                {isFetching ? (
                                    <Skeleton.Button className="h-full w-full" />
                                ) : (
                                    <UserExaminedTurn
                                        numberExaminedTurn={
                                            results.totalAppointmentedPation
                                        }
                                    />
                                )}
                            </div>
                            <UserAvailableDoctor />
                            <UserRecentlyAction />
                        </div>
                        <div className="order-1 flex w-full flex-col gap-5 xl:order-none xl:w-1/2">
                            <UserProfile />
                            <UserMedicalHistory />
                        </div>
                    </div>
                </Content>
            </Layout>
        </motion.div>
    )
}
