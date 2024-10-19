"use client"

import React, { useEffect, useMemo, useState } from 'react'
import { DatePicker, Collapse, Divider, Button, Skeleton } from 'antd'
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
    const { data: appointmentReponse, refetch, isFetching } = useGetAppointmentInWeekQuery({ startDate: dateFilter[0], endDate: dateFilter[1] });
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
                {isFetching && Array.from({ length: 10 }).map((_, index) => (
                    <Skeleton.Button active className='h-12 w-full' key={index} />
                ))}
                {!isFetching && appointments.length === 0 && (
                    <div className="w-full mt-[170px] flex flex-col items-center justify-center">
                        <svg className="w-1/2 md:w-1/3 lg:w-1/4 text-blue-600" xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 1119.60911 699"><circle cx="292.60911" cy="213" r="213" fill="#f2f2f2"></circle><path d="M31.39089,151.64237c0,77.49789,48.6181,140.20819,108.70073,140.20819" transform="translate(-31.39089 -100.5)" fill="#2f2e41"></path><path d="M140.09162,291.85056c0-78.36865,54.255-141.78356,121.30372-141.78356" transform="translate(-31.39089 -100.5)" fill="currentColor"></path><path d="M70.77521,158.66768c0,73.61476,31.00285,133.18288,69.31641,133.18288" transform="translate(-31.39089 -100.5)" fill="currentColor"></path><path d="M140.09162,291.85056c0-100.13772,62.7103-181.16788,140.20819-181.16788" transform="translate(-31.39089 -100.5)" fill="#2f2e41"></path><path d="M117.22379,292.83905s15.41555-.47479,20.06141-3.783,23.713-7.2585,24.86553-1.95278,23.16671,26.38821,5.76263,26.5286-40.43935-2.711-45.07627-5.53549S117.22379,292.83905,117.22379,292.83905Z" transform="translate(-31.39089 -100.5)" fill="#a8a8a8"></path><path d="M168.224,311.78489c-17.40408.14042-40.43933-2.71094-45.07626-5.53548-3.53126-2.151-4.93843-9.86945-5.40926-13.43043-.32607.014-.51463.02-.51463.02s.97638,12.43276,5.61331,15.2573,27.67217,5.67589,45.07626,5.53547c5.02386-.04052,6.7592-1.82793,6.66391-4.47526C173.87935,310.756,171.96329,311.75474,168.224,311.78489Z" transform="translate(-31.39089 -100.5)" opacity="0.2"></path><ellipse cx="198.60911" cy="424.5" rx="187" ry="25.43993" fill="#3f3d56"></ellipse><ellipse cx="198.60911" cy="424.5" rx="157" ry="21.35866" opacity="0.1"></ellipse><ellipse cx="836.60911" cy="660.5" rx="283" ry="38.5" fill="#3f3d56"></ellipse><ellipse cx="310.60911" cy="645.5" rx="170" ry="23.12721" fill="#3f3d56"></ellipse><path d="M494,726.5c90,23,263-30,282-90" transform="translate(-31.39089 -100.5)" fill="none" stroke="#2f2e41" stroke-miterlimit="10" stroke-width="2"></path><path d="M341,359.5s130-36,138,80-107,149-17,172" transform="translate(-31.39089 -100.5)" fill="none" stroke="#2f2e41" stroke-miterlimit="10" stroke-width="2"></path><path d="M215.40233,637.78332s39.0723-10.82,41.47675,24.04449-32.15951,44.78287-5.10946,51.69566" transform="translate(-31.39089 -100.5)" fill="none" stroke="#2f2e41" stroke-miterlimit="10" stroke-width="2"></path><path d="M810.09554,663.73988,802.218,714.03505s-38.78182,20.60284-11.51335,21.20881,155.73324,0,155.73324,0,24.84461,0-14.54318-21.81478l-7.87756-52.719Z" transform="translate(-31.39089 -100.5)" fill="#2f2e41"></path><path d="M785.21906,734.69812c6.193-5.51039,16.9989-11.252,16.9989-11.252l7.87756-50.2952,113.9216.10717,7.87756,49.582c9.185,5.08711,14.8749,8.987,18.20362,11.97818,5.05882-1.15422,10.58716-5.44353-18.20362-21.38921l-7.87756-52.719-113.9216,3.02983L802.218,714.03506S769.62985,731.34968,785.21906,734.69812Z" transform="translate(-31.39089 -100.5)" opacity="0.1"></path><rect x="578.43291" y="212.68859" width="513.25314" height="357.51989" rx="18.04568" fill="#2f2e41"></rect><rect x="595.70294" y="231.77652" width="478.71308" height="267.83694" fill="#3f3d56"></rect><circle cx="835.05948" cy="223.29299" r="3.02983" fill="#f2f2f2"></circle><path d="M1123.07694,621.32226V652.6628a18.04341,18.04341,0,0,1-18.04568,18.04568H627.86949A18.04341,18.04341,0,0,1,609.8238,652.6628V621.32226Z" transform="translate(-31.39089 -100.5)" fill="#2f2e41"></path><polygon points="968.978 667.466 968.978 673.526 642.968 673.526 642.968 668.678 643.417 667.466 651.452 645.651 962.312 645.651 968.978 667.466" fill="#2f2e41"></polygon><path d="M1125.828,762.03359c-.59383,2.539-2.83591,5.21743-7.90178,7.75032-18.179,9.08949-55.1429-2.42386-55.1429-2.42386s-28.4804-4.84773-28.4804-17.573a22.72457,22.72457,0,0,1,2.49658-1.48459c7.64294-4.04351,32.98449-14.02122,77.9177.42248a18.73921,18.73921,0,0,1,8.54106,5.59715C1125.07908,756.45353,1126.50669,759.15715,1125.828,762.03359Z" transform="translate(-31.39089 -100.5)" fill="#2f2e41"></path><path d="M1125.828,762.03359c-22.251,8.526-42.0843,9.1622-62.43871-4.975-10.26507-7.12617-19.59089-8.88955-26.58979-8.75618,7.64294-4.04351,32.98449-14.02122,77.9177.42248a18.73921,18.73921,0,0,1,8.54106,5.59715C1125.07908,756.45353,1126.50669,759.15715,1125.828,762.03359Z" transform="translate(-31.39089 -100.5)" opacity="0.1"></path><ellipse cx="1066.53846" cy="654.13477" rx="7.87756" ry="2.42386" fill="#f2f2f2"></ellipse><circle cx="835.05948" cy="545.66686" r="11.51335" fill="#f2f2f2"></circle><polygon points="968.978 667.466 968.978 673.526 642.968 673.526 642.968 668.678 643.417 667.466 968.978 667.466" opacity="0.1"></polygon><rect x="108.60911" y="159" width="208" height="242" fill="#2f2e41"></rect><rect x="87.60911" y="135" width="250" height="86" fill="#3f3d56"></rect><rect x="87.60911" y="237" width="250" height="86" fill="#3f3d56"></rect><rect x="87.60911" y="339" width="250" height="86" fill="#3f3d56"></rect><rect x="271.60911" y="150" width="16" height="16" fill="currentColor" opacity="0.4"></rect><rect x="294.60911" y="150" width="16" height="16" fill="currentColor" opacity="0.8"></rect><rect x="317.60911" y="150" width="16" height="16" fill="currentColor"></rect><rect x="271.60911" y="251" width="16" height="16" fill="currentColor" opacity="0.4"></rect><rect x="294.60911" y="251" width="16" height="16" fill="currentColor" opacity="0.8"></rect><rect x="317.60911" y="251" width="16" height="16" fill="currentColor"></rect><rect x="271.60911" y="352" width="16" height="16" fill="currentColor" opacity="0.4"></rect><rect x="294.60911" y="352" width="16" height="16" fill="currentColor" opacity="0.8"></rect><rect x="317.60911" y="352" width="16" height="16" fill="currentColor"></rect><circle cx="316.60911" cy="538" r="79" fill="#2f2e41"></circle><rect x="280.60911" y="600" width="24" height="43" fill="#2f2e41"></rect><rect x="328.60911" y="600" width="24" height="43" fill="#2f2e41"></rect><ellipse cx="300.60911" cy="643.5" rx="20" ry="7.5" fill="#2f2e41"></ellipse><ellipse cx="348.60911" cy="642.5" rx="20" ry="7.5" fill="#2f2e41"></ellipse><circle cx="318.60911" cy="518" r="27" fill="#fff"></circle><circle cx="318.60911" cy="518" r="9" fill="#3f3d56"></circle><path d="M271.36733,565.03228c-6.37889-28.56758,14.01185-57.43392,45.544-64.47477s62.2651,10.41,68.644,38.9776-14.51861,39.10379-46.05075,46.14464S277.74622,593.59986,271.36733,565.03228Z" transform="translate(-31.39089 -100.5)" fill="currentColor"></path><ellipse cx="417.21511" cy="611.34365" rx="39.5" ry="12.40027" transform="translate(-238.28665 112.98044) rotate(-23.17116)" fill="#2f2e41"></ellipse><ellipse cx="269.21511" cy="664.34365" rx="39.5" ry="12.40027" transform="translate(-271.07969 59.02084) rotate(-23.17116)" fill="#2f2e41"></ellipse><path d="M394,661.5c0,7.732-19.90861,23-42,23s-43-14.268-43-22,20.90861-6,43-6S394,653.768,394,661.5Z" transform="translate(-31.39089 -100.5)" fill="#fff"></path></svg>

                        <div className="flex flex-col items-center justify-center">
                            <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-600 mt-2">Không tìm thấy</p>
                        </div>
                    </div>
                )}
                {!isFetching && appointments.map((day) => (
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