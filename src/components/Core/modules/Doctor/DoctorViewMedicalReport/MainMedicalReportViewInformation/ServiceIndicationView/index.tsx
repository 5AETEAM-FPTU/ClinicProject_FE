import { Button, message } from 'antd'
import { LucideView } from 'lucide-react'
import { useGetServiceOrderDetailQuery } from '@/stores/services/report/serviceOrder'
import { useEffect } from 'react'
import { ServiceOrder } from '..'
import {
    useGetAdominalUltrasoundPdfMutation,
    useGetElectrocarDiographyPdfMutation,
} from '@/stores/services/report/generatePdf'

type TProps = {
    service: ServiceOrder
}

export default function ServiceIndication({ service }: TProps) {
    const handleGeneratePdf = (code: string) => {
        if (code.toUpperCase() === 'SAB') {
            handleGetAbdominalUltraSoundReportPdf()
        } else if (code.toUpperCase() === 'DTD') {
            handleGetElectrocarDiogramReportPdf()
        }
    }
    const [getAbdominalUltrasoundPdfMutation] =
        useGetAdominalUltrasoundPdfMutation()
    const handleGetAbdominalUltraSoundReportPdf = async () => {
        try {
            const loadingMessage = message.loading(
                'Đang tiến hành tạo kết quả...',
                0,
            )
            const res = await getAbdominalUltrasoundPdfMutation({
                serviceOrderedId: service?.id!,
            }).unwrap()
            if (res instanceof Blob) {
                const url = URL.createObjectURL(res)
                const pdfWindow = window.open(url)
                if (pdfWindow) {
                    pdfWindow.onload = () => {
                        pdfWindow.focus()
                        // pdfWindow.print()
                    }
                }
                URL.revokeObjectURL(url)
            }
            loadingMessage()
            message.success('Tạo kết quả dịch vụ thành công!')
        } catch (error) {
            message.error('Tạo kết quả dịch vụ thất bại')
        }
    }
    const [getElectrocarDiogramPdfMutation] =
        useGetElectrocarDiographyPdfMutation()
    const handleGetElectrocarDiogramReportPdf = async () => {
        try {
            const loadingMessage = message.loading(
                'Đang tiến hành tạo kết quả...',
                0,
            )
            const res = await getElectrocarDiogramPdfMutation({
                serviceOrderedId: service?.id!,
            }).unwrap()
            if (res instanceof Blob) {
                const url = URL.createObjectURL(res)
                const pdfWindow = window.open(url)
                if (pdfWindow) {
                    pdfWindow.onload = () => {
                        pdfWindow.focus()
                        // pdfWindow.print()
                    }
                }
                URL.revokeObjectURL(url)
            }
            loadingMessage()
            message.success('Tạo kết quả dịch vụ thành công!')
        } catch (error) {
            message.error('Tạo kết quả dịch vụ thất bại')
        }
    }
    return (
        <>
            <div className="mt-5 max-w-[900px] overflow-y-auto rounded-xl bg-[#FFFFFF] p-4 shadow-third">
                <table className="min-w-full bg-[#FFFFFF] text-[#003553]">
                    <thead>
                        <tr className="bg-[#FFFFFF] text-center">
                            <th className="border-b border-r border-[#003553] px-4 py-2">
                                STT
                            </th>
                            <th className="border-b border-r border-[#003553] px-4 py-2">
                                Mã xét nghiệm
                            </th>
                            <th className="border-b border-r border-[#003553] px-4 py-2">
                                Tên xét nghiệm
                            </th>
                            <th className="border-b border-r border-[#003553] px-4 py-2">
                                Đơn giá
                            </th>
                            <th className="border-b border-[#003553] px-4 py-2">
                                Xem kết quả
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {service?.items?.map((item: any, key: any) => (
                            <tr key={key} className="text-center">
                                <td className="border-r border-[#003553] px-4 py-2">
                                    {key + 1}
                                </td>
                                <td className="border-r border-[#003553] px-4 py-2">
                                    {item?.service?.code}
                                </td>
                                <td className="border-r border-[#003553] px-4 py-2">
                                    {item?.service?.name}
                                </td>
                                <td className="border-r border-[#003553] px-4 py-2">
                                    {new Intl.NumberFormat('vi-VN', {
                                        style: 'currency',
                                        currency: 'VND',
                                    }).format(item?.priceAtOrder)}
                                </td>
                                <td className="px-4 py-2">
                                    {item?.isUpdated ? (
                                        <Button
                                            onClick={() =>
                                                handleGeneratePdf(
                                                    item?.service?.code,
                                                )
                                            }
                                            type="default"
                                            className="rounded-[12px] border-none bg-[#E9ECEF]"
                                        >
                                            <LucideView size={18} />
                                        </Button>
                                    ) : (
                                        <p>Chưa có thông tin</p>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}
