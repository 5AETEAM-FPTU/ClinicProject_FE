'use client'
import React from 'react'
import Slider from 'react-slick'
import Image from 'next/image'
import { Settings } from 'react-slick'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import CommonSection from '@/components/Core/common/CommonSection'
import Doctor from '@public/landing/images/doctor.png'
import StarIcon from '@public/landing/icons/StartIcon'
import Hospital from '@public/landing/icons/hospital.svg'
import Dollar from '@public/landing/icons/dollar.svg'

import { motion } from 'framer-motion'
import { useTranslation } from '@/app/i18n/client'
import { useParams } from 'next/navigation'
import { useGetAvailableDoctorQuery } from '@/stores/services/doctor/doctorTreatmentTurn'

function OurTeam() {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        nextArrow: (
            <NextArrow
                onClick={function (): void {
                    throw new Error('Function not implemented.')
                }}
            />
        ),
        prevArrow: (
            <PrevArrow
                onClick={function (): void {
                    throw new Error('Function not implemented.')
                }}
            />
        ),
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    }
    const doctors = [
        {
            position: 'Thạc sĩ - Bác sĩ',
            name: 'Namae wa nan desuka?',
            specialty: 'Bác sĩ chuyên khoa',
            price: '150.000đ',
            rating: 4.5,
            patients: 100,
            image: '###',
        },
        {
            position: 'Thạc sĩ - Bác sĩ',
            name: 'Namae wa nan desuka?',
            specialty: 'Bác sĩ chuyên khoa',
            price: '150.000đ',
            rating: 4.5,
            patients: 100,
            image: '###',
        },
        {
            position: 'Thạc sĩ - Bác sĩ',
            name: 'Namae wa nan desuka?',
            specialty: 'Bác sĩ chuyên khoa',
            price: '150.000đ',
            rating: 4.5,
            patients: 100,
            image: '###',
        },
        {
            position: 'Thạc sĩ - Bác sĩ',
            name: 'Namae wa nan desuka?',
            specialty: 'Bác sĩ chuyên khoa',
            price: '150.000đ',
            rating: 4.5,
            patients: 100,
            image: '###',
        },
        {
            position: 'Thạc sĩ - Bác sĩ',
            name: 'Namae wa nan desuka?',
            specialty: 'Bác sĩ chuyên khoa',
            price: '150.000đ',
            rating: 4.5,
            patients: 100,
            image: '###',
        },

        // Add more doctor objects here...
    ]
    const params = useParams()
    const { t } = useTranslation(params?.locale as string, 'Landing')

    const {availableDoctor} = useGetAvailableDoctorQuery(undefined, {
        selectFromResult: (result) => ({
            availableDoctor: result.data?.body?.doctors ?? [],
        })
    });
    console.log(availableDoctor);

    return (
        <div
            id='our-team'
        >
            <CommonSection
                title={t('our_team_title')}
                subtile={t('our_team_sub')}
                tailCustomStyle="bg-gradient-to-b from-secondaryLight to-white"
            >
                {
                    availableDoctor.length > 0 && <Carousel settings={settings}>
                    {availableDoctor.map((doctor :any, index:number) => (
                        <div
                            key={index}
                            className="!flex w-[282px] h-fit sm:h-[430px] sm:w-[260px] !flex-col !items-center !justify-center"
                        >
                            <div
                                className="h-[94%] w-[92%] overflow-hidden rounded-xl shadow-secondary"
                            >
                                <div className="h-[253px] sm:h-[253px] w-full">
                                    <div className="h-full w-full">
                                        <Image
                                            src={doctor?.avatarUrl}
                                            alt="doctor"
                                            className="h-full w-full object-cover"
                                            width={400}
                                            height={400}
                                        ></Image>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex w-full flex-row justify-between bg-secondary p-[10px]">
                                        <p className="flex items-center gap-1 text-[12px] font-bold">
                                            {t('our_team_rating')}:{' '}
                                            <span className="flex items-center justify-center gap-1 text-orange-600">
                                                4.5{' '}
                                                <span className="mb-[3px]">
                                                    <StarIcon />
                                                </span>
                                            </span>
                                        </p>
                                        <p className="flex items-center gap-1 text-[12px] font-bold">
                                            {t('our_team_numberExam')}:{' '}
                                            <span className="flex items-center justify-center gap-1 text-orange-600">
                                                100
                                            </span>
                                        </p>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-[4px] p-[10px]">
                                    <p className="text-[12px]">
                                        {doctor.position} Thạc sĩ - Bác sĩ
                                    </p>
                                    <p className="text-[14px] font-bold">
                                        {doctor.fullName}
                                    </p>
                                    <div className="flex flex-row items-center gap-2">
                                        <Image
                                            src={Hospital}
                                            alt="icon"
                                        ></Image>
                                        <p className="text-[12px] font-semibold text-secondaryDarker">
                                            {doctor.specialty} Chuyên khoa nội
                                        </p>
                                    </div>
                                    <div className="flex flex-row items-center gap-2">
                                        <Image src={Dollar} alt="icon"></Image>
                                        <p className="text-[12px] font-semibold text-orange-600">
                                            150.000đ
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </Carousel>
                }
            </CommonSection>
        </div>
    )
}

export default OurTeam

type CarrouselProps = {
    settings: Settings
    children: React.ReactNode
}

function Carousel({ settings, children }: CarrouselProps) {
    return (
        <Slider
            {...settings}
            responsive={settings.responsive?.map(
                (responsive) =>
                    responsive as import('react-slick').ResponsiveObject,
            )}
            className="!flex items-center !gap-2 sm:!gap-[30px]"
        >
            {children}
        </Slider>
    )
}

interface ArrowProps {
    onClick: () => void
}

const NextArrow = (props: ArrowProps) => {
    const { onClick } = props
    return (
        <div
            className="flex cursor-pointer items-center justify-center rounded-full border border-secondaryDarker p-0 sm:p-1 transition-all"
            onClick={onClick}
        >
            <ChevronRight className="text-secondaryDarker" />
        </div>
    )
}

const PrevArrow = (props: ArrowProps) => {
    const { onClick } = props
    return (
        <div
            className="flex cursor-pointer items-center justify-center rounded-full border border-secondaryDarker p-0 sm:p-1 transition-all"
            onClick={onClick}
        >
            <ChevronLeft className="text-secondaryDarker" />
        </div>
    )
}
