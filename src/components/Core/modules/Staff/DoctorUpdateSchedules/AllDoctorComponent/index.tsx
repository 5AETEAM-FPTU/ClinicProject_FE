"use client"
import React, { useCallback, useEffect, useState } from 'react'
import { Input, Avatar, Card, Button, Tooltip, Skeleton } from 'antd'
import {
    Calendar,
    ScanSearch
} from 'lucide-react'
import { useRouter } from 'next-nprogress-bar'
import { useLazyGetStaffGetAllDoctorQuery } from '@/stores/services/staff/staffSettings'
import Paginate from '@/components/Core/common/Paginate'
import { debounce } from 'lodash'

export default function AllDoctorComponent() {
    const [totalPages, setTotalPages] = useState(0)
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(1)
    const [keyWord, setKeyWord] = useState('')
    const [doctors, setDoctors] = useState([])

    const [getDoctors, { isFetching, isSuccess, data: doctorResult }] = useLazyGetStaffGetAllDoctorQuery()

    // Debounced refetch function
    const debouncedRefetch = useCallback(
        debounce(({ pageSize, page, keyWord }) => {
            try {
                if (getDoctors) getDoctors({ pageSize, pageIndex: page, keyWord })
            } catch (error) {
            }
        }, 1000), []
    );

    useEffect(() => {
        debouncedRefetch({ pageSize, page, keyWord });
    }, [pageSize, page, keyWord, debouncedRefetch])

    useEffect(() => {
        // Reset the page when certain conditions change
        setPage(1);
    }, [keyWord, pageSize]);

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
    const handleChangeDoctor = (doctor: any) => {
        const specialties = doctor.specialties.map((specialty: any) => specialty.specialtyName).join(', ')
        router.push(
            `set-calendar/${doctor.id}?doctorName=${doctor.fullName}&specialties=${specialties}&isOnDuty=${doctor.isOnDuty}&avatarUrl=${doctor.avatarUrl}`
        )
    }

    return (
        <div className="w-full">
            <div>
                <h3 className="text-[20px] font-semibold text-secondarySupperDarker">
                    Tất cả bác sĩ
                </h3>
                <p className="text-[16px] font-semibold text-secondarySupperDarker text-opacity-60">
                    Chọn bác sĩ để lên lịch khám cho bác sĩ
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
            <div className="mt-5 grid w-full grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                {isFetching && Array.from({ length: 6 }).map((_, index) => {
                    return <Skeleton.Button active className='h-[180px] w-full' />
                })}
                {!isFetching && doctors?.map((doctor: any) => (
                    <div
                        key={doctor.id}  // Thêm key để cải thiện hiệu suất
                        className="cursor-pointer relative w-[100%] transition-all flex-row gap-5 rounded-xl bg-white p-5 shadow-third hover:bg-slate-50"
                    >
                        <div className='flex'>
                            <div>
                                <Avatar size={80} shape="square" src={doctor.avatarUrl} />
                            </div>
                            <div className="w-full ml-4">
                                <p className="text-[16px] font-semibold text-secondarySupperDarker">
                                    {doctor.fullName}
                                </p>
                                <p className="text-[16px] text-[#00355380] font-semibold">
                                    Chuyên khoa: {doctor.specialties.map((specialty: any) => specialty.specialtyName).join(', ')}
                                </p>
                                <p className="text-[16px] text-[#00355380] font-semibold">
                                    Trạng thái: {doctor.isOnDuty ? 'Đang làm việc' : 'Đang nghỉ ngơi'}
                                </p>
                            </div>
                            <div className={`w-[12px] h-[12px] rounded-full bg-secondaryDarker absolute top-5 right-5 ${!doctor.isOnDuty && 'opacity-30'}`}></div>
                        </div>
                        <div className='mt-4'>
                            <Button
                                onClick={() => handleChangeDoctor(doctor)}
                                className='float-end h-[33px] bg-[#0284C7] text-white'
                                iconPosition='end'
                                icon={<Calendar size={18} />}
                            >
                                Xem lịch đã đặt
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
            <Paginate totalPages={totalPages} page={page} onPageChange={(page) => setPage(page)} />
        </div>
    )
}
