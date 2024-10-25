'use client'
import React, { useCallback, useEffect, useState } from 'react'
import { Input, Avatar, Card, Button, Tooltip, Skeleton } from 'antd'
import { Calendar, CalendarCog, ScanSearch, View } from 'lucide-react'
import { useRouter } from 'next-nprogress-bar'
import { useLazyGetStaffGetAllDoctorQuery } from '@/stores/services/staff/staffSettings'
import Paginate from '@/components/Core/common/Paginate'
import { debounce } from 'lodash'

export default function AllDoctorPage() {
    const [totalPages, setTotalPages] = useState(0)
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(6)
    const [keyWord, setKeyWord] = useState('')
    const [doctors, setDoctors] = useState([])

    const [getDoctors, { isFetching, isSuccess, data: doctorResult }] =
        useLazyGetStaffGetAllDoctorQuery()

    // Debounced refetch function
    const debouncedRefetch = useCallback(
        debounce(({ pageSize, page, keyWord }) => {
            try {
                if (getDoctors)
                    getDoctors({ pageSize, pageIndex: page, keyWord })
            } catch (error) {}
        }, 1000),
        [],
    )

    useEffect(() => {
        debouncedRefetch({ pageSize, page, keyWord })
    }, [pageSize, page, keyWord, debouncedRefetch])

    useEffect(() => {
        // Reset the page when certain conditions change
        setPage(1)
    }, [keyWord, pageSize])

    // Update doctors and pagination info when the query result is available
    useEffect(() => {
        if (doctorResult) {
            setDoctors(doctorResult.body.userDetails.contents)
            setTotalPages(doctorResult.body.userDetails.totalPages)
            setPage(doctorResult.body.userDetails.pageIndex)
        }
    }, [doctorResult])

    const router = useRouter()

    // Handle doctor selection and redirect to the calendar setting page
    const handleChangeDoctorForSetCalendar = (doctor: any) => {
        const specialties = doctor.specialties
            .map((specialty: any) => specialty.specialtyName)
            .join(', ')
        router.push(
            `set-calendar/${doctor.id}?doctorName=${doctor.fullName}&specialties=${specialties}&isOnDuty=${doctor.isOnDuty}&avatarUrl=${doctor.avatarUrl}`,
        )
    }
    const handleChangeDoctorForAppointment = (doctor: any) => {
        const specialties = doctor.specialties
            .map((specialty: any) => specialty.specialtyName)
            .join(', ')
        router.push(
            `treatment-calendar/${doctor.id}?doctorName=${doctor.fullName}&specialties=${specialties}&isOnDuty=${doctor.isOnDuty}&avatarUrl=${doctor.avatarUrl}`,
        )
    }

    const handleChangeRouteToViewProfile = (doctorId:string) => {
        router.push(`/staff/account/profile/${doctorId}`);
    }

    return (
        <div className="w-full">
            <div>
                <h3 className="text-[20px] font-semibold text-secondarySupperDarker">
                    Tất cả bác sĩ
                </h3>
                <p className="text-[16px] font-semibold text-secondarySupperDarker text-opacity-60">
                    Chọn hành động của từng bác sĩ có trong danh sách bác sĩ
                </p>
                <Input
                    className="mt-5 w-[224px]"
                    size="middle"
                    placeholder="Tìm bác sĩ"
                    onChange={(e) => setKeyWord(e.target.value)}
                    prefix={
                        <ScanSearch
                            size={16}
                            className="mr-2 text-secondarySupperDarker"
                        />
                    }
                />
            </div>
            <div className="mt-5 grid w-full grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
                {isFetching &&
                    Array.from({ length: 6 }).map((_, index) => {
                        return (
                            <Skeleton.Button
                                active
                                className="h-[180px] w-full"
                            />
                        )
                    })}
                {!isFetching &&
                    doctors?.map((doctor: any) => (
                        <div
                            key={doctor.id} // Thêm key để cải thiện hiệu suất
                            className="relative w-[100%] cursor-pointer flex-row gap-5 rounded-xl bg-white p-5 shadow-third transition-all hover:bg-slate-50"
                        >
                            <div className="flex">
                                <div>
                                    <Avatar
                                        size={80}
                                        shape="square"
                                        src={doctor.avatarUrl}
                                    />
                                </div>
                                <div className="ml-4 w-full">
                                    <p className="text-[16px] font-semibold text-secondarySupperDarker">
                                        {doctor.fullName}
                                    </p>
                                    <p className="text-[16px] font-semibold text-[#00355380]">
                                        Chuyên khoa:{' '}
                                        {doctor.specialties
                                            .map(
                                                (specialty: any) =>
                                                    specialty.specialtyName,
                                            )
                                            .join(', ')}
                                    </p>
                                    <p className="text-[16px] font-semibold text-[#00355380]">
                                        Trạng thái:{' '}
                                        {doctor.isOnDuty
                                            ? 'Đang làm việc'
                                            : 'Đang nghỉ ngơi'}
                                    </p>
                                </div>
                                <div
                                    className={`absolute right-5 top-5 h-[12px] w-[12px] rounded-full bg-secondaryDarker ${!doctor.isOnDuty && 'opacity-30'}`}
                                ></div>
                            </div>
                            <div className="mt-4 flex flex-row gap-5">
                                <Button
                                    type="primary"
                                    onClick={() =>
                                        handleChangeDoctorForSetCalendar(doctor)
                                    }
                                    className="float-end h-[33px] bg-[#0284C7] text-white"
                                    iconPosition="end"
                                    icon={<CalendarCog size={18} />}
                                >
                                    Cài đặt lịch
                                </Button>
                                <Button
                                    type="primary"
                                    onClick={() =>
                                        handleChangeDoctorForAppointment(doctor)
                                    }
                                    className="float-end h-[33px] bg-[#0284C7] text-white"
                                    iconPosition="end"
                                    icon={<Calendar size={18} />}
                                >
                                    Xem lịch khám
                                </Button>
                                <Button
                                    type="primary"
                                    onClick={() => handleChangeRouteToViewProfile(doctor.id)}
                                    className="float-end h-[33px] bg-white text-secondarySupperDarker"
                                    iconPosition="end"
                                    icon={<View size={18} />}
                                ></Button>
                            </div>
                        </div>
                    ))}
            </div>
            {totalPages > 1 && (
                <Paginate
                    totalPages={totalPages}
                    page={page}
                    onPageChange={(page) => setPage(page)}
                />
            )}
        </div>
    )
}
