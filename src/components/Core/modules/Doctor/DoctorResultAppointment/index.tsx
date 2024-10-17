'use client'

import { motion } from 'framer-motion'
import { Input, Layout, Skeleton } from 'antd'
import DoctorMedicalReport from './DoctorMedicalReport'
import { ScanSearch } from 'lucide-react'
import { useLazyGetAllMedicalReportQuery } from '@/stores/services/doctor/doctorTreatmentTurn'
import dayjs from 'dayjs'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { debounce, set } from 'lodash'

const { Content } = Layout

export interface MedicalReport {
    patientId: string
    reportId: string
    fullName: string
    avatar: string
    phoneNumber: string
    gender: string
    startTime: string
    endTime: string
    age: number
    diagnosis: string
}

export interface DayMedicalReports {
    medicalReports: MedicalReport[]
    dayOfDate: string
}
let a = 0;
export default function DoctorResultAppointment() {
    const [lastReportDate, setLastReportDate] = useState<string | null>(
        dayjs(Date.now()).format('YYYY-MM-DD'),
    )
    const [searchValue, setSearchValue] = useState<string>('')
    const prevLength = useRef(6)
    const { ref, inView } = useInView({ threshold: 1 })
    const [allReports, setAllReports] = useState<DayMedicalReports[]>([])
    const [groupedReportsFunc, { isFetching, data }] =
        useLazyGetAllMedicalReportQuery()

    const handleFetchReports = async (searchVal?: string) => {
        if (prevLength.current == 0 || isFetching) return
        
        let result = await groupedReportsFunc({
            pageSize: 6,
            lastReportDate: lastReportDate!,
            keyword: searchVal,
        })

        let groupedReports: DayMedicalReports[] =
            result.data.body.groupedReports

        prevLength.current = groupedReports.length

        if (groupedReports.length > 0) {
            setAllReports((prevReports) => [...prevReports, ...groupedReports])
            setLastReportDate(
                groupedReports[groupedReports.length - 1].dayOfDate,
            )
        }
    }

    useEffect(() => {
        handleFetchReports()
    }, [inView])

    const debouncedFetchReports = useCallback(
        debounce((searchVal: string) => {
            setAllReports([])
            prevLength.current = 6
            setLastReportDate(dayjs(Date.now()).format('YYYY-MM-DD'))
            handleFetchReports(searchVal)
        }, 2000),
        [],
    )

    useEffect(() => {
        if(!searchValue) {
            return;
        }
        debouncedFetchReports(searchValue)
    }, [searchValue])

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value)
    }

    console.log(searchValue)

    return (
        <motion.div
            initial={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            exit={{ opacity: 0 }}
        >
            <Layout className="bg-dashboardBackground">
                <Content style={{ padding: '0px' }}>
                    <div className="mr-2 flex flex-col items-center justify-between gap-2 px-2 xl:flex-row">
                        <h3 className="text-xl font-semibold text-[#003553]">
                            Tất cả kết quả khám
                        </h3>
                        <Input
                            prefix={<ScanSearch size={18} className="mr-2" />}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>,
                            ) => handleSearch(e)}
                            value={searchValue}
                            placeholder="Tìm kết quả khám"
                            className="shadow-sm w-full rounded-lg border-2 border-blue-300 text-[14px] font-bold text-[#003553] focus:border-blue-400 xl:w-1/4"
                        />
                    </div>
                    <div className="">
                        <>
                            {
                                <>
                                    {allReports?.map(
                                        (dayReport: DayMedicalReports) => (
                                            <div
                                                key={dayReport.dayOfDate}
                                                className="flex flex-col text-[16px] font-semibold text-[#003553]"
                                            >
                                                <h3 className="px-2 pt-6">
                                                    Ngày{' '}
                                                    {dayjs(
                                                        dayReport.dayOfDate,
                                                    ).format('DD/MM/YYYY')}
                                                </h3>
                                                <div className="grid w-full grid-cols-1 gap-5 pt-[20px] lg:grid-cols-3">
                                                    {dayReport.medicalReports.map(
                                                        (
                                                            report: MedicalReport,
                                                        ) => (
                                                            <DoctorMedicalReport
                                                                key={
                                                                    report.reportId
                                                                }
                                                                reports={report}
                                                            />
                                                        ),
                                                    )}
                                                </div>
                                            </div>
                                        ),
                                    )}
                                    {allReports.length > 0 && (
                                        <div
                                            ref={ref}
                                            className="py-4 text-center"
                                        >
                                            {isFetching && <Skeleton active />}
                                        </div>
                                    )}
                                </>
                            }
                            {isFetching && (
                                <div className="grid w-full grid-cols-1 gap-5 pt-[20px] lg:grid-cols-3">
                                    {Array.from({ length: 6 }).map(
                                        (_, index) => {
                                            return (
                                                <Skeleton
                                                    key={index}
                                                    active
                                                    className="min-h-[205px] w-full rounded-[12px]"
                                                />
                                            )
                                        },
                                    )}
                                </div>
                            )}
                        </>
                    </div>
                </Content>
            </Layout>
        </motion.div>
    )
}
