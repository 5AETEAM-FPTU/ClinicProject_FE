'use client'
import { Layout, Typography } from 'antd'
import { motion } from 'framer-motion'
import { useGetDoctorProfileQuery } from '@/stores/services/doctor/doctorSettings'
import { useEffect } from 'react'
import { StaffChangeAvatar } from './StaffChangeAvatar'
import StaffUpdateGeneral from './StaffUpdateGeneral'
import StaffChangePassword from './StaffChangePasword'
import StaffUpdateDescription from './StaffUpdateDescription'
import StaffUpdateAchievement from './StaffChangeAchievement'


const { Content } = Layout

export type DoctorProfileTypes = {
    achievement: string | null
    avatarUrl: string
    fullName: string | null
    description: string | null
    address: string
    gender: string | null
    position: string | null
    specialty: string | null
    username: string
    phoneNumber: string | null
    dob: string | null
}

export default function StaffSettingsModule() {
    const { result, isFetching, refetch } = useGetDoctorProfileQuery(
        undefined,
        {
            selectFromResult: ({ data, isFetching }) => {
                return {
                    result: data?.body?.user ?? {},
                    isFetching: isFetching,
                }
            },
        },
    )

    console.log(result)

    useEffect(() => {
        refetch()
    }, [refetch])
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
                    <StaffChangeAvatar isProfileFetching={isFetching} profile={result}/>
                    <div className="flex h-fit w-full flex-row gap-6">
                        <div className="flex w-full flex-col gap-6">
                            <StaffUpdateGeneral
                                isProfileFetching={isFetching}
                                profile={result}
                            />
                            {/* <StaffUpdateAchievement
                                isProfileFetching={isFetching}
                                profile={result}
                            /> */}
                        </div>
                        <div className="flex w-full flex-col gap-6">
                            <StaffUpdateDescription
                                isProfileFetching={isFetching}
                                profile={result}
                                refetch={refetch}
                            />
                            <StaffChangePassword isProfileFetching={isFetching} profile={result} />
                        </div>
                    </div>
                </Content>
            </Layout>
        </motion.div>
    )
}
