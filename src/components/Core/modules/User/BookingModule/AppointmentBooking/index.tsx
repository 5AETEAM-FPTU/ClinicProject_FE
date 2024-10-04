"use client"
import React from 'react'
import { Input, Select, Rate } from 'antd'
import { Search, User, BookOpen, Star } from 'lucide-react'
import { useGetAllDoctorForBookingQuery, useGetBookedAppointmentsQuery } from '@/stores/services/user/userAppointments'
import Paginate from '@/components/Core/common/Paginate'

const { Option } = Select

function formatDateRange(startDate: string, endDate: string) {
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Lấy giờ và phút
    const formatTime = (date: Date) => date.getHours() + ':' + date.getMinutes().toString().padStart(2, '0');

    // Lấy ngày/tháng/năm
    const formatDate = (date: Date) => date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();

    // Kết hợp thành chuỗi
    return `${formatTime(start)} - ${formatTime(end)} ${formatDate(start)}`;
}


export default function Component({ handleBookDoctor }: { handleBookDoctor: (id: string) => void }) {
    const doctors = useGetAllDoctorForBookingQuery();
    const appointments = useGetBookedAppointmentsQuery();
    const doctorsData = !doctors.isLoading && doctors?.data?.body?.userDetails?.contents;
    const appointmentsData = !appointments.isLoading && appointments?.data?.body?.appointment;

    return (
        <div className="">
            <h1 className="text-2xl font-bold text-secondarySupperDarker mb-4">Đặt lịch khám</h1>

            <h2 className="text-xl font-semibold text-secondarySupperDarker opacity-60 mb-2">Lịch đã đặt</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-[10px] mb-8">
                {!appointments.isLoading && appointmentsData?.map((appointment: any) => (
                    <div key={appointment.appointmentId} className="bg-white rounded-lg shadow-md p-4 flex items-center">
                        <img src={`${appointment.doctorDetails.avatarUrl}`} alt="Doctor" className="w-12 h-12 rounded-full mr-4" />
                        <div>
                            <h3 className="font-semibold text-secondarySupperDarker">{appointment.doctorDetails.fullName}</h3>
                            <p className="text-[12px] text-secondarySupperDarker opacity-80">{formatDateRange(appointment.startDate, appointment.endDate)}</p>
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-[20px]">
                {!doctors.isLoading && doctorsData?.map((doctor: any) => (
                    <div key={doctor.username} className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-center mb-4">
                            <img src={`${doctor.avatarUrl}`} alt="Doctor" className="w-16 h-16 rounded-full mr-4" />
                            <div>
                                <h3 className="font-semibold text-base text-secondarySupperDarker">{doctor.fullName}</h3>
                                <p className="text-base text-secondarySupperDarker opacity-80"><span className='font-semibold'>Chuyên trị: </span>{doctor.specialties?.map((spec: any) => spec.specialtyName).join(', ')}</p>
                                <p className="text-base text-secondarySupperDarker opacity-80"><span className='font-semibold'>Giá khám:</span> 150.000đ</p>
                            </div>
                        </div>
                        <p className="text-base text-secondarySupperDarker mb-4 line-clamp-3 h-[72px]">
                            {doctor.description}
                        </p>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-semibold mb-1 text-secondarySupperDarker">Đánh giá</p>
                                <div className="flex text-[14px] font-semibold text-secondarySupperDarker">{doctor.rating} <Star fill='#FAFF00' className="ml-1 text-[#FAFF00]" /></div>
                            </div>
                            <button className="bg-secondaryDark text-white px-4 py-2 rounded-[12px] font-bold" onClick={() => handleBookDoctor(doctor.username)}>
                                Đặt ngay
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <Paginate totalPages={20} />
        </div>
    )
}