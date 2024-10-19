'use client'
import { Button, Skeleton } from 'antd'
import { Edit, FileDown, Printer } from 'lucide-react'
import { usePathname, useSearchParams } from 'next/navigation'
import React from 'react'
import { TMedicalReport } from '..'
import dayjs from 'dayjs'
import { useRouter } from 'next-nprogress-bar'

type TProps = {
    payload: TMedicalReport
    isFetching: boolean
}

export default function MainMedicalReportViewInformation({
    payload,
    isFetching,
}: TProps) {
    const searchParam = useSearchParams()
    const router = useRouter();
    const pathname = usePathname();

    console.log(pathname);
    const handleEditMedicalReport = () => {
        router.push(pathname.replace('view', `?id=${searchParam.get('id')}`))
    }
    return (
        <div className="flex w-full flex-col gap-5 rounded-xl bg-white p-5 shadow-third">
            <div className="flex w-full flex-col gap-4">
                <div className="flex w-full flex-row justify-between">
                    <div className="flex flex-col gap-2">
                        {isFetching ? (
                            <Skeleton.Input className="h-[20px] w-[244px]" />
                        ) : (
                            <p className="font-bold">
                                Mã phiếu khám:{' '}
                                <span className="font-medium">
                                    {searchParam.get('id')}
                                </span>
                            </p>
                        )}
                        {isFetching ? (
                            <Skeleton.Input className="h-[20px] w-[244px]" />
                        ) : (
                            <p className="font-bold">
                                Thời gian khám:{' '}
                                <span className="font-medium">
                                    {dayjs(payload?.date).format('HH:mm') +
                                        ' ' +
                                        dayjs(payload?.date).format(
                                            'DD/MM/YYYY',
                                        )}
                                </span>
                            </p>
                        )}
                    </div>
                </div>
                <div className="flex w-full flex-col gap-5">
                    <div className="flex h-fit w-full flex-col sm:flex-row gap-5">
                        <div className="flex flex-col">
                            {isFetching ? (
                                <Skeleton.Input className="sm:w-[224px] w-full" />
                            ) : (
                                <>
                                    {' '}
                                    <span className="text-[12px] text-secondarySupperDarker">
                                        Tiền sử bệnh án
                                    </span>
                                    <p className="sm:w-[224px] w-full rounded-[6px] bg-[#E9ECEF] px-[10px] py-[4px] text-[12px] font-semibold text-secondarySupperDarker">
                                        {payload?.medicalHistory
                                            ? payload?.medicalHistory
                                            : 'Chưa có thông tin'}
                                    </p>
                                </>
                            )}
                        </div>
                        <div className="flex flex-col">
                            {isFetching ? (
                                <Skeleton.Input className="sm:w-[224px] w-full" />
                            ) : (
                                <>
                                    {' '}
                                    <span className="text-[12px] text-secondarySupperDarker">
                                        Tổng trạng chung
                                    </span>
                                    <p className="sm:w-[224px] w-full rounded-[6px] bg-[#E9ECEF] px-[10px] py-[4px] text-[12px] font-semibold text-secondarySupperDarker">
                                        {payload?.generalCondition
                                            ? payload?.generalCondition
                                            : 'Chưa có thông tin'}
                                    </p>
                                </>
                            )}
                        </div>
                        <div className="flex flex-col">
                            {isFetching ? (
                                <Skeleton.Input className="sm:w-[224px] w-full" />
                            ) : (
                                <>
                                    {' '}
                                    <span className="text-[12px] text-secondarySupperDarker">
                                        Chiều cao
                                    </span>
                                    <p className="sm:w-[224px] w-full rounded-[6px] bg-[#E9ECEF] px-[10px] py-[4px] text-[12px] font-semibold text-secondarySupperDarker">
                                        {payload?.height
                                            ? payload?.height
                                            : 'Chưa có thông tin'}
                                    </p>
                                </>
                            )}
                        </div>
                        <div className="flex flex-col">
                            {isFetching ? (
                                <Skeleton.Input className="sm:w-[224px] w-full" />
                            ) : (
                                <>
                                    <span className="text-[12px] text-secondarySupperDarker">
                                        Cân nặng
                                    </span>
                                    <p className="sm:w-[224px] w-full rounded-[6px] bg-[#E9ECEF] px-[10px] py-[4px] text-[12px] font-semibold text-secondarySupperDarker">
                                        {payload?.weight
                                            ? payload?.weight
                                            : 'Chưa có thông tin'}
                                    </p>
                                </>
                            )}
                        </div>
                    </div>
                    <div className="flex h-fit w-full flex-col sm:flex-row gap-5">
                        <div className="flex flex-col">
                            {isFetching ? (
                                <Skeleton.Input className="sm:w-[224px] w-full" />
                            ) : (
                                <>
                                    <span className="text-[12px] text-secondarySupperDarker">
                                        Mạch
                                    </span>
                                    <p className="sm:w-[224px] w-full rounded-[6px] bg-[#E9ECEF] px-[10px] py-[4px] text-[12px] font-semibold text-secondarySupperDarker">
                                        {payload?.pulse
                                            ? payload?.pulse
                                            : 'Chưa có thông tin'}
                                    </p>
                                </>
                            )}
                        </div>
                        <div className="flex flex-col">
                            {isFetching ? (
                                <Skeleton.Input className="sm:w-[224px] w-full" />
                            ) : (
                                <>
                                    {' '}
                                    <span className="text-[12px] text-secondarySupperDarker">
                                        Nhiệt
                                    </span>
                                    <p className="sm:w-[224px] w-full rounded-[6px] bg-[#E9ECEF] px-[10px] py-[4px] text-[12px] font-semibold text-secondarySupperDarker">
                                        {payload?.temperature
                                            ? payload?.temperature
                                            : 'Chưa có thông tin'}
                                    </p>
                                </>
                            )}
                        </div>
                        <div className="flex flex-col">
                            {isFetching ? (
                                <Skeleton.Input className="sm:w-[224px] w-full" />
                            ) : (
                                <>
                                    <span className="text-[12px] text-secondarySupperDarker">
                                        Huyết áp
                                    </span>
                                    <p className="sm:w-[224px] w-full rounded-[6px] bg-[#E9ECEF] px-[10px] py-[4px] text-[12px] font-semibold text-secondarySupperDarker">
                                        {payload?.bloodPressure
                                            ? payload?.bloodPressure
                                            : 'Chưa có thông tin'}
                                    </p>
                                </>
                            )}
                        </div>
                    </div>
                    <div>
                        <div className="flex flex-col">
                            {isFetching ? (
                                <Skeleton.Input className="sm:w-[224px] w-full" />
                            ) : (
                                <>
                                    {' '}
                                    <span className="text-[12px] text-secondarySupperDarker">
                                        Chuẩn đoán
                                    </span>
                                    <p className="sm:w-[224px] w-full rounded-[6px] bg-[#E9ECEF] px-[10px] py-[4px] text-[12px] font-semibold text-secondarySupperDarker" dangerouslySetInnerHTML={{ __html: payload?.diagnosis ? payload?.diagnosis : 'Chưa có thông tin' }}>
                                    </p>
                                </>
                            )}
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-5">
                        <Button
                            type="primary"
                            className="rounded-xl bg-secondaryDark !p-[20px] font-semibold shadow-third"
                            onClick={() => handleEditMedicalReport()}
                        >
                            Chỉnh sửa
                            <Edit size={18} />
                        </Button>
                        <Button
                            type="primary"
                            className="rounded-xl border-2 border-secondaryDark bg-white !p-[20px] font-semibold text-secondarySupperDarker shadow-third"
                        >
                            Xuất phiếu khám
                            <FileDown size={18}/>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
