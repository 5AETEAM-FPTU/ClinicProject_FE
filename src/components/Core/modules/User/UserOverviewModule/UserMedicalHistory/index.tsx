'use client'

import { Button } from 'antd'

export default function UserMedicalHistory() {
    return (
        <div className="rounded-xl bg-white py-4 shadow-third">
            <div className="px-5">
                <p className="text[16px] pb-[5px] font-bold text-[#003553]">
                    Đang chờ tư vấn
                </p>
                <div className="flex items-center justify-between rounded-md bg-[#F7F7F7] py-[5px]">
                    <div className="pl-[10px] font-semibold">
                        <p className="text-[14px]">Tư vấn siêu âm tim</p>
                        <p className="text-[10px] font-normal">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit
                        </p>
                    </div>
                    <Button
                        type="primary"
                        className="mr-[10px] rounded-xl bg-[#0284C7] text-[14px] font-bold"
                    >
                        Chi tiết
                    </Button>
                </div>
            </div>

            <div className="px-5">
                <p className="text[16px] pb-[5px] pt-4 font-bold text-[#003553]">
                    Lịch sử tư vấn
                </p>
                <div className="flex items-center justify-between rounded-md bg-[#F7F7F7] py-[5px]">
                    <div className="pl-[10px] font-semibold">
                        <p className="text-[14px]">Tư vấn khám nội tổng quát</p>
                        <p className="text-[10px] font-normal">
                            Bác sĩ : Nguyễn Văn Đạt đã tư vấn
                        </p>
                    </div>
                    <Button
                        type="primary"
                        className="mr-[10px] rounded-xl bg-[#0284C7] text-[14px] font-bold"
                    >
                        Chi tiết
                    </Button>
                </div>
                <div className="mt-2 flex items-center justify-between rounded-md bg-[#F7F7F7] py-[5px]">
                    <div className="pl-[10px] font-semibold">
                        <p className="text-[14px]">Tư vấn khám nội tổng quát</p>
                        <p className="text-[10px] font-normal">
                            Bác sĩ : Nguyễn Văn Đạt đã tư vấn
                        </p>
                    </div>
                    <Button
                        type="primary"
                        className="mr-[10px] rounded-xl bg-[#0284C7] text-[14px] font-bold"
                    >
                        Chi tiết
                    </Button>
                </div>
            </div>
        </div>
    )
}
