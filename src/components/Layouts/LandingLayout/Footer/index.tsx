'use client'
import Image from 'next/image'
import React from 'react'
import { useParams } from 'next/navigation'
import { Irish_Grover } from 'next/font/google'

import { useTranslation } from '@/app/i18n/client'
import ImageFooter from '@public/landing/images/FooterImage.jpg'
import FemaleDoctor from '@public/landing/images/FemaleDoctor.png'
import QR from '@public/landing/images/QR.png'
import ZaloLogo from '@public/landing/images/Zalo.png'
import FacebookLogo from '@public/landing/images/Facebook.png'
import FaceBookLogo2 from '@public/landing/images/Facebook2.png'
import InstagramLogo from '@public/landing/images/instagram.png'
import BoCongThuong from '@public/landing/images/bocongthuong.webp'
import DaDangKy from '@public/landing/images/dadangky.webp'

import { motion } from 'framer-motion'
import { Grid } from 'antd'

const irishGrover = Irish_Grover({
    subsets: ['latin'],
    weight: '400',
    display: 'swap',
})

function Footer() {
    const params = useParams()
    const { t } = useTranslation(params?.locale as string, 'Landing')
    const screen = Grid.useBreakpoint()
    return (
        <div className="flex h-fit w-full flex-col justify-center">
            {screen.md && (
                <motion.div
                    initial={{
                        y: 10,
                        opacity: 0,
                    }}
                    whileInView={{
                        y: 0,
                        opacity: 1,
                    }}
                    transition={{
                        type: 'spring',
                        duration: 1,
                        delay: 0.35,
                    }}
                    viewport={{
                        once: true,
                    }}
                    className="relative h-[166px] w-full"
                >
                    <div className="h-1/2 w-full bg-[#F7FCFE]"></div>
                    <div className="h-1/2 w-full bg-[#D8EBFA]"></div>
                    <div className="absolute left-0 top-0 flex h-full w-full justify-center">
                        <div className="h-ful flex w-[1440px] max-w-[1440px] flex-col px-[80px]">
                            <div className="h-[166px] w-full bg-none px-[20px]">
                                <div className="relative h-full w-full overflow-hidden rounded-[20px] bg-black">
                                    <div className="h-[166px] w-[1240px] select-none">
                                        <Image
                                            src={ImageFooter}
                                            width={1440}
                                            alt="footerImg"
                                            className="object-cover"
                                        ></Image>
                                    </div>
                                    <div className="absolute left-0 top-0 flex h-full w-full flex-row">
                                        <div className="flex h-full w-[80%] flex-col gap-3 p-[30px]">
                                            <div>
                                                <h1 className="text-[30px] font-bold leading-tight text-white">
                                                    {t('footer_banner_1')}
                                                </h1>
                                            </div>
                                            <div className="flex flex-row items-center gap-5">
                                                <h3 className="text-[20px] font-bold text-white">
                                                    {t('footer_banner_2')}
                                                </h3>
                                                <div className="flex flex-row items-center justify-center overflow-hidden rounded-[12px] bg-white p-[4px]">
                                                    <div className="h-[50px] w-[50px]">
                                                        <Image
                                                            src={QR}
                                                            alt="QR"
                                                            width={200}
                                                            height={200}
                                                            className="object-cover"
                                                        ></Image>
                                                    </div>
                                                    <div className="h-[28px] w-[28px]">
                                                        <Image
                                                            src={ZaloLogo}
                                                            alt="ZaloLogo"
                                                            width={200}
                                                            height={200}
                                                            className="object-cover"
                                                        ></Image>
                                                    </div>
                                                </div>
                                                <div className="flex flex-row items-center justify-center overflow-hidden rounded-[12px] bg-white p-[4px]">
                                                    <div className="h-[50px] w-[50px]">
                                                        <Image
                                                            src={QR}
                                                            alt="QR"
                                                            width={200}
                                                            height={200}
                                                            className="object-cover"
                                                        ></Image>
                                                    </div>
                                                    <div className="h-[32px] w-[32px]">
                                                        <Image
                                                            src={FacebookLogo}
                                                            alt="FacebookLogo"
                                                            width={200}
                                                            height={200}
                                                            className="object-cover"
                                                        ></Image>
                                                    </div>
                                                </div>
                                                <div className="">
                                                    <h3 className="rounded-xl bg-white px-[20px] py-[12px] text-center text-[16px] font-bold text-secondaryDark">
                                                        {t('footer_banner_3')}
                                                    </h3>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex h-full w-[20%] items-center justify-center">
                                            <div className="h-[180px] w-[167px]">
                                                <Image
                                                    src={FemaleDoctor}
                                                    alt="FemaleDoctor"
                                                    className="object-cover"
                                                ></Image>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}

            <motion.div
                initial={{
                    y: 10,
                    opacity: 0,
                }}
                whileInView={{
                    y: 0,
                    opacity: 1,
                }}
                transition={{
                    type: 'spring',
                    duration: 1,
                    delay: 0.35,
                }}
                viewport={{
                    once: true,
                }}
                className="relative flex h-fit w-full justify-start bg-[#D8EBFA] pb-[60px] pt-[40px] sm:justify-center"
            >
                <div className="w-full px-5 sm:w-[1440px] sm:px-[80px]">
                    <div className="flex flex-col justify-between gap-5 sm:flex-row sm:gap-0">
                        <div className="flex flex-col gap-[15px]">
                            <div className="flex flex-col gap-[25px]">
                                <h1
                                    className="text-start text-[38px] leading-3 text-secondaryDark"
                                    style={irishGrover.style}
                                >
                                    P-CLINIC
                                </h1>
                                <p className="max-w-[248px] opacity-65">
                                    {t('footer_description')}
                                </p>
                                <ul className="flex max-w-[248px] flex-col gap-[10px]">
                                    <li>
                                        <span className="mr-1 font-bold">
                                            {t('footer_address')} :
                                        </span>{' '}
                                        236/29/18 Điện Biên Phủ - Phường 17 -
                                        Quận Bình Thạnh - TPHCM
                                    </li>
                                    <li>
                                        <span className="mr-1 font-bold">
                                            {t('footer_website')}:
                                        </span>
                                        pclinic.com.vn
                                    </li>
                                    <li>
                                        <span className="mr-1 font-bold">
                                            Email:
                                        </span>
                                        supports@pclinic.com
                                    </li>
                                    <li>
                                        <span className="font-bold">
                                            {t('footer_hotline')}
                                        </span>{' '}
                                        (028) 710 78098
                                    </li>
                                </ul>
                            </div>
                            <div className="flex w-fit flex-row gap-3">
                                <div className="flex h-[28px] w-[28px] items-center justify-center rounded-full border border-secondaryDark bg-white">
                                    <div className="h-[15px] w-[15px]">
                                        <Image
                                            src={ZaloLogo}
                                            width={200}
                                            height={200}
                                            alt="logo"
                                            className="object-cover"
                                        ></Image>
                                    </div>
                                </div>
                                <div className="flex h-[28px] w-[28px] items-center justify-center rounded-full border border-secondaryDark bg-[#0084c7]">
                                    <div className="flex h-[28px] w-[28px] items-center justify-center">
                                        <Image
                                            src={FaceBookLogo2}
                                            width={200}
                                            height={200}
                                            alt="logo"
                                            className="object-cover"
                                        ></Image>
                                    </div>
                                </div>
                                <div className="flex h-[28px] w-[28px] items-center justify-center rounded-full border border-secondaryDark bg-white">
                                    <div className="h-[15px] w-[15px]">
                                        <Image
                                            src={InstagramLogo}
                                            width={200}
                                            height={200}
                                            alt="logo"
                                            className="object-cover"
                                        ></Image>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-[26px]">
                            <h4 className="font-bold">
                                {t('footer_service').toUpperCase()}
                            </h4>
                            <ul className="flex flex-col gap-3">
                                <li>
                                    {' '}
                                    <a href="#" className="text-black">
                                        {t('footer_service_1')}
                                    </a>
                                </li>
                                <li>
                                    {' '}
                                    <a href="#" className="text-black">
                                        {t('footer_service_2')}
                                    </a>
                                </li>
                                <li>
                                    {' '}
                                    <a href="#" className="text-black">
                                        {t('footer_service_3')}
                                    </a>
                                </li>
                                <li>
                                    {' '}
                                    <a href="#" className="text-black">
                                        {t('footer_service_4')}
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="flex flex-col gap-[26px]">
                            <h4 className="font-bold">
                                {t('footer_supports').toUpperCase()}
                            </h4>
                            <ul className="flex flex-col gap-3">
                                <li>
                                    {' '}
                                    <a href="#" className="text-black">
                                        {t('footer_support_1')}
                                    </a>
                                </li>
                                <li>
                                    {' '}
                                    <a href="#" className="text-black">
                                        {t('footer_support_2')}
                                    </a>
                                </li>
                                <li>
                                    {' '}
                                    <a href="#" className="text-black">
                                        {t('footer_support_3')}
                                    </a>
                                </li>
                                <li>
                                    {' '}
                                    <a href="#" className="text-black">
                                        {t('footer_support_4')}
                                    </a>
                                </li>
                                <li>
                                    {' '}
                                    <a href="#" className="text-black">
                                        {t('footer_support_5')}
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div className="flex flex-col gap-[26px]">
                            <h4 className="font-bold">
                                {t('footer_FAQ').toUpperCase()}
                            </h4>
                            <ul className="flex flex-col gap-3">
                                <li>
                                    {' '}
                                    <a href="#" className="text-black">
                                        {t('footer_FAQ_1')}
                                    </a>
                                </li>
                                <li>
                                    {' '}
                                    <a href="#" className="text-black">
                                        {t('footer_FAQ_2')}
                                    </a>
                                </li>
                                <li>
                                    {' '}
                                    <a href="#" className="text-black">
                                        {t('footer_FAQ_3')}
                                    </a>
                                </li>
                                <li>
                                    {' '}
                                    <a href="#" className="text-black">
                                        {t('footer_FAQ_4')}
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="flex flex-col gap-[26px]">
                            <h4 className="font-bold">
                                {t('footer_coop').toUpperCase()}
                            </h4>
                            <ul className="flex flex-col gap-3">
                                <li>
                                    {' '}
                                    <a href="#" className="text-black">
                                        {t('footer_coop_1')}
                                    </a>
                                </li>
                                <li>
                                    {' '}
                                    <a href="#" className="text-black">
                                        {t('footer_coop_2')}
                                    </a>
                                </li>
                                <li>
                                    {' '}
                                    <a href="#" className="text-black">
                                        {t('footer_coop_3')}
                                    </a>
                                </li>
                                <li>
                                    {' '}
                                    <a href="#" className="text-black">
                                        {t('footer_coop_4')}
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <Image
                                            src={DaDangKy}
                                            alt="dadangky"
                                            width={400}
                                            className="w-[70px] object-cover"
                                        ></Image>
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <Image
                                            src={BoCongThuong}
                                            alt="dadangky"
                                            width={400}
                                            className="w-[70px] object-cover"
                                        ></Image>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </motion.div>
            <div className="flex h-fit w-full justify-center bg-secondaryDark py-4">
                <div className="flex w-[1440px] max-w-[1440px] items-center justify-center px-5 sm:px-0">
                    <p className="text-white">
                        {`${t('liences')}`} © 2024, All Rights Reserved
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Footer
