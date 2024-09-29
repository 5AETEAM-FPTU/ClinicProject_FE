'use client'
import { Button, Input, Layout, Popover } from 'antd'
import { Irish_Grover } from 'next/font/google'
import React, { useEffect, useState } from 'react'

import { cn } from '@/lib/utils'
import Logo from '@public/main/logo/FinalLogo.png'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Menu, {
    IndividualMenuItemType,
    TAppPathLayoutState,
} from '../../Core/ui/Menu'

import { useAppDispatch, useAppSelector } from '@/hooks/redux-toolkit'
import { toggleSidebar } from '@/stores/features/sidebar'
import { Bell, Home, Logs, Search, Settings } from 'lucide-react'
import { usePathname, useSearchParams } from 'next/navigation'
import { Footer } from 'antd/es/layout/layout'
import webStorageClient from '@/utils/webStorageClient'
import { useLocale } from 'next-intl'
import { signOut } from 'next-auth/react'

import { AppProgressBar } from 'next-nprogress-bar'
import themeColors from '@/style/themes/default/colors'
import { useRouter } from 'next/navigation'
import { DefaultImage } from '@/helpers/data/Default'
import { useTrigger } from '@/hooks/useTrigger'
import { jwtDecode } from 'jwt-decode'
import { JwtPayloadUpdated } from '@/components/Core/modules/Auth/SignIn'
import Notifications from './Notifications'

const { Header, Sider, Content } = Layout
const irishGrover = Irish_Grover({
    subsets: ['latin'],
    weight: '400',
    display: 'swap',
})

export type DashboardProps = {
    children: React.ReactNode
    sidebarItems?: IndividualMenuItemType[]
}

function DashboardLayout({ children, sidebarItems }: DashboardProps) {
    const { collapsed } = useAppSelector((state) => state.sidebar)
    const { user } = useAppSelector((state) => state.auth)
    const dispath = useAppDispatch()
    const router = useRouter()
    const locale = useLocale()
    const { handleTrigger, trigger } = useTrigger()
    const _accessToken = webStorageClient.getToken()
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
    const handleLogout = async () => {
        webStorageClient.removeAll()
        await signOut({ redirect: true, callbackUrl: `/${locale}/home` })
    }

    const notificationsUnReadLength = 2

    return (
        <Layout className="!h-screen">
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                className={cn(
                    '!min-w-[250px] !bg-dashboardBackgournd',
                    `${collapsed && '!min-w-[80px]'}`,
                )}
            >
                <div className="flex h-fit w-full flex-row items-center justify-center gap-2">
                    <div
                        className="flex select-none flex-row gap-2 border-b-[2px] border-secondaryDark p-4"
                        onClick={() => router.push('/home')}
                    >
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
                <Header className="flex !h-[74px] w-[calc(100%)] select-none flex-row items-center !bg-dashboardBackgournd !px-[20px] leading-none">
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
                            <div className="flex h-fit flex-row items-center gap-2 text-secondarySupperDarker">
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
                                <Popover
                                    trigger={'click'}
                                    open={trigger}
                                    content={<Notifications />}
                                    onOpenChange={handleTrigger}
                                    overlayClassName={cn(
                                        'min-w-[500px] max-h-[600px] overflow-hidden overflow-y-auto rounded-lg shadow-third',
                                    )}
                                >
                                    <div
                                        className={cn(
                                            'relative cursor-pointer rounded-lg bg-slate-100 p-[10px] transition-all duration-300 hover:bg-slate-200',
                                            `${trigger ? 'bg-secondaryDarkerOpacity' : ''}`,
                                        )}
                                    >
                                        <Bell size={24} />
                                        {notificationsUnReadLength > 0 && (
                                            <div className="absolute right-[-5px] top-[-5px] flex h-[18px] w-[18px] flex-row items-center justify-center rounded-full bg-red-600">
                                                <p className="text-[10px] text-white">
                                                    {notificationsUnReadLength}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </Popover>
                                <div className="cursor-pointer rounded-lg bg-slate-100 p-[10px] transition-all duration-300 hover:bg-slate-200">
                                    <Settings size={24} />
                                </div>
                                <div className="h-[30px] w-[2px] bg-secondarySupperDarker"></div>

                                <div
                                    className="h-[40px] w-[40px] cursor-pointer overflow-hidden rounded-full border-2 border-secondaryDark"
                                    onClick={() => {
                                        router.push(
                                            `/${locale}/${jwtDecode<JwtPayloadUpdated>(_accessToken!).role}/account/profile`,
                                        )
                                    }}
                                >
                                    <Image
                                        src={
                                            user.avatarUrl
                                                ? user.avatarUrl
                                                : DefaultImage
                                        }
                                        alt="avatar"
                                        width={200}
                                        height={200}
                                        className="h-full w-full object-cover"
                                    ></Image>
                                </div>
                                <Button
                                    type="text"
                                    className="cursor-pointer text-[16px] font-semibold text-secondarySupperDarker"
                                    onClick={() => {
                                        handleLogout()
                                    }}
                                >
                                    Đăng xuất
                                </Button>
                            </div>
                        </div>
                    </div>
                </Header>
                <div>
                    <AppProgressBar
                        height="4px"
                        color={themeColors.primaryDark}
                        options={{ showSpinner: false }}
                        shallowRouting
                        disableSameURL
                    />
                </div>
                <Content
                    className="overflow-y-auto bg-dashboardBackgournd !p-[20px] !pb-5"
                    style={{
                        margin: '0px 0px 0px 20px',
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
