'use client'

import { Button, Skeleton } from 'antd'
import { jwtDecode } from 'jwt-decode'
import { ChevronLeft, ChevronRight, ChevronsRight } from 'lucide-react'
import { useLocale } from 'next-intl'
import { useRouter } from 'next-nprogress-bar'
import Image from 'next/image'
import Slider, { Settings } from 'react-slick'

import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'
import { JwtPayloadUpdated } from '../../../Auth/SignIn'
import webStorageClient from '@/utils/webStorageClient'
import { useGetAvailableDoctorQuery } from '@/stores/services/doctor/doctorTreatmentTurn'
import { use, useEffect, useState } from 'react'

export default function UserAvailableDoctor() {
    const router = useRouter()
    const locale = useLocale()
    const role = jwtDecode<JwtPayloadUpdated>(webStorageClient.getToken()!).role
    // const doctors = [
    //     {
    //         name: 'Namae wa nan desuka?',
    //         avatar: 'https://res.cloudinary.com/dy1uuo6ql/image/upload/v1726408359/vfsjhbdmrbfirjf2pfek.jpg',
    //     },
    //     {
    //         name: 'Namae wa nan desuka hha?',
    //         avatar: 'https://res.cloudinary.com/dy1uuo6ql/image/upload/v1726408359/vfsjhbdmrbfirjf2pfek.jpg',
    //     },
    //     {
    //         name: 'Namae wa nan desuka aahha?',
    //         avatar: 'https://res.cloudinary.com/dy1uuo6ql/image/upload/v1726408359/vfsjhbdmrbfirjf2pfek.jpg',
    //     },
    // ]
    const [doctors, setDoctors] = useState<any>([])



    const { doctorsData, isFetching } = useGetAvailableDoctorQuery(
        undefined, {
        selectFromResult: ({ data, isFetching }) => {
            return {
                doctorsData: data?.body?.doctors,
                isFetching: isFetching
            }
        }
    }

    );
    useEffect(() => {
        if (doctorsData) {
            setDoctors(doctorsData)
        }
    }, [doctorsData])


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
        <Skeleton active loading={isFetching} >
            <div className="h-[230px] rounded-xl bg-white text-[#003553] shadow-third">
                <div className="flex items-center justify-between p-5">
                    <p className="text-[16px] font-bold">
                        Bác sĩ đang trực tại phòng khám
                    </p>
                    <Button className="flex items-center gap-1 text-[12px] font-bold border-none" onClick={() => { router.push(`/${locale}/${role}/doctors/all-doctors`) }}>
                        {role === 'user' ? (<div className='flex items-center gap-1'>Yêu cầu tư vấn<ChevronsRight size={16} /></div>) : (<div className='flex items-center gap-1'>Danh sách bác sĩ <ChevronsRight size={16} /></div>)}
                    </Button>
                </div>

                <div className="slider-container flex w-full flex-row px-5">

                    {
                        doctors.length > 0 && (
                            <Carousel settings={settings}>
                                {doctors?.map((doctor: any, index: number) => {
                                    return (
                                        <div className="h-[200px] max-h-[140px] w-[100px] border-2 rounded-[12px] bg-white p-[10px]">
                                            <div className="h-[70%] w-full  rounded-[8px] overflow-hidden">
                                                <Image
                                                    src={doctor.avatarUrl}
                                                    alt="avatar"
                                                    width={140}
                                                    height={140}
                                                    className="h-full w-full object-cover"
                                                />
                                            </div>
                                            <p className='font-bold line-clamp-2'>
                                                {doctor.fullName}
                                            </p>
                                        </div>
                                    )
                                })}
                            </Carousel>
                        )
                    }
                </div>
            </div>
        </Skeleton>
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
