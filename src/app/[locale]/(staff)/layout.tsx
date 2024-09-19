import StaffLayout from '@/components/Layouts/StaffLayout'
import { constants } from '@/settings';
import { getCookie } from 'cookies-next';
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation';
import React from 'react'

function StaffRootLayout({children}: {children: React.ReactNode}) {
    const _accessToken_Cookie = getCookie(constants.ACCESS_TOKEN, { cookies })    
    if(!_accessToken_Cookie) {
        redirect("/home");
    }

    return (
        <StaffLayout>
            {children}
        </StaffLayout>
    )
}

export default StaffRootLayout
