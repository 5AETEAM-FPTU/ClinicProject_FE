'use client'
import React, { useState } from 'react'
import { Calendar, MapPin, User, ChevronLeft, ChevronRight } from 'lucide-react'
import TimeSlot from '../TimeSlot';

const daysOfWeek = ['CN', 'Hai', 'Ba', 'Tư', 'Năm', 'Sáu', 'Bảy']
const months = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12']

export default function Component() {
    const [currentDate, setCurrentDate] = useState(new Date(2024, 8, 1)) // September 2024
    const [selectedDate, setSelectedDate] = useState<Date | null>(null) // September 17, 2024
    const [timeSlotVisible, setTimeSlotVisible] = useState(false)

    const handleClose = () => {
        setSelectedDate(null);
        setTimeSlotVisible(false);
    }
    const getDaysInMonth = (date: Date) => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
    }

    const getFirstDayOfMonth = (date: Date) => {
        return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
    }

    const handlePrevMonth = () => {
        handleClose();
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
    }

    const handleNextMonth = () => {
        handleClose();
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
    }

    const getWeekRow = (date: Date) => {
        const firstDayOfMonth = getFirstDayOfMonth(date)
        // Calculate week row index considering Sunday as the start of the week
        console.log(Math.floor((date.getDate() + firstDayOfMonth) / 7));
        return Math.ceil((date.getDate() + firstDayOfMonth) / 7)
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
            const currentWeekRow = getWeekRow(date)
            const isDisable = date < new Date();
            days.push(
                <button
                    key={day}
                    onClick={() => !isDisable && handleSelectedRow(date)}
                    className={`${isDisable ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : ''} font-bold h-10 w-full flex items-center justify-center rounded-full ${isSelected ? 'bg-cyan-500 text-white' : ''} ${isToday && !isSelected ? 'border border-cyan-500 text-cyan-500' : ''} ${!isSelected && !isToday && !isDisable ? 'hover:bg-gray-100' : ''} ${selectedWeekRow && currentWeekRow !== selectedWeekRow ? 'hidden' : ''}`}
                    aria-label={`Select ${date.toDateString()}`}
                >
                    {day}
                </button>
            )
        }

        return days
    }

    return (
        <div className="flex flex-col md:flex-row gap-4 p-4 bg-gray-100 min-h-screen">
            <div className="w-full md:w-1/3 bg-white rounded-lg shadow p-4">
                <h2 className="text-lg font-semibold mb-4">Thông tin cơ sở y tế</h2>
                <div className="space-y-2">
                    <p className="flex items-center"><Calendar className="w-5 h-5 mr-2" aria-hidden="true" /> Phòng Khám Đa Khoa Pháp Anh</p>
                    <p className="flex items-center"><MapPin className="w-5 h-5 mr-2" aria-hidden="true" /> 222-224-226 Nguyễn Duy Dương, Phường 4, Quận 10, TP.HCM</p>
                    <p className="flex items-center"><MapPin className="w-5 h-5 mr-2" aria-hidden="true" /> Chuyên khoa: Nội tổng quát</p>
                    <p className="flex items-center"><User className="w-5 h-5 mr-2" aria-hidden="true" /> Bác sĩ: Lê Ngọc Ánh</p>
                    <p className="flex items-center"><MapPin className="w-5 h-5 mr-2" aria-hidden="true" /> Dịch vụ: Nội tổng quát</p>
                    <p className="flex items-center"><Calendar className="w-5 h-5 mr-2" aria-hidden="true" /> Ngày khám: {selectedDate?.toLocaleDateString('vi-VN')}</p>
                </div>
            </div>
            <div className="w-full md:w-2/3 bg-white rounded-lg shadow p-4">
                <h2 className="text-lg font-semibold mb-4">Vui lòng chọn ngày khám</h2>
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
                        <div key={day} className="text-center font-semibold">{day}</div>
                    ))}
                </div>
                <div className="grid grid-cols-7 gap-2">
                    {renderCalendar()}
                </div>
                {timeSlotVisible ? <TimeSlot handleClose={handleClose} /> : null}
            </div>
        </div>
    )
}