'use client'

import { BellPlus, FilePlus2, ScanSearch, Settings } from 'lucide-react'
import ProfileBackground from '@public/landing/images/profile-background.png'
import Image from 'next/image'
import { Button, Input, Layout, message, Popover } from 'antd'
import dayjs from 'dayjs'
import { useTrigger } from '@/hooks/useTrigger'
import { useGetAllAppointmentStatusQuery } from '@/stores/services/enum/enum'
import { useUpdateAppointmentStatusMutation } from '@/stores/services/appointment'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import { useMutation } from 'convex/react'
import { api } from '@convex/_generated/api'
import { constants } from '@/settings'
import webStorageClient from '@/utils/webStorageClient'
import { jwtDecode } from 'jwt-decode'
import { JwtPayloadUpdated } from '../../../Auth/SignIn'
import { useAppSelector } from '@/hooks/redux-toolkit'

interface Gender {
    id: string
    name: string
    constant: string
}

interface Patient {
    userId: string
    avatarUrl: string
    fullName: string | null
    phoneNumber: string | null
    gender: string
    dob: string
}

interface Schedule {
    scheduleId: string
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
    patients: Patient
    schedules: Schedule
    appointmentStatus: AppointmentStatus
}

interface IProps {
    payload: ICancelAppointment
    refetch: () => void
}

export default function DoctorAbsentInformation({ payload, refetch }: IProps) {
    const { handleTrigger, handleTriggerPayload, trigger } = useTrigger()

    const sendToUserNotification = useMutation(api._user_notifications.functions.sendUserNotification);

    const userId = jwtDecode<JwtPayloadUpdated>(webStorageClient.getToken() as string).sub;
    console.log(payload.patients?.userId);
    const {user} = useAppSelector((state) => state.auth);
    const handlerSendToUserNotification = async () => {
        try {
            await sendToUserNotification({
                receiverId: payload.patients.userId,
                message: 'Bạn đã bị hủy lịch khám!',
                type: constants.NOTIFICATION_TYPES.WARNING,
                description: `Bạn đã bị hủy lịch khám vào lúc ${dayjs(payload.schedules.startDate).format('HH:mm A')}, ngày ${dayjs(payload.schedules.startDate).format('DD/MM/YYYY')} vì không có mặt tại phòng khám. Bạn vui lòng thay đổi lại khung giờ khám của lịch hẹn hoặc liên hệ với chúng tôi để được hỗ trợ! Hân hạnh!`,
                senderAvatarUrl: `${user.avatarUrl}`,
                senderId: userId!,
                senderName: `Bác sĩ: ${user.fullName}`,
                topic: "Vắng mặt"
            })
            message.success('Gửi thông báo thành công!');
        } catch (error) {
            message.error('Gửi thông báo thất bại!');
        }
    }
    return (
        <div className="flex h-fit w-full flex-col gap-2 rounded-xl bg-white p-[16px] shadow-third sm:gap-0">
            <div className="w-full">
                <div className="flex flex-col justify-between gap-2 sm:flex-row sm:gap-0">
                    <span className="font-semibold text-[#003553]">
                        {dayjs(payload.schedules.startDate).format('HH:mm') +
                            ' - ' +
                            dayjs(payload.schedules.endDate).format('HH:mm')}
                    </span>
                    <div className="flex gap-[10px] font-semibold">
                        <Button className="rounded-[10px] border-none bg-[#FF0000] text-white">
                            {payload.appointmentStatus.statusName ??
                                'Không xác định'}
                        </Button>
                        <Button className="rounded-[10px] border-none bg-[#0284C7] font-semibold text-white"
                            onClick={handlerSendToUserNotification}
                        >
                            Gửi thông báo <BellPlus size={18} />
                        </Button>
                        <Popover
                            trigger={'click'}
                            open={trigger}
                            content={
                                <AppointmentStatus
                                    onClose={() => handleTriggerPayload(false)}
                                    payload={payload}
                                    refetch={refetch}
                                />
                            }
                            onOpenChange={handleTrigger}
                        >
                            <Button
                                className={cn(
                                    'w-fit rounded-[10px] border-none bg-opacity-50 !px-[8px] !py-4 text-[#003553]',
                                    ` ${trigger ? 'bg-secondaryDark' : 'bg-white shadow-primary'} `,
                                )}
                            >
                                <Settings
                                    size={18}
                                    className="transition-all duration-500 hover:rotate-180"
                                />
                            </Button>
                        </Popover>
                    </div>
                </div>
            </div>

            <div className="flex h-20 gap-5">
                <div className="h-[80px] w-[80px] items-center">
                    <Image
                        className="h-full w-full rounded-xl object-cover"
                        src={payload.patients.avatarUrl}
                        width={400}
                        height={400}
                        alt="background"
                    />
                </div>

                <div className="flex flex-col">
                    <div className="text-base font-semibold text-[#003553]">
                        {payload.patients.fullName ?? 'Không xác định'}
                    </div>
                    <div className="my-1 font-semibold text-[#003553] text-opacity-90">
                        Số điện thoại:{' '}
                        <span className="font-medium opacity-90">
                            {payload.patients.phoneNumber ?? 'Không xác định'}
                        </span>
                    </div>
                    <div className="flex font-semibold text-[#003553] text-opacity-90">
                        <p className="mr-6">
                            Giới tính:{' '}
                            <span className="font-medium opacity-90">
                                {' '}
                                {payload.patients.gender ?? 'Không xác định'}
                            </span>
                        </p>
                        <p>
                            Tuổi:{' '}
                            <span className="font-medium opacity-90">
                                {dayjs().diff(
                                    dayjs(payload.patients.dob),
                                    'year',
                                ) ?? 'Không xác định'}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
            <div className="mt-4">
                <p className="line-clamp-2 h-[45px] text-[#003553]">
                    <span className="w-[50px] font-semibold text-[#003553]">
                        Mô tả:{' '}
                    </span>
                    {payload.description ?? 'Không xác định'}
                </p>
            </div>
        </div>
    )
}

export interface StatusOption {
    id: string
    statusName: string
    constant: string
}
type TProps = {
    refetch?: () => void
    payload: ICancelAppointment
    onClose?: () => void
}
export function AppointmentStatus({ payload, refetch, onClose }: TProps) {
    const [loadingId, setLoadingId] = useState<string | null>(null)

    const { statusOptions } = useGetAllAppointmentStatusQuery(undefined, {
        selectFromResult: ({ data }) => {
            return {
                statusOptions: data?.body?.appointmentStatuses ?? [],
            }
        },
    })

    const [updateScheduleByIdMutation, { isLoading, data }] =
        useUpdateAppointmentStatusMutation()

    const handlerUpdateAppointmentStatus = async (statusId: string) => {
        try {
            setLoadingId(statusId)
            await updateScheduleByIdMutation({
                appointmentId: payload.id,
                statusId: statusId,
            })
            onClose!()
            message.success('Cập nhật trạng thái thành công!')
        } catch (error) {
            setLoadingId(null)
            message.error('Cập nhật trạng thái thất bại')
        }
        refetch!()
    }

    return (
        <div className="flex w-48 flex-col gap-2 rounded-xl">
            {statusOptions.map((option: StatusOption) => (
                <Button
                    key={option.id}
                    onClick={() => handlerUpdateAppointmentStatus(option.id)}
                    className={`w-full border-none px-4 py-2 text-left font-bold transition-colors`}
                >
                    {option.statusName}
                </Button>
            ))}
        </div>
    )
}
