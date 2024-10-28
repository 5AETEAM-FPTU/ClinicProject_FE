'use client'

import dayjs from 'dayjs'

export default function UserIncomingCalender({
    upcomingDate,
}: {
    upcomingDate: string
}) {
    return (
        <div className="relative w-full rounded-xl bg-gradient-to-r from-[#0284C7] to-[#00B5F1] shadow-third">
            <p className="m-0 p-[20px] pb-2 text-[16px] font-bold text-white xl:text-[20px]">
                Lịch khám sắp tới
            </p>
            <p className="pl-[20px] text-[28px] font-bold text-white xl:absolute xl:right-5 xl:top-[50px]">
                {upcomingDate === '0001-01-01T00:00:00'
                    ? '--:--'
                    : dayjs(upcomingDate).format('hh:mm A')}
            </p>
            <div className="flex flex-row items-center gap-2 px-[20px] pt-2 text-white">
                <h3 className="text-[20px] font-bold xl:absolute xl:bottom-[-10px] xl:left-4 xl:text-[100px]">
                    {/* {dayjs(upcomingDate).format('DD')} */}
                    {upcomingDate === '0001-01-01T00:00:00'
                        ? '--'
                        : dayjs(upcomingDate).format('DD')}
                </h3>
                <div className="flex gap-2 text-[20px] xl:absolute xl:bottom-[20px] xl:right-[20px] xl:text-[32px]">
                    {upcomingDate === '0001-01-01T00:00:00' ? (
                        '-- ----'
                    ) : (
                        <>
                            Tháng{" "}
                            <p>{dayjs(upcomingDate).format('MM')}</p>
                            <p>{dayjs(upcomingDate).format('YYYY')}</p>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}
