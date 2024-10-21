'use client'

import { Layout } from 'antd'
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
    upcomingDate: string,
    totalAppointmentedPation: number
}

export default function UserOverViewModule() {
    const { results } = useGetAppointmentUpcomingQuery(
        undefined,
        {
            selectFromResult: ({ data, isFetching }) => ({
                results: (data?.body as AppointmentUpcoming) ?? [],
                isFetching: isFetching,
            }),
        },
    )



    return (
        <motion.div
            initial={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            exit={{ opacity: 0 }}
        >
            <Layout className="bg-dashboardBackground">
                <Content style={{ padding: '0px' }}>
                    <div className="flex w-full xl:flex-row flex-col gap-5">
                        <div className="flex xl:w-1/2 w-full flex-col gap-5 order-2 xl:order-none">
                            <div className="flex h-[166px] w-full flex-row gap-5">
                                <UserIncomingCalender upcomingDate={results.upcomingDate} />
                                <UserExaminedTurn numberExaminedTurn={results.totalAppointmentedPation} />
                            </div>
                            <UserAvailableDoctor />
                            <UserRecentlyAction />
                        </div>
                        <div className="flex xl:w-1/2 w-full flex-col gap-5 order-1 xl:order-none">
                            <UserProfile />
                            <UserMedicalHistory />
                        </div>
                    </div>
                </Content>
            </Layout>
        </motion.div>
    )
}
