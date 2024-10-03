'use client'

import { Button } from 'antd'

export default function UserRecentlyAction() {
    return (
        <div className="mb-20px xl:h-[254px] h-fit rounded-xl bg-white px-[20px] py-5 shadow-third flex flex-col gap-5">
            <h4 className="text-[16px] font-bold text-[#003553]">
                Đã khám gần đây
            </h4>
            <div className="flex h-[70x] items-center xl:flex-row flex-col justify-between rounded-md bg-[#F7F7F7] py-[5px]">
                <div className="pl-[10px] font-bold flex flex-col justify-between items-center xl:items-start xl:justify-start">
                    <p className="text-[14px] text-[#003553]">
                        Khám nội lồng ngực{' '}
                    </p>
                    <p className="text-[14px] font-medium text-[#003553]">
                        Chuẩn đoán: Bình thường
                    </p>
                </div>
                <div className="flex items-center justify-between gap-[10px] font-medium">
                    <p className="text-[14px] text-[#003553]">
                        Bác sĩ đã khám{' '}
                        <span className="flex w-full xl:justify-end">
                            Mai Hữu Tố
                        </span>
                    </p>
                    <img
                        className="h-[50px] w-[50px] rounded-full"
                        src="https://i.pinimg.com/564x/92/26/5c/92265c40c8e428122e0b32adc1994594.jpg"
                    ></img>
                    <div className="mr-2">
                        <p className="text-[14px] text-[#003553]">27/02/2024</p>
                        <p className="text-[14px] text-[#003553]">
                            8:30 - 10:00
                        </p>
                    </div>
                </div>
            </div>{' '}
            <div className="flex h-[70x] items-center xl:flex-row flex-col justify-between rounded-md bg-[#F7F7F7] py-[5px]">
                <div className="pl-[10px] font-bold flex flex-col justify-between items-center xl:items-start xl:justify-start">
                    <p className="text-[14px] text-[#003553]">
                        Khám nội lồng ngực{' '}
                    </p>
                    <p className="text-[14px] font-medium text-[#003553]">
                        Chuẩn đoán: Bình thường
                    </p>
                </div>
                <div className="flex items-center justify-between gap-[10px] font-medium">
                    <p className="text-[14px] text-[#003553]">
                        Bác sĩ đã khám{' '}
                        <span className="flex w-full xl:justify-end">
                            Mai Hữu Tố
                        </span>
                    </p>
                    <img
                        className="h-[50px] w-[50px] rounded-full"
                        src="https://i.pinimg.com/564x/92/26/5c/92265c40c8e428122e0b32adc1994594.jpg"
                    ></img>
                    <div className="mr-2">
                        <p className="text-[14px] text-[#003553]">27/02/2024</p>
                        <p className="text-[14px] text-[#003553]">
                            8:30 - 10:00
                        </p>
                    </div>
                </div>
            </div>{' '}
        </div>
    )
}
