'use client'
import { Avatar } from 'antd'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import React from 'react'

export default function CreateMedicalReport() {
    const searchParam = useSearchParams()

    console.log(searchParam.get('id'))

    return (
        <div className="flex h-fit w-full flex-col gap-5">
            <div>
                <h3 className="text-[20px] font-semibold text-secondarySupperDarker">
                    Tạo phiếu khám
                </h3>
            </div>
            <div className="h-fit w-full rounded-xl p-5 shadow-third">
                <div className="">
                    <div className="flex flex-row items-center gap-5">
                        <div>
                            <Avatar
                                size={50}
                                src={
                                    'https://variety.com/wp-content/uploads/2021/04/Avatar.jpg?w=800&h=533&crop=1'
                                }
                            ></Avatar>
                        </div>
                        <div>
                            <p className="font-bold text-secondarySupperDarker">
                                Họ và tên: <span>Nguyen Van A</span>
                            </p>
                            <p className="text-secondarySupperDarker">
                                Ngày sinh:{' '}
                                <span>
                                    01/01/2000 <span>20 tuổi</span>
                                </span>
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-row gap-5">
                        <div>
                            <p className="font-bold text-secondarySupperDarker">
                                Địa chỉ: <span>Nguyen Van A</span>
                            </p>
                            <p className="text-secondarySupperDarker">
                                Ngày sinh:{' '}
                                <span>
                                    01/01/2000 <span>20 tuổi</span>
                                </span>
                            </p>
                        </div>
                    </div>
                    <div></div>
                </div>
            </div>
        </div>
    )
}
