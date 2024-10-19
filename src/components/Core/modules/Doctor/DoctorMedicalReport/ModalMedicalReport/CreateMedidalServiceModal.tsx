'use client'
import React, { useEffect, useState } from 'react'
import { Button, Input, message, Modal } from 'antd'
import { set } from 'lodash'
import { Search } from 'lucide-react'
import { useGetAllServiceQuery } from '@/stores/services/report/medicalReport'
import {
    useAddServiceOrderMutation,
    useGetServiceOrderDetailQuery,
} from '@/stores/services/report/serviceOrder'
import { TMedicalReport } from '../ViewMedialReportModule'
import { useRouter } from 'next/navigation'

type TProps = {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    serviceOrderId?: string
}
export type ServiceOrderDetail = {
    id: string
    quantity: string
    totalPrice: string
    isAllUpdated: boolean
    item: any
}
export default function CreateMedicalServiceModal({
    open,
    setOpen,
    serviceOrderId,
}: TProps) {
    const router = useRouter()
    const [searchValue, setSearchValue] = useState<string>('')
    const [serviceOrder, setServiceOrder] = useState<any>([])
    const { services } = useGetAllServiceQuery(
        {
            pageIndex: 1,
            pageSize: 100,
            key: searchValue,
        },
        {
            skip: !open,
            selectFromResult: ({ data }) => ({
                services: data?.body?.services ?? [],
            }),
        },
    )
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
        const dataList = serviceOrderDetail?.items?.map((item: any) => {
            return {
                id: item?.service?.id,
                code: item?.service?.code,
                name: item?.service?.name,
                description: item?.service?.descripiton,
            }
        })
        setServiceOrder(dataList)
    }, [serviceOrderDetail, open])
    const handleAddServiceItem = (item: any) => {
        setServiceOrder([...serviceOrder, item])
    }
    const handleDeleteOrderItem = (item: any) => {
        setServiceOrder(serviceOrder.filter((i: any) => i.id !== item.id))
    }
    const [addServiceOrder] = useAddServiceOrderMutation()
    const handleUpdateOrderService = async () => {
        try {
            await addServiceOrder({
                serviceOrderId: serviceOrderId!,
                serviceIds: serviceOrder.map((item: any) => item.id),
            }).unwrap()
            setOpen(false)
            message.success('Thành công!')
        } catch (error) {
            message.error('Đã xảy ra lỗi, vui lòng thử lại sau!')
        }
    }
    return (
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
                    onClick={() => {
                        handleUpdateOrderService()
                    }}
                >
                    Xác nhận
                </Button>,
            ]}
            className="w-[1440px] rounded-xl !bg-white !shadow-third"
        >
            <div className="mt-5 flex w-full flex-row gap-5">
                <div className="w-full">
                    <div className="flex h-fit w-full flex-col gap-5 rounded-xl border-[1px] border-secondaryDark border-opacity-20 bg-white p-5 shadow-third">
                        <p className="text-[14px] font-bold text-secondarySupperDarker">
                            Đã thêm vào danh sách
                        </p>
                        <div className="w-full">
                            <div className="relative w-full">
                                <table className="!w-full table-auto border-collapse">
                                    <thead className="sticky top-0 z-10 bg-white">
                                        <tr>
                                            <th className="w-[25%] border-b-[1px] border-r-[1px] border-secondarySupperDarker text-start text-[14px] font-bold text-secondarySupperDarker">
                                                <div className="py-2 text-center">
                                                    Mã xét nghiệm
                                                </div>
                                            </th>
                                            <th className="w-[50%] border-b-[1px] border-r-[1px] border-secondarySupperDarker text-start text-[14px] font-bold text-secondarySupperDarker">
                                                <div className="py-2 text-center">
                                                    Tên xét nghiệm
                                                </div>
                                            </th>
                                            <th className="w-[25%] border-b-[1px] border-secondarySupperDarker"></th>
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
                                            {serviceOrder?.map(
                                                (item: any, index: number) => (
                                                    <tr key={index}>
                                                        <td className="w-[25%] border-b-[1px] border-r-[1px] border-secondarySupperDarker text-[14px] font-medium text-secondarySupperDarker">
                                                            <div className="py-2 text-center">
                                                                {item.code}
                                                            </div>
                                                        </td>
                                                        <td className="w-[50%] border-b-[1px] border-r-[1px] border-secondarySupperDarker text-[14px] font-medium text-secondarySupperDarker">
                                                            <div className="py-2 text-center">
                                                                {item.name}
                                                            </div>
                                                        </td>
                                                        <td className="w-[25%] border-b-[1px] border-secondarySupperDarker">
                                                            <div className="m-auto py-2 text-center">
                                                                <Button
                                                                    type="default"
                                                                    className="border-red-600 text-red-600"
                                                                    onClick={() =>
                                                                        handleDeleteOrderItem(
                                                                            item,
                                                                        )
                                                                    }
                                                                >
                                                                    Xóa
                                                                </Button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ),
                                            )}
                                        </tbody>
                                    </table>
                                    {serviceOrder?.length == 0 && (
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
                <div className="w-full">
                    <div className="flex h-fit w-full flex-col gap-5 rounded-xl border-[1px] border-secondaryDark border-opacity-20 bg-white p-5 shadow-third">
                        <div className="flex flex-row justify-between">
                            <p className="text-[14px] font-bold text-secondarySupperDarker">
                                Danh sách dịch vụ
                            </p>
                            <Input
                                size="small"
                                className="w-[200px]"
                                prefix={
                                    <Search
                                        size={14}
                                        className="rounded-lg text-secondaryDark"
                                    />
                                }
                                placeholder="Tìm kiếm"
                                onChange={(e) => setSearchValue(e.target.value)}
                            />
                        </div>

                        <div>
                            <div className="relative">
                                <table className="w-full table-auto border-collapse">
                                    <thead className="sticky top-0 z-10 bg-white">
                                        <tr>
                                            <th className="w-[20%] border-b-[1px] border-r-[1px] border-secondarySupperDarker text-start text-[14px] font-bold text-secondarySupperDarker">
                                                <div className="py-2 text-center">
                                                    Mã xét nghiệm
                                                </div>
                                            </th>
                                            <th className="w-[30%] border-b-[1px] border-r-[1px] border-secondarySupperDarker text-start text-[14px] font-bold text-secondarySupperDarker">
                                                <div className="py-2 text-center">
                                                    Tên xết nghiệm
                                                </div>
                                            </th>
                                            <th className="w-[25%] border-b-[1px] border-r-[1px] border-secondarySupperDarker text-start text-[14px] font-bold text-secondarySupperDarker">
                                                <div className="py-2 text-center">
                                                    Đơn giá
                                                </div>
                                            </th>
                                            <th className="border-b-[1px] border-secondarySupperDarker text-secondarySupperDarker">
                                                <div className="py-2 text-center">
                                                    Chỉ định
                                                </div>
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
                                            {services.map(
                                                (
                                                    service: any,
                                                    index: number,
                                                ) => (
                                                    <tr key={index}>
                                                        <td className="w-[20%] border-b-[1px] border-r-[1px] border-secondarySupperDarker text-[14px] font-medium text-secondarySupperDarker">
                                                            <div className="py-2 text-center">
                                                                {service?.code}
                                                            </div>
                                                        </td>
                                                        <td className="w-[30%] border-b-[1px] border-r-[1px] border-secondarySupperDarker text-[14px] font-medium text-secondarySupperDarker">
                                                            <div className="py-2 text-center">
                                                                {service?.name}
                                                            </div>
                                                        </td>
                                                        <td className="w-[25%] border-b-[1px] border-r-[1px] border-secondarySupperDarker text-[14px] font-medium text-secondarySupperDarker">
                                                            <div className="py-2 text-center">
                                                                {service?.price}{' '}
                                                                vnđ
                                                            </div>
                                                        </td>
                                                        <td className="border-b-[1px] border-secondarySupperDarker">
                                                            <div className='text-center py-2'>
                                                                <Button
                                                                    type="primary"
                                                                    className="bg-secondaryDark"
                                                                    onClick={() =>
                                                                        handleAddServiceItem(
                                                                            service,
                                                                        )
                                                                    }
                                                                >
                                                                    Thêm
                                                                </Button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ),
                                            )}
                                        </tbody>
                                    </table>
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
    )
}
