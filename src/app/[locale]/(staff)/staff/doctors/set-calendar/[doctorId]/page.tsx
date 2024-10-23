import DoctorUpdateSchedules from "@/components/Core/modules/Staff/DoctorUpdateSchedules";

export default function SetCalendarPage({ params: { doctorId } }: { params: { doctorId: string } }) {
    return (
        <DoctorUpdateSchedules doctorId={doctorId} />
    )
}