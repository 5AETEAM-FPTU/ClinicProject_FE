'use client'
import { useAppDispatch, useAppSelector } from '@/hooks/redux-toolkit'
import { constants } from '@/settings'
import { IUserInfo, updateUserInfo } from '@/stores/features/auth'
import webStorageClient from '@/utils/webStorageClient'
import React, { useEffect } from 'react'
import RingLoaderComponent from '@/components/Core/common/RingLoader'

function UserProvider({ children }: { children: React.ReactNode }) {
    const dispatch = useAppDispatch()
    const loading = useAppSelector((state) => state.loading.isLoading);

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
        dispatch(updateUserInfo(updateValue));
    }, [])

    return <div>
        {loading && <RingLoaderComponent />}
        <div className={loading ? 'pointer-events-none' : ''}>{children}</div>
    </div>
}

export default UserProvider
