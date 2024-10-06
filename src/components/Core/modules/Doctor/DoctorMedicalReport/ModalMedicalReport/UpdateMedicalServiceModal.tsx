'use client'
import { Button, Input, Modal } from 'antd'
import { Edit, Search, View } from 'lucide-react'
import React from 'react'
type TProps = {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}
export default function UpdateMedicalServiceModal({ open, setOpen }: TProps) {
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
                                            <tr>
                                                <td className="w-[150px] border-b-[1px] border-r-[1px] border-secondarySupperDarker px-5 py-[14px] text-center text-[14px] font-medium text-secondarySupperDarker">
                                                    Mã xét nghiệm
                                                </td>
                                                <td className="w-[290px] border-b-[1px] border-r-[1px] border-secondarySupperDarker px-5 py-[14px] text-center text-[14px] font-medium text-secondarySupperDarker">
                                                    Tên xét nghiệm
                                                </td>
                                                <td className="w-[150px] border-b-[1px] border-r-[1px] border-secondarySupperDarker px-5 py-[14px] text-center text-[14px] font-medium text-secondaryDark">
                                                    Đã cập nhật
                                                </td>
                                                <td className="w-[180px] border-b-[1px] border-r-[1px] border-secondarySupperDarker px-5 py-[14px] text-center text-[14px] font-medium text-secondarySupperDarker">
                                                    <Button
                                                        type="primary"
                                                        className="!bg-[#15803D]"
                                                    >
                                                        Chỉnh sửa
                                                        <Edit size={16}/>
                                                    </Button>
                                                </td>
                                                <td className="w-[120px] border-b-[1px] border-r-[1px] border-secondarySupperDarker px-5 py-[14px] text-center text-[14px] font-medium text-secondarySupperDarker">
                                                    100.000đ
                                                </td>
                                                <td className="w-[120px] border-b-[1px] border-secondarySupperDarker px-5 py-[14px] text-center text-[14px] font-bold text-secondarySupperDarker">
                                                    <div className="flex w-full items-center justify-center">
                                                        <View
                                                            size={20}
                                                            className="cursor-pointer transition-all hover:scale-x-110 hover:text-secondaryDark"
                                                        />
                                                    </div>
                                                </td>
                                            </tr>
                                            
                                            {Array.from({ length: 10 }).map(
                                                (_, index) => (
                                                    <tr key={index}>
                                                        <td className="w-[150px] border-b-[1px] border-r-[1px] border-secondarySupperDarker px-5 py-[14px] text-center text-[14px] font-medium text-secondarySupperDarker">
                                                            Mã xét nghiệm
                                                        </td>
                                                        <td className="w-[290px] border-b-[1px] border-r-[1px] border-secondarySupperDarker px-5 py-[14px] text-center text-[14px] font-medium text-secondarySupperDarker">
                                                            Tên xét nghiệm
                                                        </td>
                                                        <td className="w-[150px] border-b-[1px] border-r-[1px] border-secondarySupperDarker px-5 py-[14px] text-center text-[14px] font-medium text-secondaryDark">
                                                            Chưa cập nhật
                                                        </td>
                                                        <td className="w-[180px] border-b-[1px] border-r-[1px] border-secondarySupperDarker px-5 py-[14px] text-center text-[14px] font-medium text-secondarySupperDarker">
                                                            <Button
                                                                type="primary"
                                                                className="!bg-secondaryDark"
                                                            >
                                                                Viết kết quả
                                                            </Button>
                                                        </td>
                                                        <td className="w-[120px] border-b-[1px] border-r-[1px] border-secondarySupperDarker px-5 py-[14px] text-center text-[14px] font-medium text-secondarySupperDarker">
                                                            100.000đ
                                                        </td>
                                                        <td className="w-[120px] border-b-[1px] border-secondarySupperDarker px-5 py-[14px] text-center text-[14px] font-bold text-secondarySupperDarker">
                                                            <div className="flex w-full items-center justify-center">
                                                                <View
                                                                    size={20}
                                                                    className="cursor-pointer transition-all hover:scale-x-110 hover:text-secondaryDark"
                                                                />
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ),
                                            )}
                                        </tbody>
                                    </table>
                                    {/* <div className='w-full h-full flex items-center justify-center'>
                                      <p className='text-secondarySupperDarker font-bold text-[24px] text-opacity-40 select-none'>Chưa có dữ liệu</p>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='mt-5'>
              <p className='text-[14px] font-semibold text-secondarySupperDarker'>Tổng số xét nghiệm: 6</p>
              <p className='text-[14px] font-bold text-secondarySupperDarker'>Tổng phí xét nghiệm: 840.000 đ</p>
            </div>
        </Modal>
    )
}
