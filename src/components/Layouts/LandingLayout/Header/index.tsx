'use client'
import { useTranslation } from '@/app/i18n/client'
import ChangeLanguages from '@/components/Core/common/ChangeLanguage'
import themeColors from '@/style/themes/default/colors'
import FacebookIcon from '@public/landing/icons/Facebook.svg'
import ZaloLogo from '@public/landing/icons/Zalo.svg'
import { Button } from 'antd'
import { CircleUserRound } from 'lucide-react'
import { Irish_Grover } from 'next/font/google'
import Image from 'next/image'
import { useParams } from 'next/navigation'

import HeadPhoneIcon from '@public/landing/icons/HeadPhone.svg'

const irishGrover = Irish_Grover({
    subsets: ['latin'],
    weight: '400',
})

function Header() {
    const params = useParams()
    const { t } = useTranslation(params?.locale as string, 'Landing')

    return (
        <div className="flex h-fit w-full justify-center shadow-md z-[100]">
            <div className="flex w-[1440px] max-w-[1440px] flex-row gap-10 px-[80px]">
                <div className="flex items-center justify-center">
                    <div className={irishGrover.className}>
                        <h1 className="text-start text-[38px] text-secondaryDark">
                            P-CLINIC
                        </h1>
                    </div>
                </div>
                <div className="flex w-[calc(100%-195px)] flex-col">
                    <div className="flex w-full justify-between py-[10px]">
                        <div className="flex flex-row gap-[18px]">
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
                        <div className="flex flex-row gap-[18px]">
                            <Button
                                type="default"
                                className="!border-[2px] !border-secondaryDark !bg-white !font-semibold !text-secondaryDark"
                            >
                                <CircleUserRound
                                    color={themeColors.secondaryDark}
                                    size={20}
                                />
                                {t('header_accounts')}
                            </Button>
                            <ChangeLanguages />
                        </div>
                    </div>

                    <div className="flex w-full items-center justify-between border-t-2 py-[10px]">
                        <div className="flex w-fit flex-row gap-2">
                            <Image
                                src={HeadPhoneIcon}
                                width={32}
                                height={32}
                                alt="logo"
                            />
                            <div className="flex flex-col items-center">
                                <span className="font-semibold">
                                    {t('header_supports')}
                                </span>
                                <span className="text-[20px] font-bold  text-[#FF8058]">
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
                                        {t('doctor')}
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
