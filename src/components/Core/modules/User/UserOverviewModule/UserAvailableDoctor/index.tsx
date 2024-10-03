'use client'

import { Button } from 'antd'
import { ChevronLeft, ChevronRight, ChevronsRight } from 'lucide-react'
import Image from 'next/image'
import ProfileBackground from '@public/landing/images/profile-background.png'
import { Settings } from 'react-slick'
import Slider from 'react-slick'
import Doctor from '@public/landing/images/doctor.png'
import StarIcon from '@public/landing/icons/StartIcon'
import Hospital from '@public/landing/icons/hospital.svg'
import Dollar from '@public/landing/icons/dollar.svg'

export default function UserAvailableDoctor() {
    return (
        <div className="h-[230px] rounded-xl bg-white text-[#003553] shadow-third">
            <div className="flex items-center justify-between p-5">
                <p className="text-[16px] font-bold">
                    Bác sĩ đang trực tại phòng khám
                </p>
                <p className="flex items-center text-[10.4px] font-bold">
                    Yêu cầu tư vấn{' '}
                </p>
            </div>

            <div>
                {/* <AvailableDoctor /> */}
            </div>
        </div>
    )
}

export function AvailableDoctor() {
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
    return (
        <div className="h-[80px] w-[80px] items-center">
            <Carousel settings={settings}>
                {doctors.map((doctor, index) => (
                    <div
                        key={index}
                        className="!flex h-[430px] w-[260px] !flex-col !items-center !justify-center"
                    >
                        <div className="h-[20%] w-[20%] overflow-hidden rounded-xl shadow-secondary">
                            <div className="h-[253px] w-full">
                                <div className="h-full w-full">
                                    <Image
                                        src={Doctor}
                                        alt="doctor"
                                        className="h-full w-full object-cover"
                                    ></Image>
                                </div>
                            </div>
                            <div>
                                <div className="flex w-full flex-row justify-between bg-secondary p-[10px]">
                                    <p className="flex items-center gap-1 text-[12px] font-bold">
                                        Đánh giá:{' '}
                                        <span className="flex items-center justify-center gap-1 text-orange-600">
                                            4.5{' '}
                                            <span className="mb-[3px]">
                                                <StarIcon />
                                            </span>
                                        </span>
                                    </p>
                                    <p className="flex items-center gap-1 text-[12px] font-bold">
                                        Lượt khám:
                                        <span className="flex items-center justify-center gap-1 text-orange-600">
                                            100
                                        </span>
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-col gap-[4px] p-[10px]">
                                <p className="text-[12px]">{doctor.position}</p>
                                <p className="text-[14px] font-bold">
                                    {doctor.name}
                                </p>
                                <div className="flex flex-row items-center gap-2">
                                    <Image src={Hospital} alt="icon"></Image>
                                    <p className="text-[12px] font-semibold text-secondaryDarker">
                                        {doctor.specialty}
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
        </div>
    )
}

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
            className="!flex items-center !gap-[30px]"
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
            className="flex cursor-pointer items-center justify-center rounded-full border border-secondaryDarker p-1 transition-all"
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
            className="flex cursor-pointer items-center justify-center rounded-full border border-secondaryDarker p-1 transition-all"
            onClick={onClick}
        >
            <ChevronLeft className="text-secondaryDarker" />
        </div>
    )
}
