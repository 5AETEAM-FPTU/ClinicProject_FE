'use client'
import CommonSection from '@/components/Core/common/CommonSection'
import React from 'react'

import { motion } from 'framer-motion'
import { update } from 'lodash'
import Image from 'next/image'

function MedicalNews() {
    const data = [
        {
            thumbnails:
                'https://res.cloudinary.com/dy1uuo6ql/image/upload/v1726445844/bygsxdd0woh8my3dfflw.png',
            title: 'Điều kiện & Điều khoản Chương trình Khuyến mãi Hoàn tiền lên đến 5%',
            updatedAt: '05/09/2024, 01:00',
            subcontent:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce dictum mattis metus ac scelerisque. Praesent pretium pharetra metus in auctor. Suspendisse eget hendrerit massa, ut pharetra eros. Integer risus diam, blandit sed finibus nec, pretium ut nunc. Donec tempus sodales neque ac elementum. Nulla pellentesque turpis id augue luctus, vel blandit justo feugiat. Fusce neque nisi, fringilla ultricies massa at, sollicitudin faucibus turpis. Sed tellus mi...',
        },
        {
            thumbnails:
                'https://res.cloudinary.com/dy1uuo6ql/image/upload/v1726446060/p65dcvuktks2fu7jb25e.webp',
            title: 'Dự báo bệnh nhi tháng 08/2024: Sởi, Tiêu chảy cấp bùng phát',
            updatedAt: '28/08/2024, 11:14',
            subcontent: '',
        },
        {
            thumbnails:
                'https://res.cloudinary.com/dy1uuo6ql/image/upload/v1726446218/twurlzatiusb8drtukkh.webp',
            title: 'Bệnh lao phổi: triệu chứng, đối tượng và cách phòng ngừa',
            updatedAt: '11/08/2024, 10:53',
            subcontent: '',
        },
        {
            thumbnails:
                'https://res.cloudinary.com/dy1uuo6ql/image/upload/v1726446343/pckyefcwfuww8m8uq4vz.webp',
            title: 'Báo động bệnh sốt xuất huyết gia tăng hơn 41.000 ca nhiễm',
            updatedAt: '12/08/2024, 10:53',
            subcontent: '',
        },
        {
            thumbnails:
                'https://res.cloudinary.com/dy1uuo6ql/image/upload/v1726446479/lksekdiwfqzhfmhpvtmg.webp',
            title: 'Bệnh sởi bùng phát, Sở Y tế TPHCM đề xuất công bố dịch',
            updatedAt: '13/08/2024, 10:53',
            subcontent: '',
        },
    ]
    return (
        <div
           
        >
            <CommonSection
                title={'Tin tức y tế'}
                subtile={
                    'Cập nhật các thông tin y tế hữu ích dành cho mọi khách hàng'
                }
                tailCustomStyle="bg-gradient-to-b from-secondary to-white"
            >
                <div className="flex flex-row gap-[40px]">
                    <div className="gap-[40px flex h-[600px] w-[480px] flex-col gap-[8px] rounded-xl bg-white p-5 shadow-primary">
                        <div className="h-[280px] w-full">
                            <Image
                                src={data[0].thumbnails}
                                alt="thumbnails"
                                width={500}
                                height={500}
                                className="h-full w-full rounded-md object-cover"
                            ></Image>
                        </div>
                        <div className="flex flex-col gap-[4px]">
                            <p className="text-[20px] font-bold">
                                {data[0].title}
                            </p>
                            <p className="text-[12px]">{data[0].updatedAt}</p>
                        </div>
                        <div>
                            <p className="text-[14px]">{data[0].subcontent}</p>
                        </div>
                        <div>
                            <a href="#" className="text-secondaryDark">
                                Xem chi tiết{' '}
                            </a>
                        </div>
                    </div>
                    <div className="flex flex-col gap-[40px]">
                        <div className="flex flex-row gap-[40px]">
                            {' '}
                            {/* <div className="flex h-[280px] w-[360px] flex-col rounded-xl bg-slate-500"></div>
                            <div className="flex h-[280px] w-[360px] flex-col rounded-xl bg-slate-500"></div> */}
                            {data.slice(1, 3).map((item, index) => {
                                return (
                                    <div className="flex h-[280px] w-[360px] flex-col gap-[12px] rounded-xl bg-white p-[14px] shadow-primary" key={index}>
                                        <div>
                                            <Image
                                                src={item.thumbnails}
                                                alt="thumbnails"
                                                width={500}
                                                height={500}
                                                className="h-[166px] rounded-lg object-cover"
                                            ></Image>
                                        </div>
                                        <div className="flex flex-col gap-[12px]">
                                            <p className="font-bold">
                                                {item.title}
                                            </p>
                                            <p className="font-bold">
                                                {item.updatedAt}
                                            </p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="flex flex-row gap-[40px]">
                            {data.slice(3, 5).map((item, index) => {
                                return (
                                    <div className="flex h-[280px] w-[360px] flex-col gap-[12px] rounded-xl bg-white p-[14px] shadow-primary" key={index}>
                                        <div>
                                            <Image
                                                src={item.thumbnails}
                                                alt="thumbnails"
                                                width={500}
                                                height={500}
                                                className="h-[166px] rounded-lg object-cover"
                                            ></Image>
                                        </div>
                                        <div className="flex flex-col gap-[12px]">
                                            <p className="font-bold">
                                                {item.title}
                                            </p>
                                            <p className="font-bold">
                                                {item.updatedAt}
                                            </p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </CommonSection>
        </div>
    )
}

export default MedicalNews
