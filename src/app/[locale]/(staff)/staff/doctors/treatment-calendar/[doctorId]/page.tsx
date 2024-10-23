import DoctorBookedAppointmentsList from '@/components/Core/modules/Staff/StaffAppointment/DoctorAppointment'
import React from 'react'

function TreatmentCalendar({ params }: { params: { doctorId: string } }) {
    return (
        <DoctorBookedAppointmentsList doctorId={params.doctorId} />
    )
}

export default TreatmentCalendar
