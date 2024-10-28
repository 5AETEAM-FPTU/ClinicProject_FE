'use client'
import CommonSection from '@/components/Core/common/CommonSection'
import React, { useEffect, useState } from 'react'

import { motion } from 'framer-motion'
import { update } from 'lodash'
import Image from 'next/image'
import {
    useGetAllActivePostsQuery,
    useGetNewestPostQuery,
} from '@/stores/services/blog/blog'
import dayjs from 'dayjs'
import { useParams } from 'next/navigation'
import { useTranslation } from '@/app/i18n/client'

function MedicalNews() {
    const { data: newestPostResult } = useGetNewestPostQuery()
    const [newestPosts, setNewestPosts] = useState<any>([])
    useEffect(() => {
        if (newestPostResult?.body?.result) {
            setNewestPosts(newestPostResult.body.result)
        }
    }, [newestPostResult])

    const [isClient, setIsClient] = useState(false)
    useEffect(() => {
        setIsClient(true)
    }, [])

    
    const params = useParams()
    const { t } = useTranslation(params?.locale as string, 'Landing')


    return (
        <div>
            <CommonSection
                title={t('new_title')}
                subtile={
                    t('new_sub')
                }
                tailCustomStyle="bg-gradient-to-b from-secondary to-white"
            >
                <div className="flex flex-col gap-5 sm:flex-row sm:gap-[40px]">
                    <div className="flex w-fit flex-col gap-[8px] rounded-xl bg-white p-5 shadow-primary sm:h-[600px] sm:w-[480px]">
                        <div className="h-[160px] w-full sm:h-[280px]">
                            <Image
                                src={newestPosts[0]?.image ? newestPosts[0]?.image : ''}
                                alt="thumbnails"
                                width={500}
                                height={500}
                                className="h-full w-full rounded-md object-cover"
                            ></Image>
                        </div>
                        <div className="flex flex-col gap-[4px]">
                            <p className="text-[16px] line-clamp-5 font-bold sm:text-[20px]">
                                {newestPosts[0]?.title}
                            </p>
                            <p className="text-[10px] sm:text-[12px]">
                                {isClient && dayjs(newestPosts[0]?.createdAt).format(
                                    'DD/MM/YYYY HH:mm:ss',
                                )}
                            </p>
                        </div>
                        <div>
                            <p className="text-[10px] sm:text-[14px]">
                                {newestPosts[0]?.short_desc}
                            </p>
                        </div>
                        <div>
                            <a
                                href={`/blog/${newestPosts[0]?.slug}?section=news`}
                                className="text-secondaryDark"
                            >
                                Xem chi tiết{' '}
                            </a>
                        </div>
                    </div>
                    <div className="flex flex-col gap-5 sm:gap-[40px]">
                        <div className="flex flex-col gap-5 sm:flex-row sm:gap-[40px]">
                            {' '}
                            {/* <div className="flex h-[280px] w-[360px] flex-col rounded-xl bg-slate-500"></div>
                            <div className="flex h-[280px] w-[360px] flex-col rounded-xl bg-slate-500"></div> */}
                            {newestPosts
                                .slice(1, 3)
                                .map((item: any, index: any) => {
                                    return (
                                        <div
                                            className="flex h-[280px] w-[360px] flex-col gap-[12px] rounded-xl bg-white p-[14px] shadow-primary"
                                            key={index}
                                        >
                                            <div>
                                                <Image
                                                    src={item?.image}
                                                    alt="thumbnails"
                                                    width={500}
                                                    height={500}
                                                    className="h-[166px] rounded-lg object-cover"
                                                ></Image>
                                            </div>
                                            <div className="flex flex-col gap-[12px]">
                                                <p className="line-clamp-2 font-bold">
                                                    {item?.title}
                                                </p>
                                                <p className="font-semibold text-secondaryDark">
                                                    {isClient && dayjs(
                                                        item?.createdAt,
                                                    ).format(
                                                        'DD/MM/YYYY HH:mm:ss',
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                    )
                                })}
                        </div>
                        <div className="flex flex-col gap-5 sm:flex-row sm:gap-[40px]">
                            {newestPosts
                                .slice(3, 5)
                                .map((item: any, index: any) => {
                                    return (
                                        <div
                                            className="flex h-[280px] w-[360px] flex-col gap-[12px] rounded-xl bg-white p-[14px] shadow-primary"
                                            key={index}
                                        >
                                            <div>
                                                <Image
                                                    src={item?.image}
                                                    alt="thumbnails"
                                                    width={500}
                                                    height={500}
                                                    className="h-[166px] rounded-lg object-cover"
                                                ></Image>
                                            </div>
                                            <div className="flex flex-col gap-[12px]">
                                                <p className="line-clamp-2 font-bold">
                                                    {item?.title}
                                                </p>
                                                <p className="font-semibold text-secondaryDark">
                                                    {isClient && dayjs(
                                                        item?.createdAt,
                                                    ).format(
                                                        'DD/MM/YYYY HH:mm:ss',
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                    )
                                })}
                        </div>
                    </div>
                </div>
            </CommonSection>
        </div>
    )
}

export default MedicalNews
