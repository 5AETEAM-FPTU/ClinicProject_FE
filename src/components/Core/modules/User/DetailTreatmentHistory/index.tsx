'use client'
import { Button, Form, Layout, message, Modal, Skeleton } from "antd";
import { motion } from "framer-motion";
import Image from "next/image";
import "./style.css";
import { ChevronRight, ChevronsRight, Printer, SendHorizontal, Star, View } from "lucide-react";
import { useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useGetMedicalReportByIdQuery } from "@/stores/services/report/medicalReport";
import dayjs from "dayjs";
import EditorTinymce, { getEditorHtmlContent } from "@/components/Core/common/EditorTinymce";
import { useCreateFeedbackMutation } from "@/stores/services/user/userAppointments";

interface MedicalRecord {
    examinationCode: string
    examinationDate: string
    medicalHistory: string
    generalCondition: string
    height: string
    weight: string
    pulse: number
    temperature: number
    bloodPressure: string
    diagnosis: string
}

interface patientInfor {
    patientId: string;
    fullName: string;
    dob: string;
    avatar: string;
    address: string;
    gender: string;
    phoneNumber: string;
}

interface MedicalReport {
    reportId: string;
    date: string;
    medicalHistory: string;
    generalCondition: string;
    weight: string;
    height: string;
    pulse: string;
    temperature: string;
    bloodPressure: string;
    diagnosis: string;
}

interface Service {
    serviceOrderId: string;
    quantity: number;
    totalPrice: number;
}

interface Medicine {
    medicineOrderId: string;
}

interface MedicalRecord {
    appointmentId: string;
    patientInfor: patientInfor;
    medicalReport: MedicalReport;
    service: Service;
    medicine: Medicine;
}

export default function DetailTreatmentHistory() {
    const [myForm] = Form.useForm()
    const editorRef = useRef<HTMLDivElement>(null)
    const searchParams = useSearchParams()
    const reportId = searchParams.get('reportId')
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [isModalOpenView, setIsModalOpenView] = useState<boolean>(false)
    const [hoveredStar, setHoveredStar] = useState<number>(0)
    const [selectedStar, setSelectedStar] = useState<number>(0)
    const [createFeedbackFunc, { isLoading }] = useCreateFeedbackMutation();

    const handleStarHover = (starIndex: number) => {
        setHoveredStar(starIndex)
    }

    const handleStarClick = (starIndex: number) => {
        setSelectedStar(starIndex)
    }

    const handleMouseLeave = () => {
        setHoveredStar(0)
    }
    const { medicalRecord, refetch, isFetching } = useGetMedicalReportByIdQuery(
        reportId!,
        {
            selectFromResult: ({ data, isFetching }) => ({
                medicalRecord: data?.body as MedicalRecord ?? {},
                isFetching: isFetching,
            }),
        },
    );

    const handleSendFeedback = () => {
        const editorContent = getEditorHtmlContent(editorRef)
        createFeedbackFunc({ comment: editorContent, vote: selectedStar, appointmentId: medicalRecord?.appointmentId! }).then(() => {
            refetch()
            setIsModalOpen(false)
            message.success("Cảm ơn quý khách đã phản hồi");
        }).catch(() => {
            message.error("Phản hồi thất bại!");
        })
    }

    return (
        <motion.div
            initial={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            exit={{ opacity: 0 }}
        >
            <Layout className="flex h-fit flex-col bg-transparent gap-2 shadow-third p-4 rounded-lg">
                {isFetching ? Array.from({ length: 4 }).map((_, index) => (
                    <Skeleton key={index} paragraph={{ rows: 2 }} active={true} className="w-full" />
                )) : (
                    <>
                        <div>
                            <p className="font-bold text-xs py-1 text-[#003553]">Phiếu khám</p>
                            <div className="h-fit py-2 flex gap-[16px] items-center">
                                <Image className="w-[50px] h-[50px] rounded-lg object-cover" src={medicalRecord?.patientInfor?.avatar} alt={""} height={200} width={200} />
                                <div>
                                    <p className="text-[#003553] font-bold text-[12px]">Thạc sĩ - Bác sĩ: Đoàn Văn Mạnh <span className="ml-4">|Đã khám</span></p>
                                    <p className="text-[#003553] font-normal text-[12px]">Chuyên khoa Nội lồng ngực</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <p className="font-bold text-xs text-[#003553] py-1">Bệnh nhân</p>
                            <div className="flex items-center bg-[#0284C7] bg-opacity-10 p-2 rounded flex-wrap  lg:gap-28 gap-3">
                                <div className="flex gap-4 items-center ">
                                    <Image className="w-[50px] h-[50px] rounded-full object-cover" src={medicalRecord?.patientInfor?.avatar} alt={""} height={200} width={200} />
                                    <div className="flex flex-col">
                                        <p className="text-[#003553] font-bold text-[12px]">
                                            Họ và tên: <span className="font-normal">{medicalRecord?.patientInfor?.fullName}</span>
                                        </p>
                                        <p className="text-[#003553] font-bold text-[12px]">Ngày sinh <span className="font-normal">{dayjs(medicalRecord?.patientInfor?.dob).format("DD/MM/YYYY")} - {medicalRecord?.patientInfor?.gender} tuổi</span></p>
                                    </div>
                                </div>
                                <div className="">
                                    <div>
                                        <p className="text-[#003553] font-bold text-[12px]">
                                            Địa chỉ: <span className="font-normal">{medicalRecord?.patientInfor?.address}</span>
                                        </p>
                                        <p className="text-[#003553] font-bold text-[12px]">Giới tính: <span className="font-normal">{medicalRecord?.patientInfor?.gender}</span></p>
                                    </div>
                                </div>
                                <div className="">
                                    <div>
                                        <p className="text-[#003553] font-bold text-[12px]">
                                            Mã bệnh nhân: <span>{medicalRecord?.medicalReport?.reportId}</span>
                                        </p>
                                        <p className="text-[#003553] font-bold text-[12px]">Số điên thoại: <span className="font-normal">{medicalRecord?.patientInfor?.phoneNumber}</span></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col lg:flex-row gap-5 mt-2">
                            <div className="lg:w-2/3 w-full p-2 text-[12px] bg-[#0284C7] bg-opacity-10 rounded-lg shadow-md text-[#003553]">
                                <table className="w-full border-none outline-none block lg:table">
                                    <tbody>
                                        <tr className="block lg:table-row m-2">
                                            <td className="border px-4 py-2 font-semibold block lg:table-cell w-full lg:w-auto">
                                                Mã số phiếu khám:
                                            </td>
                                            <td className="border px-4 py-2 block lg:table-cell w-full lg:w-auto">
                                                <div className="inline-block bg-white rounded-md px-2 py-1">{medicalRecord?.medicalReport?.reportId}</div>
                                            </td>
                                            <td className="border px-4 py-2 font-semibold block lg:table-cell w-full lg:w-auto">
                                                Ngày khám:
                                            </td>
                                            <td className="border px-4 py-2 block lg:table-cell w-full lg:w-auto">
                                                <div className="inline-block bg-white rounded-md px-2 py-1">{medicalRecord?.medicalReport?.date}</div>
                                            </td>
                                        </tr>
                                        <tr className="block lg:table-row">
                                            <td className="border px-4 py-2 font-semibold block lg:table-cell w-full lg:w-auto">
                                                Tiền sử bệnh án:
                                            </td>
                                            <td className="border px-4 py-2 block lg:table-cell w-full lg:w-auto">
                                                <div className="inline-block bg-white rounded-md px-2 py-1">{medicalRecord?.medicalReport?.medicalHistory}</div>
                                            </td>
                                            <td className="border px-4 py-2 font-semibold block lg:table-cell w-full lg:w-auto">
                                                Tổng trạng chung:
                                            </td>
                                            <td className="border px-4 py-2 block lg:table-cell w-full lg:w-auto">
                                                <div className="inline-block bg-white rounded-md px-2 py-1">{medicalRecord?.medicalReport?.generalCondition}</div>
                                            </td>
                                        </tr>
                                        <tr className="block lg:table-row">
                                            <td className="border px-4 py-2 font-semibold block lg:table-cell w-full lg:w-auto">
                                                Chiều cao:
                                            </td>
                                            <td className="border px-4 py-2 block lg:table-cell w-full lg:w-auto">
                                                <div className="inline-block bg-white rounded-md px-2 py-1">{medicalRecord?.medicalReport?.height}</div>
                                            </td>
                                            <td className="border px-4 py-2 font-semibold block lg:table-cell w-full lg:w-auto">
                                                Cân nặng:
                                            </td>
                                            <td className="border px-4 py-2 block lg:table-cell w-full lg:w-auto">
                                                <div className="inline-block bg-white rounded-md px-2 py-1">{medicalRecord?.medicalReport?.weight}</div>
                                            </td>
                                        </tr>
                                        <tr className="block lg:table-row">
                                            <td className="border px-4 py-2 font-semibold block lg:table-cell w-full lg:w-auto">
                                                Chuẩn đoán:
                                            </td>
                                            <td className="border px-4 py-2 block lg:table-cell w-full lg:w-auto">
                                                <div className="inline-block bg-white rounded-md px-2 py-1" dangerouslySetInnerHTML={{ __html: medicalRecord?.medicalReport?.diagnosis }}></div>
                                            </td>
                                            <td className="border px-4 py-2 font-semibold block lg:table-cell w-full lg:w-auto">
                                                Nhiệt:
                                            </td>
                                            <td className="border px-4 py-2 block lg:table-cell w-full lg:w-auto">
                                                <div className="inline-block bg-white rounded-md px-2 py-1">{medicalRecord?.medicalReport?.temperature}</div>
                                            </td>
                                        </tr>
                                        <tr className="block lg:table-row">
                                            <td className="border px-4 py-2 font-semibold block lg:table-cell w-full lg:w-auto">
                                                Huyết áp:
                                            </td>
                                            <td className="border px-4 py-2 block lg:table-cell w-full lg:w-auto">
                                                <div className="inline-block bg-white rounded-md px-2 py-1">{medicalRecord?.medicalReport?.bloodPressure}</div>
                                            </td>
                                            <td className="border px-4 py-2 font-semibold block lg:table-cell w-full lg:w-auto">
                                                Mạch:
                                            </td>
                                            <td className="border px-4 py-2 block lg:table-cell w-full lg:w-auto">
                                                <div className="inline-block bg-white rounded-md px-2 py-1">{medicalRecord?.medicalReport?.pulse}</div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>

                            </div>

                            <div className="lg:w-1/3 w-full">
                                <div className=" bg-[#0284C7] bg-opacity-10 rounded-lg shadow-md flex flex-col">
                                    <p className="pt-4 px-2 text-[#003553] font-bold">Chỉ định:</p>
                                    <div className="w-full m-auto mt-2 flex justify-center flex-col px-3">
                                        <Button className="border-none flex justify-between"><p>Dịch vụ đã khám</p><ChevronsRight /></Button>
                                        <Button className="border-none my-2 flex justify-between"><p>Đơn thuốc bác sĩ cung cấp</p><ChevronsRight /></Button>
                                    </div>
                                </div>
                                <div className="flex gap-4 pt-8">
                                    <Button type="primary" className="font-bold py-4">In toàn bộ <Printer size={20} /></Button>
                                    <Button className="font-bold text-[#003553] py-4" onClick={() => setIsModalOpen(!isModalOpen)}>Gửi đánh giá<SendHorizontal size={20} /></Button>
                                    {false && <Button className="font-bold text-[#003553] py-4" onClick={() => setIsModalOpenView(!isModalOpenView)}>Xem đánh giá<View size={20} /></Button>}
                                </div>
                            </div>
                        </div>
                    </>)}

                <Modal
                    title={<p className="text-[#003553] text-[14px] p-0 m-0">Gửi đánh giá</p>}
                    open={isModalOpen}
                    onOk={handleSendFeedback}
                    confirmLoading={isFetching}
                    onCancel={() =>
                        setIsModalOpen(!isModalOpen)
                    }
                    okButtonProps={{
                        danger: false
                    }}
                    okText={<div className="flex items-center gap-2">Gửi <SendHorizontal size={16} /></div>}
                    className="h-fit w-[65%]"

                >
                    <div className="">
                        <div className="h-[140px] bg-[#E9ECEF] rounded-xl flex items-center gap-3 px-5">
                            <Image height={200} width={200} src={"https://i.pinimg.com/564x/92/26/5c/92265c40c8e428122e0b32adc1994594.jpg"} alt="" className="rounded-xl h-[100px] w-[100px]" />
                            <div className="flex flex-col text-[14px] font-bold justify-center select-none">
                                <p className="text-[14px]">Đến: <span>Thạc sĩ - bác sĩ Đoàn Văn Mạnh</span></p>
                                <p className="py-2">Chuyên khoa: <span className="font-normal">Chuyên nội tim mạch</span></p>
                                <p className="flex">Được đánh giá: <span className="pl-2">5 <Star size={16} fill={'currentColor'}
                                    strokeWidth={1.5} className="text-yellow-500 inline-block mb-[3px]" /></span></p>


                            </div>
                        </div>

                        <div className="flex gap-10 items-center py-6 text-[#003553] font-bold pl-1"><p>Đánh giá của bạn</p>
                            <div
                                className="flex space-x-2"
                                onMouseLeave={handleMouseLeave}
                            >
                                {[1, 2, 3, 4, 5].map((starIndex) => (
                                    <button
                                        key={starIndex}
                                        onMouseEnter={() => handleStarHover(starIndex)}
                                        onClick={() => handleStarClick(starIndex)}
                                        aria-checked={selectedStar >= starIndex}
                                    >
                                        <Star
                                            size={30}
                                            className={`transition-all duration-300 ease-in-out ${hoveredStar >= starIndex || selectedStar >= starIndex
                                                ? 'text-yellow-400'
                                                : 'text-gray-400'
                                                }`}
                                            fill={
                                                hoveredStar >= starIndex || selectedStar >= starIndex
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
                            onFinish={() => { }}

                        >
                            <div className="w-full flex-col gap-5">
                                <div>
                                    <Form.Item
                                        name={'message'}
                                        className="!mb-0"
                                        rules={[
                                            {
                                                required: false,
                                                message: 'Không được để trống',
                                            },
                                        ]}
                                    >
                                        <EditorTinymce editorRef={editorRef} />
                                    </Form.Item>
                                </div>
                            </div>
                        </Form>
                    </div>
                </Modal>
            </Layout>
        </motion.div>
    )
}

