'use client'
import { Avatar, Input } from 'antd'
import { ScanSearch } from 'lucide-react'
import { useRouter } from 'next-nprogress-bar'
import React from 'react'

export default function StaffTreatmentOnDay() {

    const router = useRouter();

    const handleChangeDoctor = (doctorId:string) => {
        router.push("treatment-onday/" + doctorId);
    }
    return (
        <div className="w-full">
            <div>
                <h3 className="text-[20px] font-semibold text-secondarySupperDarker">
                    Tất cả các lượt khám trong ngày
                </h3>
                <p className="text-[16px] font-semibold text-secondarySupperDarker text-opacity-60">
                    Chọn bác sĩ để xem chi tiết lượt khám trong ngày
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
                <div className=" cursor-pointer relative flex w-[100%] transition-all flex-row gap-5 rounded-xl bg-white p-5 shadow-third  hover:bg-slate-50"
                    onClick={() => {handleChangeDoctor("somethingid")}}
                >
                    <div>
                        <Avatar size={80} shape="square" />
                    </div>
                    <div className="w-full">
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
            </div>
        </div>
    )
}
