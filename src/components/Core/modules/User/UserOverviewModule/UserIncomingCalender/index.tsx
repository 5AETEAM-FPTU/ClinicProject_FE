'use client'

import dayjs from "dayjs"




export default function UserIncomingCalender({upcomingDate}: {upcomingDate: string}) {
    return (
        <div className="relative w-full bg-gradient-to-r from-[#0284C7] to-[#00B5F1] rounded-xl shadow-third">
            <p className="m-0 p-[20px] pb-2 xl:text-[20px] text-[16px] font-bold text-white">
                Lịch khám sắp tới
            </p>
            <p className="xl:absolute xl:right-5 px-[20px] xl:top-[50px] text-[28px] font-bold text-white">
                {dayjs(upcomingDate).format('hh:mm A')}            </p>
            <div className="flex text-white flex-row gap-2 px-[20px] items-center pt-2">
                <h3 className="xl:absolute xl:bottom-[-10px] xl:left-4 xl:text-[100px] text-[20px] font-bold">
                {dayjs(upcomingDate).format('DD')}
                </h3>
                <div className="xl:absolute xl:bottom-[20px] xl:right-[20px] flex gap-2 xl:text-[32px] text-[20px]">
                    Tháng
                    <p>{dayjs(upcomingDate).format('MM')}</p>
                    <p>{dayjs(upcomingDate).format('YYYY')}</p>
                </div>
            </div>
        </div>
    )
}
