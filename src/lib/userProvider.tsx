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
    console.log(_accessToken);
    console.log(_refreshToken);
    const handleRefreshAccessToken = async () => {
        if (_accessToken) {
            const claims = jwtDecode<JwtPayloadUpdated>(
                (_accessToken! as string) ?? '',
            )
            const expiredAt = claims.exp;

            const bufferTime = 4 * 60
            if (expiredAt! - Date.now() / 1000 < bufferTime) {
                console.log(
                    'Access token will expire within 4 minutes, refreshing token...',
                )
                const result = await requestRefreshAccessToken({
                    refreshToken: _refreshToken!,
                })
                console.log("REFRESHED: ", result);
            }
        }
    }
    useEffect(() => {
        handleRefreshAccessToken()
    }, [])

    return (
        <div>
            {loading && <RingLoaderComponent />}
            <div className={loading ? 'pointer-events-none' : ''}>
                {children}
            </div>
        </div>
    )
}

export default UserProvider
