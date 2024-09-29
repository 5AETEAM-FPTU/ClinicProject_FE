"use client"
import React from 'react'
import { Input, Select, Rate } from 'antd'
import { Search, User, BookOpen, Star } from 'lucide-react'

const { Option } = Select

export default function Component() {
    return (
        <div className="bg-gray-100 min-h-screen p-4">
            <h1 className="text-2xl font-bold text-secondarySupperDarker mb-4">Đặt lịch khám</h1>

            <h2 className="text-xl font-semibold text-secondarySupperDarker opacity-60 mb-2">Lịch đã đặt</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-[10px] mb-8">
                {[1, 2, 3, 4, 5, 6].map((_, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-md p-4 flex items-center">
                        <img src="/placeholder.svg" alt="Doctor" className="w-12 h-12 rounded-full mr-4" />
                        <div>
                            <h3 className="font-semibold text-secondarySupperDarker">Tên bác sĩ</h3>
                            <p className="text-[12px] text-secondarySupperDarker opacity-80">7:00 - 8:00 29/9/2024</p>
                        </div>
                        <button className="w-20 min-h-[37px] ml-auto bg-[#00B5F1] text-white px-3 py-1 rounded-[10px] text-sm">
                            Cập nhật
                        </button>
                    </div>
                ))}
            </div>

            <h2 className="text-xl font-semibold text-secondarySupperDarker opacity-60 mb-2">Chọn bác sĩ</h2>
            <div className="flex flex-col md:flex-row gap-4 mb-8">
                <Input
                    prefix={<Search className="text-secondarySupperDarker" />}
                    placeholder="Tìm theo tên"
                    className="flex-grow text-secondarySupperDarker"
                />
                <Select
                    className="w-full md:w-48 text-secondarySupperDarker"
                    placeholder="Giới tính"
                    suffixIcon={<User className="text-gray-400" />}
                >
                    <Option value="all" className="text-secondarySupperDarker">Tất cả</Option>
                    <Option value="male" className="text-secondarySupperDarker">Nam</Option>
                    <Option value="female" className="text-secondarySupperDarker">Nữ</Option>
                </Select>
                <Select
                    className="w-full md:w-48 text-secondarySupperDarker"
                    placeholder="Chuyên khoa"
                    suffixIcon={<BookOpen className="text-gray-400" />}
                >
                    <Option value="cardiology">Tim mạch</Option>
                    <Option value="neurology">Thần kinh</Option>
                </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-[20px] gap-6">
                {[1, 2, 3, 4, 5, 6].map((_, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-center mb-4">
                            <img src="/placeholder.svg" alt="Doctor" className="w-16 h-16 rounded-full mr-4" />
                            <div>
                                <h3 className="font-semibold text-base text-secondarySupperDarker">Tên Bác sĩ</h3>
                                <p className="text-base text-secondarySupperDarker opacity-80"><span className='font-semibold'>Chuyên trị:</span> Đang cật nhật</p>
                                <p className="text-base text-secondarySupperDarker opacity-80"><span className='font-semibold'>Giá khám:</span> 150.000đ</p>
                            </div>
                        </div>
                        <p className="text-base text-secondarySupperDarker mb-4 line-clamp-3 h-[72px]">
                            Tôi là bác sĩ phụ khoa với hơn 20 năm kinh nghiệm trong nghề, tôi đã được nhiều thành tựu như là
                        </p>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-semibold mb-1 text-secondarySupperDarker">Đánh giá</p>
                                <div className="flex text-[14px] font-semibold text-secondarySupperDarker">5 <Star fill='#FAFF00' className="ml-1 text-[#FAFF00]" /></div>
                            </div>
                            <button className="bg-secondaryDark text-white px-4 py-2 rounded-[12px] font-bold">
                                Đặt ngay
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-center mt-8">
                <button className="mx-1 px-3 py-1 rounded-full border-[#DEE2E6] border-[1px] text-[#8392AB] w-9 h-9">&lt;</button>
                <button className="mx-1 px-3 py-1 rounded-full bg-gradient-to-r from-[#4D9EE0] to-[#5582BC] text-white w-9 h-9">1</button>
                <button className="mx-1 px-3 py-1 rounded-full border-[#DEE2E6] border-[1px] text-[#8392AB] w-9 h-9">2</button>
                <button className="mx-1 px-3 py-1 rounded-full border-[#DEE2E6] border-[1px] text-[#8392AB] w-9 h-9">3</button>
                <button className="mx-1 px-3 py-1 rounded-full border-[#DEE2E6] border-[1px] text-[#8392AB] w-9 h-9">&gt;</button>
            </div>
        </div>
    )
}