import PaymentSuccess from "@/components/Core/common/PaymentSuccess"
import PaymentFailed from "@/components/Core/common/PaymentFailed"
import DoctorFeedback from "@/components/Core/modules/Doctor/DoctorFeedback"
import DoctorAppointmentTimeLine from "@/components/Core/modules/Doctor/DoctorAppointmentTimeLine"
import BookingConfirmation from "@/components/Core/modules/User/BookingModule/ConfirmAppointment"
import AppointmentBooking from "@/components/Core/modules/User/BookingModule/AppointmentBooking"
import BookedAppointmentList from "@/components/Core/modules/Doctor/DoctorBookedAppointmentsList"
import FollowUpAppointment from "@/components/Core/modules/Doctor/DoctorFollowUpAppointment"
import SettingComponent from "@/components/Core/modules/User/AIBotComponent/SettingComponent"

export default function TestComponent() {
    // return <PaymentSuccess />
    // return <PaymentFailed />
    // return <BookingConfirmation />
    // return <AppointmentBooking />
    // return <BookedAppointmentList />
    // return <FollowUpAppointment />
    // return <DoctorFeedback />
    // return <DoctorAppointmentTimeLine />
    return <SettingComponent />
}