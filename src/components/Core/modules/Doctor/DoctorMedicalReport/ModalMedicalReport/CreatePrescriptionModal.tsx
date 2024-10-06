import { Button, Input, Modal } from 'antd'
import { ArrowUpDown, ClipboardPlus, PackageCheck, PackageMinus, Search } from 'lucide-react'
import React from 'react'

type TProps = {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function CreatePrescriptionModal({ open, setOpen }: TProps) {
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
                                            {Array.from({ length: 10 }).map(
                                                (_, index) => (
                                                    <tr key={index}>
                                                        <td className="w-[200px] border-b-[1px] border-r-[1px] border-secondarySupperDarker px-[21.5px] py-[14px] text-center text-[14px] font-medium text-secondarySupperDarker">
                                                            Tên thuốc
                                                        </td>
                                                        <td className="w-[100px] border-b-[1px] border-r-[1px] border-secondarySupperDarker px-[21.5px] py-[14px] text-center text-[14px] font-medium text-secondarySupperDarker">
                                                            Dạng
                                                        </td>
                                                        <td className="w-[250px] border-b-[1px] border-r-[1px] border-secondarySupperDarker px-[21.5px] py-[14px] text-center text-[14px] font-medium text-secondarySupperDarker">
                                                            <Input
                                                                type="text"
                                                                placeholder="Nhập cách sử dụng..."
                                                            ></Input>
                                                        </td>
                                                        <td className="w-[180px] border-b-[1px] border-r-[1px] border-secondarySupperDarker px-[21.5px] py-[14px] text-center text-[14px] font-medium text-secondarySupperDarker">
                                                            <Input
                                                                type="number"
                                                                placeholder="Nhập số lượng"
                                                            />
                                                        </td>
                                                        <td className="w-[120px] border-b-[1px] border-secondarySupperDarker px-[21.5px] py-[14px] text-center text-[14px] font-medium text-secondarySupperDarker">
                                                            <div className='flex flex-row gap-2'>
                                                                <Button type='primary' className='bg-secondaryDark'>
                                                                    Lưu lại / <PackageCheck size={16} />
                                                                </Button>
                                                                <Button type='primary' className='bg-red-600'>
                                                                    Xóa / <PackageMinus size={16} />
                                                                </Button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ),
                                            )}
                                        </tbody>
                                    </table>
                                    {/* <div className="flex h-full w-full items-center justify-center">
                                        <p className="select-none text-[24px] font-bold text-secondarySupperDarker text-opacity-40">
                                            Chưa có dữ liệu
                                        </p>
                                    </div> */}
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
                                            <th className="w-[250px] border-b-[1px] border-r-[1px] border-secondarySupperDarker px-5 py-[14px] text-center text-[14px] font-bold text-secondarySupperDarker">
                                                <div className="relative flex w-full flex-row items-center justify-center">
                                                    <p>Tên thuốc</p>
                                                    <div className="absolute right-0 cursor-pointer">
                                                        <ArrowUpDown
                                                            size={16}
                                                        />
                                                    </div>
                                                </div>
                                            </th>
                                            <th className="w-[100px] border-b-[1px] border-r-[1px] border-secondarySupperDarker px-5 py-[14px] text-center text-[14px] font-bold text-secondarySupperDarker">
                                                Dạng
                                            </th>
                                            <th className="border-b-[1px] border-secondarySupperDarker px-[50px] py-[14px] text-secondarySupperDarker">
                                                Thêm vào đơn
                                            </th>
                                        </tr>
                                    </thead>
                                </table>
                                <div
                                    style={{
                                        maxHeight: '360px',
                                        overflowY: 'auto',
                                    }}
                                >
                                    <table className="w-full table-auto border-collapse">
                                        <tbody>
                                            {Array.from({ length: 10 }).map(
                                                (_, index) => (
                                                    <tr key={index}>
                                                        <td className="w-[250px] border-b-[1px] border-r-[1px] border-secondarySupperDarker px-[21.5px] py-[14px] text-center text-[14px] font-medium text-secondarySupperDarker">
                                                            Mã xét nghiệm
                                                        </td>
                                                        <td className="w-[100px] border-b-[1px] border-r-[1px] border-secondarySupperDarker px-[21.5px] py-[14px] text-center text-[14px] font-medium text-secondarySupperDarker">
                                                            Dạng
                                                        </td>
                                                        <td className="border-b-[1px] border-secondarySupperDarker text-center">
                                                            <div className="w-full items-center justify-center">
                                                                <Button
                                                                    type="primary"
                                                                    className="rounded-lg bg-secondaryDark px-5 py-0"
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
                    Tổng số xét nghiệm: 6
                </p>
                <p className="text-[14px] font-bold text-secondarySupperDarker">
                    Tổng phí xét nghiệm: 840.000 đ
                </p>
            </div>
        </Modal>
    )
}
