import DoctorLayout from '@/components/Layouts/DoctorLayout'
import React from 'react'

function DoctorRootLayout({ children }: { children: React.ReactNode }) {

    return <DoctorLayout>{children}</DoctorLayout>
}

export default DoctorRootLayout
