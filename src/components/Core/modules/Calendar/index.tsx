"use client"
import React from 'react'
import Calendar from '@/components/Core/modules/Calendar/Calendar'
import AppointmentConfirm from '@/components/Core/modules/User/BookingModule/ConfirmAppointment'
import AppointmentBooking from '@/components/Core/modules/User/BookingModule/AppointmentBooking'
import { useSearchParams, useRouter } from 'next/navigation'
import { useGetAllDoctorForBookingQuery } from '@/stores/services/user/userAppointments'
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

    return <AppointmentBooking />
}

export default CalendarModule
