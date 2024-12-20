'use client'
import { Button, Grid, Input, Layout, Popover } from 'antd'
import { Irish_Grover } from 'next/font/google'
import React, { useEffect, useRef, useState } from 'react'

import { cn } from '@/lib/utils'
import Logo from '@public/main/logo/FinalLogo.png'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Menu, {
    IndividualMenuItemType,
    TAppPathLayoutState,
} from '../../Core/ui/Menu'

import { JwtPayloadUpdated } from '@/components/Core/modules/Auth/SignIn'
import { DefaultImage } from '@/helpers/data/Default'
import { useAppDispatch, useAppSelector } from '@/hooks/redux-toolkit'
import useClickOutside from '@/hooks/useClickOutside'
import { useTrigger } from '@/hooks/useTrigger'
import { toggleSidebar } from '@/stores/features/sidebar'
import themeColors from '@/style/themes/default/colors'
import webStorageClient from '@/utils/webStorageClient'
import { api } from '@convex/_generated/api'
import { useQuery } from 'convex/react'
import { jwtDecode } from 'jwt-decode'
import { Bell, Home, LogOut, Logs, Search, Settings } from 'lucide-react'
import { signOut } from 'next-auth/react'
import { useLocale } from 'next-intl'
import { AppProgressBar } from 'next-nprogress-bar'
import { usePathname, useRouter } from 'next/navigation'
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

const { useBreakpoint } = Grid

function DashboardLayout({ children, sidebarItems }: DashboardProps) {
    const { collapsed } = useAppSelector((state) => state.sidebar)
    const { user } = useAppSelector((state) => state.auth)
    const sideBarRef = useRef(null)
    const handleToggleSidebar = () => dispath(toggleSidebar())
    const screen = useBreakpoint()

    useClickOutside(
        sideBarRef,
        () => !collapsed && !screen.md && handleToggleSidebar(),
    )
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

    const notifications = useQuery(
        api._user_notifications.functions.getUserNofitication,
        {
            receiverId: jwtDecode<JwtPayloadUpdated>(
                webStorageClient.getToken()!,
            ).sub!,
        },
    )
    const prevNotificationsLength = useRef(notifications?.length);

    useEffect(() => {
        if (audioRef.current && notifications) {
            if (
                prevNotificationsLength.current !== undefined &&
                notifications?.length > prevNotificationsLength.current
            ) {
                if (notifications?.length > prevNotificationsLength.current) {
                    audioRef.current.play();
                }
            }
        }
        prevNotificationsLength.current = notifications?.length;
    }, [notifications]);

    const hasNewNotification = !!notifications?.length
    const numberOfUnreadNotifications = notifications?.filter(
        (notification) => !notification.isRead
    )

    const audioRef = useRef<HTMLAudioElement | null>(null);
    return (
        <Layout className="!h-screen">
            <Sider
                ref={sideBarRef}
                trigger={null}
                collapsible
                collapsed={collapsed}
                className={cn(
                    '!min-w-[250px] !bg-dashboardBackgournd',
                    `${collapsed ? '!min-w-[80px] translate-x-[-80px] sm:translate-x-0' : 'translate-x-0'}`,
                    'fixed z-[999] h-full sm:static',
                )}
            >
                <audio ref={audioRef} preload='auto' src='https://res.cloudinary.com/dy1uuo6ql/video/upload/v1728659255/paowhflbqnlzhj092x2z.mp3' />
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
                        onClick={handleToggleSidebar}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />

                    <div className="flex w-full flex-row items-center justify-end gap-[20px] sm:justify-between">
                        <div className="hidden min-w-[170px] flex-col gap-2 sm:flex">
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
                        <div className="flex flex-row items-center">
                            {' '}
                            <div>
                                <Input
                                    prefix={
                                        <Search
                                            size={18}
                                            className="mr-3 text-secondaryDarker"
                                        />
                                    }
                                    className="hidden !w-[280px] !rounded-xl"
                                    placeholder="Tìm kiếm"
                                    size="middle"
                                ></Input>
                            </div>
                            <div className="flex flex-row items-center gap-5">
                                <Popover
                                    trigger={'click'}
                                    open={trigger}
                                    content={<Notifications payload={notifications!} />}
                                    onOpenChange={handleTrigger}
                                    overlayClassName={cn(
                                        'rounded-lg shadow-third',
                                    )}
                                >
                                    <div
                                        className={cn(
                                            'relative cursor-pointer rounded-lg bg-slate-100 p-[10px] transition-all duration-300 hover:bg-slate-200',
                                            `${trigger ? 'bg-secondaryDarkerOpacity' : ''}`,
                                        )}
                                    >
                                        <Bell size={24} />
                                        {numberOfUnreadNotifications!?.length > 0 && (
                                            <div className="absolute right-[-5px] top-[-5px] flex h-[18px] w-[18px] flex-row items-center justify-center rounded-full bg-red-600">
                                                <p className="text-[10px] text-white">
                                                    {hasNewNotification ? numberOfUnreadNotifications?.length : null}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </Popover>
                                <div className="cursor-pointer rounded-lg bg-slate-100 p-[10px] transition-all duration-300 hover:bg-slate-200"
                                    onClick={() => router.push(`/${locale}/${jwtDecode<JwtPayloadUpdated>(_accessToken!).role}/account/settings`)}
                                >
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
                                    className="hidden cursor-pointer text-[16px] font-semibold text-secondarySupperDarker md:block"
                                    onClick={() => {
                                        handleLogout()
                                    }}
                                >
                                    Đăng xuất
                                </Button>
                                <Button
                                    onClick={() => {
                                        handleLogout()
                                    }}
                                    className="d-block md:hidden"
                                    icon={<LogOut />}
                                />
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
                        margin: `0px 0px 0px ${!screen.md ? '0px' : '20px'}`,
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
