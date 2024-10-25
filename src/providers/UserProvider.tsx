'use client'
import { useAppDispatch, useAppSelector } from '@/hooks/redux-toolkit'
import { constants } from '@/settings'
import { IUserInfo, updateUserInfo } from '@/stores/features/auth'
import webStorageClient from '@/utils/webStorageClient'
import React, { useEffect } from 'react'
import RingLoaderComponent from '@/components/Core/common/RingLoader'
import { jwtDecode } from 'jwt-decode'
import { JwtPayloadUpdated } from '@/components/Core/modules/Auth/SignIn'
import { useRequestRefreshAccessTokenMutation } from '@/stores/services/auth'
import { setLoaded, setLoading } from '@/stores/features/loading'
import { message } from 'antd'
import { useRouter } from 'next/navigation'
import { signOut } from 'next-auth/react'

function UserProvider({ children }: { children: React.ReactNode }) {
    const dispatch = useAppDispatch()
    const loading = useAppSelector((state) => state.loading.isLoading)

    useEffect(() => {
        const avatar = webStorageClient.get(constants.USER_AVATAR)
        const fullName = webStorageClient.get(constants.USER_FULLNAME)
        const email = webStorageClient.get(constants.EMAIL)
        const updateValue: IUserInfo = {
            email: email,
            avatarUrl: avatar,
            fullName: fullName,
            role: null,
        }
        dispatch(updateUserInfo(updateValue))
    }, [])

    const _accessToken: string = webStorageClient.getToken() as string
    const _refreshToken = webStorageClient.getRefreshToken() as string
    const [requestRefreshAccessToken] = useRequestRefreshAccessTokenMutation()
    const router = useRouter()
    const [messageApi, contextHolder] = message.useMessage()

    const handleRefreshAccessToken = async () => {
        if (_accessToken) {
            const claims = jwtDecode<JwtPayloadUpdated>(
                (_accessToken! as string) ?? '',
            )
            const expiredAt = claims.exp

            const bufferTime = 4 * 60 * 60

            if (expiredAt! - Date.now() / 1000 < bufferTime) {
                console.log(
                    'Access token will expire within 4 hours, refreshing token...',
                )

                try {
                    const result = await requestRefreshAccessToken({
                        refreshToken: _refreshToken!,
                    }).unwrap();
                    if (result) message.success("Tài khoản đã được xác thực thành công!")
                    console.log('Refreshed Access Token!')
                } catch (error) {
                    webStorageClient.removeAll()
                    message.error('Xác thực tài khoản thất bại! Vui lòng đăng nhập lại!')
                    router.push('/sign-in')
                }
                return
            }

            if (expiredAt! < Date.now() / 1000) {
                console.log('Access token expired, signing out...')
                webStorageClient.removeAll()
                signOut();
                message.destroy(
                    'Xác thực tài khoản thất bại! Vui lòng đăng nhập lại!',
                )
                router.push('/sign-in')
            }
        }
    }
    useEffect(() => {
        handleRefreshAccessToken()
    }, [])

    return (
        <>
            {loading && <RingLoaderComponent />}
            <div className={loading ? 'pointer-events-none' : ''}>
                {children}
            </div>
        </>
    )
}

export default UserProvider
