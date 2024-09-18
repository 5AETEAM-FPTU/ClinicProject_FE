'use client'
import { sidebarStaffData } from '@/helpers/data/SidebarStaffData'
import React from 'react'
import DashboardLayout from '../DashbardLayout'

function StaffLayout({children}: {children: React.ReactNode}) {
    return (
        <DashboardLayout sidebarItems={sidebarStaffData}>
            {children}
        </DashboardLayout>
    )
}

export default StaffLayout;
