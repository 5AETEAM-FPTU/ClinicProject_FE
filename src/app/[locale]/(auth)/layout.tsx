import constants from '@/settings/constants'
import { getCookie } from 'cookies-next'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import Image from "next/image"
import React from 'react'
import AuthBanner from '@public/icons/layout/auth-banner.svg'

function AuthRootLayout({ children }: { children: React.ReactNode }) {

    const _accessToken_Cookie = getCookie(constants.ACCESS_TOKEN, { cookies })
    if (_accessToken_Cookie) {
        redirect("/home");
    }

    return (
        <div className="min-h-screen bg-white flex">
            {children}
            <div className="hidden lg:flex lg:w-1/2 items-center justify-center">
                <div className="flex flex-col justify-center h-screen items-center w-full">
                    <p className="text-[#003553] text-left text-base">
                        Chào mừng bạn đến với phòng khám của chúng tôi
                    </p>
                    <div className='text-[38px] font-bold mb-5 text-[#0284C7]'>
                        P-CLINIC
                    </div>
                    <div className='w-full'>
                        <Image
                            src={AuthBanner}
                            alt="Woman using smartphone"
                            className='w-full'
                        />
                    </div>

                </div>
            </div>
        </div>);
}

export default AuthRootLayout
