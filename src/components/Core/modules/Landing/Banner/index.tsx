'use client'
import Image from 'next/image'
import React from 'react'

import { Montserrat } from 'next/font/google'
import { SendHorizontal } from 'lucide-react'
import { useParams } from 'next/navigation'
import { useTranslation } from '@/app/i18n/client'

import BannerImage from '@public/landing/images/banner.webp'
import EmailBulk from '@public/landing/icons/mail-bulk.svg'
import BannerImage1 from '@public/landing/images/img1.webp'
import BannerImage2 from '@public/landing/images/img2.webp'
import BannerImage3 from '@public/landing/images/img3.webp'
import BannerImage4 from '@public/landing/images/img4.webp'
import BannerImage5 from '@public/landing/images/img5.webp'
import BannerImage6 from '@public/landing/images/img6.webp'

import {motion} from 'framer-motion';
import { Grid } from 'antd'

const montserrat = Montserrat({ subsets: ['latin'] })

function Banner() {
    const params = useParams()
    const { t } = useTranslation(params?.locale as string, 'Landing')
    const screen = Grid.useBreakpoint();
    return (
        <div className="z-0 mt-[56px] sm:mt-[126px] flex h-[600px] sm:h-fit w-full select-none justify-center">
            <div className="relative w-full sm:w-[1920px]">
                <div className="relative flex h-fit w-full justify-center">
                    <Image
                        src={BannerImage}
                        width={2000}
                        height={500}
                        alt="banner"
                        className="pointer-events-none select-none object-contain"
                        priority
                    ></Image>
                    <div className="absolute h-fit w-full sm:w-[1440px]">
                        <div className="relative flex h-full w-full flex-col items-center gap-5 pt-[60px]">
                            <h1 className="font-semibold text-secondaryDark">
                                {t('banner_platform')}
                            </h1>
                            <div className={montserrat.className}>
                                <div className="relative">
                                    <h1
                                        className="sm:max-w-[850px] max-w-[360px]  text-center text-[28px] sm:text-[46px] font-bold leading-none text-secondaryDarker"
                                        dangerouslySetInnerHTML={{
                                            __html: t('banner_title'),
                                        }}
                                    ></h1>
                                    {/* <div className="absolute bottom-[-5px] right-[-60px]">
                                        <Image
                                            src={HeaderIcon}
                                            alt="icon"
                                            width={50}
                                            height={50}
                                        ></Image>
                                    </div> */}
                                </div>
                            </div>
                            <div className=" flex h-fit w-[350px] sm:w-[540px] flex-row rounded-xl border-2 border-secondaryDark bg-white transition-all hover:drop-shadow-xl">
                                <div className="px-2 sm:px-5 py-2 sm:py-[15px]">
                                    <Image src={EmailBulk} alt="icon"></Image>
                                </div>
                                <input
                                    className="w-[65%] rounded-xl border-none py-2 sm:py-[15px] pr-2 focus:outline-none"
                                    placeholder={t('banner_contact')}
                                    max={36}
                                ></input>
                                <div className="w-[40%] rounded-r-md bg-secondaryDark px-2 sm:px-5 py-2 sm:py-[15px]">
                                    <button className="flex h-full w-full flex-row justify-center gap-2 sm:gap-5 rounded-r-md border-none bg-secondaryDark text-white">
                                        {
                                            screen.md && <p className="font-extrabold text-[10x] sm:text-[16px] text-white">
                                            {t('banner_contact_send')}
                                        </p>
                                        }
                                        <SendHorizontal color="white" />
                                    </button>
                                </div>
                            </div>
                            <div className="sm:text-[18px] text-[14px] font-semibold text-secondaryDark sm:p-0 px-5">
                                {t('banner_subtitle')}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex h-fit w-full justify-center">
                    <div className="relative top-[190px] sm:top-[-80px] bottom-0 sm:bottom-[80px] h-fit w-full sm:w-[1440px] px-5 sm:px-[180px]">
                        <div className="flex h-fit w-full flex-wrap sm:flex-nowrap sm:flex-row justify-between gap-6 sm:gap-[30px] p-0 sm:p-5">
                            <div className="flex h-[100px] sm:h-[150px] w-[100px] sm:w-[150px] flex-col items-center justify-center gap-[10px] rounded-xl bg-white p-5 shadow-primary transition-all hover:border-[1px] hover:border-[#80d8f5]">
                                <Image src={BannerImage1} className='sm:w-[60px] w-[40px]' alt="banner"></Image>
                                <p className="text-center font-semibold text-secondaryDark text-[8px] sm:text-[14px]">
                                    {t('banner_service_1')}
                                </p>
                            </div>
                            <div className="flex h-[100px] sm:h-[150px] w-[100px] sm:w-[150px] flex-col items-center justify-center gap-[10px] rounded-xl bg-white p-5 shadow-primary transition-all hover:border-[1px] hover:border-[#80d8f5]">
                                <Image src={BannerImage2} className='sm:w-[60px] w-[40px]' alt="banner"></Image>
                                <p className="text-center font-semibold text-secondaryDark text-[8px] sm:text-[14px]">
                                    {t('banner_service_2')}
                                </p>
                            </div>
                            <div className="flex h-[100px] sm:h-[150px] w-[100px] sm:w-[150px] flex-col items-center justify-center gap-[10px] rounded-xl bg-white p-5 shadow-primary transition-all hover:border-[1px] hover:border-[#80d8f5]">
                                <Image src={BannerImage3} className='sm:w-[60px] w-[40px]' alt="banner"></Image>
                                <p className="text-center font-semibold text-secondaryDark text-[8px] sm:text-[14px]">
                                    {t('banner_service_3')}
                                </p>
                            </div>
                            <div className="flex h-[100px] sm:h-[150px] w-[100px] sm:w-[150px] flex-col items-center justify-center gap-[10px] rounded-xl bg-white p-5 shadow-primary transition-all hover:border-[1px] hover:border-[#80d8f5]">
                                <Image src={BannerImage4} className='sm:w-[60px] w-[40px]' alt="banner"></Image>
                                <p className="text-center font-semibold text-secondaryDark text-[8px] sm:text-[14px]">
                                    {t('banner_service_4')}
                                </p>
                            </div>
                            <div className="flex h-[100px] sm:h-[150px] w-[100px] sm:w-[150px] flex-col items-center justify-center gap-[10px] rounded-xl bg-white p-5 shadow-primary transition-all hover:border-[1px] hover:border-[#80d8f5]">
                                <Image src={BannerImage5} className='sm:w-[60px] w-[40px]' alt="banner"></Image>
                                <p className="text-center font-semibold text-secondaryDark text-[8px] sm:text-[14px]">
                                    {t('banner_service_5')}
                                </p>
                            </div>
                            <div className="flex h-[100px] sm:h-[150px] w-[100px] sm:w-[150px] flex-col items-center justify-center gap-[10px] rounded-xl bg-white p-5 shadow-primary transition-all hover:border-[1px] hover:border-[#80d8f5]">
                                <Image src={BannerImage6} className='sm:w-[60px] w-[40px]' alt="banner"></Image>
                                <p className="text-center font-semibold text-secondaryDark text-[8px] sm:text-[14px]">
                                    {t('banner_service_6')}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Banner
