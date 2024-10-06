import { Button, Skeleton } from 'antd'
import React, { useMemo, useState } from 'react'
import { motion } from 'framer-motion'

function mapAppointmentsToTimeSlots(appointments: any[]): TimeSlot[] {
    return appointments.map(appointment => {
        return {
            ...appointment,
            start: new Date(appointment.startTime).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }), // Chuyển định dạng thành HH:MM
            end: new Date(appointment.endTime).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
            isDisabled: appointment.isHadAppointment // Ánh xạ isHadAppointment sang isDisabled
        };
    });
}

function categorizeTimeSlots(timeSlots: TimeSlot[]) {
    const morningSlots: TimeSlot[] = [];
    const afternoonSlots: TimeSlot[] = [];
    const eveningSlots: TimeSlot[] = [];

    timeSlots.forEach(slot => {
        const startHour = parseInt(slot.start.split(':')[0]); // Lấy giờ từ chuỗi "HH:MM"

        if (startHour >= 7 && startHour < 12) {
            morningSlots.push(slot);
        } else if (startHour >= 12 && startHour < 17) {
            afternoonSlots.push(slot);
        } else if (startHour >= 17 && startHour <= 23) {
            eveningSlots.push(slot);
        }
    });
    // Hàm so sánh để sắp xếp theo thời gian bắt đầu
    const compareTime = (a: TimeSlot, b: TimeSlot) => {
        const [aHour, aMinute] = a.start.split(':').map(Number);
        const [bHour, bMinute] = b.start.split(':').map(Number);

        return aHour !== bHour ? aHour - bHour : aMinute - bMinute;
    };

    // Sắp xếp các buổi theo thời gian
    morningSlots.sort(compareTime);
    afternoonSlots.sort(compareTime);
    eveningSlots.sort(compareTime);

    return { morningSlots, afternoonSlots, eveningSlots };
}

export type TimeSlot = {
    start: string
    end: string
    isDisabled?: boolean
    startTime: string,
    endTime: string,
}

type TimeSlotSectionProps = {
    title: string
    slots: TimeSlot[] | [],
    handleSelectTimeSlot: (slot: TimeSlot) => void,
    setSelectedSlot: (slot: TimeSlot) => void,
    selectedSlot: TimeSlot | null,
}

const TimeSlotSection: React.FC<TimeSlotSectionProps> = ({ title, slots, handleSelectTimeSlot, setSelectedSlot, selectedSlot }) => {
    const onSelectSlot = (slot: TimeSlot) => {
        setSelectedSlot(slot);
        handleSelectTimeSlot(slot);
    }

    return (<motion.div
        initial={{
            y: 30,
            opacity: 0,
        }}
        whileInView={{
            y: 0,
            opacity: 1,
        }}
        transition={{
            type: 'spring',
            duration: 0.4,
        }}
        viewport={{
            once: true,
        }}
        className="mb-6">
        <h2 className="text-xl font-bold mb-3">{title}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {slots.map((slot, index) => (
                <Button
                    disabled={slot.isDisabled}
                    type='text'
                    key={index}
                    className={`py-2 px-2 border text-base text-center 
                        ${!slot.isDisabled && selectedSlot?.start === slot.start && selectedSlot?.end === slot.end
                            ? 'bg-[#0284C7] text-white'
                            : 'bg-white text-black border-[#06B6D4] hover:border-[#0284C7]'
                        } 
                        ${slot.isDisabled ? 'cursor-not-allowed bg-[#E8E8E8] opacity-40' : ''}`}
                    onClick={() => onSelectSlot(slot)}
                >
                    {slot.start} - {slot.end}
                </Button>
            ))}
        </div>
    </motion.div>)
}

export default function Component({ handleClose, timeSlots, isLoading, handleSelectTimeSlot }: { handleClose: () => void, timeSlots: any, isLoading?: boolean, handleSelectTimeSlot: any }) {
    const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
    const timeSlotsMapping = useMemo(() => mapAppointmentsToTimeSlots(timeSlots), [timeSlots]);
    const categorizedTimeSlots = useMemo(() => categorizeTimeSlots(timeSlotsMapping), [timeSlotsMapping]);

    return (
        <div className="p-4 w-full mx-auto mt-4">
            <Button className="float-right" onClick={handleClose}>Đóng</Button>
            <Skeleton loading={isLoading} active>
                {categorizedTimeSlots?.morningSlots?.length != 0 && <TimeSlotSection
                    title="Buổi sáng"
                    slots={categorizedTimeSlots?.morningSlots}
                    handleSelectTimeSlot={handleSelectTimeSlot}
                    setSelectedSlot={setSelectedSlot}
                    selectedSlot={selectedSlot}
                />}
                {categorizedTimeSlots?.afternoonSlots.length != 0 && <TimeSlotSection
                    title="Buổi chiều"
                    slots={categorizedTimeSlots?.afternoonSlots}
                    handleSelectTimeSlot={handleSelectTimeSlot}
                    setSelectedSlot={setSelectedSlot}
                    selectedSlot={selectedSlot}
                />}
                {categorizedTimeSlots?.eveningSlots.length != 0 && <TimeSlotSection
                    title="Buổi tối"
                    slots={categorizedTimeSlots?.eveningSlots}
                    handleSelectTimeSlot={handleSelectTimeSlot}
                    setSelectedSlot={setSelectedSlot}
                    selectedSlot={selectedSlot}
                />}
            </Skeleton>
        </div>
    )
}