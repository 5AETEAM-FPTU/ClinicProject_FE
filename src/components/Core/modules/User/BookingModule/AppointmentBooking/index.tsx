"use client"
import React, { useEffect, useMemo, useState } from 'react'
import { Input, Select, Rate, Skeleton } from 'antd'
import { Search, User, BookOpen, Star } from 'lucide-react'
import { useGetAllDoctorForBookingQuery, useGetBookedAppointmentsQuery, useLazyGetAllDoctorForBookingQuery } from '@/stores/services/user/userAppointments'
import Paginate from '@/components/Core/common/Paginate'
import { useRouter } from 'next-nprogress-bar'
import { useGetAllGenderQuery, useGetAllSpecicaltiesQuery } from '@/stores/services/enum/enum'
import { debounce } from 'lodash'

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

const serialize = function (obj: any) {
    var str = [];
    for (var p in obj)
        if (obj.hasOwnProperty(p)) {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
    return str.join("&");
}

export const DoctorSkeleton = ({ size, skeletonSize }: { size: number, skeletonSize: number }) => {
    return (
        <div className='flex'>
            {[...Array(size)].map((_, index) => (
                <div key={index} className='flex w-full p-4'>
                    <Skeleton.Avatar size={skeletonSize} active shape='square' className='rounded-full mr-4' />
                    <Skeleton paragraph active />
                </div>
            )
            )}
        </div>
    )
}


export default function Component() {
    const [getDoctors, { data: doctors, isFetching: isDoctorFetching }] = useLazyGetAllDoctorForBookingQuery();
    const [search, setSearch] = useState('');
    const [genderId, setGenderId] = useState('');
    const [specialtyId, setSpecialtyId] = useState('');
    console.log("doctor", doctors);
    useEffect(() => {
        getDoctors({ pageIndex: 1, doctorName: search, doctorGender: genderId, doctorSpecialtyId: specialtyId });
    }, [search, genderId, specialtyId]);
    const appointments = useGetBookedAppointmentsQuery();
    const { data: genders } = useGetAllGenderQuery({});
    const { data: specialties } = useGetAllSpecicaltiesQuery({});
    console.log(genders, specialties);
    console.log(appointments);
    const router = useRouter();
    const doctorsData = !isDoctorFetching && doctors?.body?.userDetails?.contents;
    const appointmentsData = !appointments.isLoading && appointments?.data?.body?.appointment;
    const handleBookDoctor = (doctor: { fullName: string, id: string, specialties: any }) => {
        router.push(`booking/schedule?${serialize({ fullName: doctor.fullName, doctorId: doctor.id, specialties: doctor.specialties?.map((spec: any) => spec.specialtyName).join(', ') })}`)
    }
    const handleUpdateAppointment = (doctor: { fullName: string, doctorId: string, specialties: any, appointmentId: string }) => {
        router.push(`booking/schedule?${serialize({ appointmentId: doctor.appointmentId, isUpdate: true, fullName: doctor.fullName, doctorId: doctor.doctorId, specialties: doctor.specialties?.map((spec: any) => spec.name).join(', ') })}`)
    }
    const handlePageChange = (page: number) => {
        getDoctors({ pageIndex: page, doctorName: search, doctorGender: genderId, doctorSpecialtyId: specialtyId });
    }
    return (
        <div className="">
            <h1 className="text-2xl font-bold text-secondarySupperDarker mb-4">Đặt lịch khám</h1>

            <h2 className="text-xl font-semibold text-secondarySupperDarker opacity-60 mb-2">Lịch đã đặt</h2>
            {appointments.isFetching ? <DoctorSkeleton size={3} skeletonSize={32} /> :
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-[10px] mb-8">
                    {!appointments.isLoading && appointmentsData?.map((appointment: any) => (
                        <div key={appointment.appointmentId} className="bg-white rounded-lg shadow-md p-4 flex items-center">
                            <img src={`${appointment.doctorDetails.avatarUrl}`} alt="Doctor" className="w-12 h-12 rounded-full mr-4" />
                            <div>
                                <h3 className="font-semibold text-secondarySupperDarker">{appointment.doctorDetails.fullName}</h3>
                                <p className="text-[12px] text-secondarySupperDarker opacity-80">{formatDateRange(appointment.startDate, appointment.endDate)}</p>
                            </div>
                            <button onClick={() => handleUpdateAppointment({ ...appointment.doctorDetails, appointmentId: appointment.appointmentId })} className="w-20 min-h-[37px] ml-auto bg-[#00B5F1] text-white px-3 py-1 rounded-[10px] text-sm">
                                Cập nhật
                            </button>
                        </div>
                    ))}
                </div>
            }

            <h2 className="text-xl font-semibold text-secondarySupperDarker opacity-60 mb-2">Chọn bác sĩ</h2>
            <div className="flex flex-col xl:flex-row gap-4 mb-8">
                <Input
                    suffix={<Search className="text-secondarySupperDarker" />}
                    onChange={search => setSearch(search.target.value)}
                    placeholder="Tìm theo tên"
                    className="flex-grow text-secondarySupperDarker"
                />
                <Select
                    onChange={(value) => setGenderId(value)}
                    className="w-full xl:w-48 text-secondarySupperDarker"
                    placeholder="Giới tính"
                    defaultValue={""}
                    suffixIcon={<User className="text-gray-400" />}
                >
                    <Option value="" className="text-secondarySupperDarker">Tất cả</Option>
                    {genders && genders.body.genders.map((gender: any) => (
                        <Option key={gender.id} value={gender.id} className="text-secondarySupperDarker">{gender.genderName}</Option>
                    ))}
                </Select>
                <Select
                    onChange={(value) => setSpecialtyId(value)}
                    className="w-full xl:w-48 text-secondarySupperDarker"
                    placeholder="Chuyên khoa"
                    suffixIcon={<BookOpen className="text-gray-400" />}
                    defaultValue={""}
                >
                    <Option value="" className="text-secondarySupperDarker">Tất cả</Option>
                    {specialties && specialties.body.specialties.map((specialty: any) => (
                        <Option key={specialty.id} value={specialty.id} className="text-secondarySupperDarker">{specialty.specialtyName}</Option>
                    ))}
                </Select>
            </div>
            {isDoctorFetching ? <DoctorSkeleton size={3} skeletonSize={64} /> :
                <>
                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-[20px] gap-6">
                        {doctorsData?.map((doctor: any) => (
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
                                    <button className="bg-secondaryDark text-white px-4 py-2 rounded-[12px] font-bold" onClick={() => handleBookDoctor(doctor)}>
                                        Đặt ngay
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <Paginate onPageChange={handlePageChange} totalPages={doctors?.body?.userDetails?.totalPages || 0} page={doctors?.body?.userDetails?.pageIndex || 1} />
                </>
            }
        </div>
    )
}