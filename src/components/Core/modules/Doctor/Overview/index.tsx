'use client'
import React, { useState } from 'react'
import { List, Avatar, Switch, Button } from 'antd'
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
import { useUpdateDoctorDutyMutation } from '@/stores/services/doctor/doctorOverview'
import { set } from 'lodash'
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

const CustomCalendar = () => {
    const days = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN']
    const dates = Array.from({ length: 31 }, (_, i) => i + 1)
    const currentDate = new Date().getDate()
    return (
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
                        className={`shadow-custom-shadow mx-auto flex h-11 w-[95%] cursor-pointer items-center justify-center rounded-[8px] p-2 text-center font-semibold text-secondarySupperDarker hover:bg-blue-100 ${currentDate == date ? 'bg-[#0284C7] text-white' : ''} ${currentDate != date && false ? 'bg-[#0284C760]' : ''}`}
                    >
                        {date}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default function MedicalDashboard() {
    const [checked, setChecked] = useState(false)
    const [updateDoctorDuty, { isLoading, data, error }] =
        useUpdateDoctorDutyMutation()
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
                    <div className="shadow shadow h-full rounded-lg bg-white p-4 shadow-third">
                        <h2 className="mb-4 text-lg font-bold text-secondarySupperDarker">
                            Đang chờ khám
                        </h2>
                        {Array.from({ length: 3 }).map((_, index) => (
                            <div
                                key={index}
                                className="flex justify-between border-b-[1px] border-[#00355350] px-[10px] py-2"
                            >
                                <div className="flex">
                                    <img
                                        src="https://gravatar.com/avatar/091e1674e2a84259f010b5371c2823a9?s=400&d=robohash&r=x"
                                        className="mr-[10px] h-[60px] w-[60px] object-contain"
                                        alt="Patient"
                                    />
                                    <div className="flex-col">
                                        <p className="font-bold text-secondarySupperDarker">
                                            Nguyễn Hòa An
                                        </p>
                                        <p className="text-[12px] font-semibold text-secondarySupperDarker">
                                            Nữ
                                        </p>
                                        <p className="text-[12px] font-semibold text-secondarySupperDarker">
                                            32 Tuổi
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <button className="rounded-[12px] bg-[#0284C7] px-3 py-1 font-bold text-white">
                                        Đang chờ
                                    </button>
                                </div>
                            </div>
                        ))}
                        <div className="mt-4 text-center">
                            <a
                                href="#"
                                className="font-bold text-secondarySupperDarker"
                            >
                                Xem tất cả
                            </a>
                        </div>
                    </div>
                </div>
                <div className="xl:flex-1">
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
                </div>
            </div>
            <div className="flex flex-col gap-4 xl:flex-row">
                <div className="xl:flex-1">
                    <div className="shadow h-full rounded-lg bg-white p-4 shadow-third">
                        <div
                            style={{
                                backgroundImage: `url(${BackGround.src})`,
                            }}
                            className={`flex h-64 h-[160px] items-start justify-between rounded-[12px] bg-cover bg-center p-5`}
                        >
                            <img
                                src="https://gravatar.com/avatar/091e1674e2a84259f010b5371c2823a9?s=400&d=robohash&r=x"
                                alt="Doctor"
                                className="mb-4 h-24 w-24 rounded-[10px]"
                            />
                            <Button
                                className="h-[37px] border-[1px] border-[#0284C7] bg-white px-3 py-2 text-base font-semibold text-[#0284C7]"
                                iconPosition="end"
                                type="primary"
                                icon={<Settings color="#0284C7" size={20} />}
                            >
                                Cài đặt
                            </Button>
                        </div>
                        <div className="ml-[29px]">
                            <h2 className="mt-4 text-[24px] font-bold text-secondarySupperDarker">
                                Namae Wa Nan Desu Ka
                            </h2>
                            <div className="mt-3 flex items-center">
                                <UsersRound className="h-fit text-secondarySupperDarker" />
                                <p className="ml-[10px] text-[21px] font-medium text-secondarySupperDarker">
                                    Giới tính: Nam
                                </p>
                            </div>
                            <div className="mt-3 flex items-center">
                                <BriefcaseMedical className="h-fit text-secondarySupperDarker" />
                                <p className="ml-[10px] text-[21px] font-medium text-secondarySupperDarker">
                                    Chức vụ: Thạc Sĩ - Bác sĩ
                                </p>
                            </div>
                            <div className="mt-3 flex items-center">
                                <BookOpenText className="h-fit text-secondarySupperDarker" />
                                <p className="ml-[10px] text-[21px] font-medium text-secondarySupperDarker">
                                    Chuyên khoa: Nội tim mạch
                                </p>
                            </div>
                            <div className="mt-3 flex items-center">
                                <Smartphone className="h-fit text-secondarySupperDarker" />
                                <p className="ml-[10px] text-[21px] font-medium text-secondarySupperDarker">
                                    Số điện thoại: 0752789222
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-4 xl:flex-1">
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
                    <div className="shadow rounded-lg bg-white p-4 shadow-third">
                        <h2 className="mb-4 text-lg font-bold text-secondarySupperDarker">
                            Lịch đã được đặt gần đây
                        </h2>
                        <List
                            dataSource={appointments}
                            renderItem={(item) => (
                                <List.Item className="mt-[14px] h-fit rounded-[8px] bg-[#F8F9FB] px-2 py-1 2xl:h-[58px]">
                                    <List.Item.Meta
                                        avatar={
                                            <Avatar
                                                className="size-[50px] rounded-[8px] text-secondarySupperDarker"
                                                src="/placeholder.svg?height=40&width=40"
                                            />
                                        }
                                        title={
                                            <span className="text-[14px] font-bold text-secondarySupperDarker">
                                                {item.name}
                                            </span>
                                        }
                                        description={
                                            <div>
                                                <span className="text-[14px] font-medium text-secondarySupperDarker">
                                                    Đã đặt lịch lúc {item.date}
                                                </span>
                                            </div>
                                        }
                                    />
                                    <div className="hidden gap-[14px] 2xl:flex">
                                        <p className="rounded-[12px] bg-[#0284C7] px-[10px] py-[2px] text-center font-bold text-white">
                                            {item.time}
                                        </p>
                                    
                                    </div>
                                </List.Item>
                            )}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
