"use client"

import React, { useCallback, useEffect, useState } from 'react'
import { Input, Avatar, Skeleton } from 'antd'
import { Search, ScanEye } from 'lucide-react'
import PatientModal from './PatientDetailExpandable'
import Paginate from '@/components/Core/common/Paginate'

import { debounce } from 'lodash'
import { useLazyGetAllPatientQuery } from '@/stores/services/staff/staffSettings'


function calculateAge(birthDate: string) {
    const today = new Date();
    const birth = new Date(birthDate);

    let age = today.getFullYear() - birth.getFullYear();

    // Kiểm tra nếu sinh nhật chưa đến trong năm hiện tại thì giảm 1 tuổi
    const monthDiff = today.getMonth() - birth.getMonth();
    const dayDiff = today.getDate() - birth.getDate();

    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
        age--;
    }

    return age;
}

export default function AllPatientPage() {

    const [getAllUser, { isFetching, data: userResult }] = useLazyGetAllPatientQuery()
    const [patients, setPatients] = useState([])
    const [pageIndex, setPageIndex] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [keyword, setKeyword] = useState(' ')
    const [pageSize, setPageSize] = useState(6)
    const getAllUserDebounce = useCallback(debounce(({ pageIndex, pageSize, keyword }) => {
        getAllUser({ pageIndex, pageSize, keyword });
    }, 1000), [])
    useEffect(() => {
        getAllUserDebounce({ pageIndex, pageSize, keyword });
    }, [keyword, pageSize, pageIndex])
    useEffect(() => {
        if (userResult?.body.users) {
            const result = userResult.body.users;
            setPageIndex(result.pageIndex)
            setTotalPages(result.totalPages)
            setPatients(result.contents)
        }
    }, [userResult])

    const [isExpanded, setIsExpanded] = useState(false);
    const [patientId, setPatientId] = useState<string | null>(null)

    return (
        <>
            <PatientModal open={isExpanded} setOpen={setIsExpanded} patientId={patientId} />
            <div className="w-full mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4 text-secondarySupperDarker">Tái khám</h1>
                <div className="relative mb-6">
                    <Input
                        onChange={(e) => setKeyword(e.target.value)}
                        placeholder="Tìm kiếm bệnh nhân"
                        prefix={<Search className="text-[#003553] mr-[14px]" />}
                        className="w-fit px-5 py-2 border rounded-[12px] border-[#003553] focus:shadow-none font-semibold"
                    />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                    {isFetching && <Skeleton.Button active className='h-[164px] w-full' />}
                    {!isFetching && patients.map((patient: any) => (
                        <div key={patient.id} className='shadow-third py-3 px-[22px] rounded-[12px]'>
                            <div className="rounded-lg shadow-md flex">
                                <Avatar src={patient.avatarUrl} shape='square' className="mr-4 w-16 h-16" />
                                <div className="flex-grow">
                                    <h2 className="text-base text-secondarySupperDarker font-semibold">{patient.fullName}</h2>
                                    <p className="text-base text-secondarySupperDarker"><span className='font-semibold text-base'>Địa chỉ: </span>{patient.address}</p>
                                    <div className='flex justify-start'>
                                        <p className="text-base text-secondarySupperDarker">
                                            <span className='font-semibold text-base'>Giới tính: </span>{patient.gender.name}
                                        </p>
                                        <p className="ml-5 text-base text-secondarySupperDarker">
                                            <span className='font-semibold text-base'>Tuổi: </span> {calculateAge(patient.dob)}
                                        </p>
                                    </div>
                                </div>
                                <button className='h-fit' onClick={() => { setIsExpanded(true); setPatientId(patient.id) }}>
                                    <ScanEye className="w-6 h-6 text-[#0284C7]" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Paginate totalPages={totalPages} page={pageIndex} onPageChange={(page) => setPageIndex(page)} />
        </>
    )
}