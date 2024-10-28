'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { useParams } from 'next/navigation'
import { useTranslation } from '@/app/i18n/client'
import Image from 'next/image'

import CommonSection from '@/components/Core/common/CommonSection'
import DoctorTeam from '@public/landing/images/group-doctors-hospital.png'



function WhoAreWe() {
    const params = useParams()
    const { t } = useTranslation(params?.locale as string, 'Landing')

    const html = {
        inner: `<p><span style="color: rgb(44,130,201);font-size: 24px;"><strong>P-Clinic</strong></span><span style="font-size: 24px;"><strong> </strong></span>${t('who_we_are_description')}</p>\n<p><br><span style="color: rgb(84,172,210);"><strong>${t('who_we_are_slogan')}</strong></span></p>`,
    }

    return (
        <div
        >
            <CommonSection
                tailCustomStyle="bg-white !pt-0 bg-gradient-to-b from-white to-secondaryLight"
                title={t('who_we_are_title')}
                subtile={t('who_we_are_subtitle')}
            >
                <div className="flex flex-col sm:flex-row justify-between gap-[40px] sm:gap-[80px]">
                    <div
                        className="max-w-[650px] text-[14px] sm:text-[20px] font-semibold leading-[1.2]"
                        dangerouslySetInnerHTML={{ __html: html.inner }}
                    ></div>
                    <div className="relative w-full sm:w-[540px] sm:max-w-[540px]">
                        <div className="sm:absolute bottom-0 right-0 flex h-[180px] w-full sm:h-[272px] sm:w-[496px] flex-col gap-5 rounded-xl">

                            <Image
                                src={DoctorTeam}
                                alt="banner"
                                width={496}
                                height={272}
                                className="h-full w-full rounded-xl object-cover blur-md"
                            />
                        </div>
                        <div className="absolute top-0 left-0 sm:left-2 sm:top-2 flex h-[180px] w-full sm:h-[272px] sm:w-[496px]  flex-col gap-5 rounded-xl border-4 border-secondaryDark drop-shadow-2xl">
                            <Image
                                src={DoctorTeam}
                                alt="banner"
                                width={496}
                                height={272}
                                className="border-3 h-full w-full rounded-lg border-secondaryDark object-cover"
                            />
                        </div>
                    </div>
                </div>
            </CommonSection>
        </div>
    )
}

export default WhoAreWe
