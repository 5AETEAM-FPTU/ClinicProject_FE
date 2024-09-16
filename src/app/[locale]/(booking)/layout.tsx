import React from 'react'
import LandingLayout from '@/components/Layouts/LandingLayout'
import { Metadata } from 'next'
import { getCookies } from 'cookies-next'
import { cookieName } from '@/app/i18n/settings'
import { cookies } from 'next/headers'

type Language = 'en' | 'vi'

export async function generateMetadata({
    params,
}: {
    params: { locale: string }
}): Promise<Metadata> {
    const locale = params.locale as Language;
    const translations = {
        en: {
            title: 'P-Clinic - Private internal medicine clinic',
            description:
                'P-Clinic - Private internal medicine clinic - 24/7 appointment scheduling - Online health consultation',
        },
        vi: {
            title: 'P-Clinic - Phòng khám nội khoa tư nhân',
            description:
                'P-Clinic - Phòng khám nội khoa tư nhân - Đặt lịch hẹn 24/7 - Tư vấn sức khỏe trực tuyến',
        },
    }

    const seoData = translations[locale as Language] || translations['vi']

    return {
        title: seoData.title,
        description: seoData.description,
        openGraph: {
            title: seoData.title,
            description: seoData.description,
            type: 'website',
            locale: locale,
        },
    }
}

function LandingRootLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}

export default LandingRootLayout
