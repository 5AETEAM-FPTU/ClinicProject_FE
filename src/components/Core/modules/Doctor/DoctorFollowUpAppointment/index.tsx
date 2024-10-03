"use client"

import React, { useState } from 'react'
import { Input, Popover, DatePicker, Select, Button } from 'antd'
import { Search, RefreshCw, ScanEye } from 'lucide-react'
import PatientDetailExpandable from './PatientDetailExpandable'
import Paginate from '@/components/Core/common/Paginate'

interface Patient {
    id: string
    name: string
    address: string
    gender: string
    age: number
    image: string
}

const patients: Patient[] = [
    { id: '1', name: 'Tên bệnh nhân', address: 'thôn A, xã B, thành phố C', gender: 'nam', age: 29, image: 'https://gravatar.com/avatar/e7f242ab6fb92ab2f4c3a372fc7bcd5c?s=400&d=retro&r=pg' },
    { id: '2', name: 'Tên bệnh nhân', address: 'thôn A, xã B, thành phố C', gender: 'nam', age: 29, image: 'https://gravatar.com/avatar/e7f242ab6fb92ab2f4c3a372fc7bcd5c?s=400&d=retro&r=pg' },
    { id: '3', name: 'Tên bệnh nhân', address: 'thôn A, xã B, thành phố C', gender: 'nam', age: 29, image: 'https://gravatar.com/avatar/e7f242ab6fb92ab2f4c3a372fc7bcd5c?s=400&d=retro&r=pg' },
    { id: '4', name: 'Tên bệnh nhân', address: 'thôn A, xã B, thành phố C', gender: 'nam', age: 29, image: 'https://gravatar.com/avatar/e7f242ab6fb92ab2f4c3a372fc7bcd5c?s=400&d=retro&r=pg' },
    { id: '5', name: 'Tên bệnh nhân', address: 'thôn A, xã B, thành phố C', gender: 'nam', age: 29, image: 'https://gravatar.com/avatar/e7f242ab6fb92ab2f4c3a372fc7bcd5c?s=400&d=retro&r=pg' },
    { id: '6', name: 'Tên bệnh nhân', address: 'thôn A, xã B, thành phố C', gender: 'nam', age: 29, image: 'https://gravatar.com/avatar/e7f242ab6fb92ab2f4c3a372fc7bcd5c?s=400&d=retro&r=pg' },
]

export default function FollowUpAppointment() {
    const [activePopover, setActivePopover] = useState<string | null>(null)
    const [isExpanded, setIsExpanded] = useState(false);

    const handlePopoverOpen = (patientId: string) => {
        setActivePopover(patientId)
    }

    const handlePopoverClose = () => {
        setActivePopover(null)
    }

    const ReExaminationForm = () => (
        <div className="p-4 w-64">
            <Select
                className="w-full mb-4"
                placeholder="Xét nghiệm bổ sung"
                options={[
                    { value: 'blood', label: 'Xét nghiệm máu' },
                    { value: 'urine', label: 'Xét nghiệm nước tiểu' },
                    { value: 'xray', label: 'Chụp X-quang' },
                ]}
            />
            <DatePicker className="w-full mb-4 h-[38px]" placeholder="Ngày tái khám" />
            <div className="flex justify-end space-x-2">
                <Button onClick={handlePopoverClose} danger>Hủy</Button>
                <Button type="primary" onClick={handlePopoverClose}>Tạo</Button>
            </div>
        </div>
    )

    return (
        <>
            <PatientDetailExpandable isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
            <div className="w-full mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4 text-secondarySupperDarker">Tái khám</h1>
                <div className="relative mb-6">
                    <Input
                        placeholder="Tìm kiếm bệnh nhân"
                        prefix={<Search className="text-[#003553] mr-[14px]" />}
                        className="w-fit px-5 py-2 border rounded-[12px] border-[#003553] focus:shadow-none font-semibold"
                    />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {patients.map((patient) => (
                        <div key={patient.id} className='shadow-third py-3 px-[22px] rounded-[12px]'>
                            <div className="bg-white rounded-lg shadow-md flex">
                                <img src={patient.image} alt={patient.name} className="w-16 h-16 rounded-[12px] mr-4" />
                                <div className="flex-grow">
                                    <h2 className="text-base text-secondarySupperDarker font-semibold">{patient.name}</h2>
                                    <p className="text-base text-secondarySupperDarker"><span className='font-semibold text-base'>Địa chỉ: </span>{patient.address}</p>
                                    <div className='flex justify-start'>
                                        <p className="text-base text-secondarySupperDarker">
                                            <span className='font-semibold text-base'>Giới tính: </span>{patient.gender}
                                        </p>
                                        <p className="ml-5 text-base text-secondarySupperDarker">
                                            <span className='font-semibold text-base'>Tuổi: </span> {patient.age}
                                        </p>
                                    </div>
                                    
                                </div>
                                <button className='h-fit' onClick={() => { setIsExpanded(true) }}>
                                    <ScanEye className="w-6 h-6 text-[#0284C7]" />
                                </button>
                            </div>
                            <div className="flex justify-end items-center mt-2">
                                <Popover
                                    content={<ReExaminationForm />}
                                    title="Tạo nhắc nhở tái khám"
                                    trigger="click"
                                    open={activePopover === patient.id}
                                    onOpenChange={(visible) => visible ? handlePopoverOpen(patient.id) : handlePopoverClose()}
                                >
                                    <div className='flex justify-end'>
                                        <Button className='mr-2 h-[34px] font-semibold rounded-[12px] bg-[#0284C7] text-[12px]' type='primary'>Tái khám</Button>
                                    </div>
                                </Popover>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Paginate totalPages={10} />
        </>
    )
}