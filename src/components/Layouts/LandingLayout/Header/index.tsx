'use client'
import { useCallback, useEffect, useState } from 'react'
import { Button } from 'antd'
import Image from 'next/image'
import { Irish_Grover } from 'next/font/google'
import { CircleUserRound } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'

import ChangeLanguages from '@/components/Core/common/ChangeLanguage'
import themeColors from '@/style/themes/default/colors'
import { useTranslation } from '@/app/i18n/client'
import FacebookIcon from '@public/landing/icons/Facebook.svg'
import ZaloLogo from '@public/landing/icons/Zalo.svg'
import HeadPhoneIcon from '@public/landing/icons/HeadPhone.svg'
import useDetectScroll from '@smakss/react-scroll-direction'
import { cn } from '@/lib/utils'
import webStorageClient from '@/utils/webStorageClient'
import { useLocale } from 'next-intl'
import { jwtDecode } from 'jwt-decode'
import { JwtPayloadUpdated } from '@/components/Core/modules/Auth/SignIn'
import { signOut } from 'next-auth/react'

const irishGrover = Irish_Grover({
    subsets: ['latin'],
    weight: '400',
})

function Header() {
    const params = useParams()
    const { t } = useTranslation(params?.locale as string, 'Landing')
    const { scrollDir } = useDetectScroll()
    const router = useRouter();
    const locale = useLocale();
    const _accessToken = webStorageClient.getToken();

    const handleAccounts = () => {
        const isHasToken = webStorageClient.getToken();
            router.push("");
        if (isHasToken) {
            router.push(`/${locale}/${jwtDecode<JwtPayloadUpdated>(_accessToken!).role}/overview`);
        } else {
            router.push(`/${locale}/sign-in`);
        }
    }

    return (
        <div className="fixed left-0 top-0 z-[100] flex h-fit w-full justify-center bg-white drop-shadow-lg">
            <div className="flex w-[1440px] max-w-[1440px] flex-row gap-10 px-[80px]">
                <div className="flex items-center justify-center">
                    <div className={irishGrover.className}>
                        <h1 className="text-start text-[38px] text-secondaryDark">
                            P-CLINIC
                        </h1>
                    </div>
                </div>
                <div className="flex w-[calc(100%-195px)] flex-col">
                    <div
                        className={cn(
                            'flex w-full justify-between py-[10px] duration-300',
                            `${scrollDir === 'down' ? 'h-0 p-0 duration-300' : ''}`,
                        )}
                    >
                        <div
                            className={cn(
                                'flex flex-row gap-[18px] transition-all duration-500',
                                `${scrollDir === 'down' && 'translate-y-[-50px] duration-500'}`,
                            )}
                        >
                            <div className="flex items-center gap-2">
                                <Image
                                    src={FacebookIcon}
                                    width={32}
                                    height={32}
                                    alt="facebook_icon"
                                />
                                <span className="font-semibold text-secondaryDark">
                                    Facebook
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Image
                                    src={ZaloLogo}
                                    width={28}
                                    height={28}
                                    alt="facebook_icon"
                                />
                                <span className="font-semibold text-secondaryDark">
                                    Zalo
                                </span>
                            </div>
                        </div>
                        <div
                            className={cn(
                                'flex flex-row items-center gap-[18px] transition-all duration-500',
                                `${scrollDir === 'down' && 'translate-y-[-50px] duration-500'}`,
                            )}
                        >
                            <Button
                                type="default"
                                className="!border-[2px] !border-secondaryDark !bg-white !font-semibold !text-secondaryDark"
                                onClick={handleAccounts}
                            >
                                <CircleUserRound
                                    color={themeColors.secondaryDark}
                                    size={20}
                                />
                                {t('header_accounts')}
                            </Button>
                            <div>
                                <ChangeLanguages />
                            </div>
                            <div onClick={() => {
                                signOut({redirect: true, callbackUrl: "/sign-in"});
                            }}>
                                Log out 
                            </div>
                        </div>
                    </div>

                    <div className={cn("flex w-full items-center justify-between border-t-2 py-[10px]", `
                        ${scrollDir === 'down' && 'border-t-0'}
                        `)}>
                        <div className="flex w-[32px] flex-row gap-2">
                            <Image src={HeadPhoneIcon} alt="logo" />
                            <div className="flex flex-col items-center">
                                <span className="font-semibold">
                                    {t('header_supports')}
                                </span>
                                <span className="text-[20px] font-extrabold text-[#FF8058]">
                                    0356611341
                                </span>
                            </div>
                        </div>
                        <ul className="flex list-none flex-row gap-[40px] font-medium">
                            <ul className="flex list-none flex-row gap-[40px] font-medium">
                                <li className="relative">
                                    <a href="#" className="text-secondaryDark">
                                        {t('header_overview')}
                                    </a>
                                    <span className="absolute bottom-[-4px] left-0 h-1 w-full bg-secondaryDark"></span>
                                </li>
                                <li>
                                    <a href="#" className="text-black">
                                        {t('header_clinic')}
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-black">
                                        {t('header_doctor')}
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-black">
                                        {t('header_booking')}
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-black">
                                        {t('header_news')}
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-black">
                                        {t('header_contact')}
                                    </a>
                                </li>
                            </ul>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header
