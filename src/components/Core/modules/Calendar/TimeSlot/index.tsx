import { Button } from 'antd'
import React, { useState } from 'react'
import { motion } from 'framer-motion'

type TimeSlot = {
    start: string
    end: string
}

type TimeSlotSectionProps = {
    title: string
    slots: TimeSlot[]
    selectedSlot: TimeSlot | null
    onSelectSlot: (slot: TimeSlot) => void
}

const TimeSlotSection: React.FC<TimeSlotSectionProps> = ({ title, slots, selectedSlot, onSelectSlot }) => (
    <motion.div
        initial={{
            y: 30,
            opacity: 0,
        }}
        whileInView={{
            y: 0,
            opacity: 1,
        }}
        transition={{
            type: 'spring',
            duration: 0.4,
        }}
        viewport={{
            once: true,
        }}
        className="mb-6">
        <h2 className="text-xl font-bold mb-3">{title}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {slots.map((slot, index) => (
                <button
                    key={index}
                    className={`py-2 px-4 border rounded-md text-center ${selectedSlot === slot
                        ? 'bg-blue-500 text-white border-blue-500'
                        : 'bg-white text-black border-blue-200 hover:border-blue-500'
                        }`}
                    onClick={() => onSelectSlot(slot)}
                >
                    {slot.start} - {slot.end}
                </button>
            ))}
        </div>
    </motion.div>
)

export default function Component({ handleClose }: { handleClose: () => void }) {
    const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null)

    const morningSlots: TimeSlot[] = [
        { start: '07:00', end: '08:00' },
        { start: '08:00', end: '09:00' },
        { start: '09:00', end: '10:00' },
        { start: '10:00', end: '11:00' },
        { start: '11:00', end: '12:00' },
    ]

    const afternoonSlots: TimeSlot[] = [
        { start: '13:00', end: '14:00' },
        { start: '14:00', end: '15:00' },
        { start: '15:00', end: '16:00' },
    ]

    const handleSelectSlot = (slot: TimeSlot) => {
        setSelectedSlot(slot)
    }

    return (
        <div className="p-4 w-full mx-auto">
            <Button className="float-right" onClick={handleClose}>Đóng</Button>
            <TimeSlotSection
                title="Buổi sáng"
                slots={morningSlots}
                selectedSlot={selectedSlot}
                onSelectSlot={handleSelectSlot}
            />
            <TimeSlotSection
                title="Buổi chiều"
                slots={afternoonSlots}
                selectedSlot={selectedSlot}
                onSelectSlot={handleSelectSlot}
            />
            {selectedSlot && (
                <p className="mt-4 text-center font-semibold">
                    Bạn đã chọn khung giờ: {selectedSlot.start} - {selectedSlot.end}
                </p>
            )}
        </div>
    )
}