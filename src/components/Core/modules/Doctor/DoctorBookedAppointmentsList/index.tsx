"use client"

import React, { useEffect, useMemo, useState } from 'react'
import { DatePicker, Collapse, Divider, Button } from 'antd'
import { ChevronDown, ChevronUp, Dot } from 'lucide-react'
import "./style.css"
import Image from 'next/image'
import Paginate from '@/components/Core/common/Paginate'
import { useGetAppointmentInWeekQuery } from '@/stores/services/doctor/doctorOverview'
import dayjs from 'dayjs';

const { RangePicker } = DatePicker
const { Panel } = Collapse

interface Appointment {
    id: string
    time: string
    name: string
    phone: string
    gender: string
    age: number
    description: string,
    image: string
}

interface DayAppointments {
    date: string
    appointments: Appointment[]
}

export default function DoctorBookedAppointmentsList() {
    const [expandedDate, setExpandedDate] = useState<string | null>(null)
    const [dateFilter, setDateFilter] = useState([new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().substring(0, 10), new Date(Date.now()).toISOString().substring(0, 10)])
    const [expandedAppointment, setExpandedAppointment] = useState<string | null>(null)
    const { data: appointmentReponse, refetch } = useGetAppointmentInWeekQuery({ startDate: dateFilter[0], endDate: dateFilter[1] });
    console.log(appointmentReponse);
    const toggleDate = (date: string) => {
        setExpandedDate(expandedDate === date ? null : date)
        setExpandedAppointment(null)
    }

    const appointments = useMemo(() => {
        const appointmentsList = appointmentReponse?.body.appointment;
        if (!appointmentsList) return [];

        const appointmentsByDate: DayAppointments[] = appointmentsList.reduce((acc: DayAppointments[], appointment: any) => {
            const date = dayjs(appointment.schedule.startDate).format('Ngày DD [tháng] M [năm] YYYY');
            const newAppointment: Appointment = {
                id: appointment.id,
                time: `${dayjs(appointment.schedule.startDate).format('HH:mm')} - ${dayjs(appointment.schedule.endDate).format('HH:mm')}`,
                name: appointment.patient.fullName,
                phone: appointment.patient.phoneNumber,
                age: dayjs().diff(dayjs(appointment.patient.dob), 'year'),
                gender: appointment.patient.gender.name,
                description: appointment.description,
                image: appointment.patient.avatar,
            };

            // Kiểm tra nếu ngày đã tồn tại trong acc
            const existingDate = acc.find(item => item.date === date);

            if (existingDate) {
                // Nếu ngày đã tồn tại, thêm cuộc hẹn vào danh sách của ngày đó
                existingDate.appointments.push(newAppointment);
            } else {
                // Nếu không, tạo một mục mới cho ngày đó
                acc.push({
                    date: date,
                    appointments: [newAppointment],
                });
            }

            return acc;
        }, []);

        return appointmentsByDate;

    }, [appointmentReponse]);

    console.log(appointments);
    const handleDateFilterChange = (dates: any) => {
        setDateFilter([new Date(dates[0].$y, dates[0].$M, dates[0].$D + 1).toISOString().substring(0, 10), new Date(dates[1].$y, dates[1].$M, dates[1].$D + 1).toISOString().substring(0, 10)])
    }

    useEffect(() => {
        refetch();
    }, [dateFilter[0], dateFilter[1]])

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
                    onChange={handleDateFilterChange}
                    defaultValue={[dayjs(dateFilter[0]), dayjs(dateFilter[1])]}
                />
            </div>

            <div className="space-y-2">
                {appointments.map((day) => (
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
                                                <Image className='size-[74px] rounded-[12px] object-cover' height={74} width={74} alt='' src={appointment.image} />
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
        </div>
    )
}