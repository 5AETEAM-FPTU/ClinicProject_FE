'use client'

import { Button, message, Popover } from 'antd'
import { FilePlus2, Settings, View } from 'lucide-react'
import Image from 'next/image'
import ProfileBackground from '@public/landing/images/profile-background.png'
import { useTrigger } from '@/hooks/useTrigger'
import dayjs from 'dayjs'
import { cn } from '@/lib/utils'
import { useRouter } from 'next-nprogress-bar'
import { usePathname, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { useGetAllAppointmentStatusQuery } from '@/stores/services/enum/enum'
import { useUpdateAppointmentStatusMutation } from '@/stores/services/appointment'

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

export interface IAppointmentOnDay {
    id: string
    description: string
    patient: Patient
    schedule: Schedule
    appointmentStatus: AppointmentStatus
    isHadMedicalReport: boolean
}

interface IProps {
    payload: IAppointmentOnDay
    refetch: () => void
}

export default function AppointmentPending({ payload, refetch }: IProps) {
    const { handleTrigger, trigger, handleTriggerPayload } = useTrigger()
    const router = useRouter()
    const pathname = usePathname()

    const handleCreateMedicalReport = () => {
        router.push(pathname + '/medical-report' + `?id=${payload.id}`)
    }

    return (
        <>
            <div className="flex h-fit flex-col gap-2 rounded-xl bg-white p-[16px] shadow-third sm:gap-0">
                <div className="w-full">
                    <div className="flex flex-col justify-between gap-2 sm:flex-row sm:gap-0">
                        <span className="font-semibold text-[#003553]">
                            {dayjs(payload.schedule.startDate).format('HH:mm') +
                                ' - ' +
                                dayjs(payload.schedule.endDate).format('HH:mm')}
                        </span>
                        <div className="flex justify-end gap-[10px]">
                            {payload.isHadMedicalReport ? (
                                <Button
                                    className="rounded-[10px] border-secondaryDark border-2 
                                    bg-white text-secondarySupperDarker"
                                    onClick={() => {
                                        handleCreateMedicalReport()
                                    }}
                                >
                                    Xem phiếu khám <View size={18} />
                                </Button>
                            ) : (
                                <Button
                                    className="rounded-[10px] border-none bg-[#0284C7] text-white"
                                    onClick={() => {
                                        handleCreateMedicalReport()
                                    }}
                                >
                                    Tạo phiếu khám <FilePlus2 size={18} />
                                </Button>
                            )}

                            <div className="flex flex-row gap-[10px] sm:flex">
                                <Button className="rounded-[10px] border-none bg-[#0284C7] text-white">
                                    {payload.appointmentStatus.statusName ??
                                        'Không xác định'}
                                </Button>
                                <Popover
                                    trigger={'click'}
                                    open={trigger}
                                    content={
                                        <AppointmentStatus
                                            onClose={() =>
                                                handleTriggerPayload(false)
                                            }
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
                </div>

                <div className="flex h-20 gap-5">
                    <div className="h-[80px] w-[80px] items-center">
                        <Image
                            className="h-full w-full rounded-xl object-cover"
                            src={payload.patient.avatar}
                            alt="background"
                            width={400}
                            height={400}
                        />
                    </div>

                    <div className="flex flex-col">
                        <div className="text-base font-semibold text-[#003553]">
                            {payload.patient.fullName ?? 'Không xác định'}
                        </div>
                        <div className="my-1 font-semibold text-[#003553] text-opacity-90">
                            Số điện thoại:{' '}
                            <span className="font-medium opacity-90">
                                {payload.patient.phoneNumber ??
                                    'Không xác định'}
                            </span>
                        </div>
                        <div className="flex font-semibold text-[#003553] text-opacity-90">
                            <p className="mr-6">
                                Giới tính:{' '}
                                <span className="font-medium opacity-90">
                                    {payload.patient.gender.name ??
                                        'Không xác định'}
                                </span>
                            </p>
                            <p>
                                Tuổi:{' '}
                                <span className="font-medium opacity-90">
                                    {dayjs().diff(
                                        dayjs(payload.patient.dob),
                                        'year',
                                    ) ?? 'Không xác định'}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="mt-4">
                    <p className="h-[45px] text-[#003553]">
                        <span className="w-[50px] font-semibold text-[#003553]">
                            Mô tả:{' '}
                        </span>
                        {payload.description ?? 'Không xác định'}
                    </p>
                </div>
            </div>
        </>
    )
}

export interface StatusOption {
    id: string
    statusName: string
    constant: string
}
type TProps = {
    refetch?: () => void
    payload: IAppointmentOnDay
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
            onClose?.()
            message.success('Cập nhật trạng thái thành công!')
        } catch (error) {
            setLoadingId(null)
            message.error('Cập nhật trạng thái thất bại')
        }
        refetch?.()
    }

    return (
        <div className="flex w-48 flex-col gap-2 rounded-xl">
            {statusOptions.map((option: StatusOption) => (
                <Button
                    loading={loadingId === option.id}
                    key={option.id}
                    onClick={() => handlerUpdateAppointmentStatus(option.id)}
                    className={cn(
                        `w-full border-none px-4 py-2 text-left font-bold transition-colors`,
                    )}
                >
                    {option.statusName}
                </Button>
            ))}
        </div>
    )
}
