"use client"
import { MessageCircleReply, MessageSquare, MessageSquareReply, SchoolIcon, StarIcon, WorkflowIcon } from 'lucide-react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import "./style.css"
import { useGetAppointmentInWeekQuery } from '@/stores/services/doctor/doctorOverview';

function getWeekRange(date = new Date()) {
    // Tạo một bản sao của đối tượng ngày truyền vào
    const currentDate = new Date(date);

    // Lấy ngày trong tuần hiện tại (0: Chủ nhật, 1: Thứ hai, ..., 6: Thứ bảy)
    const dayOfWeek = currentDate.getDay();

    // Tính ngày đầu tuần (thứ Hai) bằng cách trừ đi (dayOfWeek - 1)
    const firstDayOfWeek = new Date(currentDate);
    firstDayOfWeek.setDate(currentDate.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));

    // Tính ngày cuối tuần (chủ nhật) bằng cách cộng thêm (7 - dayOfWeek)
    const lastDayOfWeek = new Date(firstDayOfWeek);
    lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6);

    // Trả về kết quả là một object chứa ngày đầu tuần và ngày cuối tuần
    return {
        firstDay: firstDayOfWeek,
        lastDay: lastDayOfWeek
    };
}

export default function DoctorAppointmentTimeLine() {
    const { firstDay, lastDay } = getWeekRange();
    const { data, error, isLoading } = useGetAppointmentInWeekQuery({ startDate: firstDay.toISOString().slice(0, 10), endDate: lastDay.toISOString().slice(0, 10) })
    let appointments = [];
    if (data) appointments = data.body.appointment;
    return (
        <div className='relative'>
            <p className='w-full text-center text-base text-secondarySupperDarker font-bold'>Bắt đầu</p>
            <VerticalTimeline lineColor='#06B6D4'>
                {appointments.map((appointment: any) => {
                    const { id, description, patient, schedule, appointmentStatus } = appointment;

                    // Determine background color based on appointment status
                    let iconBgColor = '#0284C7'; // Default for "Pending"
                    if (appointmentStatus.constant === 'Completed') {
                        iconBgColor = '#15803D'; // Green for "Done"
                    } else if (appointmentStatus.constant === 'No-Show') {
                        iconBgColor = '#DA0000'; // Red for "Vắng mặt"
                    }

                    // Calculate the age of the patient
                    const age = new Date().getFullYear() - new Date(patient.dob).getFullYear();

                    return (
                        <VerticalTimelineElement
                            key={id}
                            className="vertical-timeline-element--work"
                            contentStyle={{ borderRadius: '16px' }}
                            contentArrowStyle={{}}
                            date={`${new Date(schedule.startDate).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: false })} - ${new Date(schedule.endDate).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: false })} ${new Date(schedule.startDate).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })}`}
                            iconStyle={{ background: iconBgColor, color: '#fff' }}
                        >
                            <div className='bg-white rounded-[12px]'>
                                <div className="rounded-lg shadow-md flex">
                                    <img src={patient.avatar} alt={`Tên bệnh nhân`} className="w-16 h-16 rounded-[12px] mr-4" />
                                    <div className="flex-grow">
                                        <h2 className="text-base text-secondarySupperDarker font-semibold">{patient.fullName || "Tên bệnh nhân"}</h2>
                                        <p className="text-base text-secondarySupperDarker mt-0 font-normal">
                                            <span className='font-semibold text-base'>Địa chỉ: </span>{`Thôn A, xã B, quận C`}
                                        </p>
                                        <div className='flex justify-start'>
                                            <p className="text-base text-secondarySupperDarker mt-0 font-normal">
                                                <span className='font-semibold text-base'>Giới tính: </span>{patient.gender.name}
                                            </p>
                                            <p className="ml-5 text-base text-secondarySupperDarker mt-0 font-normal">
                                                <span className='font-semibold text-base'>Tuổi: </span>{age}
                                            </p>
                                        </div>
                                    </div>
                                    <button className='bg-[#00B5F1] h-[34px] w-[46px] rounded-[8px]'>
                                        <MessageCircleReply className="w-6 h-6 text-white mx-auto" />
                                    </button>
                                </div>
                                <p className="text-base text-secondarySupperDarker line-clamp-3 text-balance mt-0">
                                    Mô tả: <span className='font-normal'>{description}</span>
                                </p>
                            </div>
                        </VerticalTimelineElement>
                    );
                })}
                <VerticalTimelineElement
                    contentStyle={{ display: 'none' }}
                    iconStyle={{ background: 'rgb(16, 204, 82)', color: '#fff' }}
                    icon={<StarIcon />}
                />
            </VerticalTimeline>
        </div>
    )
}