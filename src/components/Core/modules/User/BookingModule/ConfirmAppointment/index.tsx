'use client'
import React, { useState, useRef } from 'react'
import { Button, Radio } from 'antd'
import { BadgeDollarSign, SquarePen } from 'lucide-react'
import Information from '@/components/Core/modules/Calendar/Information';
import { Editor } from '@tinymce/tinymce-react'
import EditorTinymce, { getEditorHtmlContent } from '../../../../common/EditorTinymce';
import { TimeSlot } from '@/components/Core/modules/Calendar/TimeSlot'
import { useRouter } from 'next-nprogress-bar';
import { useSearchParams } from 'next/navigation';

const formatSelectedSlot = (selectedSlot: TimeSlot) => {
    const startDate = new Date(selectedSlot.startTime);
    const endDate = new Date(selectedSlot.endTime);
    return `${startDate.getHours()}:${startDate.getMinutes().toString().length == 1 ? '0' + startDate.getMinutes().toString() : startDate.getMinutes()} - ${`${endDate.getHours()}:${endDate.getMinutes().toString().length == 1 ? '0' + endDate.getMinutes().toString() : endDate.getMinutes()}`} | Ngày ${startDate.getDate()} tháng ${startDate.getMonth() + 1} năm ${startDate.getFullYear()} `

}

export default function AppointmentConfirmation() {
    const router = useRouter();
    const params = useSearchParams();
    const [isFollowUpAppointment, setIsFollowUpAppointment] = useState(false);
    if (!params.get('doctorId')
        || !params.get('fullName')
        || !params.get('doctorId')
        || !params.get('specialties')
        || !params.get('specialties')
        || !params.get('selectedSlot')) {
        router.back();
    }
    const handlePayment = () => {
        const doctorId = params.get('doctorId');
        const selectedSlot = JSON.parse(params.get('selectedSlot') || '{}');
        if (!doctorId || !selectedSlot) return;
        const description = getEditorHtmlContent(editorRef);
        const isFollowUp = isFollowUpAppointment;
        console.log({ doctorId, selectedSlot, description, isFollowUp });
    }
    const timeSlotSelected: TimeSlot = JSON.parse(params.get('selectedSlot') || '{}');
    const editorRef = useRef(null);
    return (
        <div className='bg-gray-100 p-4'>
            <div className="flex flex-col xl:flex-row gap-4 min-h-fit container mx-auto">
                <div className="w-full h-fit xl:w-1/3 rounded-lg shadow bg-transparent">
                    <Information price={150000} fullName={params.get('fullName')} specialties={params.get('specialties')} />
                </div>
                <div className="w-full xl:w-2/3 bg-white rounded-lg shadow p-4 h-fit">
                    <h2 className="text-[20px] h-12 text-white text-xl font-bold text-center mb-4 bg-gradient-to-r from-[#54ADDA] from-0% to-[#0284C7] to-100% rounded-t-lg p-2">Thông tin ngày khám</h2>
                    <div className="p-4">
                        <div className="flex flex-col xl:flex-row items-center gap-4 sm:gap-[28px] w-full">
                            <p className="text-base text-secondarySupperDarker font-semibold text-center sm:text-left">
                                Bạn sẽ dự khám vào:
                            </p>
                            <div className='flex flex-col gap-[28px] xl:flex-row items-center justify-center'>
                                <span className="text-base font-semibold min-h-10 py-2 px-4 xl:px-5 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors w-full xl:w-auto">
                                    {formatSelectedSlot(timeSlotSelected)}
                                </span>
                                <Button onClick={() => router.back()} icon={<SquarePen />} className="text-base font-semibold bg-[#FF8058] min-h-10 py-2 px-4 xl:px-5 text-white rounded-md transition-colors w-full xl:w-auto">
                                    Thay đổi
                                </Button>
                            </div>

                        </div>

                        <div className="mt-4">
                            <p className='text-[20px] text-secondarySupperDarker font-semibold'>Mô tả thêm:</p>
                            <EditorTinymce editorRef={editorRef} initContent={null} />
                        </div>
                        <div className="mt-4 flex items-center">
                            <p className='text-base text-secondarySupperDarker font-semibold'>Tái khám:</p>
                            <Radio.Group onChange={(e) => setIsFollowUpAppointment(e.target.value)} className='ml-4' options={[{ label: "Có", value: true }, { label: "Không", value: false }]} defaultValue={isFollowUpAppointment} />
                        </div>
                    </div>
                </div>
            </div >
            <div className='flex justify-end'>
                <Button onClick={handlePayment} iconPosition={'end'} icon={<BadgeDollarSign height={18} />} className="h-[42px] bg-gradient-to-r from-[#22C55E] to-[#0284C7] mt-4 text-base font-semibold min-h-10 py-2 px-4 sm:px-5 text-white rounded-[12px] transition-colors w-full xl:w-auto">
                    Thanh toán phí khám bệnh
                </Button>
            </div>
        </div>
    )
}