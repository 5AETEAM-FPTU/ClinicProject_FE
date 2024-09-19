'use client'
import { sidebarStaffData } from '@/helpers/data/SidebarStaffData'
import React from 'react'
import DashboardLayout from '../DashbardLayout'
import { usePathname } from 'next/navigation'
import webStorageClient from '@/utils/webStorageClient'
import { jwtDecode } from 'jwt-decode'
import { JwtPayloadUpdated } from '@/components/Core/modules/Auth/SignIn'
import UnAccessable from '@/components/Core/common/UnAccesable'

function StaffLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const _accessToken = webStorageClient.getToken()
    const { role } = jwtDecode<JwtPayloadUpdated>(_accessToken!)

    const roleFromPath = pathname?.split('/')[2]
    return (
        <>
            {role !== roleFromPath ? (
                <UnAccessable />
            ) : (
                <DashboardLayout sidebarItems={sidebarStaffData}>
                    {children}
                </DashboardLayout>
            )}
        </>
    )
}

export default StaffLayout
