"use client"
import React from 'react'
import Calendar from '@/components/Core/modules/Calendar/Calendar'
import AppointmentConfirm from '@/components/Core/modules/Calendar/ConfirmAppointment'
import AppointmentBooking from '@/components/Core/modules/Calendar/AppointmentBooking'
import { useSearchParams, useRouter } from 'next/navigation'

export type TimeSlot = {
    startDate: Date;
    endDate: Date;
}

function CalendarModule() {
    const [step, setStepState] = React.useState("");
    const [doctorId, setDoctorId] = React.useState("");
    const [timeSlotSelected, setTimeSlotSelected] = React.useState<TimeSlot>();
    const params = useSearchParams();
    const router = useRouter();
    // Cách thay đổi giá trị của search params
    const handleBookDoctor = (id: string) => {
        setDoctorId(id);
        setStepState("booking");
    }

    const handleSelectTimeSlot = (timeSlot: {
        startDate: Date;
        endDate: Date;
    }) => {
        setTimeSlotSelected(timeSlot);
        setStepState("confirm");
    }

    if (!step) return <AppointmentBooking handleBookDoctor={handleBookDoctor} />
    if (step === 'booking') return <Calendar handleSelectTimeSlot={handleSelectTimeSlot} />
    if (step === 'confirm') return <AppointmentConfirm timeSlotSelected={timeSlotSelected} />
}

export default CalendarModule
