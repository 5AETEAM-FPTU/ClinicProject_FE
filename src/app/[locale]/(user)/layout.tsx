import UserLayout from '@/components/Layouts/UserLayout'
import constants from '@/settings/constants'
import { getCookie } from 'cookies-next'
import { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import React from 'react'

export const metadata: Metadata = {
    title: "P-CLINIC",
    description: "P-CLINIC",
    icons: "/icons/layout/p-clinic.png",
};

function UserRootLayout({ children }: { children: React.ReactNode }) {
    const _accessToken_Cookie = getCookie(constants.ACCESS_TOKEN, { cookies })    
    if(!_accessToken_Cookie) {
        redirect("/home");
    }
    return <UserLayout>{children}</UserLayout>
}

export default UserRootLayout
