'use client'
import { useAppDispatch } from '@/hooks/redux-toolkit'
import { constants } from '@/settings'
import { IUserInfo, updateUserInfo } from '@/stores/features/auth'
import webStorageClient from '@/utils/webStorageClient'
import React, { useEffect } from 'react'

function UserProvider({ children }: { children: React.ReactNode }) {
    const dispatch = useAppDispatch()
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
    return <div>{children}</div>
}

export default UserProvider
