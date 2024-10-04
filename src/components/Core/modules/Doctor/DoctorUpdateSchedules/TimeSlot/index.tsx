import { Button, Popover } from 'antd'
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useGetScheduleByDateQuery } from '@/stores/services/schedule/scheduleSettings'
import dayjs from 'dayjs'
import AddingSchedulesForm from '../AddingSchedulesForm'
import { useTrigger } from '@/hooks/useTrigger'
import { cn } from '@/lib/utils'

export type TimeSlot = {
    startTime: string
    endTime: string
    isHadAppointment?: boolean
}

type TimeSlotSectionProps = {
    title: string
    slots: TimeSlot[]
    selectedSlot: TimeSlot | null
    onSelectSlot: (slot: TimeSlot) => void
}

export const TimeSlotSection: React.FC<TimeSlotSectionProps> = ({
    title,
    slots,
    selectedSlot,
    onSelectSlot,
}) => {
    return (
        <motion.div className="mb-6">
            <h2 className="mb-3 text-xl font-bold">{title}</h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {slots.map((slot, index) => (
                    <PopoverOptionChange
                        index={index}
                        onSelectSlot={onSelectSlot}
                        selectedSlot={selectedSlot}
                        slot={slot}
                        key={index}
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

    const { result, isFetching, refetch } = useGetScheduleByDateQuery(
        {date: dayjs(date).format('YYYY-MM-DDTHH:mm:ss').toString()},
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
            <motion.div
                className="mx-auto mt-4 w-full p-4"
            >
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
                        />
                    )}
                    {afternoonSlots.length > 0 && (
                        <TimeSlotSection
                            title="Buổi chiều"
                            slots={afternoonSlots}
                            selectedSlot={selectedSlot}
                            onSelectSlot={handleSelectSlot}
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
}

export function PopoverOptionChange({
    index,
    slot,
    selectedSlot,
    onSelectSlot,
}: TProps) {
    const { trigger, handleTrigger } = useTrigger()
    return (
        <Popover
            key={index}
            trigger={'click'}
            onOpenChange={handleTrigger}
            open={trigger}
            content={
                <div className="flex flex-col gap-2">
                    <Button type="primary">Cập nhật</Button>
                    <Button type="primary" danger>
                        Xóa slot
                    </Button>
                </div>
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
                onClick={() => onSelectSlot(slot)}
            >
                {dayjs(slot.startTime).format('HH:mm')} -{' '}
                {dayjs(slot.endTime).format('HH:mm')}
            </Button>
        </Popover>
    )
}
