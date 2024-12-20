'use client'
import { CircleUserRound } from 'lucide-react'
import { Irish_Grover } from 'next/font/google'
import Image from 'next/image'
import {
    useParams,
    usePathname,
    useRouter,
    useSearchParams,
} from 'next/navigation'
import { useEffect, useState } from 'react'

import { useTranslation } from '@/app/i18n/client'
import ChangeLanguages from '@/components/Core/common/ChangeLanguage'
import { JwtPayloadUpdated } from '@/components/Core/modules/Auth/SignIn'
import { DefaultImage, UserRole } from '@/helpers/data/Default'
import { useAppSelector } from '@/hooks/redux-toolkit'
import { cn } from '@/lib/utils'
import themeColors from '@/style/themes/default/colors'
import webStorageClient from '@/utils/webStorageClient'
import FacebookIcon from '@public/landing/icons/Facebook.svg'
import HeadPhoneIcon from '@public/landing/icons/HeadPhone.svg'
import ZaloLogo from '@public/landing/icons/Zalo.svg'
import useDetectScroll from '@smakss/react-scroll-direction'
import { Button, Grid } from 'antd'
import { jwtDecode } from 'jwt-decode'
import { signOut } from 'next-auth/react'
import { useLocale } from 'next-intl'
import { motion } from 'framer-motion'

const irishGrover = Irish_Grover({
    subsets: ['latin'],
    weight: '400',
})

function Header() {
    const params = useParams()
    const { t } = useTranslation(params?.locale as string, 'Landing')
    const { scrollDir } = useDetectScroll()
    const router = useRouter()
    const locale = useLocale()
    const [_accessToken, setAccessToken] = useState<string | null>(null)
    useEffect(() => {
        setAccessToken(webStorageClient.getToken() as string)
    }, [])

    const { user } = useAppSelector((state) => state.auth)
    const handleAccounts = () => {
        const isHasToken = webStorageClient.getToken()
        if (isHasToken) {
            router.push(
                `/${locale}/${jwtDecode<JwtPayloadUpdated>(_accessToken!).role}/overview`,
            )
        } else {
            router.push(`/${locale}/sign-in`)
        }
    }
    let role: string | null = null
    if (_accessToken) {
        role = jwtDecode<JwtPayloadUpdated>(_accessToken).role || null
    }

    const handleRenderUserType = () => {
        if (role == UserRole.DOCTOR) {
            return 'Bác sĩ'
        } else if (role == UserRole.STAFF) {
            return 'Nhân viên y tế'
        } else {
            return ''
        }
    }
    const screen = Grid.useBreakpoint()
    const [openDrawer, setOpenDrawer] = useState(false)
    const pathname = usePathname()
    console.log(pathname)
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
        <>
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
                                {_accessToken && role ? (
                                    <div
                                        className="flex cursor-pointer select-none flex-row items-center gap-3 rounded-md px-3 transition-all duration-300 hover:bg-slate-200"
                                        onClick={handleAccounts}
                                    >
                                        <div>
                                            <p className="font-medium">
                                                {handleRenderUserType()}{' '}
                                                <span className="font-bold text-secondarySupperDarker">
                                                    {user.fullName}
                                                </span>
                                            </p>
                                        </div>
                                        <div className="h-[40px] w-[40px] cursor-pointer overflow-hidden rounded-full">
                                            <Image
                                                src={
                                                    user.avatarUrl
                                                        ? user.avatarUrl
                                                        : DefaultImage
                                                }
                                                alt="avatar"
                                                width={200}
                                                height={200}
                                                className="h-full w-full object-cover"
                                            ></Image>
                                        </div>
                                    </div>
                                ) : (
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
                                )}
                                <div>
                                    <ChangeLanguages />
                                </div>
                                <div>
                                    {_accessToken && role ? (
                                        <button
                                            onClick={() => {
                                                signOut({
                                                    redirect: true,
                                                })
                                                webStorageClient.removeAll()
                                            }}
                                        >
                                            Đăng xuất
                                        </button>
                                    ) : null}
                                </div>
                            </div>
                        </div>

                        <div
                            className={cn(
                                'flex w-full items-center justify-between border-t-2 py-[10px]',
                                ` ${scrollDir === 'down' && 'border-t-0'} `,
                            )}
                        >
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
                                                router.push(
                                                    '/home?section=doctor',
                                                )
                                            }
                                            className={cn(`${searchParams.get('section') === 'doctor' && '!text-secondaryDark'}`)}
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
                                                router.push('/booking-doctor?section=booking')
                                            }
                                            className={cn(`${searchParams.get('section') === 'booking' && '!text-secondaryDark'}`)}
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
                                            onClick={() => router.push('/blog?section=news')}
                                            className={cn(`${searchParams.get('section') === 'news' && '!text-secondaryDark'}`)}
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
                                                    '/home?section=' +
                                                        'contact',
                                                )
                                            }
                                            className={cn(`${searchParams.get('section') === 'contact' && '!text-secondaryDark'}`)}
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
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header
