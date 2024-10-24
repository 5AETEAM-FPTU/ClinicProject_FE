"use client"
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import viLocale from '@fullcalendar/core/locales/vi'; // Import Vietnamese locale
import { Popover } from 'antd';
import { useGetAppointmentInWeekQuery } from '@/stores/services/doctor/doctorOverview';
import { MessageCircleReply } from 'lucide-react';
import './style.css';

function getWeekRange(date = new Date()) {
    const currentDate = new Date(date);
    const dayOfWeek = currentDate.getDay();
    const firstDayOfWeek = new Date(currentDate);
    firstDayOfWeek.setDate(currentDate.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));
    const lastDayOfWeek = new Date(firstDayOfWeek);
    lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6);

    return {
        firstDay: firstDayOfWeek,
        lastDay: lastDayOfWeek
    };
}

export default function DoctorAppointmentCalendar() {
    const { firstDay, lastDay } = getWeekRange();
    const { data, error, isLoading } = useGetAppointmentInWeekQuery({
        startDate: firstDay.toISOString().slice(0, 10),
        endDate: lastDay.toISOString().slice(0, 10)
    });

    const appointments = data?.body?.appointment || [];

    const events = appointments.map((appointment: any) => {
        console.log(appointment);
        const { id, description, patient, schedule, appointmentStatus } = appointment;
        return {
            id,
            title: `${patient.fullName || "Tên bệnh nhân"} (${appointmentStatus.constant})`,
            start: schedule.startDate,
            end: schedule.endDate,
            extendedProps: {
                patient,
                description,
                appointmentStatus
            }
        };
    });

    return (
        <div className="relative">
            <FullCalendar
                plugins={[timeGridPlugin]}
                initialView="timeGridWeek"
                allDaySlot={false}
                weekends={true}
                dayCellClassNames={['text-center']}
                slotLaneClassNames={['h-max-content']}
                events={events}
                locale={viLocale}
                firstDay={1}
                titleFormat={{ year: 'numeric', month: 'long', day: 'numeric' }}
                headerToolbar={{
                    left: '',
                    center: 'title',
                    right: 'timeGridWeek,timeGridDay'
                }}
                dayHeaderContent={(args) => args.date.toLocaleDateString('vi-VN', { weekday: 'long' })}
                eventContent={renderEventContent}
            />
        </div>
    );
}

function renderEventContent(eventInfo: any) {
    const { patient, description, appointmentStatus } = eventInfo.event.extendedProps;
    const age = new Date().getFullYear() - new Date(patient.dob).getFullYear();
    const iconBgColor = appointmentStatus.constant === 'Completed' ? '#15803D' :
        appointmentStatus.constant === 'No-Show' ? '#DA0000' : '#0284C7';
    return (
        <Popover
            style={{ backgroundColor: iconBgColor, color: '#fff', padding: '2px 4px', borderRadius: '4px' }}
            content={
                <div className="bg-white rounded-[12px] p-2 shadow-md">
                    <div className="flex items-center gap-2">
                        <img src={patient.avatar} alt="Patient" className="w-16 h-16 rounded-[12px] mr-4 object-cover" />
                        <div className="flex-grow">
                            <h3 className="text-base font-semibold">{patient.fullName || "Tên bệnh nhân"}</h3>
                            <p className="text-base">
                                <strong>Địa chỉ: </strong>Thôn A, xã B, quận C
                            </p>
                            <p className="text-base">
                                <strong>Giới tính: </strong>{patient.gender.name}
                            </p>
                            <p className="text-base">
                                <strong>Tuổi: </strong>{age}
                            </p>
                        </div>
                    </div>
                    <div className="text-base text-secondarySupperDarker mt-2">
                        <strong>Thời gian: </strong>{eventInfo.timeText}
                    </div>
                    <p className="text-base text-secondarySupperDarker mt-2">
                        <strong>Mô tả: </strong>{description}
                    </p>
                </div>
            }
        >
            <div className='h-full'>
                <b>{eventInfo.timeText}</b> <br />
            </div>
        </Popover>
    );
}