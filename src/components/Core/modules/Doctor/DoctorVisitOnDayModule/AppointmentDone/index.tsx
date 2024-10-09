'use client'

import { Button, Popover } from 'antd'
import { FilePlus2, Settings } from 'lucide-react'
import Image from 'next/image'
import ProfileBackground from '@public/landing/images/profile-background.png'
import { useTrigger } from '@/hooks/useTrigger'
import { AppointmentStatus, IAppointmentOnDay } from '../AppointmentPending'
import dayjs from 'dayjs'
import { cn } from '@/lib/utils'

interface IProps {
    payload: IAppointmentOnDay
    refetch: () => void
}

export default function AppointmentDone({ payload, refetch }: IProps) {
    const { handleTrigger, trigger, handleTriggerPayload } = useTrigger()

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
                            <Button className="rounded-[10px] border border-secondaryDarker bg-[#f7fafc] text-[#003553]">
                                Xem phiếu khám <FilePlus2 size={18} />
                            </Button>
                            <Button className="rounded-[10px] border-none bg-[#22C55E] text-white">
                                Khám xong
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
