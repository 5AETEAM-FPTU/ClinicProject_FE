'use client'
import { useAppSelector } from '@/hooks/redux-toolkit'
import { cn } from '@/lib/utils'
import { Typography } from 'antd'
import { motion } from 'framer-motion'
import { ChevronDown, ChevronUp, Dot } from 'lucide-react'
import { useRouter } from 'next-nprogress-bar'
import { useParams, usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export type MenuProps = {
    items: IndividualMenuItemType[]
}

function Menu({ items }: MenuProps) {
    const { collapsed } = useAppSelector((state) => state.sidebar)
    return (
        <motion.div
            layout
            className={cn(
                'w-full p-[20px] transition-all',
                `${collapsed ? 'px-[10px]' : 'p-[20px]'}`,
            )}
        >
            <motion.div
                layout
                className={cn('flex h-fit w-full flex-col gap-[15px]')}
            >
                {items.map((item, index) => {
                    return <MenuItem item={item} key={index} />
                })}
            </motion.div>
        </motion.div>
    )
}

export default Menu

export type InvididualMenuItemChildrenType = {
    key: string
    lable: string
}
export type IndividualMenuItemType = {
    key: string
    title: string
    icon: React.ReactElement
    childrens?: InvididualMenuItemChildrenType[] | null | undefined
}
export type MenuItemTypesProps = {
    item?: IndividualMenuItemType | null | undefined
}

export type TAppPathLayoutState = {
    layout: string
    distance: string
    destination: string
}

export function MenuItem({ item }: MenuItemTypesProps) {
    const { collapsed } = useAppSelector((state) => state.sidebar)

    const [isExpand, setIsExpand] = React.useState<boolean>(false)
    const [appLayoutState, setAppPathLayoutState] =
        useState<TAppPathLayoutState | null>(null)
    const toggle = () => setIsExpand(!isExpand)

    const router = useRouter()
    const param = useParams()
    const pathname = usePathname()

    const handleChangeRoute = (
        value: InvididualMenuItemChildrenType | null,
        distance: string,
    ) => {
        if (value == null && distance == 'overview') {
            router.push(
                `/${param.locale}/${appLayoutState?.layout}/${distance}`,
            )
            return
        } else if (value == null) return
        router.push(
            `/${param.locale}/${appLayoutState?.layout}/${distance}/${value!.key}`,
        )
    }

    const handlePathSegments = () => {
        const segments = pathname.split('/').filter((segment) => segment != '')
        const newAppLayoutState: TAppPathLayoutState = {
            layout: segments[1],
            distance: segments[2],
            destination: segments[3],
        }
        if (newAppLayoutState.distance == item?.key) setIsExpand(true)
        setAppPathLayoutState(newAppLayoutState)
    }

    useEffect(() => {
        return handlePathSegments()
    }, [pathname])

    return (
        <div className={cn("flex h-fit w-full select-none flex-col transition-all duration-500", `${collapsed && "items-center"}`)}>
            <div
                className={cn(
                    'flex w-full cursor-pointer flex-row items-center justify-between rounded-[10px] px-[16px] py-[10px] transition-all duration-300 hover:bg-slate-200',
                    `${item?.key == appLayoutState?.distance || item?.key == appLayoutState?.distance ? 'bg-white shadow-third' : null}`,
                    `${collapsed ? 'w-fit px-[10px]' : ''}`,
                )}
                onClick={toggle}
                style={{
                    boxShadow: '',
                }}
            >
                <div
                    className="flex flex-row items-center gap-[15px]"
                    onClick={() => {
                        handleChangeRoute(null, item!?.key)
                    }}
                >
                    <div
                        className={cn(
                            'flex h-[34px] w-[34px] items-center justify-center rounded-[4px] drop-shadow-lg',
                            `${item?.key == appLayoutState?.distance ? 'bg-secondaryDarkerOpacity drop-shadow-lg' : 'bg-white drop-shadow-lg'}`,
                        )}
                    >
                        {item?.icon}
                    </div>
                    {!collapsed && (
                        <div className="flex flex-row">
                            <Typography
                                className={cn(
                                    'text-secondarySupperDarker text-[16px] font-medium opacity-60',
                                    `${item?.key == appLayoutState?.distance ? 'opacity-100' : 'opacity-60'}`,
                                )}
                            >
                                {item?.title}
                            </Typography>
                        </div>
                    )}
                </div>
                {!collapsed && (
                    <div>
                        {item?.childrens!?.length > 0 ? (
                            isExpand ? (
                                <ChevronUp size={16} />
                            ) : (
                                <ChevronDown size={16} />
                            )
                        ) : null}
                    </div>
                )}
            </div>
            <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: isExpand ? 'auto' : 0, opacity: 1 }}
                transition={{ duration: 0.2, ease: 'easeInOut' }}
                style={{ overflow: 'hidden' }}
                layout
                className="flex flex-col gap-[10px]"
            >
                {isExpand &&
                    item?.childrens?.map((value, index) => {
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, translateY: -10 }}
                                animate={{
                                    opacity: isExpand ? 1 : 0,
                                    translateY: isExpand ? 0 : -10,
                                }}
                                transition={{
                                    duration: 0.3,
                                    delay: isExpand
                                        ? index * 0.1
                                        : (item.childrens!.length - index - 1) *
                                        0.1,
                                }}
                                className={cn(
                                    'flex cursor-pointer flex-row items-center gap-2 py-[5px] pl-[25px] pr-5',
                                    `${collapsed ? 'p-[5px] pl-2 pr-2' : 'py-[5px] pl-[25px] pr-5'}`,
                                )}
                                onClick={() => {
                                    handleChangeRoute(value, item.key)
                                }}
                            >
                                {!collapsed && <Dot />}
                                {collapsed ? (
                                    <p className={cn("text-secondarySupperDarker text-[16px] font-medium opacity-60",
                                        `${value.key == appLayoutState?.destination ? 'opacity-100' : 'opacity-60'}`
                                    )}>
                                        {value.lable.substring(0, 1)}
                                    </p>
                                ) : (
                                    <p className={cn("text-secondarySupperDarker text-[16px] font-medium opacity-60",
                                        `${value.key == appLayoutState?.destination ? 'opacity-100' : 'opacity-60'}`
                                    )}>
                                        {value.lable}
                                    </p>
                                )}
                            </motion.div>
                        )
                    })}
            </motion.div>
        </div>
    )
}
