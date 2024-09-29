'use client'
import { Layout, Typography } from 'antd'
import { motion } from 'framer-motion'
import { DoctorUpdateProfileComponent } from './DoctorUpdateProfileComponent'
import { useGetDoctorProfileQuery } from '@/stores/services/doctor/doctorSettings'
import DoctorUpdateGeneral from './DoctorUpdateGeneral'
import { useEffect } from 'react'
import DoctorUpdateSelfAbout from './DoctotUpdateSelfAbout'
import DoctorUpdateAchievement from './DoctorUpdateAchievement'
import DoctorChangePassword from './DoctorChangePassword'

const { Content } = Layout

export type DoctorProfileTypes = {
    achievement: string | null
    avatarUrl: string
    fullName: string | null
    description: string | null
    address: string
    gender: {
        id: string
        genderName: string
    }
    position: {
        id: string
        positionName: string
    }
    specialties: {
        id: string
        specialtyName: string
    }[]
    username: string
    phoneNumber: string | null
    dob: string | null
}

export default function DoctorSettingsModule() {
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

    console.log('doctor', result)

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
            <Layout
                style={{ minHeight: '100vh' }}
                className="bg-dashboardBackground"
            >
                <Content style={{ padding: '0px' }}>
                    <DoctorUpdateProfileComponent
                        isProfileFetching={isFetching}
                        profile={result}
                    />
                    <div className="flex h-fit w-full flex-row gap-6">
                        <div className="flex w-full flex-col gap-6">
                            <DoctorUpdateGeneral
                                isProfileFetching={isFetching}
                                profile={result}
                            />
                            <DoctorUpdateAchievement
                                isProfileFetching={isFetching}
                                profile={result}
                            />
                        </div>
                        <div className="flex w-full flex-col gap-6">
                            <DoctorUpdateSelfAbout
                                isProfileFetching={isFetching}
                                profile={result}
                                refetch={refetch}
                            />
                            <DoctorChangePassword
                                isProfileFetching={isFetching}
                                profile={result}
                            />
                        </div>
                    </div>
                </Content>
            </Layout>
        </motion.div>
    )
}
