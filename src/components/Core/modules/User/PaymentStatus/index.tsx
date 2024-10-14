"use client"
import FailedPayment from "@/components/Core/common/PaymentFailed";
import PaymentSuccess from "@/components/Core/common/PaymentSuccess"
import { useSearchParams } from "next/navigation";

export default function PaymentStatus() {
    const searchParams = useSearchParams();
    const code = searchParams.get('code');
    const isError = parseInt(code || '500') >= 400;
    const transactionId = searchParams.get('TransactionId');
    const amount = parseFloat(searchParams.get('Amount') || '0').toLocaleString('vi-VN');
    const date = searchParams.get('PaymentDate');
    const appointmentDate = searchParams.get('AppointmentDate');
    const doctorName = searchParams.get('DoctorName');
    return !isError
        ? <PaymentSuccess
            transactionId={transactionId}
            amount={amount} date={date}
            appointmentDate={appointmentDate || ''}
            doctorName={doctorName}
        />
        : <FailedPayment />
}