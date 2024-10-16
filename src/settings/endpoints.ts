import { GET } from "@/app/api/auth/[...nextauth]/route"

const demoEnpoints = {
    GET_AMOUNT_OF_QUESTION: '',
}
const authEndpoint = {
    SIGNIN: '/auth/login',
    FORGET_PASSWORD: '/auth/forgot-password',
    CHANGE_PASSWORD: '/auth/changing-password',
    LOGOUT: '/auth/logout',
    SIGNUP: '/auth/register-user',
    CONFIRM_EMAIL: '/auth/confirm-email',
    RESEND_EMAIL: '/auth/resend-email-confirmation',
    GOOGLE_AUTH: '/auth/login/google',
    UPDATE_PASSWORD: '/auth/update-password',
    REFRESH_ACCESS_TOKEN: '/auth/refresh-access-token',
}

const userEndpoint = {
    CHANGE_AVATAR: '/user/avatar',
    PATCH_PRIVATE_INFOR: '/user/private-info',
    GET_PROFILE: '/user/profile',
    PATCH_DESCRIPTION: '/user/description',
    GET_DOCTORS_FOR_APPOINTMENT: 'doctor/getAllDoctorForBooking',
    GET_BOOKED_APPOINTMENTS: '/appointment/getUserBookedAppointment',
    UPDATE_BOOKED_APPOINTMENT: '/appointment/user-update',
    GET_UPCOMING_DATE: '/appointment/appointment-upcoming',
    CREATE_AN_APPOINTMENT: '/appointment/create',
}

const doctorEndpoint = {
    GET_PROFILE: '/doctor/profile',
    PATCH_PRIVATE_INFOR: '/doctor/private-info',
    PATCH_ACHIEVEMENT: '/doctor/achievement',
    PATCH_DESCRIPTION: '/doctor/description',

    GET_APPOINTMENTS_ON_DAY: "/doctor/appointments",
    GET_CANCEL_APPOINTMENTS: "/appointment/absent",
    UPDATE_DUTY: "/doctor/duty",
    GET_RECENT_APPOINTMENTS: "/doctor/appointments/recent",
    GET_MEDICAL_REPORT: "/medical-report/all",
}

const scheduleEndpoint = {
    GET_SCHEDULES_BY_DATE: '/schedules/date',
    POST_CREATE_SCHEDULES: '/schedules',
    GET_SCHEDULES_BY_MONTH: '/schedules/month',
    REMOVE_SCHEDULE_BY_ID: '/schedules/remove/{scheduleId}',
    REMOVE_SCHEDULE_BY_DATE: '/schedules/remove/{date}',
    UPDATE_SCHEDULE_BY_ID: '/schedules/update/{scheduleId}',
}

const enumEndpoint = {
    GET_SPECIALTY: '/enum/getAllSpecialty',
    GET_RETREATMENT_TYPE: '/enum/getAllRetreatmentType',
    GET_POSITION: '/enum/getAllPosition',
    GET_GENDER: '/enum/getAllGender',
    GET_APPOINTMENT_STATUS: '/enum/getAllAppointmentStatus',
}

const geminiEndpoint = {
    TEXT_GENERATION:
        'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent',
}

const AppointmentEndpoint = {
    UPDATE_APPOINTMENT_STATUS: '/appointment/update-status',
}

const medicalReportEndpoint = {
    CREATE_NEW_MEDICAL_REPORT: "/medical-report/create",
    GET_MEDICAL_REPORT_BY_ID: "/medical-report",
    GET_ALL_MEDICAL_REPORT: "/medical-report/getAll",
    UPDATE_MEDICAL_REPORT_PATIENT_INFORMATION: "/medical-report/update-patient-information",
    UPDATE_MAIN_MEDICAL_REPORT_INFORMATION: "/medical-report/update-main-information",
}

const serviceEndpoint = {
    GET_ALL_SERVICE: '/services/all',
}

const medicineEndpoint = {

}

const VnPayEndpoint = {
    CREATE_VNPAY_URL: '/payment/generate-link',
}

export {
    demoEnpoints,
    authEndpoint,
    userEndpoint,
    doctorEndpoint,
    enumEndpoint,
    scheduleEndpoint,
    geminiEndpoint,
    AppointmentEndpoint,
    VnPayEndpoint,
    medicalReportEndpoint,
    serviceEndpoint,
}
