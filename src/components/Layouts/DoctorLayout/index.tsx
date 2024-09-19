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
    const { role } = jwtDecode<JwtPayloadUpdated>(_accessToken!)
    const router = useRouter();

    const roleFromPath = pathname?.split('/')[2];

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
