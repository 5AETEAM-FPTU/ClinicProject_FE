'use client'
import { Button, Form, Layout, message, Modal, Skeleton } from 'antd'
import { motion } from 'framer-motion'
import Image from 'next/image'
import './style.css'
import {
    ChevronRight,
    ChevronsRight,
    MoveLeft,
    Printer,
    SendHorizontal,
    Star,
    View,
} from 'lucide-react'
import { useRef, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import {
    useGetMedicalReportByIdQuery,
    useGetMedicalReportDetailByIdQuery,
} from '@/stores/services/report/medicalReport'
import dayjs from 'dayjs'
import EditorTinymce, {
    getEditorHtmlContent,
} from '@/components/Core/common/EditorTinymce'
import { useCreateFeedbackMutation } from '@/stores/services/user/userAppointments'
import NotFound from '@/components/Core/common/NotFound'
import ViewFeedback from '../ViewFeedback'
import { useRouter } from 'next-nprogress-bar'

interface DoctorSpecialty {
    specialtyId: string
    specialtyName: string
    specialtyConstant: string
}

interface DoctorPosition {
    positionId: string
    positionName: string
    positionConstant: string
}

interface DoctorInfo {
    doctorId: string
    doctorName: string
    doctorAvatar: string
    doctorSpecialties: DoctorSpecialty[]
    doctorPosition: DoctorPosition
}

interface PatientInfo {
    patientId: string
    patientName: string
    dob: string
    address: string
    phoneNumber: string
    patientAvatar: string
    patientGender: string
}

interface ReportDetail {
    reportId: string
    appointmentId: string
    date: string
    medicalHistory: string
    generalCondition: string
    height: string
    weight: string
    pulse: string
    temperature: string
    bloodPressure: string
    diagnosis: string
    serviceOrderId: string
    medicineOrderId: string
    hasFeedback: boolean
}

export default function DetailTreatmentHistory() {
    const router = useRouter()
    const [myForm] = Form.useForm()
    const editorRef = useRef<HTMLDivElement>(null)
    const searchParams = useSearchParams()
    const reportId = searchParams.get('reportId')
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [isModalOpenView, setIsModalOpenView] = useState<boolean>(false)
    const [hoveredStar, setHoveredStar] = useState<number>(0)
    const [selectedStar, setSelectedStar] = useState<number>(0)
    const [createFeedbackFunc, { isLoading }] = useCreateFeedbackMutation()

    const handleStarHover = (starIndex: number) => {
        setHoveredStar(starIndex)
    }

    const handleStarClick = (starIndex: number) => {
        setSelectedStar(starIndex)
    }

    const handleMouseLeave = () => {
        setHoveredStar(0)
    }
    const { detail, patientInfor, doctorInfor, refetch, isFetching } =
        useGetMedicalReportDetailByIdQuery(reportId!, {
            selectFromResult: ({ data, isFetching }) => ({
                detail: (data?.body?.detail as ReportDetail) ?? {},
                patientInfor: (data?.body?.patientInfor as PatientInfo) ?? {},
                doctorInfor: (data?.body?.doctorInfor as DoctorInfo) ?? {},
                isFetching: isFetching,
            }),
        })

    const handleSendFeedback = () => {
        const editorContent = getEditorHtmlContent(editorRef)
        createFeedbackFunc({
            comment: editorContent,
            vote: selectedStar,
            appointmentId: detail.appointmentId,
        })
            .then(() => {
                refetch()
                setIsModalOpen(false)
                message.success('Cảm ơn quý khách đã phản hồi')
            })
            .catch(() => {
                message.error('Phản hồi thất bại!')
            })
    }

    return (
        <>
            {!reportId! ? (
                <NotFound />
            ) : (
                <motion.div
                    initial={{ opacity: 0, translateY: 20 }}
                    animate={{ opacity: 1, translateY: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    exit={{ opacity: 0 }}
                >
                    <div className="flex select-none justify-between pb-4">
                        <h3 className="text-[20px] font-bold text-[#003553]">
                            Lịch sử khám của bạn
                        </h3>
                        <Button
                            type="default"
                            className="border-none shadow-third"
                            onClick={() => {
                                router.back()
                            }}
                        >
                            {' '}
                            <MoveLeft size={18} />
                            Quay lại
                        </Button>
                    </div>
                    <Layout className="flex h-fit flex-col gap-2 rounded-lg bg-transparent p-4 shadow-third">
                        {isFetching ? (
                            Array.from({ length: 4 }).map((_, index) => (
                                <Skeleton
                                    key={index}
                                    paragraph={{ rows: 2 }}
                                    active={true}
                                    className="w-full"
                                />
                            ))
                        ) : (
                            <>
                                <div>
                                    <p className="py-1 text-xs font-bold text-[#003553]">
                                        Phiếu khám
                                    </p>
                                    <div className="flex h-fit items-center gap-[16px] py-2">
                                        <Image
                                            className="h-[50px] w-[50px] rounded-lg object-cover"
                                            src={doctorInfor?.doctorAvatar}
                                            alt={''}
                                            height={200}
                                            width={200}
                                        />
                                        <div>
                                            <p className="text-[12px] font-bold text-[#003553]">
                                                {
                                                    doctorInfor?.doctorPosition
                                                        ?.positionName
                                                }{' '}
                                                {doctorInfor?.doctorName}
                                                <span className="ml-4">
                                                    |Đã khám
                                                </span>
                                            </p>
                                            <p className="gap-2 text-[12px] font-normal text-[#003553]">
                                                {doctorInfor?.doctorSpecialties?.map(
                                                    (specialty, index) => (
                                                        <span
                                                            className="mr-2"
                                                            key={index}
                                                        >
                                                            {
                                                                specialty?.specialtyName
                                                            }
                                                        </span>
                                                    ),
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <p className="py-1 text-xs font-bold text-[#003553]">
                                        Bệnh nhân
                                    </p>
                                    <div className="flex flex-wrap items-center gap-3 rounded bg-[#0284C7] bg-opacity-10 p-2 lg:gap-28">
                                        <div className="flex items-center gap-4">
                                            <Image
                                                className="h-[50px] w-[50px] rounded-full object-cover"
                                                src={
                                                    patientInfor?.patientAvatar
                                                }
                                                alt={''}
                                                height={200}
                                                width={200}
                                            />
                                            <div className="flex flex-col">
                                                <p className="text-[12px] font-bold text-[#003553]">
                                                    Họ và tên:{' '}
                                                    <span className="font-normal">
                                                        {
                                                            patientInfor?.patientName
                                                        }
                                                    </span>
                                                </p>
                                                <p className="text-[12px] font-bold text-[#003553]">
                                                    Ngày sinh{' '}
                                                    <span className="font-normal">
                                                        {dayjs(
                                                            patientInfor?.dob,
                                                        ).format(
                                                            'DD/MM/YYYY',
                                                        )}{' '}
                                                        -{' '}
                                                        {
                                                            dayjs().diff(dayjs(patientInfor?.dob), 'year')
                                                        }{' '}
                                                        tuổi
                                                    </span>
                                                </p>
                                            </div>
                                        </div>
                                        <div className="">
                                            <div>
                                                <p className="text-[12px] font-bold text-[#003553]">
                                                    Địa chỉ:{' '}
                                                    <span className="font-normal">
                                                        {patientInfor?.address}
                                                    </span>
                                                </p>
                                                <p className="text-[12px] font-bold text-[#003553]">
                                                    Giới tính:{' '}
                                                    <span className="font-normal">
                                                        {
                                                            patientInfor?.patientGender
                                                        }
                                                    </span>
                                                </p>
                                            </div>
                                        </div>
                                        <div className="">
                                            <div>
                                                <p className="text-[12px] font-bold text-[#003553]">
                                                    Số điên thoại:{' '}
                                                    <span className="font-normal">
                                                        {
                                                            patientInfor?.phoneNumber
                                                        }
                                                    </span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-2 flex flex-col gap-5 lg:flex-row">
                                    <div className="shadow-md w-full rounded-lg bg-[#0284C7] bg-opacity-10 p-2 text-[12px] text-[#003553] lg:w-2/3">
                                        <table className="block w-full border-none outline-none lg:table">
                                            <tbody>
                                                <tr className="m-2 block lg:table-row">
                                                    <td className="block w-full border px-4 py-2 font-semibold lg:table-cell lg:w-auto">
                                                        Mã số phiếu khám:
                                                    </td>
                                                    <td className="block w-full border px-4 py-2 lg:table-cell lg:w-auto">
                                                        <div className="inline-block rounded-md bg-white px-2 py-1">
                                                            {detail?.reportId}
                                                        </div>
                                                    </td>
                                                    <td className="block w-full border px-4 py-2 font-semibold lg:table-cell lg:w-auto">
                                                        Ngày khám:
                                                    </td>
                                                    <td className="block w-full border px-4 py-2 lg:table-cell lg:w-auto">
                                                        <div className="inline-block rounded-md bg-white px-2 py-1">
                                                            {dayjs(
                                                                detail?.date,
                                                            ).format(
                                                                'DD/MM/YYYY HH:mm:ss',
                                                            )}
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr className="block lg:table-row">
                                                    <td className="block w-full border px-4 py-2 font-semibold lg:table-cell lg:w-auto">
                                                        Tiền sử bệnh án:
                                                    </td>
                                                    <td className="block w-full border px-4 py-2 lg:table-cell lg:w-auto">
                                                        <div className="inline-block rounded-md bg-white px-2 py-1">
                                                            {
                                                                detail?.medicalHistory
                                                            }
                                                        </div>
                                                    </td>
                                                    <td className="block w-full border px-4 py-2 font-semibold lg:table-cell lg:w-auto">
                                                        Tổng trạng chung:
                                                    </td>
                                                    <td className="block w-full border px-4 py-2 lg:table-cell lg:w-auto">
                                                        <div className="inline-block rounded-md bg-white px-2 py-1">
                                                            {
                                                                detail?.generalCondition
                                                            }
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr className="block lg:table-row">
                                                    <td className="block w-full border px-4 py-2 font-semibold lg:table-cell lg:w-auto">
                                                        Chiều cao:
                                                    </td>
                                                    <td className="block w-full border px-4 py-2 lg:table-cell lg:w-auto">
                                                        <div className="inline-block rounded-md bg-white px-2 py-1">
                                                            {detail?.height}
                                                        </div>
                                                    </td>
                                                    <td className="block w-full border px-4 py-2 font-semibold lg:table-cell lg:w-auto">
                                                        Cân nặng:
                                                    </td>
                                                    <td className="block w-full border px-4 py-2 lg:table-cell lg:w-auto">
                                                        <div className="inline-block rounded-md bg-white px-2 py-1">
                                                            {detail?.weight}
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr className="block lg:table-row">
                                                    <td className="block w-full border px-4 py-2 font-semibold lg:table-cell lg:w-auto">
                                                        Chuẩn đoán:
                                                    </td>
                                                    <td className="block w-full border px-4 py-2 lg:table-cell lg:w-auto">
                                                        <div
                                                            className="inline-block rounded-md bg-white px-2 py-1"
                                                            dangerouslySetInnerHTML={{
                                                                __html: detail?.diagnosis,
                                                            }}
                                                        ></div>
                                                    </td>
                                                    <td className="block w-full border px-4 py-2 font-semibold lg:table-cell lg:w-auto">
                                                        Nhiệt:
                                                    </td>
                                                    <td className="block w-full border px-4 py-2 lg:table-cell lg:w-auto">
                                                        <div className="inline-block rounded-md bg-white px-2 py-1">
                                                            {
                                                                detail?.temperature
                                                            }
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr className="block lg:table-row">
                                                    <td className="block w-full border px-4 py-2 font-semibold lg:table-cell lg:w-auto">
                                                        Huyết áp:
                                                    </td>
                                                    <td className="block w-full border px-4 py-2 lg:table-cell lg:w-auto">
                                                        <div className="inline-block rounded-md bg-white px-2 py-1">
                                                            {
                                                                detail?.bloodPressure
                                                            }
                                                        </div>
                                                    </td>
                                                    <td className="block w-full border px-4 py-2 font-semibold lg:table-cell lg:w-auto">
                                                        Mạch:
                                                    </td>
                                                    <td className="block w-full border px-4 py-2 lg:table-cell lg:w-auto">
                                                        <div className="inline-block rounded-md bg-white px-2 py-1">
                                                            {detail?.pulse}
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>

                                    <div className="w-full lg:w-1/3">
                                        <div className="shadow-md flex flex-col rounded-lg bg-[#0284C7] bg-opacity-10">
                                            <p className="px-2 pt-4 font-bold text-[#003553]">
                                                Chỉ định:
                                            </p>
                                            <div className="m-auto mt-2 flex w-full flex-col justify-center px-3">
                                                <Button
                                                    onClick={() =>
                                                        router.push(
                                                            `view/service-indication?serviceOrderId=${detail?.serviceOrderId}&reportId=${detail?.reportId}&doctor=${doctorInfor.doctorName}&date=${dayjs(detail.date).format('DD/MM/YYYY')}`,
                                                        )
                                                    }
                                                    className="flex justify-between border-none"
                                                >
                                                    <p>Dịch vụ đã khám</p>
                                                    <ChevronsRight />
                                                </Button>
                                                <Button
                                                    className="my-2 flex justify-between border-none"
                                                    onClick={() =>
                                                        router.push(
                                                            `view/prescription?medicineOrderId=${detail?.medicineOrderId}&reportId=${detail?.reportId}&doctor=${doctorInfor.doctorName}&date=${dayjs(detail.date).format('DD/MM/YYYY')}`,
                                                        )
                                                    }
                                                >
                                                    <p>
                                                        Đơn thuốc bác sĩ cung
                                                        cấp
                                                    </p>
                                                    <ChevronsRight />
                                                </Button>
                                            </div>
                                        </div>
                                        <div className="flex gap-4 pt-8">
                                            <Button
                                                type="primary"
                                                className="py-4 font-bold"
                                            >
                                                In toàn bộ <Printer size={20} />
                                            </Button>
                                            {!detail?.hasFeedback ? (
                                                <Button
                                                    className="py-4 font-bold text-[#003553]"
                                                    onClick={() =>
                                                        setIsModalOpen(
                                                            !isModalOpen,
                                                        )
                                                    }
                                                >
                                                    Gửi đánh giá
                                                    <SendHorizontal size={20} />
                                                </Button>
                                            ) : (
                                                <Button
                                                    className="py-4 font-bold text-[#003553]"
                                                    onClick={() =>
                                                        setIsModalOpenView(
                                                            !isModalOpenView,
                                                        )
                                                    }
                                                >
                                                    Xem đánh giá
                                                    <View size={20} />
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}

                        <Modal
                            title={
                                <p className="m-0 p-0 text-[14px] text-[#003553]">
                                    Gửi đánh giá
                                </p>
                            }
                            open={isModalOpen}
                            onOk={handleSendFeedback}
                            confirmLoading={isFetching}
                            onCancel={() => setIsModalOpen(!isModalOpen)}
                            okButtonProps={{
                                danger: false,
                            }}
                            okText={
                                <div className="flex items-center gap-2">
                                    Gửi <SendHorizontal size={16} />
                                </div>
                            }
                            className="h-fit w-[65%]"
                        >
                            <div className="">
                                <div className="flex h-[140px] items-center gap-3 rounded-xl bg-[#E9ECEF] px-5">
                                    <Image
                                        height={200}
                                        width={200}
                                        src={
                                            'https://i.pinimg.com/564x/92/26/5c/92265c40c8e428122e0b32adc1994594.jpg'
                                        }
                                        alt=""
                                        className="h-[100px] w-[100px] rounded-xl"
                                    />
                                    <div className="flex select-none flex-col justify-center text-[14px] font-bold">
                                        <p className="text-[14px]">
                                            Đến:{' '}
                                            <span>
                                                {
                                                    doctorInfor?.doctorPosition
                                                        ?.positionName
                                                }{' '}
                                                {doctorInfor?.doctorName}
                                            </span>
                                        </p>
                                        <p className="py-2">
                                            Chuyên khoa:{' '}
                                            <span className="font-normal">
                                                Chuyên nội tim mạch
                                            </span>
                                        </p>
                                        <p className="flex">
                                            Được đánh giá:{' '}
                                            <span className="pl-2">
                                                5{' '}
                                                <Star
                                                    size={16}
                                                    fill={'currentColor'}
                                                    strokeWidth={1.5}
                                                    className="mb-[3px] inline-block text-yellow-500"
                                                />
                                            </span>
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-10 py-6 pl-1 font-bold text-[#003553]">
                                    <p>Đánh giá của bạn</p>
                                    <div
                                        className="flex space-x-2"
                                        onMouseLeave={handleMouseLeave}
                                    >
                                        {[1, 2, 3, 4, 5].map((starIndex) => (
                                            <button
                                                key={starIndex}
                                                onMouseEnter={() =>
                                                    handleStarHover(starIndex)
                                                }
                                                onClick={() =>
                                                    handleStarClick(starIndex)
                                                }
                                                aria-checked={
                                                    selectedStar >= starIndex
                                                }
                                            >
                                                <Star
                                                    size={30}
                                                    className={`transition-all duration-300 ease-in-out ${
                                                        hoveredStar >=
                                                            starIndex ||
                                                        selectedStar >=
                                                            starIndex
                                                            ? 'text-yellow-400'
                                                            : 'text-gray-400'
                                                    }`}
                                                    fill={
                                                        hoveredStar >=
                                                            starIndex ||
                                                        selectedStar >=
                                                            starIndex
                                                            ? 'currentColor'
                                                            : 'none'
                                                    }
                                                    strokeWidth={1.5}
                                                />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <Form
                                    name="basic"
                                    layout="vertical"
                                    form={myForm}
                                    className="flex w-full flex-col gap-4"
                                    onFinish={() => {}}
                                >
                                    <div className="w-full flex-col gap-5">
                                        <div>
                                            <Form.Item
                                                name={'message'}
                                                className="!mb-0"
                                                rules={[
                                                    {
                                                        required: false,
                                                        message:
                                                            'Không được để trống',
                                                    },
                                                ]}
                                            >
                                                <EditorTinymce
                                                    editorRef={editorRef}
                                                />
                                            </Form.Item>
                                        </div>
                                    </div>
                                </Form>
                            </div>
                        </Modal>
                        <ViewFeedback
                            close={() => setIsModalOpenView(!isModalOpenView)}
                            open={isModalOpenView}
                            appointmentId={detail?.appointmentId}
                        />
                    </Layout>
                </motion.div>
            )}
        </>
    )
}
