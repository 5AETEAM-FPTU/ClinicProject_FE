import DoctorLayout from '@/components/Layouts/DoctorLayout'
import { getCookie } from 'cookies-next';
import { redirect, usePathname } from 'next/navigation';
import React from 'react'
import { cookies } from 'next/headers'
import { constants } from '@/settings';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { JwtPayloadUpdated } from '@/components/Core/modules/Auth/SignIn';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });


function DoctorRootLayout({ children }: { children: React.ReactNode }) {

    const _accessToken_Cookie = getCookie(constants.ACCESS_TOKEN, { cookies })
    if (!_accessToken_Cookie) {
        redirect("/home");
    }
    return <DoctorLayout><div className={inter.className}>{children}</div></DoctorLayout>
}

export default DoctorRootLayout
