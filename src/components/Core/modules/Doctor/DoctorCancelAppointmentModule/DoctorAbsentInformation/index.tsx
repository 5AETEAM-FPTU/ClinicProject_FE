'use client'

import { BellPlus, FilePlus2, ScanSearch } from 'lucide-react'
import ProfileBackground from '@public/landing/images/profile-background.png'
import Image from 'next/image'
import { Button, Input, Layout } from 'antd'
import dayjs from 'dayjs'

interface Gender {
    id: string
    name: string
    constant: string
}

interface Patient {
    avatar: string
    fullName: string | null
    phoneNumber: string | null
    gender: Gender
    dob: string
}

interface Schedule {
    startDate: string
    endDate: string
}

interface AppointmentStatus {
    id: string
    statusName: string
    constant: string
}

export interface ICancelAppointment {
    id: string
    description: string
    patient: Patient
    schedule: Schedule
    appointmentStatus: AppointmentStatus
}

interface IProps {
    payload: ICancelAppointment
}

export default function DoctorAbsentInformation({ payload }: IProps) {
    return (
        <div className="flex h-fit w-full flex-col gap-2 rounded-xl bg-white p-[16px] shadow-third sm:gap-0">
            <div className="w-full">
                <div className="flex flex-col justify-between gap-2 sm:flex-row sm:gap-0">
                    <span className="font-semibold text-[#003553]">
                        09:30 - 10:30 | 22/2/2024
                        {dayjs(payload?.schedule?.startDate).format('HH:mm') +
                            ' - ' +
                            dayjs(payload.schedule.endDate).format(
                                'HH:mm',
                            )}{' '}
                        |{' '}
                        {dayjs(payload.schedule.startDate).format('DD/MM/YYYY')}
                    </span>
                    <div className="flex gap-[10px] font-semibold">
                        <Button className="rounded-[10px] border-none bg-[#FF0000] text-white">
                            {payload.appointmentStatus.statusName ??
                                'Không xác định'}
                        </Button>
                        <Button className="rounded-[10px] border border-secondaryDarker bg-[#0284C7] font-semibold text-white">
                            Gửi thông báo <BellPlus size={18} />
                        </Button>
                    </div>
                </div>
            </div>

            <div className="flex h-20 gap-5">
                <div className="h-[80px] w-[80px] items-center">
                    <Image
                        className="h-full w-full rounded-xl object-cover"
                        src={ProfileBackground}
                        alt="background"
                    />
                </div>

                <div className="flex flex-col">
                    <div className="text-base font-semibold text-[#003553]">
                        {payload.patient.fullName ?? 'Không xác định'}
                    </div>
                    <div className="my-1 font-semibold text-[#003553] text-opacity-90">
                        Số điện thoại:{' '}
                        <span className="font-medium opacity-90">
                            {payload.patient.phoneNumber ?? 'Không xác định'}
                        </span>
                    </div>
                    <div className="flex font-semibold text-[#003553] text-opacity-90">
                        <p className="mr-6">
                            Giới tính:{' '}
                            <span className="font-medium opacity-90">
                                {' '}
                                {payload.patient.gender.name ??
                                    'Không xác định'}
                            </span>
                        </p>
                        <p>
                            Tuổi:{' '}
                            <span
                                className="font-medium opacity-90"
                                dangerouslySetInnerHTML={{
                                    __html:
                                        payload?.patient?.dob ??
                                        'Không xác định',
                                }}
                            ></span>
                        </p>
                    </div>
                </div>
            </div>
            <div className="mt-4">
                <p className="line-clamp-2 h-[45px] text-[#003553]">
                    <span className="w-[50px] font-semibold text-[#003553]">
                        Mô tả:{' '}
                    </span>
                    Bệnh nhân đăng ký khám tổng quát nhằm kiểm tra toàn diện về
                    sức khỏe, bao gồm các xét nghiệm và kiểm tra lâm s... Bệnh
                    nhân đăng ký khám tổng quát nhằm kiểm tra toàn diện về sức
                    khỏe, bao gồm các xét nghiệm và kiểm tra lâm s...
                </p>
            </div>
        </div>
    )
}
