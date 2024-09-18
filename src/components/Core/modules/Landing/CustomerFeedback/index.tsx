'use client'
import CommonSection from '@/components/Core/common/CommonSection'
import QuotedIcon from '@public/landing/icons/QuoteIcon'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import Slider, { Settings } from 'react-slick'

import { motion } from 'framer-motion'

function CustomerFeedback() {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
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
    const data = [
        {
            avatar: 'https://res.cloudinary.com/dy1uuo6ql/image/upload/v1726408359/vfsjhbdmrbfirjf2pfek.jpg',
            message:
                'Lần đầu tiên trải nghiệm dịch vụ tư vấn qua video, mình rất bất ngờ vì sự tiện lợi và chuyên nghiệp. Không cần phải xếp hàng chờ đợi ở bệnh viện mà vẫn được gặp bác sĩ giỏi và nhận lời khuyên tận tình ngay tại nhà. Đặc biệt trong mùa dịch, đây đúng là giải pháp tuyệt vời. Mình sẽ tiếp tục sử dụng dịch vụ này trong tương lai.',
            name: 'Trần Văn Kết Nghĩa',
        },
        {
            avatar: 'https://res.cloudinary.com/dy1uuo6ql/image/upload/v1726406772/udqesjq7wu1sewrhpdzn.jpg',
            message:
                'Dịch vụ tư vấn bác sĩ qua video tiện thật. Mình bị stress, không muốn gặp đám đông nên mình tìm hiểu tư vấn khám từ xa với bác sĩ tâm lý ở bên đây. Thực sự quá tiện, bác sĩ tư vấn cũng rất chi tiết, nhẹ nhàng. Mình thấy đáng tiền lắm nha.',
            name: 'Hoàng Mai Vy',
        },
        {
            avatar: 'https://res.cloudinary.com/dy1uuo6ql/image/upload/v1726408410/yo4btvkwc5iotnfus1i9.jpg',
            message:
                'Mình thường xuyên di chuyển nên rất khó để đến khám tại bệnh viện. Dịch vụ tư vấn từ xa này giúp mình không phải lo lắng về vấn đề đó nữa. Chỉ cần có internet là có thể gặp bác sĩ, nhận được tư vấn chuyên môn và đơn thuốc. Quá tiện lợi! Bác sĩ cũng giải đáp rất nhanh và đầy đủ, mình rất hài lòng.',
            name: 'Võ Hoàng Gia Lăng',
        },
    ]

    return (
        <div
            
        >
            <CommonSection
                title={'Cảm nhận từ khách hàng'}
                subtile={
                    'Cảm nhận trực quang từ những khách hàng từng khám bệnh tại P-Clinic'
                }
                tailCustomStyle="bg-gradient-to-b from-white to-secondary"
            >
                <Carousel settings={settings}>
                    {data.map((item, index) => (
                        <div
                            className="!flex h-[400px] w-[360px] !flex-col !items-center !justify-center"
                            key={index}
                        >
                            <div className="h-[94%] w-[92%] overflow-hidden rounded-xl bg-white p-5 shadow-secondary">
                                <div className="flex h-full flex-col gap-5">
                                    <div className="flex flex-grow flex-col items-center gap-5">
                                        <QuotedIcon />
                                        <p
                                            dangerouslySetInnerHTML={{
                                                __html: item.message,
                                            }}
                                        ></p>
                                    </div>
                                    <div className="flex flex-col items-center justify-center border-t-2 pt-5">
                                        <div>
                                            <Image
                                                src={item.avatar}
                                                alt="avatar"
                                                width={500}
                                                height={500}
                                                className="h-[60px] w-[60px] rounded-full border-2 border-secondaryDark object-cover"
                                            ></Image>
                                        </div>
                                        <p className="text-[14px] font-bold text-secondaryDark">
                                            {item.name}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </Carousel>
            </CommonSection>
        </div>
    )
}

export default CustomerFeedback

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
