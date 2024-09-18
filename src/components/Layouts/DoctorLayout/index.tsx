'use client'
import React from 'react'
import DashboardLayout from '../DashbardLayout'
import { sidebarDoctorData } from '@/helpers/data/SidebarDoctorData'

function DoctorLayout({children}: {children: React.ReactNode}) {
    return (
        <DashboardLayout sidebarItems={sidebarDoctorData}>
            {children}
        </DashboardLayout>
    )
}

export default DoctorLayout
