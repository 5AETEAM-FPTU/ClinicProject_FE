import StaffDoctorVisitInDayModule from '@/components/Core/modules/Staff/StaffTreatmentOnDay/DoctorVisitOnDayModule'
import React from 'react'

type TProps = {
    params: {
        doctorId: string
    }
}

export default function TreatmentOnDayDoctor({ params }: TProps) {
    return (
        <div>
            <StaffDoctorVisitInDayModule doctorId={params.doctorId} />
        </div>
    )
}
