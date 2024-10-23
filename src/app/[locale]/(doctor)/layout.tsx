import DoctorLayout from '@/components/Layouts/DoctorLayout'
import { constants } from '@/settings'
import { getCookie } from 'cookies-next'
import { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import React from 'react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: "P-CLINIC",
    description: "P-CLINIC",
    icons: "/icons/layout/p-clinic.png",
};

function DoctorRootLayout({ children }: { children: React.ReactNode }) {
    const _accessToken_Cookie = getCookie(constants.ACCESS_TOKEN, { cookies })
    if (!_accessToken_Cookie) {
        redirect('/home')
    }
    return (
        <DoctorLayout>
            <div className={inter.className}>{children}</div>
        </DoctorLayout>
    )
}

export default DoctorRootLayout
