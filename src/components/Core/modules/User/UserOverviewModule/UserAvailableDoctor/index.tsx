'use client'

import { ChevronLeft, ChevronRight, ChevronsRight } from 'lucide-react'
import Image from 'next/image'
import Slider, { Settings } from 'react-slick'

import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'

export default function UserAvailableDoctor() {
    const doctors = [
        {
            name: 'Namae wa nan desuka?',
            avatar: 'https://res.cloudinary.com/dy1uuo6ql/image/upload/v1726408359/vfsjhbdmrbfirjf2pfek.jpg',
        },
        {
            name: 'Namae wa nan desuka hha?',
            avatar: 'https://res.cloudinary.com/dy1uuo6ql/image/upload/v1726408359/vfsjhbdmrbfirjf2pfek.jpg',
        }, 
        {
            name: 'Namae wa nan desuka aahha?',
            avatar: 'https://res.cloudinary.com/dy1uuo6ql/image/upload/v1726408359/vfsjhbdmrbfirjf2pfek.jpg',
        }, 
    ]

    const settings = {
        dots: false,
        infinite: doctors.length > 1,
        speed: 500,
        slidesToShow: doctors.length === 1 ? 1 : 5,
        slidesToScroll: 1,

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

    return (
        <div className="h-[230px] rounded-xl bg-white text-[#003553] shadow-third">
            <div className="flex items-center justify-between p-5">
                <p className="text-[16px] font-bold">
                    Bác sĩ đang trực tại phòng khám
                </p>
                <p className="flex items-center gap-1 text-[12px] font-bold">
                    Yêu cầu tư vấn <ChevronsRight size={16} />
                </p>
            </div>

            <div className="slider-container flex w-full flex-row px-5">
                <Carousel settings={settings}>
                    {doctors.map((doctor, index) => {
                        return (
                            <div className="h-[200px] max-h-[140px] w-[93%] border-2 rounded-[12px] bg-white p-[10px]">
                                <div className="h-[70%] w-full  rounded-[8px] overflow-hidden">
                                    <Image
                                        src={doctor.avatar}
                                        alt="avatar"
                                        width={140}
                                        height={140}
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                                <p className='font-bold line-clamp-2'>
                                    {doctor.name}
                                </p>
                            </div>
                        )
                    })}
                </Carousel>
            </div>
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
            className="!flex w-full flex-row items-center !gap-[10px]"
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
            className="flex cursor-pointer items-center justify-center p-1 transition-all"
            onClick={onClick}
        >
            <ChevronRight size={18} className="text-secondarySupperDarker" />
        </div>
    )
}

const PrevArrow = (props: ArrowProps) => {
    const { onClick } = props
    return (
        <div
            className="flex cursor-pointer items-center justify-center p-1 transition-all"
            onClick={onClick}
        >
            <ChevronLeft size={18} className="text-secondarySupperDarker" />
        </div>
    )
}
