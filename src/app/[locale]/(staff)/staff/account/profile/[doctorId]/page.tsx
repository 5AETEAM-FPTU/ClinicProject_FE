import React from 'react'
type TProps = {
    params: {doctorId: string}
}
export default function DoctorProfile({params}: TProps) {
  return (
    <div>{params.doctorId}</div>
  )
}
