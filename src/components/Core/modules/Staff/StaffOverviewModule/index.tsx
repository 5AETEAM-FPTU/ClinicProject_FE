'use client'
import { Avatar, Button, Layout, List, Skeleton } from "antd";
import { Content } from "antd/es/layout/layout";
import { motion } from "framer-motion";
import BackGround from '@public/landing/images/profile-background.png'
import { BookOpenText, BriefcaseMedical, ChevronsRight, MessageCircleReply, Settings, Smartphone, UsersRound } from "lucide-react";
import { useRouter } from 'next-nprogress-bar'
import { DateTimeFormatOptions, useLocale } from 'next-intl'
import { jwtDecode } from "jwt-decode";
import { JwtPayloadUpdated } from "../../Auth/SignIn";
import webStorageClient from "@/utils/webStorageClient";
import { useGetAllQueueRoomsQuery } from "@/stores/services/chat/chats";
import { useGetRecentAppointmentsQuery } from "@/stores/services/doctor/doctorOverview";
import Image from "next/image";
import Slider, * as reactSlick from 'react-slick'
import { useGetDoctorProfileQuery } from "@/stores/services/doctor/doctorSettings";
import { useGetCancelAppointmentQuery } from "@/stores/services/doctor/doctorTreatmentTurn";
import UserAvailableDoctor from "../../User/UserOverviewModule/UserAvailableDoctor";
import { useGetRecentAbsentAppointmentQuery, useGetRecentPendingAppointmentQuery } from "@/stores/services/appointment";
import dayjs from "dayjs";

export default function StaffOverviewModule() {
    return (
        <motion.div
            initial={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            exit={{ opacity: 0 }}
        >
            <Layout className="bg-dashboardBackground h-fit">
                <Content style={{ padding: '0px' }}>
                    <div className="flex w-full xl:flex-row flex-col gap-5">
                        <div className="flex xl:w-1/2 w-full flex-col gap-5 order-2 xl:order-none">
                            <StaffProfileModule />
                            <CancelBookedAppointment />
                        </div>
                        <div className="flex xl:w-1/2 w-full flex-col gap-5 order-1 xl:order-none">
                            <UserAvailableDoctor />
                            <ConsultationComponent />
                            <RecentBookedAppointment />
                        </div>
                    </div>
                </Content>
            </Layout>
        </motion.div>
    )
}

const StaffProfileModule = () => {
    const router = useRouter()
    const locale = useLocale();
    const { data: doctorData, isLoading: doctorLoading, error: doctorError } = useGetDoctorProfileQuery();
    const doctor = doctorData?.body.user;

    return (
        <Skeleton loading={doctorLoading} active avatar>
            <div className="shadow rounded-lg bg-white p-4 shadow-third">
                <div
                    style={{
                        backgroundImage: `url(${BackGround.src})`,
                    }}
                    className={`flex h-[160px] items-start justify-between rounded-[12px] bg-cover bg-center p-5`}
                >
                    <Avatar
                        shape="square"
                        src={doctor?.avatarUrl}
                        alt="Doctor"
                        className="mb-4 h-[120px] w-[120px] rounded-[10px] object-cover"
                    />
                    <Button
                        className="h-[37px] border-[1px] border-[#0284C7] bg-white px-3 py-2 text-base font-semibold text-[#0284C7]"
                        iconPosition="end"
                        type="primary"
                        icon={<Settings color="#0284C7" size={20} />}
                        onClick={() => { router.push(`/${locale}/${jwtDecode<JwtPayloadUpdated>(webStorageClient.getToken()!).role}/account/settings`) }}
                    >
                        Cài đặt
                    </Button>
                </div>
                <div className="ml-[29px]">
                    <h2 className="mt-4 text-[24px] font-bold text-secondarySupperDarker">
                        Họ Tên: {doctor?.fullName}
                    </h2>
                    <div className="mt-3 flex items-center">
                        <UsersRound size={30} className="text-secondarySupperDarker" />
                        <p className="ml-[10px] text-[17px] font-medium text-secondarySupperDarker">
                            Giới tính: {doctor?.gender.genderName}
                        </p>
                    </div>
                    <div className="mt-3 flex items-center">
                        <BriefcaseMedical size={30} className="text-secondarySupperDarker" />
                        <p className="ml-[10px] text-[17px] font-medium text-secondarySupperDarker">
                            Chức vụ: {doctor?.position.positionName}
                        </p>
                    </div>
                    <div className="mt-3 flex items-center">
                        <BookOpenText className="w-[30px] text-secondarySupperDarker" />
                        <p className="ml-[10px] text-[17px] font-medium text-secondarySupperDarker">
                            Chuyên khoa: {doctor?.specialties.map((specialty: { specialtyName: string }) => specialty.specialtyName).join(', ')}
                        </p>
                    </div>
                    <div className="mt-3 flex items-center">
                        <Smartphone size={30} className="text-secondarySupperDarker" />
                        <p className="ml-[10px] text-[17px] font-medium text-secondarySupperDarker">
                            Số điện thoại: {doctor?.phoneNumber}
                        </p>
                    </div>
                </div>
            </div>
        </Skeleton>
    )
}

const ConsultationComponent = () => {

    const { data, isFetching } = useGetAllQueueRoomsQuery({ pageIndex: 1, pageSize: 2 }, {
        selectFromResult: ({ data, isFetching }) => {
            return {
                data: data?.body.patientQueues?.contents,
                isFetching: isFetching
            }
        }
    })

    const router = useRouter()
    const locale = useLocale();

    return (
        <Skeleton loading={isFetching} avatar>
            <div className="shadow rounded-lg bg-white p-4 shadow-third">
                <h2 className="mb-4 text-[18px] font-bold text-secondarySupperDarker">
                    Yêu cầu tư vấn
                </h2>
                {data ? (
                    <List
                        dataSource={data.length === 1 ? [data[0], data[0]] : data}
                        renderItem={(item: any) => (
                            <List.Item className="mt-[10px] rounded-[12px] bg-[#F8F9FB] p-[10px]">
                                <List.Item.Meta
                                    avatar={
                                        <Avatar
                                            size={50}
                                            src={item.patientAvatar}
                                        />
                                    }
                                    title={
                                        <span className="text-[14px] font-bold text-secondarySupperDarker">
                                            {item.patientName}
                                        </span>
                                    }
                                    description={
                                        <span className="font-regular line-clamp-1 text-[14px] text-secondarySupperDarker" dangerouslySetInnerHTML={{ __html: item.message }}>
                                        </span>
                                    }
                                />
                                <Button className="h-8 w-11 rounded-[8px] bg-[#00B5F1]" onClick={() => { router.push(`/${locale}/${jwtDecode<JwtPayloadUpdated>(webStorageClient.getToken()!).role}/consultation/pending-room`) }}>
                                    <MessageCircleReply
                                        className="mx-auto text-white"
                                        size={20}
                                    />
                                </Button>
                            </List.Item>
                        )}
                    />) : <div>Chưa có data</div>}
            </div>
        </Skeleton>
    )
}

const RecentBookedAppointment = () => {
    const { data, isLoading, error } = useGetRecentPendingAppointmentQuery()
    let appointments = [];
    if (data) appointments = data.body.appointment;
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const options: DateTimeFormatOptions = { weekday: 'short', day: '2-digit', month: '2-digit', year: 'numeric' };
        return date.toLocaleDateString('vi-VN', options).replace(',', ''); // Format to Vietnamese style
    };

    console.log("data", data);

    const formatDateTime = (dateString: string) => {
        const date = new Date(dateString);

        // Formatting time as HH:mm
        const timeOptions = { hour: '2-digit', minute: '2-digit', hour12: false } as const;
        const formattedTime = date.toLocaleTimeString([], timeOptions);

        // Formatting date as DD/MM/YYYY
        const dateOptions = { day: '2-digit', month: '2-digit', year: 'numeric' } as const;
        const formattedDate = date.toLocaleDateString('vi-VN', dateOptions);

        return `${formattedTime} - ${formattedDate}`; // Combine time and date
    };

    const formatTime = (startDate: string, endDate: string) => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const startTime = start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
        const endTime = end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
        return `${startTime} - ${endTime}`;
    };
    return (
        <Skeleton loading={isLoading} avatar>
            <div className="shadow rounded-lg bg-white p-4 shadow-third">
                <h2 className="mb-4 text-lg font-bold text-secondarySupperDarker">
                    Lịch đã được đặt gần đây
                </h2>
                {
                    <List
                        dataSource={appointments}
                        renderItem={(item: any) => (
                            <List.Item className="mt-[14px] h-fit rounded-[8px] bg-[#F8F9FB] px-2 py-1 2xl:h-[58px]">
                                <List.Item.Meta
                                    avatar={
                                        <Avatar
                                            className="size-[50px] rounded-[8px] text-secondarySupperDarker"
                                            src={item.avatarUrl || "/placeholder.svg?height=40&width=40"} // Use patient's avatar or placeholder
                                        />
                                    }
                                    title={
                                        <span className="text-[14px] font-bold text-secondarySupperDarker">
                                            {item.fullName || "Unknown Patient"}
                                        </span>
                                    }
                                    description={
                                        <div>
                                            <span className="text-[14px] font-medium text-secondarySupperDarker">
                                                Đặt lúc {formatDateTime(item.createdDate)}
                                            </span>
                                        </div>
                                    }
                                />
                                <div className="gap-[14px] 2xl:flex">
                                    <p className="rounded-[12px] bg-[#3792ec] px-[10px] py-[2px] text-center font-bold text-white">
                                        {formatTime(item.startDate, item.endDate)} | {formatDate(item.startDate)}
                                    </p>
                                </div>
                            </List.Item>
                        )}
                    />
                }
            </div>

        </Skeleton>
    )
}

const CancelBookedAppointment = () => {
    const { data, isLoading, error } = useGetRecentAbsentAppointmentQuery()
    let appointments = [];
    if (data) appointments = data.body.appointment;
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const options: DateTimeFormatOptions = { weekday: 'short', day: '2-digit', month: '2-digit', year: 'numeric' };
        return date.toLocaleDateString('vi-VN', options).replace(',', ''); // Format to Vietnamese style
    };

    console.log("cancel", data?.body?.appointment);

    const formatDateTime = (dateString: string) => {
        const date = new Date(dateString);

        // Formatting time as HH:mm
        const timeOptions = { hour: '2-digit', minute: '2-digit', hour12: false } as const;
        const formattedTime = date.toLocaleTimeString([], timeOptions);

        // Formatting date as DD/MM/YYYY
        const dateOptions = { day: '2-digit', month: '2-digit', year: 'numeric' } as const;
        const formattedDate = date.toLocaleDateString('vi-VN', dateOptions);

        return `${formattedTime} - ${formattedDate}`; // Combine time and date
    };

    const formatTime = (startDate: string, endDate: string) => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const startTime = start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
        const endTime = end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
        return `${startTime} - ${endTime}`;
    };
    return (
        <Skeleton loading={isLoading} avatar>
            <div className="shadow rounded-lg bg-white p-[18px] shadow-third">
                <h2 className="mb-4 text-lg font-bold text-secondarySupperDarker">
                    Lịch khám bị vắng mặt
                </h2>
                {appointments ?
                    <List
                        dataSource={appointments}
                        renderItem={(item: any) => (
                            <List.Item className="mt-[14px] h-fit rounded-[8px] bg-[#F8F9FB] px-2 py-1 2xl:h-[58px]">
                                <List.Item.Meta
                                    avatar={
                                        <Avatar
                                            className="size-[50px] rounded-[8px] text-secondarySupperDarker"
                                            src={item.avatarUrl || "/placeholder.svg?height=40&width=40"} // Use patient's avatar or placeholder
                                        />
                                    }
                                    title={
                                        <span className="text-[14px] font-bold text-secondarySupperDarker">
                                            {item.fullName || "Unknown Patient"}
                                        </span>
                                    }
                                    description={
                                        <div>
                                            <span className="text-[14px] font-medium text-secondarySupperDarker">
                                                 {formatTime(item.startDate, item.endDate)} | {dayjs(item.startDate).format("DD/MM/YYYY")}
                                            </span>
                                        </div>
                                    }
                                />
                                <Button className="rounded-[12px] bg-[#0284C7] px-[10px] py-[2px] text-center font-bold text-white">
                                    Gửi thông báo
                                </Button>
                            </List.Item>
                        )}
                    /> :
                    <div className='text-center'>Không có lịch khám</div>
                }
            </div>

        </Skeleton>
    )
}
