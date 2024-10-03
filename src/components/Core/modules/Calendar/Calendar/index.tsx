'use client'
import React, { useState } from 'react'
import { Button } from 'antd'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import TimeSlot from '../TimeSlot';
import Information from '../Information';

const daysOfWeek = ['CN', 'Hai', 'Ba', 'Tư', 'Năm', 'Sáu', 'Bảy']
const months = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12']

// start helper function
function compareDatesByDay(date1: Date, date2: Date) {
    // Xóa bỏ thông tin về giờ, phút, giây
    const date1WithoutTime = new Date(date1.setHours(0, 0, 0, 0));
    const date2WithoutTime = new Date(date2.setHours(0, 0, 0, 0));

    const time1 = date1WithoutTime.getTime();
    const time2 = date2WithoutTime.getTime();

    if (time1 > time2) {
        // Date 1 is after Date 2
        return 1;
    } else if (time1 < time2) {
        //Date 1 is before Date 2
        return -1;
    } else {
        // Date 1 is the same as Date 2
        return 0;
    }
}

const getWeekRow = (date: Date) => {
    const firstDayOfMonth = getFirstDayOfMonth(date)
    // Calculate week row index considering Sunday as the start of the week
    console.log(Math.floor((date.getDate() + firstDayOfMonth) / 7));
    return Math.ceil((date.getDate() + firstDayOfMonth) / 7)
}

const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
}

const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
}

// end helper function

export default function Component({ handleSelectTimeSlot }: { handleSelectTimeSlot?: (timeSlot: { startDate: Date; endDate: Date }) => void }) {
    const [currentDate, setCurrentDate] = useState(new Date(Date.now())) // September 2024
    const [selectedDate, setSelectedDate] = useState<Date | null>(null) // September 17, 2024
    const [timeSlotVisible, setTimeSlotVisible] = useState(false)

    const handleClose = () => {
        setSelectedDate(null);
        setTimeSlotVisible(false);
    }

    const handlePrevMonth = () => {
        handleClose();
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
    }

    const handleNextMonth = () => {
        handleClose();
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
    }

    const handleSelectedRow = (date: Date) => {
        setSelectedDate(date)
        setTimeSlotVisible(true);
    }
    const selectedWeekRow = selectedDate && getWeekRow(selectedDate);

    const renderCalendar = () => {
        const daysInMonth = getDaysInMonth(currentDate)
        const firstDayOfMonth = getFirstDayOfMonth(currentDate)
        const days = []
        for (let i = 0; i < firstDayOfMonth; i++) {
            days.push(<div key={`empty-${i}`} className={`h-10 ${selectedWeekRow && 1 !== selectedWeekRow ? 'hidden' : ''}`}></div>)
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
            const isSelected = date.toDateString() === selectedDate?.toDateString()
            const isToday = date.toDateString() === new Date().toDateString()
            const currentWeekRow = getWeekRow(date);
            const isDisable = compareDatesByDay(date, new Date()) < 0;
            days.push(
                <div className={`flex items-center justify-center h-16 ${selectedWeekRow && currentWeekRow !== selectedWeekRow ? 'hidden' : ''}`}>
                    <Button
                        disabled={isDisable}
                        shape="circle"
                        size='large'
                        key={day}
                        type='text'
                        onClick={() => !isDisable && handleSelectedRow(date)}
                        className={`text-color-[#333333] font-semibold text-xl ${isDisable ? 'text-gray-400 cursor-not-allowed' : ''} ${isSelected ? 'bg-cyan-500 text-white' : ''} ${isToday && !isSelected ? 'border border-red-500 text-red-500' : ''} ${!isSelected && !isDisable ? 'hover:bg-cyan-500 hover:text-white hover:border-0' : ''}`}
                        aria-label={`Select ${date.toDateString()}`}
                    >
                        {day}
                    </Button>
                </div>
            )
        }

        return days
    }

    return (
        <div className="flex flex-col md:flex-row gap-4 mx-auto">
            <div className="w-full h-fit md:w-1/3 rounded-lg shadow bg-transparent">
                <Information selectedDate={selectedDate} />
                <Button iconPosition={'end'} className="h-[42px] bg-[#0284C7] mt-4 text-base font-semibold min-h-10 py-2 px-4 sm:px-5 text-white rounded-[12px] transition-colors w-full sm:w-auto">
                    Xác nhận đặt lịch khám
                </Button>
            </div>
            <div className="w-full md:w-2/3 bg-white rounded-lg shadow p-4 h-fit">
                <h2 className="text-white text-xl font-bold text-center mb-4 bg-gradient-to-r from-[#54ADDA] from-0% to-[#0284C7] to-100% rounded-t-lg p-2">Vui lòng chọn ngày khám</h2>
                <div className="flex items-center justify-between mb-4">
                    <button onClick={handlePrevMonth} className="p-2" aria-label="Previous month">
                        <ChevronLeft className="w-5 h-5" aria-hidden="true" />
                    </button>
                    <h3 className="text-xl font-semibold">{`${months[currentDate.getMonth()]} ${currentDate.getFullYear()}`}</h3>
                    <button onClick={handleNextMonth} className="p-2" aria-label="Next month">
                        <ChevronRight className="w-5 h-5" aria-hidden="true" />
                    </button>
                </div>
                <div className="grid grid-cols-7 gap-2 mb-2">
                    {daysOfWeek.map(day => (
                        <div key={day} className="text-[#666666] text-center font-semibold text-xl">{day}</div>
                    ))}
                </div>
                <div className="grid grid-cols-7 gap-2">
                    {renderCalendar()}
                </div>
                {timeSlotVisible ? <TimeSlot handleClose={handleClose} handleSelectTimeSlot={handleSelectTimeSlot!} /> : null}
            </div>
        </div>
    )
}