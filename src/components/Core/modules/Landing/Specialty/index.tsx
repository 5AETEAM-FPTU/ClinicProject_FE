'use client'
import CommonSection from '@/components/Core/common/CommonSection'
import React from 'react'
import Image from 'next/image'

import { motion } from 'framer-motion'

import BacSiGiaDinh from '@public/landing/specialty/BacSiGiaDinh.png'
import LongNgucMachMau from '@public/landing/specialty/LongNgucManhMau.png'
import NoiCoXuongKhop from '@public/landing/specialty/NoiCoXuongKhop.png'
import NoiHohap from '@public/landing/specialty/NoiHoHap.png'
import NoiThanKinh from '@public/landing/specialty/NoiThanKinh.png'
import NoiTieuHoa from '@public/landing/specialty/NoiTieuHoa.png'
import NoiTietNieu from '@public/landing/specialty/NoiTietNieu.png'
import NoiTimMach from '@public/landing/specialty/NoiTimMach.png'
import NoiTongQuat from '@public/landing/specialty/NoiTongQuat.png'
import NoiTruyenNhiem from '@public/landing/specialty/NoiTruyenNhiem.png'

function Specialty() {
    return (
        <div
            
        >
            <CommonSection
                title={'Chuyên khoa nội'}
                subtile={'Tất cả các chuyên khoa tại P-Clinic'}
            >
                <div className="flex flex-col gap-[30px] px-[80px]">
                    <div className="flex flex-row justify-between">
                        <div className="flex flex-col items-center justify-center gap-[16px]">
                            <div className="h-[95px] w-[95px]">
                                <Image
                                    src={BacSiGiaDinh}
                                    alt="alt"
                                    className="object-contain"
                                ></Image>
                            </div>
                            <p className="font-semibold text-secondaryDark">
                                Bác sĩ gia đình
                            </p>
                        </div>
                        <div className="flex flex-col items-center justify-center gap-[16px]">
                            <div className="h-[95px] w-[95px]">
                                <Image
                                    src={NoiTongQuat}
                                    alt="alt"
                                    className="object-contain"
                                ></Image>
                            </div>
                            <p className="font-semibold text-secondaryDark">
                                Nội tổng quát
                            </p>
                        </div>
                        <div className="flex flex-col items-center justify-center gap-[16px]">
                            <div className="h-[95px] w-[95px]">
                                <Image
                                    src={NoiTimMach}
                                    alt="alt"
                                    className="object-contain"
                                ></Image>
                            </div>
                            <p className="font-semibold text-secondaryDark">
                                Nội Tim Mạch
                            </p>
                        </div>
                        <div className="flex flex-col items-center justify-center gap-[16px]">
                            <div className="h-[95px] w-[95px]">
                                <Image
                                    src={NoiThanKinh}
                                    alt="alt"
                                    className="object-contain"
                                ></Image>
                            </div>
                            <p className="font-semibold text-secondaryDark">
                                Nội Thần Kinh
                            </p>
                        </div>
                        <div className="flex flex-col items-center justify-center gap-[16px]">
                            <div className="h-[95px] w-[95px]">
                                <Image
                                    src={NoiTruyenNhiem}
                                    alt="alt"
                                    className="object-contain"
                                ></Image>
                            </div>
                            <p className="font-semibold text-secondaryDark">
                                Nội Truyền Nhiễm
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-row justify-between">
                        <div className="ic flex flex-col gap-[16px] items-center justify-center">
                            <div className="h-[95px] w-[95px]">
                                <Image
                                    src={NoiTietNieu}
                                    alt="alt"
                                    className="object-contain"
                                ></Image>
                            </div>
                            <p className="font-semibold text-secondaryDark">
                                Nội Tiết Niệu
                            </p>
                        </div>
                        <div className="ic flex flex-col gap-[16px] items-center justify-center">
                            <div className="h-[95px] w-[95px]">
                                <Image
                                    src={NoiHohap}
                                    alt="alt"
                                    className="object-contain"
                                ></Image>
                            </div>
                            <p className="font-semibold text-secondaryDark">
                                Nội Hô Hấp
                            </p>
                        </div>
                        <div className="ic flex flex-col gap-[16px] items-center justify-center">
                            <div className="h-[95px] w-[95px]">
                                <Image
                                    src={LongNgucMachMau}
                                    alt="alt"
                                    className="object-contain"
                                ></Image>
                            </div>
                            <p className="font-semibold text-secondaryDark">
                                Lồng Ngưc - Mạch Máu
                            </p>
                        </div>
                        <div className="ic flex flex-col gap-[16px] items-center justify-center">
                            <div className="h-[95px] w-[95px]">
                                <Image
                                    src={NoiTieuHoa}
                                    alt="alt"
                                    className="object-contain"
                                ></Image>
                            </div>
                            <p className="font-semibold text-secondaryDark">
                                Nội Tiêu Hóa
                            </p>
                        </div>
                        <div className="ic flex flex-col gap-[16px] items-center justify-center">
                            <div className="h-[95px] w-[95px]">
                                <Image
                                    src={NoiCoXuongKhop}
                                    alt="alt"
                                    className="object-contain"
                                ></Image>
                            </div>
                            <p className="font-semibold text-secondaryDark">
                                Nội Cơ Xương Khớp
                            </p>
                        </div>
                    </div>
                    <div></div>
                </div>
            </CommonSection>
        </div>
    )
}

export default Specialty
