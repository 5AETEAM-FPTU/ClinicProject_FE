'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { useParams } from 'next/navigation'
import { useTranslation } from '@/app/i18n/client'
import Image from 'next/image'

import CommonSection from '@/components/Core/common/CommonSection'
import DoctorTeam from '@public/landing/images/group-doctors-hospital.png'

const html = {
    inner: '<p><span style="color: rgb(44,130,201);font-size: 24px;"><strong>P-Clinic</strong></span><span style="font-size: 24px;"><strong> </strong></span>là phòng khám tư nhân chuyên về nội khoa, với sứ mệnh mang đến dịch vụ y tế chất lượng cao và cá nhân hóa cho mỗi bệnh nhân. Đội ngũ bác sĩ giàu kinh nghiệm của chúng tôi luôn tận tâm, chuyên nghiệp trong việc chẩn đoán và điều trị các bệnh lý nội khoa, từ những bệnh thường gặp đến những tình trạng phức tạp hơn.<br></p>\n<p><br/>Chúng tôi không chỉ cung cấp dịch vụ khám trực tiếp mà còn hỗ trợ tư vấn trực tuyến, đặt lịch khám dễ dàng và giao thuốc tận nhà, giúp bạn tiếp cận y tế nhanh chóng, thuận tiện. Với P-Clinic sức khỏe của bạn luôn được chăm sóc một cách toàn diện và bền vững.</p>\n<p><br><span style="color: rgb(84,172,210);"><strong>Sức khỏe của bạn là ưu tiên hàng đầu của chúng tôi!</strong></span></p>',
}

function WhoAreWe() {
    const params = useParams()

    const { t } = useTranslation(params?.locale as string, 'Landing')
    return (
        <div
        >
            <CommonSection
                tailCustomStyle="bg-white !pt-0 bg-gradient-to-b from-white to-secondaryLight"
                title={'Chúng tôi là ai ?'}
                subtile={'Y đội ngũ bác sĩ đến từ phòng khám P-Clinic'}
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
