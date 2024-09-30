import PaymentSuccess from "@/components/Core/common/PaymentSuccess"
import PaymentFailed from "@/components/Core/common/PaymentFailed"
import BookingConfirmation from "@/components/Core/modules/Calendar/ConfirmAppointment"
import AppointmentBooking from "@/components/Core/modules/Calendar/AppointmentBooking"
import OverView from "@/components/Core/modules/doctor/Overview"

export default function TestComponent() {
    return <OverView />
    // return <PaymentSuccess />
    // return <PaymentFailed />
    // return <BookingConfirmation />
    // return <AppointmentBooking />
}