import constants from '@/settings/constants'
import { getCookie } from 'cookies-next'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import Image from "next/image"
import React from 'react'
import AuthBanner from '@public/landing/images/auth-banner.png'

function AuthRootLayout({ children }: { children: React.ReactNode }) {

    // const _accessToken = getCookie(constants.ACCESS_TOKEN, {cookies})

    // if(_accessToken) {
    //     redirect("/");
    // }

    return (
        <div className="min-h-screen bg-white flex">
            {children}
            <div className="hidden lg:flex lg:w-1/2 bg-gray-100 items-center justify-center">
                <div className="relative h-screen w-full">
                    <Image
                        src={AuthBanner}
                        alt="Woman using smartphone"
                        className='h-screen'
                    />
                </div>
            </div>
        </div>);
}

export default AuthRootLayout
