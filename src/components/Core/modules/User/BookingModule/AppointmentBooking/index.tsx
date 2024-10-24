'use client'
import React, { useEffect, useMemo, useState } from 'react'
import { Input, Select, Rate, Skeleton, Avatar, Button } from 'antd'
import { Search, User, BookOpen, Star } from 'lucide-react'
import {
    useGetAllDoctorForBookingQuery,
    useGetBookedAppointmentsQuery,
    useLazyGetAllDoctorForBookingQuery,
} from '@/stores/services/user/userAppointments'
import Paginate from '@/components/Core/common/Paginate'
import { useRouter } from 'next-nprogress-bar'
import {
    useGetAllGenderQuery,
    useGetAllSpecicaltiesQuery,
} from '@/stores/services/enum/enum'
import { debounce } from 'lodash'
import Image from 'next/image'

const { Option } = Select

function formatDateRange(startDate: string, endDate: string) {
    const start = new Date(startDate)
    const end = new Date(endDate)

    // Lấy giờ và phút
    const formatTime = (date: Date) =>
        date.getHours() + ':' + date.getMinutes().toString().padStart(2, '0')

    // Lấy ngày/tháng/năm
    const formatDate = (date: Date) =>
        date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()

    // Kết hợp thành chuỗi
    return `${formatTime(start)} - ${formatTime(end)} ${formatDate(start)}`
}

const serialize = function (obj: any) {
    var str = []
    for (var p in obj)
        if (obj.hasOwnProperty(p)) {
            str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]))
        }
    return str.join('&')
}

export const DoctorSkeleton = ({
    size,
    skeletonSize,
}: {
    size: number
    skeletonSize: number
}) => {
    return (
        <div className="flex">
            {[...Array(size)].map((_, index) => (
                <div key={index} className="flex w-full p-4">
                    <Skeleton.Avatar
                        size={skeletonSize}
                        active
                        shape="square"
                        className="mr-4 rounded-xl"
                    />
                    <Skeleton paragraph active />
                </div>
            ))}
        </div>
    )
}

export default function Component() {
    const [getDoctors, { data: doctors, isFetching: isDoctorFetching }] =
        useLazyGetAllDoctorForBookingQuery()
    const [search, setSearch] = useState('')
    const [genderId, setGenderId] = useState('')
    const [specialtyId, setSpecialtyId] = useState('')
    console.log('doctor', doctors)
    useEffect(() => {
        getDoctors({
            pageIndex: 1,
            doctorName: search,
            doctorGender: genderId,
            doctorSpecialtyId: specialtyId,
        })
    }, [search, genderId, specialtyId])
    const appointments = useGetBookedAppointmentsQuery()
    const { data: genders } = useGetAllGenderQuery({})
    const { data: specialties } = useGetAllSpecicaltiesQuery({})
    console.log(genders, specialties)
    console.log(appointments)
    const router = useRouter()
    const doctorsData =
        !isDoctorFetching && doctors?.body?.userDetails?.contents
    const appointmentsData =
        !appointments.isLoading && appointments?.data?.body?.appointment
    const handleBookDoctor = (doctor: {
        fullName: string
        id: string
        specialties: any
    }) => {
        router.push(
            `booking/schedule?${serialize({ fullName: doctor.fullName, doctorId: doctor.id, specialties: doctor.specialties?.map((spec: any) => spec.specialtyName).join(', ') })}`,
        )
    }
    const handleUpdateAppointment = (doctor: {
        fullName: string
        doctorId: string
        specialties: any
        appointmentId: string
    }) => {
        router.push(
            `booking/schedule?${serialize({ appointmentId: doctor.appointmentId, isUpdate: true, fullName: doctor.fullName, doctorId: doctor.doctorId, specialties: doctor.specialties?.map((spec: any) => spec.name).join(', ') })}`,
        )
    }
    const handlePageChange = (page: number) => {
        getDoctors({
            pageIndex: page,
            doctorName: search,
            doctorGender: genderId,
            doctorSpecialtyId: specialtyId,
        })
    }
    return (
        <div className="">
            <h1 className="mb-4 text-2xl font-bold text-secondarySupperDarker">
                Đặt lịch khám
            </h1>

            <h2 className="mb-2 text-xl font-semibold text-secondarySupperDarker opacity-60">
                Lịch đã đặt
            </h2>
            {appointments.isFetching ? (
                <DoctorSkeleton size={3} skeletonSize={32} />
            ) : (
                <div className="mb-8 grid grid-cols-1 gap-[10px] xl:grid-cols-3">
                    {!appointments.isLoading &&
                        appointmentsData?.map((appointment: any) => (
                            <div
                                key={appointment.appointmentId}
                                className="shadow-md flex items-center rounded-lg bg-white p-4"
                            >
                                <Avatar
                                    size={32}
                                    src={`${appointment.doctorDetails.avatarUrl}`}
                                    alt="Doctor"
                                    className="mr-4 h-12 w-12 rounded-full"
                                />
                                <div>
                                    <h3 className="font-semibold text-secondarySupperDarker">
                                        Bác sĩ:{' '}
                                        {appointment.doctorDetails.fullName}
                                    </h3>
                                    <p className="text-[12px] text-secondarySupperDarker opacity-80">
                                        {formatDateRange(
                                            appointment.startDate,
                                            appointment.endDate,
                                        )}
                                    </p>
                                </div>
                                <Button
                                    type="primary"
                                    onClick={() =>
                                        handleUpdateAppointment({
                                            ...appointment.doctorDetails,
                                            appointmentId:
                                                appointment.appointmentId,
                                        })
                                    }
                                    className="ml-auto min-h-[37px] w-20 rounded-[10px] bg-secondaryDark px-3 py-1 text-sm text-white"
                                >
                                    Cập nhật
                                </Button>
                            </div>
                        ))}
                </div>
            )}

            <h2 className="mb-2 text-xl font-semibold text-secondarySupperDarker opacity-60">
                Chọn bác sĩ
            </h2>
            <div className="mb-8 flex flex-col gap-4 xl:flex-row">
                <Input
                    suffix={<Search className="text-secondarySupperDarker" />}
                    onChange={(search) => setSearch(search.target.value)}
                    placeholder="Tìm theo tên"
                    className="flex-grow text-secondarySupperDarker"
                />
                <Select
                    onChange={(value) => setGenderId(value)}
                    className="w-full text-secondarySupperDarker xl:w-48"
                    placeholder="Giới tính"
                    defaultValue={''}
                    suffixIcon={<User className="text-gray-400" />}
                >
                    <Option value="" className="text-secondarySupperDarker">
                        Tất cả
                    </Option>
                    {genders &&
                        genders.body.genders.map((gender: any) => (
                            <Option
                                key={gender.id}
                                value={gender.id}
                                className="text-secondarySupperDarker"
                            >
                                {gender.genderName}
                            </Option>
                        ))}
                </Select>
                <Select
                    onChange={(value) => setSpecialtyId(value)}
                    className="w-full text-secondarySupperDarker xl:w-48"
                    placeholder="Chuyên khoa"
                    suffixIcon={<BookOpen className="text-gray-400" />}
                    defaultValue={''}
                >
                    <Option value="" className="text-secondarySupperDarker">
                        Tất cả
                    </Option>
                    {specialties &&
                        specialties.body.specialties.map((specialty: any) => (
                            <Option
                                key={specialty.id}
                                value={specialty.id}
                                className="text-secondarySupperDarker"
                            >
                                {specialty.specialtyName}
                            </Option>
                        ))}
                </Select>
            </div>
            {isDoctorFetching ? (
                <DoctorSkeleton size={3} skeletonSize={64} />
            ) : (
                <>
                    <div className="grid grid-cols-1 gap-[20px] xl:grid-cols-3">
                        {doctorsData?.map((doctor: any) => (
                            <div
                                key={doctor.username}
                                className="shadow-md rounded-lg bg-white p-6 shadow-third"
                            >
                                <div className="mb-4 flex items-center">
                                    <Image
                                        src={`${doctor.avatarUrl}`}
                                        alt="Doctor"
                                        className="mr-4 h-[64px] w-[64px] rounded-[12px] object-cover"
                                        width={400}
                                        height={400}
                                    />
                                    <div>
                                        <h3 className="text-base font-semibold text-secondarySupperDarker">
                                            {doctor.fullName}
                                        </h3>
                                        <p className="text-base text-secondarySupperDarker opacity-80">
                                            <span className="font-semibold">
                                                Chuyên trị:{' '}
                                            </span>
                                            {doctor.specialties
                                                ?.map(
                                                    (spec: any) =>
                                                        spec.specialtyName,
                                                )
                                                .join(', ')}
                                        </p>
                                        <p className="text-base text-secondarySupperDarker opacity-80">
                                            <span className="font-semibold">
                                                Giá khám:
                                            </span>{' '}
                                            150.000đ
                                        </p>
                                    </div>
                                </div>
                                <p className="mb-4 line-clamp-3 h-[72px] text-base text-secondarySupperDarker" dangerouslySetInnerHTML={{ __html: doctor.description }}>
                                  
                                </p>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="mb-1 font-semibold text-secondarySupperDarker">
                                            Đánh giá
                                        </p>
                                        <div className="flex text-[14px] font-semibold text-secondarySupperDarker">
                                            {doctor.rating.toFixed(1)}{' '}
                                            <Star
                                                fill="#FAFF00"
                                                className="ml-1 text-[#FAFF00]"
                                            />
                                        </div>
                                    </div>
                                    <button
                                        className="rounded-[12px] bg-secondaryDark px-4 py-2 font-bold text-white"
                                        onClick={() => handleBookDoctor(doctor)}
                                    >
                                        Đặt ngay
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <Paginate
                        onPageChange={handlePageChange}
                        totalPages={doctors?.body?.userDetails?.totalPages || 0}
                        page={doctors?.body?.userDetails?.pageIndex || 1}
                    />
                </>
            )}
        </div>
    )
}
