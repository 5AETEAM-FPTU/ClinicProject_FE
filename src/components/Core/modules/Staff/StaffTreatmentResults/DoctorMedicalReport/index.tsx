'use client'

import Image from 'next/image'
import { MedicalReport } from '..'
import dayjs from 'dayjs'
import { useRouter } from 'next-nprogress-bar'

interface IProps {
    reports: MedicalReport
}

export default function DoctorMedicalReport({ reports }: IProps) {
    const router = useRouter();

    return (
        <>
            <div onClick={() => {router.push("treatment-history/view?id=" + reports.reportId)}} className="flex h-fit cursor-pointer flex-col gap-2 rounded-xl bg-white p-[16px] shadow-third transition-all hover:bg-slate-100 sm:gap-0">
                <div className="w-full">
                    <div className="flex flex-col justify-between gap-2 sm:flex-row sm:gap-0">
                        <span className="font-semibold text-[#003553]">
                            {dayjs(reports.startTime).format('HH:mm')} -{' '}
                            {dayjs(reports.endTime).format('HH:mm')}
                        </span>
                    </div>
                </div>

                <div className="flex h-20 gap-5 mt-1">
                    <div className="h-[80px] w-[80px] items-center">
                        <Image
                            className="h-full w-full rounded-xl object-cover"
                            src={
                                reports.avatar
                            }
                            alt="background"
                            width={80}
                            height={80}
                        />
                    </div>

                    <div className="flex flex-col">
                        <div className="text-base font-semibold text-[#003553]">
                            {reports.fullName}
                        </div>
                        <div className="my-1 font-semibold text-[#003553] text-opacity-90">
                            Số điện thoại:{' '}
                            <span className="font-medium opacity-90">
                                {reports.phoneNumber ?? 'Chưa có'}
                            </span>
                        </div>
                        <div className="flex font-semibold text-[#003553] text-opacity-90">
                            <p className="mr-6">
                                Giới tính:{' '}
                                <span className="font-medium opacity-90">
                                    {reports.gender ?? 'Chưa xác định'}
                                </span>
                            </p>
                            <p>
                                Tuổi:{' '}
                                <span className="font-medium opacity-90">
                                    {reports.age ?? 'Chưa xác định'}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="mt-4">
                    <p className="line-clamp-2 h-[65px] text-[#003553]">
                        <span className="w-[50px] font-semibold text-[#003553]">
                            Mô tả:{' '}
                        </span>
                        <p dangerouslySetInnerHTML={{__html: reports.diagnosis ? reports.diagnosis : 'Không có thông tin'}}></p>
                    </p>
                </div>
            </div>
        </>
    )
}
