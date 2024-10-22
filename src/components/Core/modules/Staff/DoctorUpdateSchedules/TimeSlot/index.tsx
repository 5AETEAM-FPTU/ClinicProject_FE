import { Button, message, Modal, Popover, Space, TimePicker } from 'antd'
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
    doctorId: string
}

export const TimeSlotSection: React.FC<TimeSlotSectionProps> = ({
    title,
    slots,
    selectedSlot,
    onSelectSlot,
    refetch,
    date,
    doctorId
}) => {
    return (
        <motion.div className="mb-6">
            <h2 className="mb-3 text-xl font-bold">{title}</h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {slots.map((slot, index) => (
                    <PopoverOptionChange
                        doctorId={doctorId}
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
    doctorId,
}: {
    handleClose: () => void
    date: Date | null,
    doctorId: string
}) {
    const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null)
    const [morningSlots, setMorningSlots] = useState<TimeSlot[]>([])
    const [afternoonSlots, setAfternoonSlots] = useState<TimeSlot[]>([])

    const _accessToken = webStorageClient.getToken()

    const { result, isFetching, refetch } = useGetScheduleByDateQuery(
        {
            date: dayjs(date).format('YYYY-MM-DDTHH:mm:ss').toString(),
            doctorId: doctorId,
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
                    slotId: slot.slotId,
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
                            doctorId={doctorId}
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
                            doctorId={doctorId}
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
                <AddingSchedulesForm doctorId={doctorId} date={date} refetch={refetch} />
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
    doctorId: string
}

export function PopoverOptionChange({
    index,
    slot,
    selectedSlot,
    onSelectSlot,
    refetch,
    date,
    doctorId
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
                    doctorId: doctorId,
                    schedularId: slot.slotId!,
                    startDate:
                        dayjs(date).format('YYYY-MM-DDT') +
                        timeSlotAdding[0].startTime +
                        ':00',
                    endDate:
                        dayjs(date).format('YYYY-MM-DDT') +
                        timeSlotAdding[0].endTime +
                        ':00',
                }).unwrap()
                console.log(dataUpdate)
                refetch()
                message.success('Cập nhật thời gian slot thành công!')
                setIsUpdate(false)
                handleTriggerPayload(false)
            }
        } catch (error) {
            if (error) {
                message.error('Cập nhật thời gian slot thất bại!')
            }
        }
    }

    return (
        <>
            <Popover
                key={index}
                trigger={'click'}
                open={trigger}
                onOpenChange={(open) => {
                    if (isUpdate) return
                    handleTriggerPayload(open)
                }}
                content={
                    <div className="flex flex-col gap-2">
                        <Button
                            type="primary"
                            onClick={() => {
                                setIsUpdate(true)
                                handleTriggerPayload(false)
                            }}
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
                }
            >
                <Button
                    disabled={slot?.isHadAppointment}
                    key={index}
                    className={cn(
                        `relative border px-2 py-4 text-center`,
                        `${selectedSlot === slot
                            ? 'border-secondaryDark bg-secondaryDark text-white'
                            : 'border-blue-200 bg-white text-secondarySupperDarker hover:border-secondaryDark'
                        }`,
                        `${slot?.isHadAppointment ? '!cursor-not-allowed !opacity-50' : ''}`,
                    )}
                    onClick={() => {
                        if (isUpdate) return
                        handleTriggerPayload(true)
                    }}
                >
                    {dayjs(slot.startTime).format('HH:mm')} -{' '}
                    {dayjs(slot.endTime).format('HH:mm')}
                    <Modal
                        title="Thay đổi khung giờ"
                        open={isUpdate}
                        onClose={() => {
                            setIsUpdate(false)
                            handleTriggerPayload(false)
                        }}
                        onOk={() => handleUpdatingSlotTime()}
                        onCancel={() => {
                            setIsUpdate(false)
                            handleTriggerPayload(false)
                        }}
                    >
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                            className="shadow-lg relative mt-2 w-full rounded"
                        >
                            <div className="ml-4 flex h-10 w-full items-center font-bold text-sky-800">
                                <span className="flex-1 text-start">
                                    Bắt đầu
                                </span>
                                <span className="flex-1 text-start">
                                    Kết thúc
                                </span>
                            </div>
                            <Space direction="vertical" className="p-1 !w-full">
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
                                    className="!w-full"
                                />
                            </Space>
                        </motion.div>
                    </Modal>
                </Button>
            </Popover>
        </>
    )
}
