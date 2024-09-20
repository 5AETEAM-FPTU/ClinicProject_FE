'use client'
import React from 'react'
import DashboardLayout from '../DashbardLayout'
import { sidebarDoctorData } from '@/helpers/data/SidebarDoctorData'
import { usePathname, useRouter } from 'next/navigation'
import webStorageClient from '@/utils/webStorageClient'
import { jwtDecode } from 'jwt-decode'
import { JwtPayloadUpdated } from '@/components/Core/modules/Auth/SignIn'
import UnAccessable from '@/components/Core/common/UnAccesable'
import { useGetDoctorProfileQuery } from '@/stores/services/doctor/doctorSettings'

function DoctorLayout({ children }: { children: React.ReactNode }) {
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
                <DashboardLayout sidebarItems={sidebarDoctorData}>
                    {children}
                </DashboardLayout>
            )}
        </>
    )
}

export default DoctorLayout
