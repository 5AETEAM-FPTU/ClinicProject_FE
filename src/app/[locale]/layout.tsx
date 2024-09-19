import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import ClimbingBoxLoader from '@/components/Core/common/ClimbingBoxLoader';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "P-CLINIC",
  description: "P-CLINIC",
  icons: "/icons/layout/p-clinic.png",
};

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