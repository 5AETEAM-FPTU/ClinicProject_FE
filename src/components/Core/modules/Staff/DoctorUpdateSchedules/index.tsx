'use client'
import { Avatar, Button, Skeleton } from 'antd'
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import TimeSlot from './TimeSlot'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useGetScheduleByMonthQuery } from '@/stores/services/schedule/scheduleSettings'
import { useRouter } from 'next-nprogress-bar'
import { useSearchParams } from 'next/navigation'

const daysOfWeek = ['CN', 'Hai', 'Ba', 'Tư', 'Năm', 'Sáu', 'Bảy']
const months = [
    'Tháng 1',
    'Tháng 2',
    'Tháng 3',
    'Tháng 4',
    'Tháng 5',
    'Tháng 6',
    'Tháng 7',
    'Tháng 8',
    'Tháng 9',
    'Tháng 10',
    'Tháng 11',
    'Tháng 12',
]

// start helper function
function compareDatesByDay(date1: Date, date2: Date) {
    const date1WithoutTime = new Date(date1.setHours(0, 0, 0, 0))
    const date2WithoutTime = new Date(date2.setHours(0, 0, 0, 0))

    const time1 = date1WithoutTime.getTime()
    const time2 = date2WithoutTime.getTime()

    if (time1 > time2) {
        // Date 1 is after Date 2
        return 1
    } else if (time1 < time2) {
        //Date 1 is before Date 2
        return -1
    } else {
        // Date 1 is the same as Date 2
        return 0
    }
}

const getWeekRow = (date: Date) => {
    const firstDayOfMonth = getFirstDayOfMonth(date)
    // Calculate week row index considering Sunday as the start of the week
    return Math.ceil((date.getDate() + firstDayOfMonth) / 7)
}

const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
}

const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
}

// end helper function

export default function DoctorUpdateSchedules({ doctorId }: { doctorId: string }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const {
        doctorName, specialties, dutyStatus, avatarUrl
    } = {
        doctorName: searchParams.get('doctorName') || 'Tên bác sĩ',
        specialties: searchParams.get('specialties') || 'Nội tim mạch',
        dutyStatus: (searchParams.get('isOnDuty') == 'true' ? 'Đang trực' : 'Đang nghỉ ngơi'),
        avatarUrl: searchParams.get('avatarUrl') || '',
    }

    const [currentDate, setCurrentDate] = useState(new Date(Date.now()))
    const [selectedDate, setSelectedDate] = useState<Date | null>(null)
    const [timeSlotVisible, setTimeSlotVisible] = useState(false)

    const handleClose = () => {
        setSelectedDate(null)
        setTimeSlotVisible(false)
    }

    const handlePrevMonth = () => {
        handleClose()
        setCurrentDate(
            new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1),
        )
    }

    const handleNextMonth = () => {
        handleClose()
        setCurrentDate(
            new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1),
        )
    }

    const handleSelectedRow = (date: Date) => {
        setSelectedDate(date)
        setTimeSlotVisible(true)
    }

    const selectedWeekRow = selectedDate && getWeekRow(selectedDate)

    const renderCalendar = () => {
        const daysInMonth = getDaysInMonth(currentDate)
        const firstDayOfMonth = getFirstDayOfMonth(currentDate)

        const days = []

        const { data, isFetching, refetch } = useGetScheduleByMonthQuery({
            month: currentDate.getMonth() + 1,
            year: currentDate.getFullYear(),
            doctorId: doctorId,
        })

        useEffect(() => {
            refetch();
        }, [currentDate])

        const hashData = useMemo(() => {
            let dataHash = data && data.body.workingDays
            const hash: any = {}
            dataHash?.forEach((item: string) => {
                hash[new Date(item).toISOString()] = true
            })
            return hash
        }, [data])

        for (let i = 0; i < firstDayOfMonth; i++) {
            days.push(
                <div
                    key={`empty-${i}`}
                    className={`h-10 ${selectedWeekRow && 1 !== selectedWeekRow ? 'hidden' : ''}`}
                ></div>,
            )
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(
                currentDate.getFullYear(),
                currentDate.getMonth(),
                day,
            )
            const isUpdated = hashData[date.toISOString()]

            const isSelected =
                date.toDateString() === selectedDate?.toDateString()
            const isToday = date.toDateString() === new Date().toDateString()
            const currentWeekRow = getWeekRow(date)
            const isDisable = compareDatesByDay(date, new Date()) < 0
            days.push(
                <motion.div
                    key={day}
                    className={`mt-2 flex h-12 items-center justify-center gap-2 ${selectedWeekRow && currentWeekRow !== selectedWeekRow ? 'hidden' : ''}`}
                >
                    {isFetching ? (
                        <Skeleton.Button size='large' className='w-full h-[56px]' />
                    ) : (
                        <Button
                            disabled={isDisable}
                            shape="default"
                            size="large"
                            key={day}
                            type="text"
                            onClick={() =>
                                !isDisable && handleSelectedRow(date)
                            }
                            className={cn(
                                `relative h-[56px] w-full font-semibold text-[16x] text-secondarySupperDarker`,
                                `${isDisable ? 'cursor-not-allowed text-gray-300' : ''}`,
                                `${isSelected ? 'bg-secondaryDark bg-opacity-60 text-white' : ''}`,
                                `${isToday && !isSelected ? '!border-2 !border-secondaryDark bg-white bg-opacity-80 !text-white' : ''}`,
                                `${!isSelected && !isDisable ? 'hover:bg-secondaryDark hover:bg-opacity-40 hover:text-white' : ''}`,
                                `${isUpdated && !isDisable && !isSelected ? 'bg-secondaryDark bg-opacity-20' : ''}`,
                            )}
                            aria-label={`Select ${date.toDateString()}`}
                        >
                            {day}
                            {isToday && (
                                <div className="absolute right-2 top-2 h-2 w-2 rounded-full bg-secondaryDark"></div>
                            )}
                        </Button>
                    )}
                </motion.div>,
            )
        }

        return days
    }

    return (
        <motion.div
            initial={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="mx-auto flex flex-col gap-4 md:flex-col"
        >
            <div>
                <h3 className="text-[20px] font-semibold">
                    Cập nhật lịch khám
                </h3>
                <p className="text-[14px] font-semibold text-secondarySupperDarker text-opacity-60">
                    Xem lại và cài đặt lịch khám sắp tới của bác sĩ
                </p>
            </div>
            <div className="cursor-pointer relative w-[100%] transition-all flex-row gap-5 rounded-xl bg-white p-5 shadow-third  hover:bg-slate-50"
            >
                <div className='flex'>
                    <div>
                        <Avatar size={80} shape="square" src={avatarUrl} />
                    </div>
                    <div className="w-full ml-4 relative">
                        <p className="text-[16px] font-semibold text-secondarySupperDarker">
                            {doctorName}
                        </p>
                        <p className="text-[16px] text-[#00355380] font-semibold">
                            Chuyên khoa: {specialties}
                        </p>
                        <p className="text-[16px] text-[#00355380] font-semibold">
                            Trạng thái: {dutyStatus}
                        </p>
                    </div>
                    <div className={`w-[12px] h-[12px] rounded-full bg-secondaryDarker absolute top-5 right-5 ${!searchParams.get('isOnDuty') && 'opacity-40'}`}>
                    </div>
                    <div className='self-end'>
                        <Button
                            onClick={() => { }}
                            className='float-end h-[33px] bg-[#0284C7] text-white'
                            iconPosition='end'
                            icon={<Calendar size={18} />}
                        >
                            Xem lượt khám
                        </Button>
                    </div>
                </div>

            </div>
            <div className="shadow h-fit w-full rounded-xl bg-white p-4 shadow-third">
                <div className="mb-4 flex items-center justify-between">
                    <button
                        onClick={handlePrevMonth}
                        className="rounded-full p-2 transition hover:bg-secondaryDarker hover:bg-opacity-20"
                        aria-label="Previous month"
                    >
                        <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                    </button>
                    <h3 className="text-[20px] font-semibold">{`${months[currentDate.getMonth()]} ${currentDate.getFullYear()}`}</h3>
                    <button
                        onClick={handleNextMonth}
                        className="rounded-full p-2 transition hover:bg-secondaryDarker hover:bg-opacity-20"
                        aria-label="Next month"
                    >
                        <ChevronRight className="h-5 w-5" aria-hidden="true" />
                    </button>
                </div>
                <div className="mb-2 grid grid-cols-7 gap-2">
                    {daysOfWeek.map((day, index) => (
                        <div
                            key={index}
                            className="text-center text-[16px] font-bold text-secondarySupperDarker"
                        >
                            {day}
                        </div>
                    ))}
                </div>
                <div className="grid grid-cols-7 gap-2">{renderCalendar()}</div>
                {timeSlotVisible ? (
                    <TimeSlot doctorId={doctorId} handleClose={handleClose} date={selectedDate} />
                ) : null}
            </div>
        </motion.div>
    )
}
