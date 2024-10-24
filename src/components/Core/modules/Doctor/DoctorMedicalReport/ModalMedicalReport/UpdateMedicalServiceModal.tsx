'use client'
import { useGetServiceOrderDetailQuery } from '@/stores/services/report/serviceOrder'
import { Button, Input, message, Modal } from 'antd'
import { Edit, Printer, Search, View } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import {
    useCreateAdominalUltrasoundReportMutation,
    useCreateElectrocarDiographyReportMutation,
    useDeleteAbdominalUltrasoundReportMutation,
    useDeleteElectrocarDiographyReportMutation,
} from '@/stores/services/report/formService'
import webStorageClient from '@/utils/webStorageClient'
import { constants } from '@/settings'
import { MedicalReportResponseBody } from '../ViewMedialReportModule'
import { generateReportCode } from '@/utils/generateCode'
import dayjs from 'dayjs'
import { useGetAdominalUltrasoundPdfMutation } from '@/stores/services/report/generatePdf'
import UpdateAdominalUtrasound from './UpdateFormAdominalUltrasound'
import UpdateElectrocarDiogram from './UpdateFormElectrocarDiogram'
import { updateSelectedId } from '@/stores/features/auth'
import { useAppDispatch } from '@/hooks/redux-toolkit'
type TProps = {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    serviceOrderId?: string
    payload: MedicalReportResponseBody
}
export default function UpdateMedicalServiceModal({
    open,
    setOpen,
    serviceOrderId,
    payload,
}: TProps) {
    const [openUpdateadominalUtrasound, setOpenUpdateadominalUtrasound] =
        useState<boolean>(false)
    const [openUpdateElectorcarDiogram, setOpenUpdateElectrocarDiogram] =
        useState<boolean>(false)
    const { serviceOrderDetail, refetch } = useGetServiceOrderDetailQuery(
        serviceOrderId!,
        {
            skip: !open,
            selectFromResult: ({ data }) => ({
                serviceOrderDetail: data?.body?.serviceOrder,
            }),
        },
    )
    useEffect(() => {
        if (open) {
            refetch()
        }
    }, [open])
    const dispatch = useAppDispatch()

    const handleUpdateForm = (code: string) => {
        if (code.toUpperCase() === 'SAB') {
            setOpenUpdateadominalUtrasound(true)
        } else if (code.toUpperCase() === 'DTD') {
            setOpenUpdateElectrocarDiogram(true)
            return <></>
        }
    }

    const handleCreateForm = (code: string) => {
        if (code.toUpperCase() === 'SAB') {
            handleUpdateAdominalUtrasoundReport()
        } else if (code.toUpperCase() === 'DTD') {
            handleCreateElectricarDiogram()
        }
    }
    const handleGeneratePdf = (code: string) => {
        if (code.toUpperCase() === 'SAB') {
            handleGetAbdominalUltraSoundReportPdf()
        }
    }
    const [updateAdominalUltrasonics] =
        useCreateAdominalUltrasoundReportMutation()
    const [deleteAbdominalUltrasonics] =
        useDeleteAbdominalUltrasoundReportMutation()
    const handleUpdateAdominalUtrasoundReport = async () => {
        try {
            await deleteAbdominalUltrasonics(serviceOrderId!)
            await updateAdominalUltrasonics({
                serviceOrderedId: serviceOrderId!,
                diagostic: payload?.medicalReport?.diagnosis,
                doctorName: webStorageClient.get(constants.USER_FULLNAME),
                patientName: payload?.patientInfor?.fullName,
                reportCode: generateReportCode(),
                treatmentDay: payload?.medicalReport?.date,
                ages: dayjs()
                    .diff(payload?.patientInfor?.dob, 'year')
                    .toString(),
                gender: payload?.patientInfor?.gender,
                address: payload?.patientInfor?.address,
            }).unwrap()
            message.success('Tạo báo cáo thành công')
            setOpenUpdateadominalUtrasound(true)
        } catch (error) {
            message.error('Tạo báo cáo thất bại')
            return
        }
    }
    const [createElectrocarDiography] =
        useCreateElectrocarDiographyReportMutation()
    const [deleteElectrocarDiography] =
        useDeleteElectrocarDiographyReportMutation()
    const handleCreateElectricarDiogram = async () => {
        try {
            await deleteElectrocarDiography(serviceOrderId!)
            await createElectrocarDiography({
                serviceOrderedId: serviceOrderId!,
                diagostic: payload?.medicalReport?.diagnosis,
                doctorName: webStorageClient.get(constants.USER_FULLNAME),
                patientName: payload?.patientInfor?.fullName,
                reportCode: generateReportCode(),
                treatmentDay: payload?.medicalReport?.date,
                ages: dayjs()
                    .diff(payload?.patientInfor?.dob, 'year')
                    .toString(),
                gender: payload?.patientInfor?.gender,
                address: payload?.patientInfor?.address,
            }).unwrap()
            message.success('Tạo báo cáo thành công')
            setOpenUpdateElectrocarDiogram(true)
        } catch (error) {
            message.error('Tạo báo cáo thất bại')
        }
    }

    const [getAbdominalUltrasoundPdfMutation] =
        useGetAdominalUltrasoundPdfMutation()
    const handleGetAbdominalUltraSoundReportPdf = async () => {
        try {
            const loadingMessage = message.loading(
                'Đang tiến hành phân tích...',
                0,
            )
            const res = await getAbdominalUltrasoundPdfMutation({
                serviceOrderedId: serviceOrderId!,
            }).unwrap()
            if (res instanceof Blob) {
                const url = URL.createObjectURL(res)
                const pdfWindow = window.open(url)
                if (pdfWindow) {
                    pdfWindow.onload = () => {
                        pdfWindow.focus()
                        pdfWindow.print()
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
            <Modal
                title={[
                    <p className="text-[16px] font-bold text-secondarySupperDarker">
                        Tạo dịch vụ khám chữa bệnh
                    </p>,
                ]}
                style={{ top: 20 }}
                centered
                open={open}
                onOk={() => setOpen(false)}
                onCancel={() => setOpen(false)}
                footer={[
                    <Button
                        className=""
                        type="default"
                        key="cancel"
                        onClick={() => setOpen(false)}
                    >
                        Hủy bỏ
                    </Button>,
                    <Button
                        className="bg-secondaryDark"
                        key="submit"
                        type="primary"
                        onClick={() => setOpen(false)}
                    >
                        Xác nhận
                    </Button>,
                ]}
                className="w-full max-w-fit rounded-xl !bg-white !shadow-third"
            >
                <div className="mt-5 flex flex-row gap-5">
                    <div className="w-fit">
                        <div className="flex h-fit w-full flex-col gap-5 rounded-xl border-[1px] border-secondaryDark border-opacity-20 bg-white p-5 shadow-third">
                            <p className="text-[14px] font-bold text-secondarySupperDarker">
                                Đã thêm vào danh sách
                            </p>
                            <div>
                                <div className="relative">
                                    <table className="w-full table-auto border-collapse">
                                        <thead className="sticky top-0 z-10 bg-white">
                                            <tr>
                                                <th className="w-[150px] border-b-[1px] border-r-[1px] border-secondarySupperDarker px-5 py-[14px] text-[14px] font-bold text-secondarySupperDarker">
                                                    Mã xét nghiệm
                                                </th>
                                                <th className="w-[290px] border-b-[1px] border-r-[1px] border-secondarySupperDarker px-5 py-[14px] text-[14px] font-bold text-secondarySupperDarker">
                                                    Tên xét nghiệm
                                                </th>
                                                <th className="w-[150px] border-b-[1px] border-r-[1px] border-secondarySupperDarker px-5 py-[14px] text-[14px] font-bold text-secondarySupperDarker">
                                                    Trạng thái
                                                </th>
                                                <th className="w-[180px] border-b-[1px] border-r-[1px] border-secondarySupperDarker px-5 py-[14px] text-[14px] font-bold text-secondarySupperDarker">
                                                    Thay đổi kết quả
                                                </th>
                                                <th className="w-[120px] border-b-[1px] border-r-[1px] border-secondarySupperDarker px-5 py-[14px] text-[14px] font-bold text-secondarySupperDarker">
                                                    Đơn giá
                                                </th>
                                                <th className="w-[120px] border-b-[1px] border-secondarySupperDarker px-5 py-[14px] text-[14px] font-bold text-secondarySupperDarker">
                                                    Xem
                                                </th>
                                            </tr>
                                        </thead>
                                    </table>
                                    <div
                                        style={{
                                            maxHeight: '360px',
                                            height: '360px',
                                            overflowY: 'auto',
                                        }}
                                    >
                                        <table className="w-full table-auto border-collapse">
                                            <tbody>
                                                {serviceOrderDetail?.items?.map(
                                                    (
                                                        item: any,
                                                        index: number,
                                                    ) => (
                                                        <>
                                                            <tr key={index}>
                                                                <td className="w-[150px] border-b-[1px] border-r-[1px] border-secondarySupperDarker px-5 py-[14px] text-center text-[14px] font-medium text-secondarySupperDarker">
                                                                    {
                                                                        item
                                                                            ?.service
                                                                            ?.code
                                                                    }
                                                                </td>
                                                                <td className="w-[290px] border-b-[1px] border-r-[1px] border-secondarySupperDarker px-5 py-[14px] text-center text-[14px] font-medium text-secondarySupperDarker">
                                                                    {
                                                                        item
                                                                            ?.service
                                                                            ?.name
                                                                    }
                                                                </td>
                                                                <td className="w-[150px] border-b-[1px] border-r-[1px] border-secondarySupperDarker px-5 py-[14px] text-center text-[14px] font-medium text-secondaryDark">
                                                                    {item?.isUpdated
                                                                        ? 'Đã cập nhật'
                                                                        : 'Chưa cập nhật'}
                                                                </td>
                                                                <td className="w-[180px] border-b-[1px] border-r-[1px] border-secondarySupperDarker px-5 py-[14px] text-center text-[14px] font-medium text-secondarySupperDarker">
                                                                    {item?.isUpdated ? (
                                                                        <Button
                                                                            type="primary"
                                                                            className="!bg-[#15803D]"
                                                                            onClick={() => {
                                                                                handleUpdateForm(
                                                                                    item
                                                                                        ?.service
                                                                                        ?.code,
                                                                                )
                                                                                dispatch(
                                                                                    updateSelectedId(
                                                                                        item
                                                                                            ?.service
                                                                                            ?.id,
                                                                                    ),
                                                                                )
                                                                            }}
                                                                        >
                                                                            Chỉnh
                                                                            sửa
                                                                            <Edit
                                                                                size={
                                                                                    16
                                                                                }
                                                                            />
                                                                        </Button>
                                                                    ) : (
                                                                        <Button
                                                                            type="primary"
                                                                            className="!bg-secondaryDark"
                                                                            onClick={() => {
                                                                                handleCreateForm(
                                                                                    item
                                                                                        ?.service
                                                                                        ?.code,
                                                                                )
                                                                            }}
                                                                        >
                                                                            Viết
                                                                            kết
                                                                            quả
                                                                        </Button>
                                                                    )}
                                                                </td>
                                                                <td className="w-[120px] border-b-[1px] border-r-[1px] border-secondarySupperDarker px-5 py-[14px] text-center text-[14px] font-medium text-secondarySupperDarker">
                                                                    {new Intl.NumberFormat(
                                                                        'vi-VN',
                                                                        {
                                                                            style: 'currency',
                                                                            currency:
                                                                                'VND',
                                                                        },
                                                                    ).format(
                                                                        item?.priceAtOrder,
                                                                    )}
                                                                </td>
                                                                <td className="w-[120px] border-b-[1px] border-secondarySupperDarker px-5 py-[14px] text-center text-[14px] font-bold text-secondarySupperDarker">
                                                                    <div className="flex w-full items-center justify-center gap-5">
                                                                        <View
                                                                            onClick={() => {
                                                                                handleUpdateForm(
                                                                                    item
                                                                                        ?.service
                                                                                        ?.code,
                                                                                )
                                                                                dispatch(
                                                                                    updateSelectedId(
                                                                                        item
                                                                                            ?.service
                                                                                            ?.id,
                                                                                    ),
                                                                                )
                                                                            }}
                                                                            size={
                                                                                20
                                                                            }
                                                                            className="cursor-pointer transition-all hover:scale-x-110 hover:text-secondaryDark"
                                                                        />
                                                                        {item?.isUpdated && (
                                                                            <Printer
                                                                                onClick={() => {
                                                                                    handleGeneratePdf(
                                                                                        item
                                                                                            ?.service
                                                                                            ?.code,
                                                                                    )
                                                                                }}
                                                                                size={
                                                                                    20
                                                                                }
                                                                                className="cursor-pointer transition-all hover:scale-x-110 hover:text-secondaryDark"
                                                                            />
                                                                        )}
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            {openUpdateadominalUtrasound && (
                                                                <UpdateAdominalUtrasound
                                                                    open={
                                                                        openUpdateadominalUtrasound
                                                                    }
                                                                    setOpen={
                                                                        setOpenUpdateadominalUtrasound
                                                                    }
                                                                    serviceOrderedId={
                                                                        payload
                                                                            ?.service
                                                                            ?.serviceOrderId!
                                                                    }
                                                                    refetch={
                                                                        refetch
                                                                    }
                                                                />
                                                            )}

                                                            <UpdateElectrocarDiogram
                                                                open={
                                                                    openUpdateElectorcarDiogram
                                                                }
                                                                setOpen={
                                                                    setOpenUpdateElectrocarDiogram
                                                                }
                                                                serviceOrderedId={
                                                                    payload
                                                                        ?.service
                                                                        ?.serviceOrderId!
                                                                }
                                                                refetch={
                                                                    refetch
                                                                }
                                                            />
                                                        </>
                                                    ),
                                                )}
                                            </tbody>
                                        </table>
                                        {serviceOrderDetail?.items?.length ===
                                            0 && (
                                            <div className="flex h-full w-full items-center justify-center">
                                                <p className="select-none text-[24px] font-bold text-secondarySupperDarker text-opacity-40">
                                                    Chưa có dữ liệu
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-5">
                    <p className="text-[14px] font-semibold text-secondarySupperDarker">
                        Tổng số xét nghiệm: {serviceOrderDetail?.quantity}
                    </p>
                    <p className="text-[14px] font-bold text-secondarySupperDarker">
                        Tổng phí xét nghiệm:{' '}
                        {new Intl.NumberFormat('vi-VN', {
                            style: 'currency',
                            currency: 'VND',
                        }).format(serviceOrderDetail?.totalPrice)}
                    </p>
                </div>
            </Modal>
        </>
    )
}
