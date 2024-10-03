"use client"

import React from 'react'
import { Button } from 'antd'

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

export default function PatientDetailForm() {
    return (
        <div className="w-[795px] mx-auto p-4 bg-white rounded-[12px] shadow-third">
            <div className="flex items-start space-x-4 mb-4">
                <img src={patientDetail.image} alt={patientDetail.name} className="w-20 h-20 rounded-[12px]" />
                <div className="flex-grow">
                    <h2 className="text-base font-bold text-secondarySupperDarker">{patientDetail.name}</h2>
                    <p className="text-base text-secondarySupperDarker">
                        <span className="font-semibold">Địa chỉ: </span>{patientDetail.address}
                    </p>
                    <div className="flex justify-start">
                        <p className="text-base text-secondarySupperDarker">
                            <span className="font-semibold">Giới tính: </span>{patientDetail.gender}
                        </p>
                        <p className="ml-5 text-base text-secondarySupperDarker">
                            <span className="font-semibold">Tuổi: </span>{patientDetail.age}
                        </p>
                    </div>
                </div>
            </div>

            <p className="mb-4 text-base text-secondarySupperDarker">
                <span className="text-base font-semibold text-secondarySupperDarker">Mô tả: </span>
                {patientDetail.description}
            </p>

            <div className="mb-4">
                <h3 className="text-lg font-semibold text-secondarySupperDarker mb-[10px]">Tái khám</h3>
                <ul className="list-disc list-inside text-base text-secondarySupperDarker">
                    <li>{patientDetail.reExamination}</li>
                </ul>
            </div>

            <div>
                <h3 className="text-lg font-semibold text-secondarySupperDarker mb-[10px]">Lịch sử khám gần đây</h3>
                <div className="space-y-4">
                    {patientDetail.examinationHistory.map((history, index) => (
                        <div key={index} className="flex items-center space-x-4">
                            <img
                                src={`https://gravatar.com/avatar/e7f242ab6fb92ab2f4c3a372fc7bcd5c?s=400&d=retro&r=pg`}
                                alt={history.doctorName}
                                className="w-16 h-16 rounded-[12px]"
                            />
                            <div className="flex-grow">
                                <h4 className="font-semibold text-base text-secondarySupperDarker">{history.doctorName}</h4>
                                <p className="text-sm text-secondarySupperDarker">{history.dateTime}</p>
                                <p className="text-sm text-secondarySupperDarker truncate">{history.diagnosis}</p>
                            </div>
                            <Button className="h-[34px] font-semibold rounded-[12px] border-[#0284C7] text-[#0284C7] text-[12px]">
                                Hồ sơ khám bệnh
                            </Button>
                        </div>
                    ))}
                </div>
            </div>

            <div className="text-center mt-4">
                <div className="border-none cursor-pointer select-none font-semibold text-[#0284C7] text-[12px]">
                    Xem thêm
                </div>
            </div>
        </div>
    )
}