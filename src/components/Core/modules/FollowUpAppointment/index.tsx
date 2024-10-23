"use client"

import React, { use, useCallback, useEffect, useState } from 'react'
import { Input, Popover, DatePicker, Select, Button, Avatar, Skeleton, ConfigProvider, message } from 'antd'
import { Search, RefreshCw, ScanEye } from 'lucide-react'
import PatientModal from './PatientDetailExpandable'
import Paginate from '@/components/Core/common/Paginate'
import { useLazyGetAllUserFollowUpAppointmentQuery } from '../../../../stores/services/appointment'
import { debounce } from 'lodash'
import { useGetAllRetreatmentTypeQuery } from '@/stores/services/enum/enum'
import dayjs, { Dayjs } from 'dayjs'
import locale from 'antd/es/locale/vi_VN'; // Import Vietnamese locale for Ant Design
import 'dayjs/locale/vi'; // Import Vietnamese locale
import { useCreateFollowUpNotificationMutation } from '@/stores/services/notification'

dayjs.locale('vi');

function mapData(inputArray: any) {
    return inputArray.reExaminationTypes.map((item: any) => ({
        value: item.id, // Convert to lowercase and replace spaces with dashes
        label: item.typeName // Use the typeName for the label
    }));
}

export default function FollowUpAppointment() {
    const { data: retreatmentResult } = useGetAllRetreatmentTypeQuery({});
    const [reExaminationTypes, setReExaminationTypes] = useState<any[]>([])
    useEffect(() => {
        if (retreatmentResult?.body.retreamentTypes) {
            console.log(retreatmentResult.body.retreamentTypes)
            setReExaminationTypes(retreatmentResult.body.retreamentTypes)
        }
    }, [retreatmentResult])

    const [getAllUser, { isFetching, data: userResult }] = useLazyGetAllUserFollowUpAppointmentQuery()
    const [patients, setPatients] = useState([])
    const [pageIndex, setPageIndex] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [keyword, setKeyword] = useState('')
    const [pageSize, setPageSize] = useState(1)
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
    const [activePopover, setActivePopover] = useState<string | null>(null)
    const handlePopoverOpen = (patientId: string) => {
        setActivePopover(patientId)
    }

    const handlePopoverClose = () => {
        setActivePopover(null)
    }

    const ReExaminationForm = (reExaminationTypes: any) => {
        const [retreatmentTypeId, setRetreatmentTypeId] = useState('')
        const [examinationDate, setExaminationDate] = useState('')
        const [createNotification, { isLoading }] = useCreateFollowUpNotificationMutation();
        const handleCreateNotification = async () => {
            try {
                await createNotification({
                    patientId: activePopover || '',
                    examinationDate: new Date(examinationDate),
                    retreatmentTypeId: retreatmentTypeId,
                    message: 'Thông báo nhắc nhở tái khám vào ngày ' + dayjs(examinationDate).format('DD/MM/YYYY') + ' tại phòng khám P-Clinic',
                    to: 'Bệnh nhân'
                }).unwrap()
                handlePopoverClose()
                message.success('Tạo nhắc nhở tái khám thành công')
            } catch (error) {
                message.error('Có lỗi xảy ra, vui lòng thử lại sau')
            }


        }
        return (
            <div className="p-4 w-64">
                <Select
                    onChange={(value) => setRetreatmentTypeId(value)}
                    className="w-full mb-4"
                    placeholder="Xét nghiệm bổ sung"
                    options={mapData(reExaminationTypes)}
                />
                <ConfigProvider locale={locale}>
                    <DatePicker minDate={dayjs().add(1, 'day')} onChange={(date) => setExaminationDate(date.toISOString())} className="w-full mb-4 h-[38px]" placeholder="Ngày tái khám" />
                </ConfigProvider>

                <div className="flex justify-end space-x-2">
                    <Button loading={isLoading} onClick={handlePopoverClose} danger>Hủy</Button>
                    <Button onClick={handleCreateNotification} loading={isLoading} type="primary">Tạo</Button>
                </div>
            </div>
        )
    }

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
                <div className="grid lg:grid-cols-1 xl:grid-cols-3 gap-4">
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
                                            <span className='font-semibold text-base'>Tuổi: </span> {patient.age}
                                        </p>
                                    </div>
                                </div>
                                <button className='h-fit' onClick={() => { setIsExpanded(true); setPatientId(patient.id) }}>
                                    <ScanEye className="w-6 h-6 text-[#0284C7]" />
                                </button>
                            </div>
                            <div className="flex justify-end items-center mt-2">
                                <Popover
                                    content={<ReExaminationForm reExaminationTypes={reExaminationTypes} />}
                                    title="Tạo nhắc nhở tái khám"
                                    trigger="click"
                                    open={activePopover === patient.id}
                                    onOpenChange={(visible) => visible ? handlePopoverOpen(patient.id) : handlePopoverClose()}
                                >
                                    <div className='flex justify-end'>
                                        <Button className='mr-2 h-[34px] font-semibold rounded-[12px] bg-[#0284C7] text-[12px]' type='primary'>Tái khám</Button>
                                    </div>
                                </Popover>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Paginate totalPages={totalPages} page={pageIndex} onPageChange={(page) => setPageIndex(page)} />
        </>
    )
}