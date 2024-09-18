import StaffLayout from '@/components/Layouts/StaffLayout'
import React from 'react'

function StaffRootLayout({children}: {children: React.ReactNode}) {
    return (
        <StaffLayout>
            {children}
        </StaffLayout>
    )
}

export default StaffRootLayout
