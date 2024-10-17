import React from 'react'

type TProps = {
    params: {
        doctorId: string
    }
}

export default function TreatmentOnDayDoctor({params}:TProps) {
    
  return (
    <div>StaffTreatmentOnDayDoctor: {params.doctorId}</div>
  )
}
