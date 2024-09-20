'use client'
import React from 'react'
import DashboardLayout from '../DashbardLayout'
import { sidebarPatientData } from '@/helpers/data/SidebarPatientData'
import { usePathname } from 'next/navigation'
import { jwtDecode } from 'jwt-decode'
import { JwtPayloadUpdated } from '@/components/Core/modules/Auth/SignIn'
import webStorageClient from '@/utils/webStorageClient'
import UnAccessable from '@/components/Core/common/UnAccesable'

function UserLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const _accessToken = webStorageClient.getToken()
    let role: string | null = null

    if (_accessToken) {
        try {
            const decodedToken = jwtDecode<JwtPayloadUpdated>(_accessToken)
            role = decodedToken?.role || null
        } catch (error) {
            console.error('Error decoding token:', error)
        }
    }


    const roleFromPath = pathname?.split('/')[2]

    return (
        <>
            {role !== roleFromPath ? (
                <UnAccessable />
            ) : (
                <DashboardLayout sidebarItems={sidebarPatientData}>
                    {children}
                </DashboardLayout>
            )}
        </>
    )
}

export default UserLayout
