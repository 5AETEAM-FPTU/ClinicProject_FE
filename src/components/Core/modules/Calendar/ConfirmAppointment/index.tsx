'use client'
import React, { useState, useRef } from 'react'
import { Button } from 'antd'
import { BadgeDollarSign, SquarePen } from 'lucide-react'
import Information from '@/components/Core/modules/Calendar/Information';
import { Editor } from '@tinymce/tinymce-react'
import EditorTinymce, { getEditorHtmlContent } from '../../../common/EditorTinymce';
import { TimeSlot } from '@/components/Core/modules/Calendar'

export default function Component({ timeSlotSelected }: { timeSlotSelected: TimeSlot }) {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null) // September 17, 2024
    const editorRef = useRef(null);
    const content: string = getEditorHtmlContent(editorRef);
    return (
        <div className="flex flex-col md:flex-row gap-4 p-4 bg-gray-100 min-h-screen container mx-auto">
            <div className="w-full h-fit md:w-1/3 rounded-lg shadow bg-transparent">
                <Information selectedDate={selectedDate} />
                <Button iconPosition={'end'} icon={<BadgeDollarSign height={18} />} className="h-[42px] bg-gradient-to-r from-[#22C55E] to-[#0284C7] mt-4 text-base font-semibold min-h-10 py-2 px-4 sm:px-5 text-white rounded-[12px] transition-colors w-full sm:w-auto">
                    Thanh toán phí khám bệnh
                </Button>
            </div>
            <div className="w-full md:w-2/3 bg-white rounded-lg shadow p-4 h-fit">
                <h2 className="text-[20px] h-12 text-white text-xl font-bold text-center mb-4 bg-gradient-to-r from-[#54ADDA] from-0% to-[#0284C7] to-100% rounded-t-lg p-2">Thông tin ngày khám</h2>
                <div className="p-4">
                    <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-[28px] w-full">
                        <p className="text-base text-secondarySupperDarker font-semibold text-center sm:text-left">
                            Bạn sẽ dự khám vào:
                        </p>
                        <div className='flex items-center flex-col gap-[28px] sm:flex-row items-center justify-center'>
                            <span className="text-base font-semibold min-h-10 py-2 px-4 sm:px-5 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors w-full sm:w-auto">
                                {`${timeSlotSelected.startDate.getHours()}:${timeSlotSelected.startDate.getMinutes().toString().length == 1 ? '0' + timeSlotSelected.startDate.getMinutes().toString() : timeSlotSelected.startDate.getMinutes()}`} - {`${timeSlotSelected.endDate.getHours()}:${timeSlotSelected.endDate.getMinutes().toString().length == 1 ? '0' + timeSlotSelected.startDate.getMinutes().toString() : timeSlotSelected.startDate.getMinutes()}`} | Ngày {timeSlotSelected.startDate.getDate()} tháng {timeSlotSelected.startDate.getMonth() + 1} năm {timeSlotSelected.startDate.getFullYear()}
                            </span>
                            <Button icon={<SquarePen />} className="text-base font-semibold bg-[#FF8058] min-h-10 py-2 px-4 sm:px-5 text-white rounded-md transition-colors w-full sm:w-auto">
                                Thay đổi
                            </Button>
                        </div>

                    </div>

                    <div className="mt-4">
                        <p className='text-[20px] text-secondarySupperDarker font-semibold'>Mô tả thêm:</p>
                        <EditorTinymce editorRef={editorRef} initContent={null} />
                    </div>
                </div>
            </div>
        </div>
    )
}