import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import ClimbingBoxLoader from '@/components/Core/common/RingLoader';

const inter = Inter({ subsets: ['latin'] });


type Language = 'en' | 'vi'

export async function generateMetadata({
    params,
}: {
    params: { locale: string }
}): Promise<Metadata> {
    const locale = params.locale as Language
    const translations = {
        en: {
            title: 'P-Clinic - Private internal medicine clinic',
            description:
                'P-Clinic - Private internal medicine clinic - 24/7 appointment scheduling - Online health consultation',
            image: 'https://res.cloudinary.com/dy1uuo6ql/image/upload/v1729052782/lhrnoevnlu0wwcodegsn.png',
        },
        vi: {
            title: 'P-Clinic - Phòng khám nội khoa tư nhân',
            description:
                'P-Clinic - Phòng khám nội khoa tư nhân - Đặt lịch hẹn 24/7 - Tư vấn sức khỏe trực tuyến',
            image: 'https://res.cloudinary.com/dy1uuo6ql/image/upload/v1729052782/lhrnoevnlu0wwcodegsn.png',
        },
    }

    const seoData = translations[locale as Language] || translations['vi']

    return {
        title: seoData.title,
        description: seoData.description,
        icons: "/icons/layout/p-clinic.png",
        openGraph: {
            title: seoData.title,
            description: seoData.description,
            type: 'website',
            locale: locale,
            images: [
                {
                    url: seoData.image,
                    width: 1200,
                    height: 630,
                    alt: seoData.title,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: seoData.title,
            description: seoData.description,
            images: [seoData.image],
        },
    }
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: {
    locale: string;
  };
}>) {
  return (
    <html lang={params?.locale} suppressHydrationWarning={false} className="dark">
      <body
        className={cn(inter.className)}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}