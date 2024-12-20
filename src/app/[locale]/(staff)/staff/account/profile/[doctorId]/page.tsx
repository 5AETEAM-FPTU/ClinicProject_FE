import StaffoctorProfileModule from '@/components/Core/modules/Staff/DoctorProfileForStaffViewing'
import React from 'react'
type TProps = {
    params: {doctorId: string}
}
export default function DoctorProfile({params}: TProps) {
  return (
    <div><StaffoctorProfileModule doctorId={params.doctorId}/></div>
  )
}
