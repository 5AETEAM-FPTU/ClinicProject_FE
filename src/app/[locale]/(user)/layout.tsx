import UserLayout from '@/components/Layouts/UserLayout'
import constants from '@/settings/constants'
import { getCookie } from 'cookies-next'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import React from 'react'

function UserRootLayout({ children }: { children: React.ReactNode }) {
    // const _accessToken_Cookie = getCookie(constants.ACCESS_TOKEN, { cookies })

    // if (!_accessToken_Cookie) {
    //     redirect('/sign-in')
    // }

    return <UserLayout>{children}</UserLayout>
}

export default UserRootLayout
