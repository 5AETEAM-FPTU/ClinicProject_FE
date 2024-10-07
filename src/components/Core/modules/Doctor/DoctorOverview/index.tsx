'use client'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { List, Avatar, Switch, Button, Skeleton } from 'antd'
import {
    Settings,
    MessageCircle,
    Calendar as CalendarIcon,
    Smartphone,
    UsersRound,
    BookOpenText,
    BriefcaseMedical,
    MessageCircleReply,
} from 'lucide-react'
import Image from 'next/image'
import BackGround from '@public/landing/images/profile-background.png'
import './style.css'
import { useUpdateDoctorDutyMutation, useGetRecentAppointmentsQuery } from '@/stores/services/doctor/doctorOverview'
import { set } from 'lodash'
import { useGetScheduleByMonthQuery } from '@/stores/services/schedule/scheduleSettings'
import { useGetDoctorProfileQuery } from '@/stores/services/doctor/doctorSettings'
import { useGetAppointmentOnDayQuery } from '@/stores/services/doctor/doctorTreatmentTurn'
import { DateTimeFormatOptions, useLocale } from 'next-intl'
import { useRouter } from 'next-nprogress-bar'
import { jwtDecode } from 'jwt-decode'
import { JwtPayloadUpdated } from '../../Auth/SignIn'
import webStorageClient from '@/utils/webStorageClient'

function calculateAge(birthday: string) {
    const today = new Date();
    const birthDate = new Date(birthday);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dayDiff = today.getDate() - birthDate.getDate();

    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
        age--;
    }

    return age;
}


const patients = [
    { name: 'Nguyễn Hòa An', gender: 'Nữ', age: 32 },
    { name: 'Nguyễn Hoàng Anh', gender: 'Nữ', age: 32 },
]

const consultations = [
    {
        name: 'Nguyễn Mai Phương',
        message: 'Hiện tại em đang muốn khám tổng quát, bác sĩ có thể...',
    },
    {
        name: 'Lê Đại Hoàng',
        message: 'Tư vấn giúp em về tình hình sức khỏe hiện tại của em...',
    },
]

const appointments = [
    {
        name: 'Nguyễn Quang Quý',
        time: '08:30 - 9:30 | T4 - 02/11/2024',
        date: '21:24 - 22/10/2024',
    },
    {
        name: 'Nguyễn Quang Quý',
        time: '08:30 - 9:30 | T4 - 02/11/2024',
        date: '21:24 - 22/10/2024',
    },
]

const currentMonth = new Date().getMonth() + 1;
const currentYear = new Date().getFullYear();

const CustomCalendar = () => {
    const _accessToken = webStorageClient.getToken();
    const userId = jwtDecode<JwtPayloadUpdated>(_accessToken!).sub;
    const { data, isLoading, error, refetch } = useGetScheduleByMonthQuery({ month: currentMonth, year: currentYear, doctorId: userId! });
    const days = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN']
    const dates = Array.from({ length: 31 }, (_, i) => i + 1)
    const currentDate = new Date().getDate();
    const hashData = useMemo(() => {
        let dataHash = data && data.body.workingDays;
        const hash: any = {}
        dataHash?.forEach((item: string) => {
            hash[new Date(item).getDate()] = true;
        })
        return hash;
    }, [data]);

    return (
        <Skeleton loading={isLoading} active>
            <div className="shadow h-full rounded-lg bg-white p-5 shadow-third">
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-secondarySupperDarker">
                        Tháng 4 2024
                    </h2>
                </div>
                <div className="grid grid-cols-7 gap-1">
                    {days.map((day) => (
                        <div
                            key={day}
                            className="mx-auto w-[95%] text-center font-semibold text-secondarySupperDarker"
                        >
                            {day}
                        </div>
                    ))}
                    {dates.map((date) => (
                        <div
                            key={date}
                            className={`shadow-custom-shadow mx-auto flex h-11 w-[95%] cursor-pointer items-center justify-center rounded-[8px] p-2 text-center font-semibold text-secondarySupperDarker hover:bg-blue-100 ${currentDate == date ? 'bg-[#0284C7] text-white' : ''} ${date > currentDate && currentDate != date && hashData[date] ? 'bg-[#0284C760]' : ''} ${date < currentDate ? 'bg-[#E7E7E7] opacity-60' : ''}`}
                        >
                            {date}
                        </div>
                    ))}
                </div>
            </div>
        </Skeleton>
    )
}

const AppointmentComponent = () => {
    const { data, isLoading, error } = useGetAppointmentOnDayQuery({ date: new Date().toISOString().slice(0, 10) })
    const appointments = data?.body.appointment;
    return (
        <Skeleton loading={isLoading} active avatar>
            <div className="shadow shadow h-full rounded-lg bg-white p-4 shadow-third">
                <h2 className="mb-4 text-lg font-bold text-secondarySupperDarker">
                    Đang chờ khám
                </h2>
                {appointments?.length == 0 && <p className="text-center text-secondarySupperDarker">Không có lịch hẹn nào</p>}
                {appointments?.filter((item: any) => item.appointmentStatus.constant == 'Pending').map((item: any) => (
                    <div
                        key={item.id}
                        className="flex justify-between border-b-[1px] border-[#00355350] px-[10px] py-2"
                    >
                        <div className="flex">
                            <Avatar
                                shape='square'
                                src={item.patient.avatar}
                                className="mr-[10px] h-[60px] w-[60px] object-cover"
                                alt="Patient"
                            />
                            <div className="flex-col">
                                <p className="font-bold text-secondarySupperDarker">
                                    {item.patient.fullName || "Nguyễn"}
                                </p>
                                <p className="text-[12px] font-semibold text-secondarySupperDarker">
                                    {item.patient.gender.name}
                                </p>
                                <p className="text-[12px] font-semibold text-secondarySupperDarker">
                                    {calculateAge(item.patient.dob)} Tuổi
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <button className="rounded-[12px] bg-[#0284C7] px-3 py-1 font-bold text-white">
                                {item.appointmentStatus.statusName}
                            </button>
                        </div>
                    </div>
                ))}
                {appointments?.length > 0 && <div className="mt-4 text-center">
                    <a
                        target='_blank'
                        href="/doctor/treatment-turn/treatment-onday"
                        className="font-bold text-secondarySupperDarker"
                    >
                        Xem tất cả
                    </a>
                </div>
                }
            </div>
        </Skeleton>
    )
}

const ConsultationComponent = () => {
    return (
        <div className="shadow rounded-lg bg-white p-4 shadow-third">
            <h2 className="mb-4 text-[18px] font-bold text-secondarySupperDarker">
                Yêu cầu tư vấn
            </h2>
            <List
                dataSource={consultations}
                renderItem={(item) => (
                    <List.Item className="mt-[10px] rounded-[12px] bg-[#F8F9FB] p-[10px]">
                        <List.Item.Meta
                            avatar={
                                <Avatar
                                    size={50}
                                    src="/placeholder.svg?height=40&width=40"
                                />
                            }
                            title={
                                <span className="text-[14px] font-bold text-secondarySupperDarker">
                                    {item.name}
                                </span>
                            }
                            description={
                                <span className="font-regular line-clamp-1 text-[14px] text-secondarySupperDarker">
                                    {item.message}
                                </span>
                            }
                        />
                        <button className="h-8 w-11 rounded-[8px] bg-[#00B5F1]">
                            <MessageCircleReply
                                className="mx-auto text-white"
                                size={20}
                            />
                        </button>
                    </List.Item>
                )}
            />
        </div>
    )
}

const RecentBookedAppoinemt = () => {
    const { data, isLoading, error } = useGetRecentAppointmentsQuery({ size: 2 })
    let appointments = [];
    if (data) appointments = data.body.appointments;
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const options: DateTimeFormatOptions  = { weekday: 'short', day: '2-digit', month: '2-digit', year: 'numeric' };
        return date.toLocaleDateString('vi-VN', options).replace(',', ''); // Format to Vietnamese style
    };

    const formatDateTime = (dateString: string) => {
        const date = new Date(dateString);

        // Formatting time as HH:mm
        const timeOptions = { hour: '2-digit', minute: '2-digit', hour12: false } as const;
        const formattedTime = date.toLocaleTimeString([], timeOptions);

        // Formatting date as DD/MM/YYYY
        const dateOptions = { day: '2-digit', month: '2-digit', year: 'numeric' } as const;
        const formattedDate = date.toLocaleDateString('vi-VN', dateOptions);

        return `${formattedTime} - ${formattedDate}`; // Combine time and date
    };

    const formatTime = (startDate: string, endDate: string) => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const startTime = start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
        const endTime = end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
        return `${startTime} - ${endTime}`;
    };
    return (
        <Skeleton loading={isLoading} avatar>
            <div className="shadow rounded-lg bg-white p-4 shadow-third">
                <h2 className="mb-4 text-lg font-bold text-secondarySupperDarker">
                    Lịch đã được đặt gần đây
                </h2>
                {appointments ?
                    <List
                        dataSource={appointments}
                        renderItem={(item: any) => (
                            <List.Item className="mt-[14px] h-fit rounded-[8px] bg-[#F8F9FB] px-2 py-1 2xl:h-[58px]">
                                <List.Item.Meta
                                    avatar={
                                        <Avatar
                                            className="size-[50px] rounded-[8px] text-secondarySupperDarker"
                                            src={item.patient.avatar || "/placeholder.svg?height=40&width=40"} // Use patient's avatar or placeholder
                                        />
                                    }
                                    title={
                                        <span className="text-[14px] font-bold text-secondarySupperDarker">
                                            {item.patient.fullName || "Unknown Patient"}
                                        </span>
                                    }
                                    description={
                                        <div>
                                            <span className="text-[14px] font-medium text-secondarySupperDarker">
                                                Đã đặt lịch lúc {formatDateTime(item.createdAt)}
                                            </span>
                                        </div>
                                    }
                                />
                                <div className="hidden gap-[14px] 2xl:flex">
                                    <p className="rounded-[12px] bg-[#0284C7] px-[10px] py-[2px] text-center font-bold text-white">
                                        {formatTime(item.schedule.startDate, item.schedule.endDate)} | {formatDate(item.schedule.startDate)}
                                    </p>
                                </div>
                            </List.Item>
                        )}
                    /> :
                    <div className='text-center'>Không có lịch khám</div>
                }
            </div>

        </Skeleton>
    )
}

export default function MedicalDashboard() {
    const [checked, setChecked] = useState(false)
    const router = useRouter();
    const locale = useLocale();
    // Doctor profile
    const [updateDoctorDuty, { isLoading, data, error }] = useUpdateDoctorDutyMutation();
    const { data: doctorData, isLoading: doctorLoading, error: doctorError } = useGetDoctorProfileQuery();
    const doctor = doctorData?.body.user;

    useMemo(() => {
        setChecked(doctor?.isOnDuty && true)
    }, [doctorData])
    const handleUpdateDoctorDuty = async (status: boolean) => {
        const result = await updateDoctorDuty({ status })
        if (!result.error) setChecked(status)
    }

    const handleChange = (checked: boolean) => {
        if (!isLoading) handleUpdateDoctorDuty(checked)
    }

    return (
        <div className="flex min-h-screen flex-col gap-4">
            <div className="flex flex-col gap-4 xl:flex-row">
                <div className="xl:flex-1">
                    <CustomCalendar />
                </div>
                <div className="xl:flex-1">
                    <AppointmentComponent />
                </div>
                <div className="xl:flex-1">
                    <Skeleton className='h-[346px]' loading={doctorLoading} active>
                        <div className="shadow h-full rounded-lg bg-white p-4 shadow-third">
                            <h2 className="text-[18px] font-bold text-secondarySupperDarker">
                                Cập nhật trạng thái
                            </h2>
                            <p className="mt-2 text-[12px] font-medium text-gray-500">
                                Cho người khác biết là bạn hiện đang có mặt tại
                                phòng khám.
                            </p>

                            <div className="mt-9 flex items-center">
                                <Switch
                                    className={
                                        checked ? `bg-[#0284C7]` : 'bg-white-200'
                                    }
                                    value={checked}
                                    onChange={handleChange}
                                />
                                <span className="ml-4 text-base font-bold text-secondarySupperDarker">
                                    {(isLoading && 'Đang cập nhật...') ||
                                        (!isLoading && checked
                                            ? 'Hiện đang trực'
                                            : 'Hiện không trực')}
                                </span>
                            </div>
                            <p className="mt-9 text-sm text-gray-500">
                                Lưu ý: Người sử dụng hệ thống sẽ dễ dàng đặt lịch
                                khám hoặc yêu cầu tư vấn hơn khi có bác sĩ đang
                                trực!
                            </p>
                        </div>
                    </Skeleton>
                </div>
            </div>
            <div className="flex flex-col gap-4 xl:flex-row">
                <div className="xl:flex-1">
                    <Skeleton loading={doctorLoading} active avatar>
                        <div className="shadow h-full rounded-lg bg-white p-4 shadow-third">
                            <div
                                style={{
                                    backgroundImage: `url(${BackGround.src})`,
                                }}
                                className={`flex h-[160px] items-start justify-between rounded-[12px] bg-cover bg-center p-5`}
                            >
                                <Avatar
                                    shape="square"
                                    src={doctor?.avatarUrl}
                                    alt="Doctor"
                                    className="mb-4 h-[120px] w-[120px] rounded-[10px] object-cover"
                                />
                                <Button
                                    className="h-[37px] border-[1px] border-[#0284C7] bg-white px-3 py-2 text-base font-semibold text-[#0284C7]"
                                    iconPosition="end"
                                    type="primary"
                                    icon={<Settings color="#0284C7" size={20} />}
                                    onClick={() => { router.push(`/${locale}/${jwtDecode<JwtPayloadUpdated>(webStorageClient.getToken()!).role}/account/settings`)}}
                                >
                                    Cài đặt
                                </Button>
                            </div>
                            <div className="ml-[29px]">
                                <h2 className="mt-4 text-[24px] font-bold text-secondarySupperDarker">
                                    {doctor?.fullName}
                                </h2>
                                <div className="mt-3 flex items-center">
                                    <UsersRound size={30} className="text-secondarySupperDarker" />
                                    <p className="ml-[10px] text-[21px] font-medium text-secondarySupperDarker">
                                        Giới tính: {doctor?.gender.genderName}
                                    </p>
                                </div>
                                <div className="mt-3 flex items-center">
                                    <BriefcaseMedical size={30} className="text-secondarySupperDarker" />
                                    <p className="ml-[10px] text-[21px] font-medium text-secondarySupperDarker">
                                        Chức vụ: {doctor?.position.positionName}
                                    </p>
                                </div>
                                <div className="mt-3 flex items-center">
                                    <BookOpenText className="w-[30px] text-secondarySupperDarker" />
                                    <p className="ml-[10px] text-[21px] font-medium text-secondarySupperDarker">
                                        Chuyên khoa: {doctor?.specialties.map((specialty: { specialtyName: string }) => specialty.specialtyName).join(', ')}
                                    </p>
                                </div>
                                <div className="mt-3 flex items-center">
                                    <Smartphone size={30} className="text-secondarySupperDarker" />
                                    <p className="ml-[10px] text-[21px] font-medium text-secondarySupperDarker">
                                        Số điện thoại: {doctor?.phoneNumber}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Skeleton>
                </div>
                <div className="flex flex-col gap-4 xl:flex-1">
                    <ConsultationComponent />
                    <RecentBookedAppoinemt />
                </div>
            </div>
        </div>
    )
}
