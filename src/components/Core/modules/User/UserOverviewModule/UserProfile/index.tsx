'use client'
import { useAppSelector } from '@/hooks/redux-toolkit'
import { useGetUserProfileQuery } from '@/stores/services/user/userSettings'
import BackGround from '@public/landing/images/profile-background.png'
import dayjs from 'dayjs'
import { CalendarRange, Settings, Smartphone, Split } from 'lucide-react'
import Image from 'next/image'
import { useEffect } from 'react'

export type ShortUserProfileType = {
    avatarUrl: string
    fullName: string | null
    description: string | null
    gender: {
        genderName: string
    }
    dob: string | null
    phoneNumber: string
}

export default function UserProfile() {
    const { result, isFetching, refetch } = useGetUserProfileQuery(undefined, {
        selectFromResult: ({ data, isFetching }) => {
            return {
                result: (data?.body?.user as ShortUserProfileType) ?? {},
                isFetching: isFetching,
            }
        },
    })

    useEffect(() => {
        refetch();
    }, [])

    return (
        <div className="h-fit rounded-xl xl:h-[416px]">
            <div className="shadow h-full rounded-lg bg-white p-4 shadow-third">
                <div
                    style={{
                        backgroundImage: `url(${BackGround.src})`,
                    }}
                    className={`flex h-[160px] items-start justify-between rounded-[12px] bg-cover bg-center p-5`}
                >
                    <div className='w-[120px] h-[120px] rounded-[10px] overflow-hidden'>
                        <Image
                            src={result.avatarUrl!}
                            alt="avatar"
                            width={1200}
                            height={1200}
                            className="object-cover h-full w-full"
                        ></Image>
                    </div>
                </div>
                <div className="ml-[6px]">
                    <h2 className="mt-2 text-[24px] font-bold text-secondarySupperDarker">
                        {result.fullName ?? 'Chưa có'}
                    </h2>
                    <div className="mt-2 flex items-center">
                        <Split size={16} />
                        <p className="ml-[10px] text-[16px] font-medium text-secondarySupperDarker">
                            Giới tính: {result.gender?.genderName ?? 'Chưa có'}
                        </p>
                    </div>
                    <div className="mt-2 flex items-center">
                        <CalendarRange size={16} />
                        <p className="ml-[10px] text-[16px] font-medium text-secondarySupperDarker">
                            Ngày sinh:{' '}
                            {dayjs(result.dob).format('DD/MM/YYYY') ??
                                'Chưa có'}
                        </p>
                    </div>

                    <div className="mt-2 flex items-center">
                        <Smartphone size={16} />
                        <p className="ml-[10px] text-[16px] font-medium text-secondarySupperDarker">
                            Số điện thoại: {result.phoneNumber ?? 'Chưa có'}
                        </p>
                    </div>
                    <div className="opacity-4 mx-[10px] mt-[18px] h-[0.8px] bg-[#003553]"></div>
                    <p
                        className="ml-[10px] text-[16px] font-semibold text-[#003553]"
                        dangerouslySetInnerHTML={{
                            __html: result?.description ?? 'Chưa có',
                        }}
                    ></p>
                </div>
            </div>
        </div>
    )
}
