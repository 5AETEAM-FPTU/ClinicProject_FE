'use client'
import {
    useAddMedicineOrderItemMutation,
    useDeleteMedicineOrderItemMutation,
    useGetAllMedicineAvailableQuery,
    useGetMedicineOrderByIdQuery,
    useUpdateMedicineOrderItemMutation,
} from '@/stores/services/report/medicineOrder'
import { Button, Input, message, Modal } from 'antd'
import {
    ArrowUpDown,
    ClipboardPlus,
    PackageCheck,
    PackageMinus,
    Search,
} from 'lucide-react'
import React, { useEffect, useState } from 'react'

type TProps = {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    medicineOrderId?: string
}
export type MedicineType = {
    medicineId: string
    medicineName: string
    manufacture: string
    ingredient: string
    type: {
        typeId: string
        name: string
        constant: string
    }
    group: {
        groupId: string
        name: string
        constant: string
    }
}

export default function CreatePrescriptionModal({
    open,
    setOpen,
    medicineOrderId,
}: TProps) {
    const [searchValue, setSearchValue] = useState<string>('')
    const { medicines, refetch: refetchMedicines } =
        useGetAllMedicineAvailableQuery(
            { medicineName: searchValue },
            {
                skip: !open,
                selectFromResult: ({ data }) => ({
                    medicines: data?.body?.medicines ?? [],
                }),
            },
        )

    const { medicineOrder, refetch: refetchMedicineOrder } =
        useGetMedicineOrderByIdQuery(medicineOrderId!, {
            selectFromResult: ({ data }) => ({
                medicineOrder: data?.body?.medicineOrder ?? {},
            }),
        })
    useEffect(() => {
        if (open) {
            refetchMedicines()
            refetchMedicineOrder()
        }
    }, [open])

    const [addMedicineOrderItem] = useAddMedicineOrderItemMutation()
    const handleAddMedicineOrder = async (medicineId: string) => {
        try {
            await addMedicineOrderItem({
                medicineOrderId: medicineOrderId!,
                medicineId: medicineId,
            }).unwrap()
            refetchMedicineOrder()
            message.success('Thêm thành công!')
        } catch (error:any) {
            if(error?.data?.appCode == "OrderMedicinesFeature: MEDICINE_ALREADY_EXIST") {
                message.error('Đã tồn tại thuốc này trong đơn chỉ định!')
            } else 
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
                            Đơn thuốc
                        </p>
                        <div>
                            <div className="relative">
                                <table className="w-full table-auto border-collapse">
                                    <thead className="sticky top-0 z-10 bg-white">
                                        <tr>
                                            <th className="w-[200px] border-b-[1px] border-r-[1px] border-secondarySupperDarker px-5 py-[14px] text-center text-[14px] font-bold text-secondarySupperDarker">
                                                Tên thuốc
                                            </th>
                                            <th className="w-[100px] border-b-[1px] border-r-[1px] border-secondarySupperDarker px-5 py-[14px] text-center text-[14px] font-bold text-secondarySupperDarker">
                                                Dạng
                                            </th>
                                            <th className="w-[250px] border-b-[1px] border-r-[1px] border-secondarySupperDarker px-5 py-[14px] text-center text-[14px] font-bold text-secondarySupperDarker">
                                                Cách sử dụng
                                            </th>
                                            <th className="w-[180px] border-b-[1px] border-r-[1px] border-secondarySupperDarker px-5 py-[14px] text-center text-[14px] font-bold text-secondarySupperDarker">
                                                Số lượng
                                            </th>
                                            <th className="border-b-[1px] border-secondarySupperDarker px-[50px] py-[14px]"></th>
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
                                            {medicineOrder?.items?.map(
                                                (
                                                    item: MedicinOrderedItemInfor,
                                                    index: number,
                                                ) => (
                                                    <PrescriptionRow
                                                        payload={item}
                                                        key={index}
                                                        index={index}
                                                        medicineOrderId={
                                                            medicineOrderId!
                                                        }
                                                        refetch={
                                                            refetchMedicineOrder
                                                        }
                                                    />
                                                ),
                                            )}
                                        </tbody>
                                    </table>
                                    {medicineOrder?.items?.length === 0 && (
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
                <div className="fit">
                    <div className="flex h-fit w-full flex-col gap-5 rounded-xl border-[1px] border-secondaryDark border-opacity-20 bg-white p-5 shadow-third">
                        <div className="flex flex-row justify-between">
                            <p className="text-[14px] font-bold text-secondarySupperDarker">
                                Kho thuốc
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
                            />
                        </div>

                        <div>
                            <div className="relative">
                                <table className="w-full table-auto border-collapse">
                                    <thead className="sticky top-0 z-10 bg-white">
                                        <tr>
                                            <th className="w-[200px] border-b-[1px] border-r-[1px] border-secondarySupperDarker px-5 py-[14px] text-center text-[14px] font-bold text-secondarySupperDarker">
                                                <div className="relative flex w-full flex-row items-center justify-center">
                                                    <p>Tên thuốc</p>
                                                    <div className="absolute right-0 cursor-pointer">
                                                        <ArrowUpDown
                                                            size={16}
                                                        />
                                                    </div>
                                                </div>
                                            </th>
                                            <th className="w-[200px] border-b-[1px] border-r-[1px] border-secondarySupperDarker px-5 py-[14px] text-center text-[14px] font-bold text-secondarySupperDarker">
                                                Dạng
                                            </th>
                                            <th className="border-b-[1px] border-secondarySupperDarker px-[50px] py-[14px] text-secondarySupperDarker">
                                                Thêm
                                            </th>
                                        </tr>
                                    </thead>
                                </table>
                                <div
                                    style={{
                                        maxHeight: '360px',
                                        overflowY: 'auto',
                                        height: '360px',
                                    }}
                                >
                                    <table className="w-full table-auto border-collapse">
                                        <tbody>
                                            {medicines?.map(
                                                (
                                                    medicine: MedicineType,
                                                    index: number,
                                                ) => (
                                                    <tr key={index}>
                                                        <td className="w-[200px] border-b-[1px] border-r-[1px] border-secondarySupperDarker px-[21.5px] py-[14px] text-center text-[14px] font-medium text-secondarySupperDarker">
                                                            {
                                                                medicine?.medicineName
                                                            }
                                                        </td>
                                                        <td className="w-[200px] border-b-[1px] border-r-[1px] border-secondarySupperDarker px-[21.5px] py-[14px] text-center text-[14px] font-medium text-secondarySupperDarker">
                                                            {
                                                                medicine?.type
                                                                    .name
                                                            }
                                                        </td>
                                                        <td className="border-b-[1px] border-secondarySupperDarker text-center">
                                                            <div className="w-full items-center justify-center">
                                                                <Button
                                                                    type="primary"
                                                                    className="rounded-lg bg-secondaryDark px-5 py-0"
                                                                    onClick={() => {
                                                                        handleAddMedicineOrder(
                                                                            medicine?.medicineId,
                                                                        )
                                                                    }}
                                                                >
                                                                    Thêm
                                                                    <ClipboardPlus
                                                                        size={
                                                                            16
                                                                        }
                                                                    />
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
                    Dặn dò
                </p>
                <Input.TextArea />
            </div>
        </Modal>
    )
}

type PrescriptionRowProps = {
    index: number
    medicineOrderId: string
    payload: MedicinOrderedItemInfor
    refetch: () => void
}
type MedicinOrderedItemInfor = {
    quantity: number
    description: string
    medicine: {
        id: string
        name: string
        type: {
            id: string
            name: string
            constant: string
        }
    }
}

const PrescriptionRow = ({
    index,
    medicineOrderId,
    payload,
    refetch,
}: PrescriptionRowProps) => {
    const [quantity, setQuantity] = useState(payload?.quantity)
    const [description, setDescription] = useState(payload?.description)
    const [deleteMedicineOrderItem] = useDeleteMedicineOrderItemMutation()
    const handleDeleteOrderItem = async () => {
        try {
            await deleteMedicineOrderItem({
                medicineOrderId: medicineOrderId,
                medicineId: payload?.medicine?.id,
            }).unwrap()
            refetch()
            message.success('Xoá thành công!')
        } catch (error) {
            message.error('Xóa không thành công')
        }
    }
    const [updateMedicineOrderItem] = useUpdateMedicineOrderItemMutation()
    const handleUpdateOrderItem = async () => {
        try {
            await updateMedicineOrderItem({
                medicineOrderId: medicineOrderId,
                medicineId: payload?.medicine?.id,
                quantity: quantity.toString(),
                description: description,
            }).unwrap()
            refetch()
            message.success('Cập nhật thành công!')
        } catch (error) {
            message.error('Cập nhật không thành công')
        }
    }
    return (
        <tr key={index}>
            <td className="w-[200px] border-b-[1px] border-r-[1px] border-secondarySupperDarker px-[21.5px] py-[14px] text-center text-[14px] font-medium text-secondarySupperDarker">
                {payload?.medicine?.name}
            </td>
            <td className="w-[100px] border-b-[1px] border-r-[1px] border-secondarySupperDarker px-[21.5px] py-[14px] text-center text-[14px] font-medium text-secondarySupperDarker">
                {payload?.medicine?.type?.name}
            </td>
            <td className="w-[250px] border-b-[1px] border-r-[1px] border-secondarySupperDarker px-[21.5px] py-[14px] text-center text-[14px] font-medium text-secondarySupperDarker">
                <Input
                    type="text"
                    placeholder="Nhập cách sử dụng..."
                    defaultValue={payload?.description}
                    onChange={(e) => setDescription(e.target.value)}
                ></Input>
            </td>
            <td className="w-[180px] border-b-[1px] border-r-[1px] border-secondarySupperDarker px-[21.5px] py-[14px] text-center text-[14px] font-medium text-secondarySupperDarker">
                <Input
                    type="number"
                    placeholder="Nhập số lượng"
                    defaultValue={payload?.quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                />
            </td>
            <td className="w-[120px] border-b-[1px] border-secondarySupperDarker px-[21.5px] py-[14px] text-center text-[14px] font-medium text-secondarySupperDarker">
                <div className="flex flex-row gap-2">
                    <Button
                        type="primary"
                        className="rounded-lg bg-secondaryDark"
                        onClick={() => handleUpdateOrderItem()}
                    >
                        Lưu lại / <PackageCheck size={16} />
                    </Button>
                    <Button
                        type="primary"
                        className="rounded-lg bg-red-600"
                        onClick={() => handleDeleteOrderItem()}
                    >
                        Xóa / <PackageMinus size={16} />
                    </Button>
                </div>
            </td>
        </tr>
    )
}
