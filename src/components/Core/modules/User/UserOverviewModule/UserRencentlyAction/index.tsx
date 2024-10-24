'use client'

import { useGetAllUserHistoryTreatmentsQuery } from '@/stores/services/user/userHistoryAppointments'
import { Avatar, Button, Skeleton } from 'antd'
import { AppointmentResultingType } from '../../UserTreatmentHistory'
import dayjs from 'dayjs'

export default function UserRecentlyAction() {
    const { historyTreatments, refetch, isFetching, isLoading } =
        useGetAllUserHistoryTreatmentsQuery(
            {
                pageSize: '2',
                pageIndex: '1',
                doctorName: '',
            },
            {
                selectFromResult: ({ data, isFetching, isLoading }) => {
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
    return (
        <>
            {isFetching ? (
                <Skeleton.Button className="h-full w-full"></Skeleton.Button>
            ) : (
                <div className="mb-20px flex h-fit flex-col gap-5 rounded-xl bg-white px-[20px] py-5 shadow-third xl:h-[254px]">
                    <h4 className="text-[16px] font-bold text-[#003553]">
                        Đã khám gần đây
                    </h4>
                    <div>
                        {historyTreatments?.length > 0 ? (
                            <div className='flex flex-col gap-2'>
                                {historyTreatments?.map(
                                    (
                                        history: AppointmentResultingType,
                                        index: number,
                                    ) => (
                                        <div
                                            key={index}
                                            className="flex h-[70x] flex-col items-center justify-between rounded-md bg-[#F7F7F7] py-[5px] xl:flex-row"
                                        >
                                            <div className="flex flex-col items-center justify-between pl-[10px] font-bold xl:items-start xl:justify-start">
                                                <p
                                                    className="text-[14px] text-[#003553]"
                                                    dangerouslySetInnerHTML={{
                                                        __html: history?.title,
                                                    }}
                                                ></p>
                                                <p
                                                    className="text-[14px] font-medium text-[#003553]"
                                                    dangerouslySetInnerHTML={{
                                                        __html:
                                                            'Chuẩn đoán: ' +
                                                            history?.diagnosis,
                                                    }}
                                                ></p>
                                            </div>
                                            <div className="flex items-center justify-between gap-[10px] font-medium">
                                                <p className="text-[14px] text-[#003553]">
                                                    Bác sĩ đã khám{' '}
                                                    <span className="flex w-full xl:justify-end">
                                                        {
                                                            history?.doctorInfo
                                                                ?.fullName
                                                        }
                                                    </span>
                                                </p>
                                                <Avatar
                                                    className="h-[50px] w-[50px] rounded-full object-cover"
                                                    src={
                                                        history?.doctorInfo
                                                            ?.avatarUrl
                                                    }
                                                ></Avatar>
                                                <div className="mr-2">
                                                    <p className="text-[14px] text-[#003553]">
                                                        {dayjs(
                                                            history?.examinedDate,
                                                        ).format('DD/MM/YYYY')}
                                                    </p>
                                                    <p className="text-[14px] text-[#003553]">
                                                        {dayjs(
                                                            history?.examinedDate,
                                                        ).format('HH:mm')}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ),
                                )}
                            </div>
                        ) : (
                            <div>
                                Chưa có thông tin, hãy tiến hành đặt lịch khám
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    )
}
