'use client'
import React, { useEffect, useMemo, useState } from 'react'
import { Button, message, Skeleton } from 'antd'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import TimeSlotSection from '../TimeSlot';
import Information from '../Information';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next-nprogress-bar';
import { useGetScheduleByMonthQuery, useLazyGetScheduleByDateQuery } from '@/stores/services/schedule/scheduleSettings';
import { set } from 'lodash';
import { TimeSlot } from '@/components/Core/modules/Doctor/DoctorUpdateSchedules/TimeSlot';
import { useUpdateBookedAppointmentMutation } from '@/stores/services/user/userAppointments';
import webStorageClient from '@/utils/webStorageClient';
import { constants } from '@/settings';

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

export default function Component() {
    const params = useSearchParams();
    const router = useRouter();
    const isUpdate = params.get('isUpdate') === 'true';

    // in cookie
    const vnPayUrl = webStorageClient.get(constants.VNPAY_PAYMENT_URL);
    if (vnPayUrl) {
        router.replace(vnPayUrl)
    }

    if (isUpdate && !params.get('appointmentId')) router.back();
    const [currentDate, setCurrentDate] = useState(new Date(Date.now())) // September 2024
    if (!params.get('doctorId')) router.back();
    const { data, isFetching, error, refetch: getScheduleByMonth } = useGetScheduleByMonthQuery({ month: currentDate.getMonth() + 1, year: currentDate.getFullYear(), doctorId: params.get('doctorId') })
    const [selectedSlot, setSelectedSlot] = useState<any>(null)
    const [selectedDate, setSelectedDate] = useState<Date | null>(null)

    const [getScheduleByDateQuery, { data: resultTimeSlots, isFetching: isTimeSlotLoading }] = useLazyGetScheduleByDateQuery()
    const [updateBookedAppointment] = useUpdateBookedAppointmentMutation()
    const [timeSlotVisible, setTimeSlotVisible] = useState(false)

    const navigateToConfirmAppointment = () => {
        if (!selectedSlot) {
            message.error('Vui lòng chọn thời gian khám');
            return;
        }
        router.push(`confirm?${new URLSearchParams({
            fullName: params.get('fullName') || '',
            doctorId: params.get('doctorId') || '',
            specialties: params.get('specialties') || '',
            selectedSlot: JSON.stringify(selectedSlot),
        }).toString()}`)
    }

    const handleUpdateAppointment = async () => {
        if (!selectedSlot) {
            message.error('Vui lòng chọn thời gian khám để cập nhật');
            return;
        }
        try {
            await updateBookedAppointment({ appointmentId: params.get('appointmentId') || '', selectedSlotId: selectedSlot.slotId }).unwrap();
            message.success('Cập nhật lịch khám thành công');
            handleFetchScheduleByDate();
        } catch (error: any) {
            const reason = error.data.appCode.split(': ')[1];
            if (reason === 'APPOINTMENT_ONLY_UPDATE_ONCE') {
                message.error('Bạn chỉ được cật nhật cuộc hẹn 1 lần');
                return;
            } else if (reason === 'UPDATE_EXPIRED') {
                message.error('Cuộc hẹn đã hết hạn cật nhật (trước buổi hẹn 12 tiếng)');
                return;
            }
            message.error('Có lỗi xảy ra, vui lòng thử lại sau');
        }

        console.log({ selectedSlot, appointmentId: params.get('appointmentId') });
    }

    const hashData = useMemo(() => {
        let dataHash = data && data.body.workingDays;
        const hash: any = {}
        dataHash?.forEach((item: string) => {
            hash[new Date(item).getDate()] = true;
        })
        return hash;
    }, [data]);

    if (!params.get('fullName')) {
        router.back()
    }
    const handleSelectTimeSlot = (slot: TimeSlot) => {
        setSelectedSlot(slot);
    }

    const handleClose = () => {
        setSelectedDate(null);
        setSelectedSlot(null);
        setTimeSlotVisible(false);
    }

    const handlePrevMonth = () => {
        const today = new Date(Date.now());
        if (today.getMonth() > currentDate.getMonth() - 1) return;
        handleClose();
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
    }

    const handleNextMonth = () => {
        const today = new Date(Date.now());
        if ((today.getMonth() + 1) % 12 <= currentDate.getMonth()) return;
        handleClose();
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
        getScheduleByMonth();
    }

    const handleSelectedRow = (date: Date) => {
        setSelectedDate(date);
        setTimeSlotVisible(true);
    }

    const handleFetchScheduleByDate = async () => {
        if (selectedDate) {
            try {
                setSelectedSlot(null);
                await getScheduleByDateQuery({ date: `${selectedDate.getFullYear()}-${selectedDate.getMonth() + 1}-${selectedDate.getDate()}`, doctorId: "1a6c3e77-4097-40e2-b447-f00d1f82cf72" });
            } catch (error) {
                console.log(error);
            }
        }
    }

    useEffect(() => {
        handleFetchScheduleByDate();
    }, [selectedDate])

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
            const isDisable = compareDatesByDay(date, new Date()) < 0 || hashData[day] === undefined;
            days.push(
                <div key={day} className={`flex items-center justify-center h-16 ${selectedWeekRow && currentWeekRow !== selectedWeekRow ? 'hidden' : ''}`}>
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
        <div className='bg-gray-100 p-4'>
            <div className="flex flex-col xl:flex-row gap-4 mx-auto">
                <div className="w-full h-fit xl:w-1/3 rounded-lg shadow bg-transparent">
                    <Information fullName={params.get('fullName')} price={150000} specialties={params.get('specialties')} />
                </div>
                <div className="w-full xl:w-2/3 bg-white rounded-lg shadow p-4 h-fit">
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
                    {isFetching
                        ?
                        <Skeleton.Button className='h-[350px] block w-full mt-2' shape='round' active />
                        :
                        <div className="grid grid-cols-7 gap-2">
                            {renderCalendar()}
                        </div>
                    }
                    {timeSlotVisible ? <TimeSlotSection handleSelectTimeSlot={handleSelectTimeSlot} isLoading={isTimeSlotLoading} timeSlots={resultTimeSlots?.body?.timeSlots ?? []} handleClose={handleClose} /> : null}
                </div>
            </div>
            <div className='flex justify-end'>
                {isUpdate ?
                    <Button onClick={handleUpdateAppointment} className="h-[42px] bg-[#0284C7] mt-4 text-base font-semibold min-h-10 py-2 px-4 sm:px-5 text-white rounded-[12px] transition-colors w-full xl:w-auto">
                        Cật nhật
                    </Button>
                    :
                    <Button onClick={navigateToConfirmAppointment} className="h-[42px] bg-[#0284C7] mt-4 text-base font-semibold min-h-10 py-2 px-4 sm:px-5 text-white rounded-[12px] transition-colors w-full xl:w-auto">
                        Xác nhận đặt lịch khám
                    </Button>
                }

            </div>

        </div>
    )
}