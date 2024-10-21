"use client"
import React from 'react'
import AppointmentBooking from '@/components/Core/modules/User/BookingModule/AppointmentBooking'
export type TimeSlot = {
    startDate: Date;
    endDate: Date;
}

function CalendarModule() {
    return <AppointmentBooking />
}

export default CalendarModule
