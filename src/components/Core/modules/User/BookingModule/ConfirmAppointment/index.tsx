'use client'
import React, { useState, useRef, useEffect } from 'react'
import { Button, Radio, message } from 'antd'
import { BadgeDollarSign, SquarePen } from 'lucide-react'
import Information from '@/components/Core/modules/Calendar/Information'
import { Editor } from '@tinymce/tinymce-react'
import EditorTinymce, {
    getEditorHtmlContent,
} from '../../../../common/EditorTinymce'
import { TimeSlot } from '@/components/Core/modules/Calendar/TimeSlot'
import { useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation'
import { useGetVnPayUrlMutation } from '@/stores/services/vnpay/vnpaySettings'

const formatSelectedSlot = (selectedSlot: TimeSlot) => {
    const startDate = new Date(selectedSlot.startTime)
    const endDate = new Date(selectedSlot.endTime)
    return `${startDate.getHours()}:${startDate.getMinutes().toString().length == 1 ? '0' + startDate.getMinutes().toString() : startDate.getMinutes()} - ${`${endDate.getHours()}:${endDate.getMinutes().toString().length == 1 ? '0' + endDate.getMinutes().toString() : endDate.getMinutes()}`} | Ngày ${startDate.getDate()} tháng ${startDate.getMonth() + 1} năm ${startDate.getFullYear()} `
}

export default function AppointmentConfirmation() {
    const router = useRouter()
    const params = useSearchParams()
    const [createVnPayUrl] = useGetVnPayUrlMutation()
    const [isFollowUpAppointment, setIsFollowUpAppointment] = useState(false)
    if (
        !params.get('doctorId') ||
        !params.get('fullName') ||
        !params.get('doctorId') ||
        !params.get('specialties') ||
        !params.get('specialties') ||
        !params.get('selectedSlot')
    ) {
        router.back()
    }

    const handlePayment = async () => {
        const doctorId = params.get('doctorId')
        const selectedSlot = JSON.parse(params.get('selectedSlot') || '{}')
        if (!doctorId || !selectedSlot) return
        const description = getEditorHtmlContent(editorRef)
        const isFollowUp = isFollowUpAppointment
        console.log({ doctorId, selectedSlot, description, isFollowUp })

        // get link
        try {
            //tao appointmet ->

            //
            const data = await createVnPayUrl({
                description: "thanh",
                amount: 150000,
                slotId: selectedSlot.slotId,
            }).unwrap()

            if (data) {
                const vnPayUrl = data?.body?.paymentUrl
                router.replace(vnPayUrl)
            }
        } catch (error) {
            console.log(error)
        }
    }

    // useEffect(() => {
    //     if (vnpayUrl) {
    //         router.replace(vnpayUrl.paymentUrl)
    //     }
    // }, [vnpayUrl, router])

    const timeSlotSelected: TimeSlot = JSON.parse(
        params.get('selectedSlot') || '{}',
    )
    const editorRef = useRef(null)
    return (
        <div className="bg-gray-100 p-4">
            <div className="container mx-auto flex min-h-fit flex-col gap-4 xl:flex-row">
                <div className="shadow h-fit w-full rounded-lg bg-transparent xl:w-1/3">
                    <Information
                        price={150000}
                        fullName={params.get('fullName')}
                        specialties={params.get('specialties')}
                    />
                </div>
                <div className="shadow h-fit w-full rounded-lg bg-white p-4 xl:w-2/3">
                    <h2 className="mb-4 h-12 rounded-t-lg bg-gradient-to-r from-[#54ADDA] from-0% to-[#0284C7] to-100% p-2 text-center text-[20px] text-xl font-bold text-white">
                        Thông tin ngày khám
                    </h2>
                    <div className="p-4">
                        <div className="flex w-full flex-col items-center gap-4 sm:gap-[28px] xl:flex-row">
                            <p className="text-center text-base font-semibold text-secondarySupperDarker sm:text-left">
                                Bạn sẽ dự khám vào:
                            </p>
                            <div className="flex flex-col items-center justify-center gap-[28px] xl:flex-row">
                                <span className="min-h-10 w-full rounded-md bg-blue-500 px-4 py-2 text-base font-semibold text-white transition-colors hover:bg-blue-600 xl:w-auto xl:px-5">
                                    {formatSelectedSlot(timeSlotSelected)}
                                </span>
                                <Button
                                    onClick={() => router.back()}
                                    icon={<SquarePen />}
                                    className="min-h-10 w-full rounded-md bg-[#FF8058] px-4 py-2 text-base font-semibold text-white transition-colors xl:w-auto xl:px-5"
                                >
                                    Thay đổi
                                </Button>
                            </div>
                        </div>

                        <div className="mt-4">
                            <p className="text-[20px] font-semibold text-secondarySupperDarker">
                                Mô tả thêm:
                            </p>
                            <EditorTinymce
                                editorRef={editorRef}
                                initContent={null}
                            />
                        </div>
                        <div className="mt-4 flex items-center">
                            <p className="text-base font-semibold text-secondarySupperDarker">
                                Tái khám:
                            </p>
                            <Radio.Group
                                onChange={(e) =>
                                    setIsFollowUpAppointment(e.target.value)
                                }
                                className="ml-4"
                                options={[
                                    { label: 'Có', value: true },
                                    { label: 'Không', value: false },
                                ]}
                                defaultValue={isFollowUpAppointment}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-end">
                <Button
                    onClick={handlePayment}
                    iconPosition={'end'}
                    icon={<BadgeDollarSign height={18} />}
                    className="mt-4 h-[42px] min-h-10 w-full rounded-[12px] bg-gradient-to-r from-[#22C55E] to-[#0284C7] px-4 py-2 text-base font-semibold text-white transition-colors sm:px-5 xl:w-auto"
                >
                    Thanh toán phí khám bệnh
                </Button>
            </div>
        </div>
    )
}
