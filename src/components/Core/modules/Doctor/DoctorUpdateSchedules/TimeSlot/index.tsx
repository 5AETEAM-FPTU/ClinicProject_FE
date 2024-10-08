import { Button, message, Popover, Space, TimePicker } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import {
    useGetScheduleByDateQuery,
    useRemoveScheduleByIdMutation,
    useUpdateScheduleByIdMutation,
} from '@/stores/services/schedule/scheduleSettings'
import dayjs from 'dayjs'
import AddingSchedulesForm from '../AddingSchedulesForm'
import { useTrigger } from '@/hooks/useTrigger'
import { cn } from '@/lib/utils'
import webStorageClient from '@/utils/webStorageClient'
import { jwtDecode } from 'jwt-decode'
import { JwtPayloadUpdated } from '../../../Auth/SignIn'
import useClickOutside from '@/hooks/useClickOutside'

export type TimeSlot = {
    startTime: string
    endTime: string
    isHadAppointment?: boolean
    slotId?: string
}

type TimeSlotSectionProps = {
    title: string
    slots: TimeSlot[]
    selectedSlot: TimeSlot | null
    onSelectSlot: (slot: TimeSlot) => void
    refetch: () => void
    date: Date | null
}

export const TimeSlotSection: React.FC<TimeSlotSectionProps> = ({
    title,
    slots,
    selectedSlot,
    onSelectSlot,
    refetch,
    date,
}) => {
    return (
        <motion.div className="mb-6">
            <h2 className="mb-3 text-xl font-bold">{title}</h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {slots.map((slot, index) => (
                    <PopoverOptionChange
                        refetch={refetch}
                        index={index}
                        onSelectSlot={onSelectSlot}
                        selectedSlot={selectedSlot}
                        slot={slot}
                        key={index}
                        date={date}
                    />
                ))}
            </div>
        </motion.div>
    )
}

export default function Component({
    handleClose,
    date,
}: {
    handleClose: () => void
    date: Date | null
}) {
    const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null)
    const [morningSlots, setMorningSlots] = useState<TimeSlot[]>([])
    const [afternoonSlots, setAfternoonSlots] = useState<TimeSlot[]>([])

    const _accessToken = webStorageClient.getToken()
    const userId = jwtDecode<JwtPayloadUpdated>(_accessToken!).sub

    const { result, isFetching, refetch } = useGetScheduleByDateQuery(
        {
            date: dayjs(date).format('YYYY-MM-DDTHH:mm:ss').toString(),
            doctorId: userId!,
        },
        {
            selectFromResult: ({ data, isFetching }) => {
                return {
                    result: data?.body.timeSlots ?? {},
                    isFetching: isFetching,
                }
            },
        },
    )
    useEffect(() => {
        refetch()
    }, [])

    useEffect(() => {
        if (result && result.length > 0) {
            const morning = result
                .filter((slot: TimeSlot) => dayjs(slot.startTime).hour() < 12)
                .sort((a: TimeSlot, b: TimeSlot) =>
                    dayjs(a.startTime).isBefore(dayjs(b.startTime)) ? -1 : 1,
                )

            const afternoon = result
                .filter((slot: TimeSlot) => dayjs(slot.startTime).hour() >= 12)
                .sort((a: TimeSlot, b: TimeSlot) =>
                    dayjs(a.startTime).isBefore(dayjs(b.startTime)) ? -1 : 1,
                )

            setMorningSlots(
                morning.map((slot: TimeSlot) => ({
                    startTime: dayjs(slot.startTime),
                    endTime: dayjs(slot.endTime),
                    isHadAppointment: slot.isHadAppointment,
                    slotId: slot.slotId,
                })),
            )

            setAfternoonSlots(
                afternoon.map((slot: TimeSlot) => ({
                    startTime: dayjs(slot.startTime),
                    endTime: dayjs(slot.endTime),
                    isHadAppointment: slot.isHadAppointment,
                })),
            )
        } else {
            setMorningSlots([])
            setAfternoonSlots([])
        }
    }, [result, date])

    const handleSelectSlot = (slot: TimeSlot) => {
        setSelectedSlot(slot)
    }

    return (
        <>
            <motion.div className="mx-auto mt-4 w-full p-4">
                <Button className="float-right" onClick={handleClose}>
                    Đóng
                </Button>
                <div>
                    {morningSlots.length > 0 && (
                        <TimeSlotSection
                            title="Buổi sáng"
                            slots={morningSlots}
                            selectedSlot={selectedSlot}
                            onSelectSlot={handleSelectSlot}
                            refetch={refetch}
                            date={date}
                        />
                    )}
                    {afternoonSlots.length > 0 && (
                        <TimeSlotSection
                            title="Buổi chiều"
                            slots={afternoonSlots}
                            selectedSlot={selectedSlot}
                            onSelectSlot={handleSelectSlot}
                            refetch={refetch}
                            date={date}
                        />
                    )}
                </div>
                {/* {selectedSlot && (
                    <p className="mt-4 text-center font-semibold">
                        Bạn đã chọn khung giờ:{' '}
                        {dayjs(selectedSlot.startTime).format('HH:mm')} -{' '}
                        {dayjs(selectedSlot.endTime).format('HH:mm')}
                    </p>
                )} */}
            </motion.div>
            <div className="px-4">
                <AddingSchedulesForm date={date} refetch={refetch} />
            </div>
        </>
    )
}

type TProps = {
    index: number
    slot: TimeSlot
    selectedSlot: TimeSlot | null
    onSelectSlot: (slot: TimeSlot) => void
    refetch: () => void
    date: Date | null
}

export function PopoverOptionChange({
    index,
    slot,
    selectedSlot,
    onSelectSlot,
    refetch,
    date,
}: TProps) {
    const { trigger, handleTrigger, handleTriggerPayload } = useTrigger()

    const [remvoeScheduleByIdMuation, { isLoading, data }] =
        useRemoveScheduleByIdMutation()
    const [isUpdate, setIsUpdate] = useState<boolean>(false)
    const [
        updateScheduleByIdMutation,
        { isLoading: isLoadingUpdate, data: dataUpdate },
    ] = useUpdateScheduleByIdMutation()

    const handleRemoveSlotById = async () => {
        try {
            await remvoeScheduleByIdMuation(slot.slotId!).unwrap()
            console.log(data)
            refetch()
            message.success('Xóa slot thành công!')
            handleTrigger()
        } catch (error) {
            if (error) {
                message.error('Xóa slot không thành công!')
            }
        }
    }
    const [timeSlotAdding, setTimeSlotAdding] = useState<TimeSlot[]>([])
    const handleChangingTimeSlot = (dates: any, dateStrings: any) => {
        if (dates) {
            setTimeSlotAdding([
                {
                    startTime: dateStrings[0],
                    endTime: dateStrings[1],
                },
            ])
        }
    }

    const handleUpdatingSlotTime = async () => {
        try {
            if (timeSlotAdding.length > 0) {
                await updateScheduleByIdMutation({
                    schedularId: slot.slotId!,
                    startDate:
                        dayjs(date).format('YYYY-MM-DDT') +
                        timeSlotAdding[0].startTime +
                        ':00',
                    endDate:
                        dayjs(date).format('YYYY-MM-DDT') +
                        timeSlotAdding[0].endTime +
                        ':00',
                })
                console.log(dataUpdate)
                refetch()
                message.success('Cập nhật thời gian slot thành công!')
                setIsUpdate(false)
                handleTriggerPayload(false);
            }
        } catch (error) {
            if (error) {
                message.error('Cập nhật thời gian slot thất bại!')
            }
        }
    }

    return (
        <Popover
            key={index}
            trigger={'click'}
            onOpenChange={() => {
                handleTrigger()
            }}
            open={trigger}
            content={
                isUpdate ? (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                            className="shadow-lg relative mt-2 h-36 w-full rounded"
                        >
                            <div className="ml-4 flex h-10 w-full items-center font-bold text-sky-800">
                                <span className="flex-1 text-start">
                                    Bắt đầu
                                </span>
                                <span className="flex-1 text-start">
                                    Kết thúc
                                </span>
                            </div>
                            <Space direction="vertical" className="p-1">
                                <TimePicker.RangePicker
                                    size="large"
                                    onCalendarChange={(dates, dateStrings) => {
                                        console.log('b', dates, dateStrings)
                                        handleChangingTimeSlot(
                                            dates,
                                            dateStrings,
                                        )
                                    }}
                                    format="HH:mm"
                                    defaultValue={[
                                        dayjs(slot.startTime, 'HH:mm'),
                                        dayjs(slot.endTime, 'HH:mm'),
                                    ]}
                                />
                            </Space>
                            <div className="m-2 flex gap-4">
                                <Button className="shadow flex flex-1 items-center justify-center rounded-lg border border-red-500 bg-white px-4 py-2 font-bold text-red-500 hover:bg-red-100">
                                    Hủy
                                </Button>
                                <Button
                                    loading={isLoading}
                                    onClick={() => handleUpdatingSlotTime()}
                                    className="shadow flex flex-1 items-center justify-center rounded-lg border border-secondaryDark bg-secondaryDark px-4 py-2 font-semibold text-white hover:bg-secondaryDark"
                                >
                                    Lưu
                                </Button>
                            </div>
                        </motion.div>
                    </>
                ) : (
                    <div className="flex flex-col gap-2">
                        <Button
                            type="primary"
                            onClick={() => setIsUpdate(true)}
                        >
                            Cập nhật
                        </Button>
                        <Button
                            loading={isLoading}
                            type="primary"
                            danger
                            onClick={() => handleRemoveSlotById()}
                        >
                            Xóa slot
                        </Button>
                    </div>
                )
            }
        >
            <Button
                disabled={slot?.isHadAppointment}
                key={index}
                className={cn(
                    `relative border px-2 py-4 text-center`,
                    `${
                        selectedSlot === slot
                            ? 'border-secondaryDark bg-secondaryDark text-white'
                            : 'border-blue-200 bg-white text-secondarySupperDarker hover:border-secondaryDark'
                    }`,
                    `${slot?.isHadAppointment ? '!cursor-not-allowed !opacity-50' : ''}`,
                )}
                onClick={() => {
                    handleTrigger()
                }}
            >
                {dayjs(slot.startTime).format('HH:mm')} -{' '}
                {dayjs(slot.endTime).format('HH:mm')}
            </Button>
        </Popover>
    )
}
