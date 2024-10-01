'use client'
import { Button } from 'antd'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'
import TimeSlot from './TimeSlot'
import {motion} from 'framer-motion';

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

export default function DoctorUpdateSchedules() {
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
            const isSelected =
                date.toDateString() === selectedDate?.toDateString()
            const isToday = date.toDateString() === new Date().toDateString()
            const currentWeekRow = getWeekRow(date)
            const isDisable = compareDatesByDay(date, new Date()) < 0
            days.push(
                <motion.div
                
                    className={`flex gap-2 mt-2 h-12 items-center justify-center ${selectedWeekRow && currentWeekRow !== selectedWeekRow ? 'hidden' : ''}`}
                >
                    <Button
                        disabled={isDisable}
                        shape="default"
                        size="large"
                        key={day}
                        type="text"
                        onClick={() => !isDisable && handleSelectedRow(date)}
                        className={`text-secondarySupperDarker relative w-full h-[56px] text-[16x] font-semibold ${isDisable ? 'cursor-not-allowed !text-gray-300' : ''} ${isSelected ? 'bg-secondaryDark bg-opacity-60 text-white' : ''} ${isToday && !isSelected ? ' !text-white bg-secondaryDark bg-opacity-80 !border-2 !border-secondaryDark' : ''} ${!isSelected && !isDisable ? 'hover:bg-secondaryDark hover:bg-opacity-40 hover:text-white' : ''}`}
                        aria-label={`Select ${date.toDateString()}`}
                    >
                        {day}
                        {
                            isToday  && <div className="absolute right-2 top-2 h-2 w-2 rounded-full bg-white"></div>
                        }
                    </Button>
                </motion.div>,
            )
        }

        return days
    }

    return (
        <div className="mx-auto flex flex-col gap-4  p-4 md:flex-row">
            <div className="shadow h-fit w-full rounded-xl p-4 bg-white shadow-third">
                <h2 className="mb-4 rounded-t-lg bg-gradient-to-r to-90% p-2 text-center text-xl font-bold uppercase text-secondarySupperDarker">
                    Cập nhật lịch
                </h2>
                <div className="mb-4 flex items-center justify-between">
                    <button
                        onClick={handlePrevMonth}
                        className="p-2 rounded-full hover:bg-secondaryDarker hover:bg-opacity-20 transition"
                        aria-label="Previous month"
                    >
                        <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                    </button>
                    <h3 className="text-[20px] font-semibold">{`${months[currentDate.getMonth()]} ${currentDate.getFullYear()}`}</h3>
                    <button
                        onClick={handleNextMonth}
                        className="p-2  rounded-full hover:bg-secondaryDarker hover:bg-opacity-20 transition"
                        aria-label="Next month"
                    >
                        <ChevronRight className="h-5 w-5" aria-hidden="true" />
                    </button>
                </div>
                <div className="mb-2 grid grid-cols-7 gap-2">
                    {daysOfWeek.map((day, index) => (
                        <div
                            key={index}
                            className="text-center text-[16px] font-bold  text-secondarySupperDarker"
                        >
                            {day}
                        </div>
                    ))}
                </div>
                <div className="grid grid-cols-7 gap-2">{renderCalendar()}</div>
                {timeSlotVisible ? (
                    <TimeSlot handleClose={handleClose} date={selectedDate} />
                ) : null}

               
            </div>
        </div>
    )
}
