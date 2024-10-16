'use client'
import { Avatar, Button, Skeleton } from 'antd'
import React, { use, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { TPatientInfo } from '..'
import dayjs from 'dayjs'

type TProps = {
    payload?: TPatientInfo
    isFetching: boolean
}

export default function PatientViewInformation({
    payload,
    isFetching,
}: TProps) {
    return (
        <motion.div className="flex flex-row items-center justify-between">
            <div className="flex flex-row items-center gap-20">
                <div className="flex flex-row items-center gap-10">
                    <div>
                        {isFetching ? (
                            <Avatar size={80} />
                        ) : (
                            <Avatar size={80} src={payload?.avatar} />
                        )}
                    </div>
                    <div className="flex flex-col gap-2">
                        {isFetching ? (
                            <Skeleton.Input className="w-[244px]" />
                        ) : (
                            <p className="font-bold text-secondarySupperDarker">
                                Họ và tên: <span>{payload?.fullName}</span>
                            </p>
                        )}
                        <p className="text-secondarySupperDarker">
                            {isFetching ? (
                                <Skeleton.Input className="w-[244px]" />
                            ) : (
                                <span>
                                    Ngày sinh:{' '}
                                    {dayjs(payload?.dob).format('DD/MM/YYYY')}{' '}
                                    <span>
                                        {dayjs(payload?.dob).diff(
                                            dayjs(),
                                            'year',
                                        )}{' '}
                                        tuổi
                                    </span>
                                </span>
                            )}
                        </p>
                    </div>
                </div>
                <div className="flex h-full flex-row gap-20">
                    <div className="flex flex-col gap-2">
                        {isFetching ? (
                            <Skeleton.Input className="w-[244px]" />
                        ) : (
                            <p className="font-bold text-secondarySupperDarker">
                                Địa chỉ:{' '}
                                <span className="font-medium">
                                    {payload?.address}
                                </span>
                            </p>
                        )}
                        {isFetching ? (
                            <Skeleton.Input className="w-[244px]" />
                        ) : (
                            <p className="font-bold text-secondarySupperDarker">
                                Giới tính:{' '}
                                <span className="font-medium">
                                    {payload?.gender}
                                </span>
                            </p>
                        )}
                    </div>
                    <div className="flex flex-col gap-2">
                        {isFetching ? (
                            <Skeleton.Input className="w-[244px]" />
                        ) : (
                            <p className="font-bold text-secondarySupperDarker">
                                Số điện thoại:{' '}
                                <span className="font-medium">
                                    {payload?.phoneNumber}
                                </span>
                            </p>
                        )}
                    </div>
                </div>
                <div></div>
            </div>
        </motion.div>
    )
}
