"use client"

import React, { useEffect, useState } from 'react'
import { Avatar, Button, Skeleton } from 'antd'
import { useGetUserDetailInMedicalReportQuery } from '@/stores/services/appointment'
import { useGetAllMedicalReportRecentOfUserQuery } from '@/stores/services/report/medicalReport'
import { useGetUpcommingFollowUpNotificationQuery } from '@/stores/services/notification'
import dayjs from 'dayjs'

interface ExaminationHistory {
    doctorName: string
    dateTime: string
    diagnosis: string
}

interface PatientDetail {
    name: string
    address: string
    gender: string
    age: number
    image: string
    description: string
    reExamination: string
    examinationHistory: ExaminationHistory[]
}

const patientDetail: PatientDetail = {
    name: 'Tên bệnh nhân',
    address: 'thôn A, xã B, thành phố C',
    gender: 'nam',
    age: 29,
    image: 'https://gravatar.com/avatar/e7f242ab6fb92ab2f4c3a372fc7bcd5c?s=400&d=retro&r=pg',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five',
    reExamination: 'Xét nghiệm bổ sung (01/01/2025)',
    examinationHistory: [
        { doctorName: 'Mai Sương', dateTime: '7:00 - 8:00 29/9/2024', diagnosis: 'Chuẩn đoán: Quisque hendrerit ex eu ligula varius, at scelerisque ligula...' },
        { doctorName: 'Mai Sương', dateTime: '7:00 - 8:00 29/9/2024', diagnosis: 'Chuẩn đoán: Quisque hendrerit ex eu ligula varius, at scelerisque ligula...' },
        { doctorName: 'Mai Sương', dateTime: '7:00 - 8:00 29/9/2024', diagnosis: 'Chuẩn đoán: Quisque hendrerit ex eu ligula varius, at scelerisque ligula...' },
    ]
}

function formatDateTime(startTime: string, endTime: string, date: string) {
    // Parse the date and time strings
    const start = new Date(startTime);
    const end = new Date(endTime);
    const appointmentDate = new Date(date);

    // Format the times in "H:mm" format
    const formatTime = (time: Date) => `${time.getHours()}:${time.getMinutes().toString().padStart(2, '0')}`;

    // Format the date in "dd/mm/yyyy" format
    const formatDate = (date: Date) => `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

    // Combine time range and date
    return `${formatTime(start)} - ${formatTime(end)} ${formatDate(appointmentDate)}`;
}

export default function PatientDetailForm({ patientId }: { patientId: string | null }) {
    const [upcommingRetreatments, setUpcommingRetreatments] = useState<any[]>([]);
    const { data: retreatmentData, isFetching: isRetreatmentFetching } = useGetUpcommingFollowUpNotificationQuery({ userId: patientId || '' });
    useEffect(() => {
        if (retreatmentData?.body.retreatmentNotifications) {
            setUpcommingRetreatments(retreatmentData.body.retreatmentNotifications)
        }
    }, [retreatmentData])
    const [patient, setPatient] = useState<any>(null);
    const { data: patientData, isFetching: isPateintFetching } = useGetUserDetailInMedicalReportQuery({ userId: patientId || '' });
    useEffect(() => {
        if (patientData?.body.user) {
            setPatient(patientData.body.user)
        }
    }, [patientData])

    const [pageIndex, setPageIndex] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [totalPages, setTotalPages] = useState(1);
    const [medicalReports, setMedicalReports] = useState<any[]>([]);
    const { data: medicalReportData, isFetching: isMedicalReportFetching } = useGetAllMedicalReportRecentOfUserQuery({ userId: patientId || '', pageIndex, pageSize });
    const handleLoadMore = () => {
        if (pageIndex < totalPages) {
            setPageIndex(pageIndex + 1);
        }
    }
    useEffect(() => {
        if (medicalReportData?.body.medicalReports) {
            const result = medicalReportData.body.medicalReports;
            setPageIndex(result.pageIndex);
            setTotalPages(result.totalPages);
            setMedicalReports((prev) => [...prev, ...result.contents]);
        }
    }, [medicalReportData])
    return (
        <div className="w-full mx-auto p-4 bg-white rounded-[12px]">
            {isPateintFetching
                &&
                <>
                    <Skeleton
                        avatar={{
                            shape: 'square',
                            className: "w-16 h-16 rounded-[12px]"

                        }} active paragraph={{ rows: 3 }}
                    />
                    <Skeleton active paragraph={{ rows: 3 }} />
                </>}
            {patient &&
                <>
                    <div className="flex flex-col sm:flex-row items-start mb-4">
                        <Avatar src={patient?.avatarUrl} className="w-20 h-20 mx-auto rounded-[12px] mb-2" />
                        <div className="flex-grow sm:ml-4 ml-0">
                            <h2 className="text-base font-bold text-secondarySupperDarker">{patient.fullName}</h2>
                            <p className="text-base text-secondarySupperDarker">
                                <span className="font-semibold">Địa chỉ: </span>{patient.address}
                            </p>
                            <div className="flex justify-start">
                                <p className="text-base text-secondarySupperDarker">
                                    <span className="font-semibold">Giới tính: </span>{patient.gender.genderName}
                                </p>
                                <p className="ml-5 text-base text-secondarySupperDarker">
                                    <span className="font-semibold">Tuổi: </span>{patient.age}
                                </p>
                            </div>
                        </div>
                    </div>

                    <p className="mb-4 text-base text-secondarySupperDarker">
                        <span className="text-base font-semibold text-secondarySupperDarker">Mô tả: </span>
                        <span className='line-clamp-3 xl:line-clamp-none'>{patient.description}</span>
                    </p>
                </>
            }

            <div className="mb-4">
                <h3 className="text-lg font-semibold text-secondarySupperDarker mb-[10px]">Tái khám</h3>
                <ul className="list-disc list-inside text-base text-secondarySupperDarker">
                    {upcommingRetreatments.map((reExamination) => (
                        <li key={reExamination.notificationId}>{reExamination.type.typeName + ` (${dayjs(reExamination.examinationDate).format('DD/MM/YYYY')})`}</li>
                    ))}
                </ul>
            </div>

            <div>
                <h3 className="text-lg font-semibold text-secondarySupperDarker mb-[10px]">Lịch sử khám gần đây</h3>
                <div className="space-y-4">
                    {medicalReports.map((history, index) => (
                        <div key={history.reportId} className="flex items-center space-x-4 w-full">
                            <div className='flex w-fit md:w-full'>
                                <Avatar src={history.avatar} className="w-16 h-16 rounded-[12px]" />
                                <div className="ml-[10px]">
                                    <h4 className="font-semibold text-base text-secondarySupperDarker">{history.fullName}</h4>
                                    <p className="text-sm text-secondarySupperDarker">{formatDateTime(history.startTime, history.endTime, history.date)}</p>
                                    <p className="text-sm text-secondarySupperDarker line-clamp-2 w-full"><span className='font-semibold'>Chuẩn đoán: </span>{history.diagnosis || 'Không có'}</p>
                                </div>
                            </div>
                            <div className='w-fit md:w-[10%]'>
                                <Button className="h-[34px] w-fit float-end hidden md:block font-semibold rounded-[12px] border-[#0284C7] text-[#0284C7] text-[12px]">
                                    Hồ sơ khám bệnh
                                </Button>
                            </div>
                        </div>
                    ))}
                    {isMedicalReportFetching
                        && <Skeleton
                            avatar={{
                                shape: 'square',
                                className: "w-16 h-16 rounded-[12px]"

                            }} active paragraph={{ rows: 3 }}
                        />}
                </div>
            </div>

            <div className="text-center mt-4">
                {pageIndex < totalPages && <div onClick={handleLoadMore} className="border-none cursor-pointer select-none font-semibold text-[#0284C7] text-[12px]">
                    Xem thêm
                </div>}
            </div>
        </div>
    )
}