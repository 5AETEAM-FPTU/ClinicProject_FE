"use client"

import React, { useState } from 'react'
import { DatePicker, Collapse, Divider, Button } from 'antd'
import { ChevronDown, ChevronUp, Dot } from 'lucide-react'
import "./style.css"
import Image from 'next/image'
import Paginate from '@/components/Core/common/Paginate'

const { RangePicker } = DatePicker
const { Panel } = Collapse

interface Appointment {
    id: string
    time: string
    name: string
    phone: string
    gender: string
    age: number
    description: string
}

interface DayAppointments {
    date: string
    appointments: Appointment[]
}

const mockAppointments: DayAppointments[] = [
    {
        date: "Ngày 18 tháng 9 năm 2024",
        appointments: [
            {
                id: '1',
                time: '7:00 - 7:30',
                name: 'Nguyễn Văn A',
                phone: '0785771092',
                gender: 'Nam',
                age: 29,
                description: 'Tôi bị đau đầu suốt mấy ngày liền, tôi có mua thuốc uống nhưng không khỏi, tôi có triệu chứng buồn nôn.',
            },
            {
                id: '2',
                time: '7:30 - 8:00',
                name: 'Trần Thị B',
                phone: '0901234567',
                gender: 'Nữ',
                age: 35,
                description: 'Đau lưng kéo dài, khó cử động.',
            },
        ],
    },
    {
        date: "Ngày 17 tháng 9 năm 2024",
        appointments: [
            {
                id: '3',
                time: '9:00 - 9:30',
                name: 'Lê Văn C',
                phone: '0912345678',
                gender: 'Nam',
                age: 45,
                description: 'Khám định kỳ.',
            },
        ],
    },
]

export default function Component() {
    const [expandedDate, setExpandedDate] = useState<string | null>(null)
    const [expandedAppointment, setExpandedAppointment] = useState<string | null>(null)

    const toggleDate = (date: string) => {
        setExpandedDate(expandedDate === date ? null : date)
        setExpandedAppointment(null)
    }

    const toggleAppointment = (appointmentId: string) => {
        setExpandedAppointment(expandedAppointment === appointmentId ? null : appointmentId)
    }

    return (
        <div className="w-full p-4">
            <h1 className="text-2xl font-bold mb-4 text-secondarySupperDarker">Lịch đã đặt</h1>
            <div className='mb-4 flex justify-center'>
                <RangePicker
                    className="mx-auto"
                    placeholder={['Từ ngày', 'Đến ngày']}
                />
            </div>

            <div className="space-y-2">
                {mockAppointments.map((day) => (
                    <div key={day.date} className="shadow-third rounded-lg overflow-hidden bg-white">
                        <div
                            className="flex justify-between items-center p-4 cursor-pointer"
                            onClick={() => toggleDate(day.date)}
                        >
                            <span className="font-semibold text-[20px] text-secondarySupperDarker">{day.date}</span>
                            <div className="flex items-center">
                                <span className="mr-2 text-sm text-secondarySupperDarker">{day.appointments.length} cuộc hẹn</span>
                                {expandedDate === day.date ? (
                                    <ChevronUp className="h-5 w-5 text-gray-600" />
                                ) : (
                                    <ChevronDown className="h-5 w-5 text-gray-600" />
                                )}
                            </div>
                        </div>
                        {expandedDate === day.date && (
                            <Collapse
                                className='!item-center border-none'
                                expandIcon={({ isActive }) =>
                                    <Dot className='text-secondarySupperDarker' />
                                }
                            >
                                {day.appointments.map((appointment) => (
                                    <Panel
                                        className='bg-white border-none'
                                        key={appointment.id}
                                        header={
                                            <div className="flex justify-between items-center">
                                                <span className="font-medium text-[20px] text-secondarySupperDarker">{appointment.time}</span>
                                                <span className='text-secondarySupperDarker'>{appointment.name}</span>
                                            </div>
                                        }
                                    >
                                        <div className="space-y-2 text-sm border-none ml-[22px]">
                                            <div className='flex items-center'>
                                                <Image className='size-[74px] rounded-[12px]' height={74} width={74} alt='' src={"data:image/jpeg;base64,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"} />
                                                <div className='ml-[10px] leading-[26px]'>
                                                    <p className='text-secondarySupperDarker'><span className="font-medium text-base">Số điện thoại:</span> {appointment.phone}</p>
                                                    <p className='text-secondarySupperDarker'><span className="font-medium text-base">Giới tính:</span> {appointment.gender}</p>
                                                    <p className='text-secondarySupperDarker'><span className="font-medium text-base">Tuổi:</span> {appointment.age}</p>
                                                </div>
                                            </div>
                                            <p className='text-secondarySupperDarker'><span className="font-medium text-base">Mô tả:</span> {appointment.description}</p>
                                            <Divider />
                                            <div className='flex justify-end'>
                                                <Button className='mr-2 h-[34px] font-semibold rounded-[12px] bg-[#0284C7] text-[12px]' type='primary'>Nhắn tin</Button>
                                            </div>
                                        </div>
                                    </Panel>
                                ))}
                            </Collapse>
                        )}
                    </div>
                ))}
            </div>
            <Paginate totalPages={20} />
        </div>
    )
}