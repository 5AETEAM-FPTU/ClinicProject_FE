'use client'

import { useGetAllUserHistoryTreatmentsQuery } from '@/stores/services/user/userHistoryAppointments'
import { render } from '@fullcalendar/core/preact.js'
import { Avatar, Table, Form, Input } from 'antd'
import dayjs from 'dayjs'
import { Search } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { text } from 'stream/consumers'

export type AppointmentResultingType = {
    // key: React.Key
    id: string
    examinedDate: Date
    diagnosis: string
    doctorInfo: {
        id: string
        fullName: string
        avatarUrl: string
    }
}

export type TableAppointmentResultingType = {
    key: React.Key
    id: string
    examinedDate: Date
    diagnosis: string
    fullName: string
    avatarUrl: string
}

export default function ViewAllTreatment() {
    const router = useRouter()
    const searchParams = useSearchParams()

    const [historyTreatmentData, setHistoryTreatmentData] = useState<
        TableAppointmentResultingType[]
    >([])
    const pageSize = searchParams.get('pageSize') || '7'
    const currentPage = searchParams.get('page') || '1'
    const searchName = searchParams.get('keyword') || ''
    let total: string = ''

    const columns = [
        {
            title: 'STT',
            dataIndex: 'key',
            key: 'key',
            render: (value: any, record: any) => <p>{record.key + 1}</p>,
        },
        {
            title: 'Ngày khám',
            dataIndex: 'examinedDate',
            key: 'examinedDate',
            render: (value: any, record: any) => (
                <p className='text-[#474e58]'>{dayjs(record.examinedDate).format('DD/MM/YYYY')}</p>
            ),
        },
        {
            title: 'Kết quá khám',
            dataIndex: 'diagnosis',
            key: 'diagnosis',
            render: (value: any, record: any) => (
                <p className='text-[#474e58] break-words ' dangerouslySetInnerHTML={{ __html: record.diagnosis || 'Chưa có thông tin' }}></p>
            ),
        },
        {
            title: 'Bác sĩ',
            dataIndex: 'fullName',
            key: 'fullName',
            render: (value: any, record: any) => (
                <div className="flex flex-row items-center gap-2 text-[#474e58]">
                    <Avatar size="large" shape='square' src={record.avatarUrl} className='rounded-xl'></Avatar>{' '}
                    <p>{record.fullName}</p>
                </div>
            ),
        },
        {
            title: 'Chi tiết',
            dataIndex: 'detail',
            render: (value: any, record: any) => <button onClick={() => router.push(`treatment-history/view?reportId=${record.id}`)} className='text-[14px] text-[#474e58] [text-shadow:_0_4px_4px_rgb(1_0_0_/_0.3)]'>Xem hồ sơ</button>,
        },
    ]

    const { historyTreatments, refetch, isFetching, isLoading } =
        useGetAllUserHistoryTreatmentsQuery(
            {
                pageSize: pageSize,
                pageIndex: currentPage,
                doctorName: searchName,
            },
            {
                selectFromResult: ({ data, isFetching, isLoading }) => {
                    total = data?.body?.medicalReports?.totalPages + 20 || 50
                    return {
                        historyTreatments:
                            (data?.body?.medicalReports
                                ?.contents as AppointmentResultingType[]) || [],
                        isFetching,
                        isLoading,
                    }
                },
            },
        )

    console.log(historyTreatments)

    useEffect(() => {
        const result: TableAppointmentResultingType[] = historyTreatments.map(
            (item: AppointmentResultingType, index: number) => {
                return {
                    ...item,
                    key: index,
                    id: item.id,
                    examinedDate: item.examinedDate,
                    diagnosis: item.diagnosis,
                    fullName: item.doctorInfo.fullName,
                    avatarUrl: item.doctorInfo.avatarUrl,
                }
            },
        )
        setHistoryTreatmentData(result)
    }, [historyTreatments])

    const handleTableChange = (pagination: any) => {
        changeRoute(pagination, {})
        refetch()
    }

    const changeRoute = (
        pagination: { current: string; pageSize: string },
        filters: {
            keyword?: string
        },
    ) => {
        const { keyword } = filters
        const query = {
            page: pagination.current,
            pageSize: pagination.pageSize,
            ...(keyword && { keyword }),
        }
        const queryString = new URLSearchParams(query).toString()
        router.push(`?${queryString}`)
    }

    return (
        <div className="flex w-full flex-col gap-5">
            <div className="flex w-full flex-row justify-between">
                <Form
                    name="basic"
                    autoComplete="off"
                    className="flex w-full flex-row justify-between"
                    layout="horizontal"
                >
                    <Form.Item label={<p className='text-[#003A66] pl-1 font-bold text-xl'>Lịch sử khám bệnh</p>}>
                        <Input
                            prefix={<Search size={18}/>}
                            placeholder="Nhập tên bác sĩ"
                            onChange={(e) =>
                                changeRoute(
                                    {
                                        current: currentPage,
                                        pageSize: pageSize,
                                    },
                                    {
                                        keyword: e.target.value,
                                    },
                                )
                            }
                        ></Input>
                    </Form.Item>
                </Form>
            </div>
            <div>
                <Table
                    className="overflow-hidden rounded-lg shadow-third"
                    columns={columns}
                    dataSource={historyTreatmentData}
                    pagination={{
                        current: parseInt(currentPage),
                        pageSize: parseInt(pageSize),
                        total: parseInt(total!),
                        position: ['bottomCenter'],
                    }}
                    onChange={handleTableChange}
                    loading={isLoading}
                />
            </div>
        </div>
    )
}