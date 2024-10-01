'use client'

import { Button, Popover } from 'antd'
import { FilePlus2, Settings } from 'lucide-react'
import Image from 'next/image'
import ProfileBackground from '@public/landing/images/profile-background.png'
import { useTrigger } from '@/hooks/useTrigger'
import { AppointmentStatus } from '..'

export default function AppointmentDone() {
    const { handleTrigger, trigger } = useTrigger()

    return (
        <>
            <div className="flex h-fit flex-col rounded-xl bg-white p-[16px] shadow-third gap-2 sm:gap-0">
                <div className="w-full">
                    <div className="flex justify-between flex-col sm:flex-row gap-2 sm:gap-0">
                        <span className="font-semibold text-[#003553]">
                            09:30 - 10:30
                        </span>
                        <div className="flex gap-[10px] justify-end">
                            <Button className="bg-[#f7fafc] text-[#003553] border border-secondaryDarker  rounded-[10px]">
                                Xem phiếu khám <FilePlus2 size={18} />
                            </Button>
                            <Button className="bg-[#22C55E] text-white border-none  rounded-[10px]">
                                Khám xong
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="flex h-20 gap-5">
                    <div className="h-[80px] w-[80px] items-center">
                        <Image
                            className="h-full w-full rounded-xl object-cover"
                            src={ProfileBackground}
                            alt="background"
                        />
                    </div>

                    <div className="flex flex-col">
                        <div className="text-base font-semibold text-[#003553]">
                            Nguyễn Văn Đạt
                        </div>
                        <div className="my-1 font-semibold text-[#003553] text-opacity-90">
                            Số điện thoại:{' '}
                            <span className="font-medium opacity-90">
                                09483171290
                            </span>
                        </div>
                        <div className="flex font-semibold text-[#003553] text-opacity-90">
                            <p className="mr-6">
                                Giới tính:{' '}
                                <span className="font-medium opacity-90">
                                    Nam
                                </span>
                            </p>
                            <p>
                                Tuổi:{' '}
                                <span className="font-medium opacity-90">
                                    29
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="mt-4">
                    <p className="h-[45px] text-[#003553] line-clamp-2">
                        <span className="w-[50px] font-semibold text-[#003553]">
                            Mô tả:{' '}
                        </span>
                        Bệnh nhân đăng ký khám tổng quát nhằm kiểm tra toàn diện
                        về sức khỏe, bao gồm các xét nghiệm và kiểm tra lâm s...
                        Bệnh nhân đăng ký khám tổng quát nhằm kiểm tra toàn diện
                        về sức khỏe, bao gồm các xét nghiệm và kiểm tra lâm s...
                    </p>
                </div>
            </div>
        </>
    )
}
