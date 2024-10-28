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
import { useParams } from 'next/navigation'
import { useTranslation } from '@/app/i18n/client'

function Specialty() {
    const params = useParams()
    const { t } = useTranslation(params?.locale as string, 'Landing')

    return (
        <div

        >
            <CommonSection
                title={t('specialist_title')}
                subtile={t('specialist_sub')}
            >
                <div className="flex flex-row w-full justify-center sm:flex-col gap-[16px] sm:gap-[30px] p-0 sm:px-[80px]">
                    <div className="flex flex-col sm:flex-row justify-between">
                        <div className="flex flex-col items-center justify-center gap-[16px]">
                            <div className="h-[95px] w-[95px]">
                                <Image
                                    src={BacSiGiaDinh}
                                    alt="alt"
                                    className="object-contain"
                                ></Image>
                            </div>
                            <p className="font-semibold text-secondaryDark">
                                {t('specialist_family_doctor')}
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
                                {t('specialist_general_internal')}
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
                                {t('specialist_internal_cardiology')}
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
                                {t('specialist_internal_neurology')}
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
                                {t('specialist_internal_infectious_diseases')}
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-between">
                        <div className="ic flex flex-col gap-[16px] items-center justify-center">
                            <div className="h-[95px] w-[95px]">
                                <Image
                                    src={NoiTietNieu}
                                    alt="alt"
                                    className="object-contain"
                                ></Image>
                            </div>
                            <p className="font-semibold text-secondaryDark">
                                {t('specialist_endocrinology_and_urology')}
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
                                {t('specialist_internal_respiration')}
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
                                {t('specialist_internal_thoracic_cage')}
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
                                {t('specialist_internal_digestion')}
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
                                {t('specialist_internal_musculoskeletal')}
                            </p>
                        </div>
                    </div>
                </div>
            </CommonSection>
        </div>
    )
}

export default Specialty
