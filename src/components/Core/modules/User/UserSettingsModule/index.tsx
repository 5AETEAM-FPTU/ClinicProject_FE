'use client'
import { useGetUserProfileQuery } from '@/stores/services/user/userSettings'
import { Layout, Typography } from 'antd'
import { motion } from 'framer-motion'
import { useEffect } from 'react'
import { UserUpdateAvatarComponent } from './UserUpdateAvatarComponent'
import UserUpdateGeneral from './UserUpdateGeneral'
import UserUpdateDescription from './UserUpdateDescription'
import UserChangePassword from './UserChangePassword'
import UserDeleteAccount from './UseDeleteAccount'

const { Content } = Layout
export default function UserSettingsModule() {
    const { result, isFetching, refetch } = useGetUserProfileQuery(
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
                    <UserUpdateAvatarComponent
                        isProfileFetching={isFetching}
                        profile={result}
                    />
                    <div className="flex h-fit w-full flex-col sm:flex-row gap-5 ">
                        <div className="flex w-full flex-col gap-5">
                            <UserUpdateGeneral
                                isProfileFetching={isFetching}
                                profile={result}
                            />
                           <UserChangePassword isProfileFetching={isFetching} profile={result}/>
                        </div>
                        <div className="flex w-full flex-col gap-5">
                            <UserUpdateDescription isProfileFetching={isFetching} profile={result}/>
                            <UserDeleteAccount/>
                        </div>
                    </div>
                </Content>
            </Layout>
        </motion.div>
    )
}
