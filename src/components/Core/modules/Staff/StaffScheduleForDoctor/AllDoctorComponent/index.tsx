"use client"
import React from 'react'
import { Input, Avatar, Card, Button, Tooltip } from 'antd'
import {
    Calendar,
    ScanSearch
} from 'lucide-react'

export default function AllDoctorComponent() {
    const handleChangeDoctor = (doctorId: string) => {
        console.log(doctorId)
    }
    return (
        <div className="w-full">
            <div>
                <h3 className="text-[20px] font-semibold text-secondarySupperDarker">
                    Tất cả bác sĩ
                </h3>
                <p className="text-[16px] font-semibold text-secondarySupperDarker text-opacity-60">
                    Chọn bác sĩ để lên lịch khám cho bác sĩ
                </p>
                <Input
                    className="mt-5 w-[224px]"
                    size="middle"
                    placeholder="Tìm bác sĩ"
                    prefix={
                        <ScanSearch
                            size={16}
                            className="mr-2 text-secondarySupperDarker"
                        />
                    }
                />
            </div>
            <div className="mt-5 grid w-full grid-cols-3 gap-5 ">
                <div className="cursor-pointer relative w-[100%] transition-all flex-row gap-5 rounded-xl bg-white p-5 shadow-third  hover:bg-slate-50"
                >
                    <div className='flex'>
                        <div>
                            <Avatar size={80} shape="square" />
                        </div>
                        <div className="w-full ml-4">
                            <p className="text-[16px] font-semibold text-secondarySupperDarker">
                                Tên bác sĩ
                            </p>
                            <p className="text-[16px] text-secondarySupperDarker">
                                Chuyên khoa nội tim mạch
                            </p>
                            <p className="text-[16px] text-secondarySupperDarker">
                                Trạng thái: Đang hoạt động
                            </p>
                        </div>
                        <div className='w-[12px] h-[12px] rounded-full bg-secondaryDarker absolute top-5 right-5 '>
                        </div>
                    </div>
                    <div className='mt-4'>
                        <Button
                            onClick={() => { handleChangeDoctor("somethingid") }}
                            className='float-end h-[33px] bg-[#0284C7] text-white'
                            iconPosition='end'
                            icon={<Calendar size={18} />}
                        >
                            Lên lịch
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}