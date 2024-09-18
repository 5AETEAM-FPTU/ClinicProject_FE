'use client'
import { Button, Input, Layout } from 'antd'
import { Irish_Grover } from 'next/font/google'
import React, { useEffect, useState } from 'react'

import { cn } from '@/lib/utils'
import Logo from '@public/main/logo/FinalLogo.png'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Menu, { IndividualMenuItemType, TAppPathLayoutState } from '../../Core/ui/Menu'

import { useAppDispatch, useAppSelector } from '@/hooks/redux-toolkit'
import { toggleSidebar } from '@/stores/features/sidebar'
import { Bell, Home, Logs, Search, Settings } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Footer } from 'antd/es/layout/layout'

const { Header, Sider, Content } = Layout
const irishGrover = Irish_Grover({
    subsets: ['latin'],
    weight: '400',
    display: 'swap',
})

export type DashboardProps = {
    children: React.ReactNode
    sidebarItems?: IndividualMenuItemType[];
}

function DashboardLayout({ children, sidebarItems }: DashboardProps) {
    const { collapsed } = useAppSelector((state) => state.sidebar)
    const dispath = useAppDispatch()

    const [appLayoutState, setAppPathLayoutState] =
        useState<TAppPathLayoutState | null>(null)
    const pathname = usePathname()

    const handlePathSegments = () => {
        const segments = pathname.split('/').filter((segment) => segment != '')
        const newAppLayoutState: TAppPathLayoutState = {
            layout: segments[1],
            distance: segments[2],
            destination: segments[3],
        }

        setAppPathLayoutState(newAppLayoutState)
    }
    useEffect(() => {
        return handlePathSegments()
    }, [pathname])

    console.log(appLayoutState)
    const handleRenderDistance = (key: 'distance' | 'destination') => {
        return sidebarItems?.map((item) => {
            if (item.key === appLayoutState?.distance && key === 'distance') {
                return item.title
            } else {
                return item.childrens?.map((child) => {
                    if (
                        child.key === appLayoutState?.destination &&
                        key === 'destination'
                    ) {
                        return child.lable
                    }
                })
            }
        })
    }

    return (
        <Layout className="!h-screen">
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                className={cn(
                    '!bg-dashboardBackgournd !min-w-[250px]',
                    `${collapsed && '!min-w-[80px]'}`,
                )}
            >
                <div className="flex h-fit w-full flex-row items-center justify-center gap-2">
                    <div className="flex flex-row gap-2 border-b-[2px] border-secondaryDark p-4">
                        <div className="h-[45px] w-[45px]">
                            <Image
                                src={Logo}
                                alt="logo"
                                className="object-cover"
                            ></Image>
                        </div>
                        {collapsed ? null : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.1 }}
                                className={irishGrover.className}
                            >
                                <p className="text-[24px] font-bold text-secondaryDarker">
                                    P-CLINIC
                                </p>
                            </motion.div>
                        )}
                    </div>
                </div>
                <Menu items={sidebarItems!} />
            </Sider>
            <Layout className="!bg-dashboardBackgournd">
                <Header className="!bg-dashboardBackgournd flex !h-[74px] w-[calc(100%)] select-none flex-row items-center !px-[20px] leading-none">
                    <Button
                        type="text"
                        icon={
                            collapsed ? (
                                <Logs className="text-secondarySupperDarker" />
                            ) : (
                                <Logs className="text-secondarySupperDarker" />
                            )
                        }
                        onClick={() => dispath(toggleSidebar())}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />

                    <div className="flex w-full flex-row items-center justify-between gap-[20px]">
                        <div className="flex flex-col gap-2">
                            <div className="text-secondarySupperDarker flex h-fit flex-row items-center gap-2">
                                <Home size={18} />
                                <span>/</span>
                                <p>Trang</p>
                                <span>/</span>
                                <p>{handleRenderDistance('distance')}</p>
                                {appLayoutState?.destination && <span>/</span>}
                                <p>{handleRenderDistance('destination')}</p>
                            </div>
                            <div className="h-fit">
                                <p className="text-[18px] font-semibold text-secondaryDark">
                                    {appLayoutState?.destination
                                        ? handleRenderDistance('destination')
                                        : handleRenderDistance('distance')}
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-row items-center gap-[100px]">
                            {' '}
                            <div>
                                <Input
                                    prefix={
                                        <Search
                                            size={18}
                                            className="mr-3 text-secondaryDarker"
                                        />
                                    }
                                    className="!w-[280px] !rounded-xl"
                                    placeholder="Tìm kiếm"
                                    size="middle"
                                ></Input>
                            </div>
                            <div className="flex flex-row items-center gap-5">
                                <div className='cursor-pointer relative p-[10px] hover:bg-slate-200 bg-slate-100 rounded-lg transition-all duration-300'>
                                    <Bell size={24} />
                                    <div className="absolute right-[-5px] top-[-5px] flex h-[18px] w-[18px] flex-row items-center justify-center rounded-full bg-red-600">
                                        <p className="text-[10px] text-white">
                                            5
                                        </p>
                                    </div>
                                </div>
                                <div className="cursor-pointer p-[10px] hover:bg-slate-200 bg-slate-100 rounded-lg transition-all duration-300">
                                    <Settings size={24} />
                                </div>
                                <div className="bg-secondarySupperDarker h-[30px] w-[2px]"></div>

                                <div className="h-[40px] w-[40px] cursor-pointer overflow-hidden rounded-full border-2 border-secondaryDark">
                                    <Image
                                        src={
                                            'https://res.cloudinary.com/dy1uuo6ql/image/upload/v1726406772/udqesjq7wu1sewrhpdzn.jpg'
                                        }
                                        alt="avatar"
                                        width={200}
                                        height={200}
                                        className="h-full w-full object-cover"
                                    ></Image>
                                </div>
                                <div className="text-secondarySupperDarker cursor-pointer text-[16px] font-semibold">
                                    Đăng xuất
                                </div>
                            </div>
                        </div>
                    </div>
                </Header>
                <Content
                    className="bg-dashboardBackgournd !p-[20px] !pb-0 overflow-y-auto"
                    style={{
                        margin: '20px 0px 0px 20px',
                        padding: 24,
                        minHeight: 280,
                    }}
                >
                    {children}
                    {/* <Footer className='bg-[#F8F9FB] !p-0'>
                        <div className='w-full p-5 flex flex-row gap-5'>
                            <p>© Bản quyền thuộc về Team 5AE © 2024, All Rights Reserved ❤️</p>
                        </div>
                    </Footer> */}
                </Content>
            </Layout>
        </Layout>
    )
}

export default DashboardLayout
