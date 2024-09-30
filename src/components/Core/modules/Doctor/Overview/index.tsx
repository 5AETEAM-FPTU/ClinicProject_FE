"use client"
import React, { useState } from 'react'
import { List, Avatar, Switch, Button } from 'antd'
import { Settings, MessageCircle, Calendar as CalendarIcon, Smartphone, UsersRound, BookOpenText, BriefcaseMedical, MessageCircleReply } from 'lucide-react'
import Image from 'next/image'
import BackGround from '@public/landing/images/profile-background.png'
import './style.css'

const patients = [
    { name: 'Nguyễn Hòa An', gender: 'Nữ', age: 32 },
    { name: 'Nguyễn Hoàng Anh', gender: 'Nữ', age: 32 },
]

const consultations = [
    { name: 'Nguyễn Mai Phương', message: 'Hiện tại em đang muốn khám tổng quát, bác sĩ có thể...' },
    { name: 'Lê Đại Hoàng', message: 'Tư vấn giúp em về tình hình sức khỏe hiện tại của em...' },
]

const appointments = [
    { name: 'Nguyễn Quang Quý', time: '08:30 - 9:30 | T4 - 02/11/2024', date: '21:24 - 22/10/2024' },
    { name: 'Nguyễn Quang Quý', time: '08:30 - 9:30 | T4 - 02/11/2024', date: '21:24 - 22/10/2024' },
]

const CustomCalendar = () => {
    const days = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN']
    const dates = Array.from({ length: 31 }, (_, i) => i + 1)
    const currentDate = new Date().getDate();
    return (
        <div className="bg-white h-full p-5 rounded-lg shadow shadow-third">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-secondarySupperDarker">Tháng 4 2024</h2>
                <button className="text-blue-500">
                    <CalendarIcon size={20} />
                </button>
            </div>
            <div className="grid grid-cols-7 gap-1">
                {days.map(day => (
                    <div key={day} className="text-center mx-auto text-secondarySupperDarker font-semibold w-[95%]">{day}</div>
                ))}
                {dates.map(date => (
                    <div key={date} className={`w-[95%] mx-auto shadow-custom-shadow h-11 flex justify-center items-center text-center p-2 rounded-[8px] hover:bg-blue-100 cursor-pointer font-semibold text-secondarySupperDarker ${currentDate == date ? 'bg-[#0284C7] text-white' : ''} ${currentDate != date && false ? 'bg-[#0284C760]' : ''}`}>
                        {date}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default function MedicalDashboard() {
    const [checked, setChecked] = useState(false);

    const handleChange = (checked: boolean) => {
        setChecked(checked);
    };
    return (
        <div className="flex flex-col gap-4 p-4 min-h-screen">
            <div className="flex flex-col lg:flex-row gap-4">
                <div className="lg:flex-1">
                    <CustomCalendar />
                </div>
                <div className="lg:flex-1">
                    <div className="bg-white p-4 rounded-lg shadow h-full shadow shadow-third">
                        <h2 className="text-lg font-bold mb-4 text-secondarySupperDarker">Đang chờ khám</h2>
                        {Array.from({ length: 3 }).map((_, index) => (
                            <div className='flex justify-between py-2 px-[10px] border-b-[1px] border-[#00355350]'>
                                <div className='flex'>
                                    <img src="https://gravatar.com/avatar/091e1674e2a84259f010b5371c2823a9?s=400&d=robohash&r=x" className='w-[60px] h-[60px] object-contain mr-[10px]' alt="Patient" />
                                    <div className='flex-col'>
                                        <p className='font-bold text-secondarySupperDarker'>Nguyễn Hòa An</p>
                                        <p className='font-semibold text-[12px] text-secondarySupperDarker'>Nữ</p>
                                        <p className='font-semibold text-[12px] text-secondarySupperDarker'>32 Tuổi</p>
                                    </div>
                                </div>
                                <div className='flex items-center'>
                                    <button className="text-white px-3 py-1 rounded-[12px] bg-[#0284C7] font-bold">Đang chờ</button>
                                </div>
                            </div>
                        ))}
                        <div className="text-center mt-4">
                            <a href="#" className="text-secondarySupperDarker font-bold">Xem tất cả</a>
                        </div>
                    </div>
                </div>
                <div className="lg:flex-1">
                    <div className="bg-white p-4 rounded-lg shadow shadow-third h-full">
                        <h2 className="text-[18px] font-bold text-secondarySupperDarker">Cập nhật trạng thái</h2>
                        <p className="text-[12px] font-medium text-gray-500 mt-2">
                            Cho người khác biết là bạn hiện đang có mặt tại phòng khám.
                        </p>

                        <div className="flex items-center mt-9">
                            <Switch className={checked ? `bg-[#0284C7]` : 'bg-white-200'} defaultChecked={false} onChange={handleChange} />
                            <span className='text-base font-bold ml-4 text-secondarySupperDarker'>
                                {checked ? 'Hiện đang trực' : 'Hiện không trực'}
                            </span>
                        </div>
                        <p className="text-sm text-gray-500 mt-9">
                            Lưu ý: Người sử dụng hệ thống sẽ dễ dàng đặt lịch khám hoặc yêu cầu tư vấn hơn khi có bác sĩ đang trực!
                        </p>
                    </div>
                </div>
            </div>
            <div className="flex flex-col lg:flex-row gap-4">
                <div className="lg:flex-1">
                    <div className="bg-white p-4 rounded-lg shadow shadow-third h-full">
                        <div
                            style={{ backgroundImage: `url(${BackGround.src})` }}
                            className={`rounded-[12px] p-5 h-[160px] flex justify-between items-start h-64 bg-cover bg-center`}>
                            <img src="https://gravatar.com/avatar/091e1674e2a84259f010b5371c2823a9?s=400&d=robohash&r=x" alt="Doctor" className="w-24 h-24 rounded-[10px] mb-4" />
                            <Button className='bg-white text-[#0284C7] text-base font-semibold h-[37px] py-2 px-3 border-[1px] border-[#0284C7]' iconPosition='end' type="primary" icon={<Settings color='#0284C7' size={20} />}>Cài đặt</Button>
                        </div>
                        <div className='ml-[29px] '>
                            <h2 className=" text-[24px] font-bold mt-4 text-secondarySupperDarker">Namae Wa Nan Desu Ka</h2>
                            <div className='flex items-center mt-3'>
                                <UsersRound className='h-fit text-secondarySupperDarker' />
                                <p className='ml-[10px] text-[21px] font-medium text-secondarySupperDarker'>Giới tính: Nam</p>
                            </div>
                            <div className='flex items-center mt-3'>
                                <BriefcaseMedical className='h-fit text-secondarySupperDarker' />
                                <p className='ml-[10px] text-[21px] font-medium text-secondarySupperDarker'>Chức vụ: Thạc Sĩ - Bác sĩ</p>
                            </div>
                            <div className='flex items-center mt-3'>
                                <BookOpenText className='h-fit text-secondarySupperDarker' />
                                <p className='ml-[10px] text-[21px] font-medium text-secondarySupperDarker'>Chuyên khoa: Nội tim mạch</p>
                            </div>
                            <div className='flex items-center mt-3'>
                                <Smartphone className='h-fit text-secondarySupperDarker' />
                                <p className='ml-[10px] text-[21px] font-medium text-secondarySupperDarker'>Số điện thoại: 0752789222</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="lg:flex-1 flex flex-col gap-4">
                    <div className="bg-white p-4 rounded-lg shadow shadow-third">
                        <h2 className="text-[18px] font-bold mb-4 text-secondarySupperDarker">Yêu cầu tư vấn</h2>
                        <List
                            dataSource={consultations}
                            renderItem={(item) => (
                                <List.Item className='bg-[#F8F9FB] mt-[10px] p-[10px] rounded-[12px]'>
                                    <List.Item.Meta
                                        avatar={<Avatar size={50} src="/placeholder.svg?height=40&width=40" />}
                                        title={<span className='font-bold text-[14px] text-secondarySupperDarker'>{item.name}</span>}
                                        description={<span className='font-regular text-[14px] line-clamp-1 text-secondarySupperDarker'>{item.message}</span>}
                                    />
                                    <button className='w-11 h-8 rounded-[8px] bg-[#00B5F1]'>
                                        <MessageCircleReply className='mx-auto text-white' size={20} />
                                    </button>
                                </List.Item>
                            )}
                        />
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow shadow-third">
                        <h2 className="text-lg font-bold mb-4 text-secondarySupperDarker">Lịch đã được đặt gần đây</h2>
                        <List
                            dataSource={appointments}
                            renderItem={(item) => (
                                <List.Item className='py-1 px-2 bg-[#F8F9FB] mt-[14px] rounded-[8px] h-fit 2xl:h-[58px]'>
                                    <List.Item.Meta
                                        avatar={<img className='size-[50px] rounded-[8px] text-secondarySupperDarker' src="/placeholder.svg?height=40&width=40" />}
                                        title={<span className='font-bold text-[14px] text-secondarySupperDarker'>{item.name}</span>}
                                        description={
                                            <div>
                                                <span className='font-medium text-[14px] text-secondarySupperDarker'>Đã đặt lịch lúc {item.date}</span>
                                            </div>
                                        }
                                    />
                                    <div className='hidden 2xl:flex gap-[14px]'>
                                        <p className='rounded-[12px] text-center text-white bg-[#0284C7] font-bold py-[2px] px-[10px]'>{item.time}</p>
                                        <CalendarIcon size={20} className="text-green-500" />
                                    </div>

                                </List.Item>
                            )}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}