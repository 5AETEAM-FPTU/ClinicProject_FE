import PaymentSuccess from "@/components/Core/common/PaymentSuccess"
import PaymentFailed from "@/components/Core/common/PaymentFailed"
import BookingConfirmation from "@/components/Core/modules/Calendar/ConfirmAppointment"
import AppointmentBooking from "@/components/Core/modules/Calendar/AppointmentBooking"
import DoctorFeedback from "@/components/Core/modules/Doctor/DoctorFeedback"
import DoctorAppointmentTimeLine from "@/components/Core/modules/Doctor/DoctorAppointmentTimeLine"
import BookedAppointmentList from "@/components/Core/modules/Doctor/DoctorBookedAppointmentsList"
import FollowUpAppointment from "@/components/Core/modules/Doctor/DoctorFollowUpAppointment"

export default function TestComponent() {
    // return <PaymentSuccess />
    // return <PaymentFailed />
    // return <BookingConfirmation />
    // return <AppointmentBooking />
    // return <BookedAppointmentList />
    // return <FollowUpAppointment />
    // return <DoctorFeedback />
    return <DoctorAppointmentTimeLine />
}