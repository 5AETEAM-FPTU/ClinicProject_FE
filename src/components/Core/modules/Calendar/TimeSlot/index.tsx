import { Button } from 'antd'
import React, { useState } from 'react'
import { motion } from 'framer-motion'

type TimeSlot = {
    start: string
    end: string
    isDisabled?: boolean
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
                <Button
                    disabled={slot.isDisabled}
                    type='text'
                    key={index}
                    className={`py-2 px-2 border text-base text-center 
                        ${selectedSlot?.start === slot.start && selectedSlot?.end === slot.end
                            ? 'bg-[#0284C7] text-white'
                            : 'bg-white text-black border-[#06B6D4] hover:border-[#0284C7]'
                        } 
                        ${slot.isDisabled ? 'cursor-not-allowed bg-[#E8E8E8] opacity-40' : ''}`}
                    onClick={() => onSelectSlot(slot)}
                >
                    {slot.start} - {slot.end}
                </Button>
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
        <div className="p-4 w-full mx-auto mt-4">
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