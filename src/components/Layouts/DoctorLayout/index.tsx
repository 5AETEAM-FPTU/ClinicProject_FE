'use client'
import { JwtPayloadUpdated } from '@/components/Core/modules/Auth/SignIn'
import { sidebarDoctorData } from '@/helpers/data/SidebarDoctorData'
import webStorageClient from '@/utils/webStorageClient'
import { jwtDecode } from 'jwt-decode'
import dynamic from 'next/dynamic'
import { usePathname } from 'next/navigation'
import React from 'react'

const DynamicUnAccessable = dynamic(
    () => import('@/components/Core/common/UnAccesable'),
    { ssr: false },
)
const DynamicDashboardLayout = dynamic(
    () => import('@/components/Layouts/DashbardLayout'),
    { ssr: false },
)

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
                <DynamicUnAccessable />
            ) : (
                    <DynamicDashboardLayout sidebarItems={sidebarDoctorData}>
                        {children}
                    </DynamicDashboardLayout>
            )}
        </>
    )
}

export default DoctorLayout
