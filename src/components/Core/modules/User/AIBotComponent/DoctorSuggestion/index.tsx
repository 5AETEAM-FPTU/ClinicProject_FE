"use client"
import { useLazyGetAllDoctorForBookingQuery } from "@/stores/services/user/userAppointments";
import { DoctorSkeleton } from "../../BookingModule/AppointmentBooking"
import { useEffect } from "react";
import { useRouter } from "next-nprogress-bar";
import { Star } from "lucide-react";
import { Layout } from "antd";

const { Content } = Layout;

const serialize = function (obj: any) {
    var str = [];
    for (var p in obj)
        if (obj.hasOwnProperty(p)) {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
    return str.join("&");
}

export default function DoctorSuggestion({ doctorSpecialtyId }: { doctorSpecialtyId?: string }) {
    const [getDoctors, { data: doctors, isFetching: isDoctorFetching }] = useLazyGetAllDoctorForBookingQuery();
    const doctorsData = !isDoctorFetching && doctors?.body?.userDetails?.contents;
    const router = useRouter();
    const handleBookDoctor = (doctor: { fullName: string, id: string, specialties: any }) => {
        router.push(`/user/treatment-calendar/booking/schedule?${serialize({ fullName: doctor.fullName, doctorId: doctor.id, specialties: doctor.specialties?.map((spec: any) => spec.specialtyName).join(', ') })}`)
    }
    useEffect(() => {
        if (doctorSpecialtyId) getDoctors({ pageIndex: 1, doctorSpecialtyId: doctorSpecialtyId });
    }, [doctorSpecialtyId]);

    return (
        doctorSpecialtyId && (isDoctorFetching
            ?
            <DoctorSkeleton size={3} skeletonSize={64} /> :
            (doctorsData?.length != 0 ? <Content className="bg-white p-4  mt-4 rounded-[12px] shadow-third h-fit">
                <h2 className="text-base font-bold">Gợi ý bác sĩ</h2>
                <div className="mt-4 grid grid-cols-1 xl:grid-cols-3 gap-[20px]">
                    {doctorsData?.map((doctor: any) => (
                        <div key={doctor.username} className="bg-white rounded-lg shadow-third p-6">
                            <div className="flex items-center mb-4">
                                <img src={`${doctor.avatarUrl}`} alt="Doctor" className="w-16 h-16 rounded-full mr-4" />
                                <div>
                                    <h3 className="font-semibold text-base text-secondarySupperDarker">{doctor.fullName}</h3>
                                    <p className="text-base text-secondarySupperDarker opacity-80"><span className='font-semibold'>Chuyên trị: </span>{doctor.specialties?.map((spec: any) => spec.specialtyName).join(', ')}</p>
                                    <p className="text-base text-secondarySupperDarker opacity-80"><span className='font-semibold'>Giá khám:</span> 150.000đ</p>
                                </div>
                            </div>
                            <p className="text-base text-secondarySupperDarker mb-4 line-clamp-3 h-[72px]">
                                {doctor.description}
                            </p>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-semibold mb-1 text-secondarySupperDarker">Đánh giá</p>
                                    <div className="flex text-[14px] font-semibold text-secondarySupperDarker">{doctor.rating} <Star fill='#FAFF00' className="ml-1 text-[#FAFF00]" /></div>
                                </div>
                                <button className="bg-secondaryDark text-white px-4 py-2 rounded-[12px] font-bold" onClick={() => handleBookDoctor(doctor)}>
                                    Đặt ngay
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </Content> : '')
        )
    )
}