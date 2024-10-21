'use client'

import { Avatar, Button, Input, Skeleton } from 'antd'
import { Calendar, SearchCheckIcon } from 'lucide-react'
import BookingByDoctorBanner from '@public/landing/images/BookingByDoctorBanner.svg'
import BookingBanner from '@public/landing/images/BookingBanner.png'
import Image from 'next/image'
import Paginate from '@/components/Core/common/Paginate'
import Search from 'antd/es/input/Search'
import { useGetAllDoctorForBookingQuery } from '@/stores/services/user/userAppointments'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function BookingDoctorLandingPage() {
    const router = useRouter()
    const serialize = function (obj: any) {
        var str = []
        for (var p in obj)
            if (obj.hasOwnProperty(p)) {
                str.push(
                    encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]),
                )
            }
        return str.join('&')
    }
    const handleBookDoctor = (doctor: {
        fullName: string
        id: string
        specialties: any
    }) => {
        router.push(
            `/doctor-schedule?${serialize({ fullName: doctor.fullName, doctorId: doctor.id, specialties: doctor.specialties?.map((spec: any) => spec.specialtyName).join(', ') })}`,
        )
    }

    const [page, setPage] = useState(1)
    const [search, setSearch] = useState('')
    const [totalPages, setTotalPages] = useState(0)
    const [doctors, setDoctors] = useState<any[]>([])
    const {
        data: doctorResult,
        refetch,
        isFetching,
    } = useGetAllDoctorForBookingQuery({
        pageIndex: page,
        doctorName: search,
    })

    useEffect(() => {
        setPage(1)
    }, [search])

    useEffect(() => {
        refetch()
    }, [page, search])

    useEffect(() => {
        if (doctorResult) {
            setDoctors(doctorResult.body.userDetails.contents)
            setTotalPages(doctorResult.body.totalPages)
        }
    }, [doctorResult])

    return (
        <div className="mt-[130px] flex flex-col items-center justify-center">
            <div className="max-w-[1440ppx]">
                <Image className="w-full px-[80px] object-cover"  src={BookingByDoctorBanner} alt="" />
            </div>
            <div className='w-[1440px] max-w-[1440px] mb-[60px] px-[80px]'>
                <div className="mx-auto mt-5 w-[500px] max-w-[500px] text-center">
                    <Search
                        className="w-full"
                        placeholder="Tìm kiếm theo bác sĩ"
                        size="large"
                        onSearch={(value) => setSearch(value)}
                    />
                </div>
                <div className=" mt-5 flex gap-4">
                    <div className="w-full">
                        <div className="grid w-full grid-cols-1 gap-5">
                            {isFetching &&
                                Array.from({ length: 4 }).map((_, index) => (
                                    <div key={index} className="flex">
                                        <div>
                                            <Skeleton.Avatar
                                                size={120}
                                                shape="square"
                                                active
                                            />
                                        </div>
                                        <div className="ml-4 w-full">
                                            <Skeleton active paragraph />
                                        </div>
                                    </div>
                                ))}
                            {!isFetching &&
                                doctors.map((doctor) => (
                                    <div
                                        key={doctor.id}
                                        className="relative w-[100%] cursor-pointer flex-row gap-5 rounded-xl bg-white px-5 py-4 shadow-third transition-all hover:bg-slate-50"
                                    >
                                        <div className="flex">
                                            <div>
                                                <Avatar
                                                    size={120}
                                                    shape="square"
                                                    src={doctor.avatarUrl}
                                                />
                                            </div>
                                            <div className="ml-4 w-full">
                                                <p className="text-[24px] font-semibold text-secondaryDark">
                                                    BS. {doctor.fullName}
                                                </p>
                                                <p className="text-[16px] text-base text-secondarySupperDarker">
                                                    <strong>Giới tính: </strong>{' '}
                                                    {doctor.gender.genderName}
                                                </p>
                                                <p className="text-[16px] text-base text-secondarySupperDarker">
                                                    <strong>
                                                        Chuyên khoa:{' '}
                                                    </strong>{' '}
                                                    {doctor.specialties
                                                        .length != 0
                                                        ? doctor.specialties
                                                              .map(
                                                                  (
                                                                      specialty: any,
                                                                  ) =>
                                                                      specialty.specialtyName,
                                                              )
                                                              .join(', ')
                                                        : `Đang cật nhật`}
                                                </p>
                                                <p className="text-[16px] text-base text-secondarySupperDarker">
                                                    <strong>Giá khám: </strong>{' '}
                                                    150.000đ
                                                </p>
                                            </div>
                                        </div>
                                        <div className="mt-2">
                                            <Button
                                                shape="round"
                                                onClick={() => {
                                                    handleBookDoctor(doctor)
                                                }}
                                                className="float-end h-9 w-[150px] max-w-[150px] bg-gradient-to-r from-[#00B5F1] to-[#00E0FF] text-base text-white"
                                            >
                                                Đặt ngay
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            {totalPages > 1 && (
                                <Paginate
                                    totalPages={totalPages}
                                    page={page}
                                    onPageChange={(page) => {
                                        setPage(page)
                                    }}
                                />
                            )}
                        </div>
                    </div>
                    <div className="w-2/3">
                        <Image src={BookingBanner} alt="" className='rounded-xl' />
                    </div>
                </div>
            </div>
        </div>
    )
}
