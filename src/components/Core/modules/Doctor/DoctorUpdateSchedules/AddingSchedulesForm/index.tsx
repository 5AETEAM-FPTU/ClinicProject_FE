import React, { useEffect, useState } from 'react'
import { Clock, Plus, X } from 'lucide-react'
import { Button, Input, message, Popover, Space, TimePicker } from 'antd'
import { useCreateSchedulesMutation } from '@/stores/services/schedule/scheduleSettings'
import { TimeSlot, TimeSlotSection } from '../TimeSlot'
import dayjs, { Dayjs } from 'dayjs'
import { useTrigger } from '@/hooks/useTrigger'

export default function AddingSchedulesForm({ date, refetch }: { date: Date | null , refetch: () => void}) {
    const [timeSlotAdding, setTimeSlotAdding] = useState<TimeSlot[]>([])
    const { handleTrigger, trigger } = useTrigger()
    const [createSchedules, { isLoading }] = useCreateSchedulesMutation()
    const [isAddingSlotVisible, setIsAddingTimeVisible] = useState(false)
    const [isAddingQuicklyVisible, setIsAddingQuicklyVisible] = useState(false)
    const [timeSlot, setTimeSlot] = useState<TimeSlot>({
        startTime: dayjs().hour(7).minute(30).toString(),
        endTime: dayjs().hour(11).minute(30).toString(),
    })
    const [interval, setInterval] = useState(30)
    const [timeSlots, setTimeSlots] = useState<string[]>([])

    const handleClose = () => {
        setIsAddingTimeVisible(false)
        setIsAddingQuicklyVisible(false)
    }

    const handleAddingTimeOpen = () => {
        setIsAddingTimeVisible(true)
        setIsAddingQuicklyVisible(false)
    }

    const handleQuicklyAdding = () => {
        setIsAddingTimeVisible(false)
        setIsAddingQuicklyVisible(true)
    }

    const handleSubmit = async (data: TimeSlot[]) => {
        const timeSlots: TimeSlot[] = data.map((item: TimeSlot, index) => {
            return {
                ...item,
                startTime:
                    dayjs(date).format('YYYY-MM-DDT') + item.startTime + ':00',
                endTime:
                    dayjs(date).format('YYYY-MM-DDT') + item.endTime + ':00',
            }
        })

        var response = await createSchedules(timeSlots).unwrap()

        if (response.error) {
            message.error('Thêm ca khám that bai')
            return
        }
        message.success('Thêm ca khám thành công!')
        refetch()
        handleClose()
    }

    const handleChangingTimeSlot = (dates: any, dateStrings: any) => {
        if (dates) {
            setTimeSlotAdding([
                { startTime: dateStrings[0], endTime: dateStrings[1] },
            ])
        }
    }

    useEffect(() => {
        const slots = []
        let currentTime = dayjs(timeSlot.startTime)
        while (currentTime.isBefore(timeSlot.endTime)) {
            const slotEnd = currentTime.add(interval, 'minute')
            slots.push(
                `${currentTime.format('HH:mm')} - ${slotEnd.format('HH:mm')}`,
            )
            currentTime = slotEnd
        }
        setTimeSlots(slots)
        const timeSlots: TimeSlot[] = slots.map((timeString) => {
            const [startTime, endTime] = timeString.split(' - ')
            return { startTime, endTime }
        })

        if (timeSlots) {
            setTimeSlotAdding(timeSlots)
        }
    }, [timeSlot, interval])

    const handleTimeChange =
        (type: 'startTime' | 'endTime') => (time: Dayjs | null) => {
            if (time) {
                setTimeSlot((prev) => ({ ...prev, [type]: time }))
            }
        }

    return (
        <>
            <div className="flex gap-4">
                <button
                    onClick={handleAddingTimeOpen}
                    className="shadow flex items-center rounded border border-gray-400 bg-white px-4 py-2 font-semibold text-gray-800 hover:bg-gray-100"
                >
                    <Plus className="mr-2" />
                    Thêm khung giờ
                </button>

                <Popover
                    trigger={'click'}
                    open={trigger}
                    content={
                        <div className="shadow-lg mx-auto max-w-md rounded-xl bg-white p-6">
                            <h2 className="mb-6 text-2xl font-bold text-gray-800">
                                Time Slot Scheduler
                            </h2>
                            <div className="space-y-4">
                                <div className="flex items-center gap-1 justify-between">
                                    <div>
                                        <label className="mb-1 block text-sm font-medium text-gray-700">
                                            Bắt đầu
                                        </label>
                                        <TimePicker
                                            value={dayjs(timeSlot.startTime)}
                                            onChange={handleTimeChange(
                                                'startTime',
                                            )}
                                            format="HH:mm"
                                            className="border-cyan-500 hover:border-cyan-600 focus:border-cyan-600"
                                        />
                                    </div>
                                    <div>
                                        <label className="mb-1 block text-sm font-medium text-gray-700">
                                            Kết thúc
                                        </label>
                                        <TimePicker
                                            value={dayjs(timeSlot.endTime)}
                                            onChange={handleTimeChange(
                                                'endTime',
                                            )}
                                            format="HH:mm"
                                            className="border-cyan-500 hover:border-cyan-600 focus:border-cyan-600"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="mb-1 block text-sm font-medium text-gray-700">
                                        Khoảng giữa (phút)
                                    </label>
                                    <input
                                        type="number"
                                        value={interval}
                                        onChange={(e) => {
                                            if (Number(e.target.value) !== 0)
                                                setInterval(
                                                    Number(e.target.value),
                                                )
                                        }}
                                        className="w-full rounded-md border border-cyan-500 p-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                    />
                                </div>
                                <div>
                                    <h3 className="mb-2 text-lg font-semibold text-gray-800">
                                        Kết quả
                                    </h3>
                                    <div className="grid grid-cols-2 gap-2">
                                        {timeSlots.map((slot, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center justify-center rounded-md bg-cyan-100 p-2 text-cyan-800"
                                            >
                                                <Clock className="mr-2 h-4 w-4" />
                                                {slot}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="mt-4 flex justify-end space-x-2">
                                    <Button
                                        onClick={handleTrigger}
                                        className="border-cyan-500 bg-white text-cyan-600 hover:bg-cyan-50"
                                    >
                                        Hủy
                                    </Button>
                                    <Button
                                        type="primary"
                                        loading={isLoading}
                                        onClick={() =>
                                            handleSubmit(timeSlotAdding)
                                        }
                                        className="border-none bg-cyan-500 hover:bg-cyan-600"
                                    >
                                        Tạo
                                    </Button>
                                </div>
                            </div>
                        </div>
                    }
                    onOpenChange={handleTrigger}
                >
                    {' '}
                    <button
                        onClick={handleQuicklyAdding}
                        className="shadow flex items-center rounded border border-gray-400 bg-white px-4 py-2 font-semibold text-gray-800 hover:bg-gray-100"
                    >
                        <Plus className="mr-2" />
                        Tạo nhanh
                    </button>
                </Popover>
            </div>

            {isAddingSlotVisible && (
                <div className="shadow-lg relative mt-2 h-36 w-1/4 rounded bg-slate-50">
                    <button
                        className="hover:text-red-300-800 absolute right-2 top-2 text-red-500"
                        onClick={handleClose}
                    >
                        <X color="gray" />
                    </button>
                    <div className="ml-4 flex h-10 w-full items-center font-bold text-sky-800">
                        <span className="flex-1 text-start">Bắt đầu</span>
                        <span className="flex-1 text-start">Kết thúc</span>
                    </div>
                    <Space direction="vertical" className="p-1">
                        <TimePicker.RangePicker
                            size="large"
                            onCalendarChange={(dates, dateStrings) => {
                                console.log('b', dates, dateStrings)
                                handleChangingTimeSlot(dates, dateStrings)
                            }}
                            format="HH:mm"
                        />
                    </Space>
                    <div className="m-2 flex gap-4">
                        <Button className="shadow flex flex-1 items-center justify-center rounded border border-red-500 bg-white px-4 py-2 font-bold text-red-500 hover:bg-red-100">
                            Xóa
                        </Button>
                        <Button
                            loading={isLoading}
                            onClick={() => handleSubmit(timeSlotAdding)}
                            className="shadow flex flex-1 items-center justify-center rounded border border-blue-500 bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600"
                        >
                            Lưu
                        </Button>
                    </div>
                </div>
            )}
        </>
    )
}
