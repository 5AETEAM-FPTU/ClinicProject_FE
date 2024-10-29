'use client'
import Information from '@/components/Core/modules/Calendar/Information'
import { TimeSlot } from '@/components/Core/modules/Calendar/TimeSlot'
import useEditor from '@/hooks/useEditor'
import { constants } from '@/settings'
import { useCreateAnAppointmentMutation } from '@/stores/services/user/userAppointments'
import { useGetVnPayUrlMutation } from '@/stores/services/vnpay/vnpaySettings'
import webStorageClient from '@/utils/webStorageClient'
import { Button, Radio, message } from 'antd'
import { motion } from 'framer-motion'
import { BadgeDollarSign, SquarePen } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

const formatSelectedSlot = (selectedSlot: TimeSlot) => {
    const startDate = new Date(selectedSlot.startTime)
    const endDate = new Date(selectedSlot.endTime)
    return `${startDate.getHours()}:${startDate.getMinutes().toString().length == 1 ? '0' + startDate.getMinutes().toString() : startDate.getMinutes()} - ${`${endDate.getHours()}:${endDate.getMinutes().toString().length == 1 ? '0' + endDate.getMinutes().toString() : endDate.getMinutes()}`} | Ngày ${startDate.getDate()} tháng ${startDate.getMonth() + 1} năm ${startDate.getFullYear()} `
}

export default function AppointmentConfirmation() {
    const router = useRouter()
    const params = useSearchParams()
    const [createVnPayUrl] = useGetVnPayUrlMutation()
    const [createAnAppointment] = useCreateAnAppointmentMutation()
    const [isFollowUpAppointment, setIsFollowUpAppointment] = useState(false)
    const [loading, setLoading] = useState(false)
    const [isClient, setIsClient] = useState<boolean>(false);
    useEffect(() => {
        setIsClient(true);
    }, [])
    const handleBack = () => {
        const currentParams = new URLSearchParams(window.location.search)
        router.push(
            `/user/treatment-calendar/booking/schedule?${currentParams.toString()}`,
        )
    }
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

    // in cookie
    const vnPayUrl = webStorageClient.get(constants.VNPAY_PAYMENT_URL)
    if (vnPayUrl) {
        router.replace(vnPayUrl)
    }

    const createAppointment = async ({
        doctorId,
        selectedSlotId,
        description,
        isFollowUp,
    }: {
        doctorId: string
        selectedSlotId: string
        description: string
        isFollowUp: boolean
    }) => {
        if (!doctorId || !selectedSlotId) return

        console.log({ doctorId, selectedSlotId, description, isFollowUp })

        const appointmentResponse = await createAnAppointment({
            scheduleId: selectedSlotId,
            description,
            reExamination: isFollowUp,
        }).unwrap()
        return appointmentResponse.body.appointment
    }
    const { content, getRawContentFromEditor, TinyMCEComponent } = useEditor("");

    const handlePayment = async () => {
        if (vnPayUrl) return
        const doctorId = params.get('doctorId')
        const selectedSlot = JSON.parse(params.get('selectedSlot') || '{}')
        if (!doctorId || !selectedSlot) return
        const description = getRawContentFromEditor()
        const isFollowUp = isFollowUpAppointment
        console.log({ doctorId, selectedSlot, description, isFollowUp })

        // get link
        try {
            setLoading(true)
            //tao appointmet ->
            const appointment = await createAppointment({
                doctorId,
                selectedSlotId: selectedSlot.slotId,
                description,
                isFollowUp,
            })
            const data = await createVnPayUrl({
                description: 'thanh toan',
                amount: 150000,
                appointmentId: appointment.id,
            }).unwrap()

            webStorageClient.set(constants.BOOKED_ID, doctorId)

            if (data) {
                const vnPayUrl = data?.body?.paymentUrl
                webStorageClient.set(
                    constants.VNPAY_PAYMENT_URL,
                    data?.body?.paymentUrl,
                    { expires: new Date(Date.now() + 1000 * 60 * 1) },
                )
                router.replace(vnPayUrl)
            }
        } catch (error) {
            message.error('Có lỗi xảy ra, vui lòng thử lại sau')
        } finally {
            setLoading(false)
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
        <motion.div
            initial={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            exit={{ opacity: 0 }}
            className=""
        >
            <div className="mx-auto flex min-h-fit flex-col gap-4 xl:flex-row">
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
                                <span className="min-h-10 w-full rounded-md bg-secondaryDark px-4 py-2 text-base font-semibold text-white transition-colors hover:bg-secondaryDarker xl:w-auto xl:px-5">
                                    {formatSelectedSlot(timeSlotSelected)}
                                </span>
                                <Button
                                    type="primary"
                                    onClick={handleBack}
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
                            {TinyMCEComponent}
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
                    loading={loading}
                    onClick={handlePayment}
                    iconPosition={'end'}
                    icon={<BadgeDollarSign height={18} />}
                    className="mt-4 h-[42px] min-h-10 w-full rounded-[12px] bg-gradient-to-r from-[#22C55E] to-[#0284C7] px-4 py-2 text-base font-semibold text-white transition-colors sm:px-5 xl:w-auto"
                >
                    Thanh toán phí khám bệnh
                </Button>
            </div>
        </motion.div>
    )
}
