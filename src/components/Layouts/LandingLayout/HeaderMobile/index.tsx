'use client'
import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import { Irish_Grover } from 'next/font/google'
import { ChevronsRight, CircleUserRound, Menu } from 'lucide-react'
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation'

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
import { useAppSelector } from '@/hooks/redux-toolkit'
import { DefaultImage, UserRole } from '@/helpers/data/Default'
import { Avatar, Button, Drawer, Grid } from 'antd'

const irishGrover = Irish_Grover({
    subsets: ['latin'],
    weight: '400',
})
export default function HeaderMobile() {
    const params = useParams()
    const router = useRouter()
    const [_accessToken, setAccessToken] = useState<string | null>(null)
    useEffect(() => {
        setAccessToken(webStorageClient.getToken() as string)
    }, [])

    const { user } = useAppSelector((state) => state.auth)
    const [openDrawer, setOpenDrawer] = useState(false)
    const { t } = useTranslation(params?.locale as string, 'Landing')
    const pathname = usePathname()
    const searchParams = useSearchParams()

    useEffect(() => {
        console.log(searchParams.get('section'))
        if (searchParams.get('section') === 'doctor') {
            const doctorSection = document.getElementById('our-team')
            if (doctorSection) {
                doctorSection.scrollIntoView({ behavior: 'smooth' })
            }
        }
        if (searchParams.get('section') === 'contact') {
            const contactSection = document.getElementById('contact')
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' })
            }
        }
    }, [searchParams])

    return (
        <div className="fixed left-0 top-0 z-[100] flex h-fit w-full justify-between bg-white px-5 py-3 drop-shadow-lg">
            <div className="flex items-center justify-center">
                <div className={irishGrover.className}>
                    <h1 className="text-start text-[20px] text-secondaryDark">
                        P-CLINIC
                    </h1>
                </div>
            </div>
            <div className="flex items-center gap-4">
                {_accessToken && (
                    <Avatar src={user.avatarUrl} size={36}></Avatar>
                )}
                <Button className="px-2" onClick={() => setOpenDrawer(true)}>
                    <Menu className="text-secondaryDark" />
                </Button>
            </div>
            <Drawer
                open={openDrawer}
                onClose={() => setOpenDrawer(false)}
                placement="left"
                width={200}
                bodyStyle={{ padding: 0 }}
                title={
                    <div className="flex items-center justify-center">
                        <div className={irishGrover.className}>
                            <h1 className="text-start text-[20px] text-secondaryDark">
                                P-CLINIC
                            </h1>
                        </div>
                    </div>
                }
            >
                <div className="p-5">
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
                </div>
                <div>
                    <ul className="flex list-none flex-col gap-[40px] font-medium">
                        <ul className="flex list-none flex-col gap-[40px] font-medium px-5">
                            <li className="relative cursor-pointer">
                                <div
                                    onClick={() => router.push('/home')}
                                    className={cn(
                                        `${pathname.includes('home') && searchParams.get('section') == null ? 'text-secondaryDark' : 'text-black'}`,
                                    )}
                                >
                                    {t('header_overview')}
                                </div>
                                <span
                                    className={cn(
                                        'absolute bottom-[-4px] left-0 h-1 w-full',
                                        `${pathname.includes('home') && searchParams.get('section') == null ? 'bg-secondaryDark' : ''}`,
                                    )}
                                ></span>
                            </li>
                            <li className="relative cursor-pointer">
                                <div
                                    onClick={() =>
                                        router.push('/home?section=doctor')
                                    }
                                    className={cn(
                                        `${searchParams.get('section') === 'doctor' && '!text-secondaryDark'}`,
                                    )}
                                >
                                    {t('header_doctor')}
                                </div>
                                <span
                                    className={cn(
                                        'absolute bottom-[-4px] left-0 h-1 w-full',
                                        `${searchParams.get('section') === 'doctor' && 'bg-secondaryDark'}`,
                                    )}
                                ></span>
                            </li>
                            <li className="relative cursor-pointer">
                                <div
                                    onClick={() =>
                                        router.push(
                                            '/booking-doctor?section=booking',
                                        )
                                    }
                                    className={cn(
                                        `${searchParams.get('section') === 'booking' && '!text-secondaryDark'}`,
                                    )}
                                >
                                    {t('header_booking')}
                                </div>
                                <span
                                    className={cn(
                                        'absolute bottom-[-4px] left-0 h-1 w-full',
                                        `${searchParams.get('section') === 'booking' && 'bg-secondaryDark'}`,
                                    )}
                                ></span>
                            </li>
                            <li className="relative cursor-pointer">
                                <div
                                    onClick={() =>
                                        router.push('/blog?section=news')
                                    }
                                    className={cn(
                                        `${searchParams.get('section') === 'news' && '!text-secondaryDark'}`,
                                    )}
                                >
                                    {t('header_news')}
                                </div>
                                <span
                                    className={cn(
                                        'absolute bottom-[-4px] left-0 h-1 w-full',
                                        `${searchParams.get('section') === 'news' && 'bg-secondaryDark'}`,
                                    )}
                                ></span>
                            </li>
                            <li className="relative cursor-pointer">
                                <div
                                    onClick={() =>
                                        router.push(
                                            '/home?section=' + 'contact',
                                        )
                                    }
                                    className={cn(
                                        `${searchParams.get('section') === 'contact' && '!text-secondaryDark'}`,
                                    )}
                                >
                                    {t('header_contact')}
                                </div>
                                <span
                                    className={cn(
                                        'absolute bottom-[-4px] left-0 h-1 w-full',
                                        `${searchParams.get('section') === 'contact' && 'bg-secondaryDark'}`,
                                    )}
                                ></span>
                            </li>
                        </ul>
                    </ul>
                </div>
                <div className="mt-5 flex flex-col items-start gap-2 px-5">
                    <div className="flex items-center gap-2">
                        <span className="font-semibold text-secondaryDark">
                            Liên hệ Facebook
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="font-semibold text-secondaryDark">
                            Kết nối Zalo
                        </span>
                    </div>
                </div>
                {_accessToken && (
                    <div className="p-5">
                        <div className="font-semibold text-secondaryDark">
                            Đăng xuất
                        </div>
                    </div>
                )}
            </Drawer>
        </div>
    )
}
