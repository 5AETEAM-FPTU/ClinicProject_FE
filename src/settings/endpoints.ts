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
    CREATE_FEEDBACK: '/user/feedback/create',
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
    GET_ALL_DOCTOR: "/doctor/staff/doctor/all",
}

const scheduleEndpoint = {
    GET_SCHEDULES_BY_DATE: '/schedules/date',
    POST_CREATE_SCHEDULES: '/schedules',
    GET_SCHEDULES_BY_MONTH: '/schedules/month',
    REMOVE_SCHEDULE_BY_ID: '/schedules/remove?scheduleId={scheduleId}',
    REMOVE_SCHEDULE_BY_DATE: '/schedules/remove/{date}',
    UPDATE_SCHEDULE_BY_ID: '/schedules/update',
    GET_SCHEDULES_GUEST_BY_DATE: '/schedules/guest/date',
    GET_SCHEDULES_GUEST_BY_MONTH: '/schedules/guest/month',
}

const enumEndpoint = {
    GET_SPECIALTY: '/enum/getAllSpecialty',
    GET_RETREATMENT_TYPE: '/enum/getAllRetreatmentType',
    GET_POSITION: '/enum/getAllPosition',
    GET_GENDER: '/enum/getAllGender',
    GET_APPOINTMENT_STATUS: '/enum/getAllAppointmentStatus',
}

const chatEndpoint = {
    GET_QUEUE_ROOM_BY_USER: '/queue-room/user-id',
    REMOVE_QUEUE_ROOM_BY_ID: '/queue-room/{queueRoomId}',
    ADD_QUEUE_ROOM: '/queue-room',
    GET_CHAT_ROOM_BY_USER: '/chat-room/user',
    GET_CHAT_ROOM_BY_DOCTOR: '/chat-room/doctor',
    GET_CHAT_CONTENT_BY_CHAT_ROOM: '/chat-content/message',
    REMOVE_CHAT_CONTENT_BY_ID: 'chat-content/temporarily/{chatContentId}',
    GET_ALL_QUEUE_ROOM: '/queue-room/all',
    ADD_CHAT_ROOM: '/chat-room',
}

const geminiEndpoint = {
    TEXT_GENERATION:
        'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent',
}

const AppointmentEndpoint = {
    UPDATE_APPOINTMENT_STATUS: '/appointment/update-status',
    GET_ALL_USER_FOLLOW_UP_APPOINTMENT: '/doctor/re-examination/users',
    GET_USER_DETAIL_IN_FOLLOW_UP: '/doctor/user/detail/{userId}',
    GET_ALL_USER_HISTORY_APPOINTMENTS: 'user/medical-report/all',
}

const medicalReportEndpoint = {
    CREATE_NEW_MEDICAL_REPORT: '/medical-report/create',
    GET_MEDICAL_REPORT_BY_ID: '/medical-report',
    GET_ALL_MEDICAL_REPORT: '/medical-report/getAll',
    UPDATE_MEDICAL_REPORT_PATIENT_INFORMATION:
        '/medical-report/update-patient-information',
    UPDATE_MAIN_MEDICAL_REPORT_INFORMATION:
        '/medical-report/update-main-information',
    GET_MEDICAL_REPORT_DETAIL: '/user/medical-report/detail',
    GET_ALL_MEDICAL_REPORT_RECENT_OF_USER: "/doctor/medicalreport/recent/{userId}",
}

const serviceEndpoint = {
    GET_ALL_SERVICE: '/services/available',
}

const medicineOrderEndpoint = {
    GET_MEDICINE_AVAILABLE: '/admin/medicine/available',
    GET_MEDICINE_ORDER_DETAIL: '/medicine-order/detail',
    ADD_MEDICINE_ORDER_ITEM: '/medicine-order/item/add',
    UPDATE_MEDICINE_ORDER_ITEM: '/medicine-order/item/update',
    DELETE_MEDICINE_ORDER_ITEM:
        '/medicine-order/item/remove/{:medicineOrderId}/{:medicineId}',
}
const serviceOrderEndpoint = {
    SERVICE_ORDER_ADD: '/service-order/add',
    SERVICE_ORDER_DETAIL: '/service-order/detail',
}

const VnPayEndpoint = {
    CREATE_VNPAY_URL: '/payment/generate-link',
}

const blogEndpoints = {
    GET_ALL_ACTIVE_CATEGORY: '/api/category/get-active',
    GET_ALL_POST: '/api/post/get',
    GET_ALL_ACTIVE_POST: '/api/post/get-active',
    CREATE_POST: '/api/post/create',
    DELETE_POST: '/api/post/delete/{:id}',
    UPDATE_POST: '/api/post/update',
    GET_POST_BY_SLUG: '/api/post/get/{:slug}',
    GET_POST_BY_ID: '/api/post/getById/{:id}',
    GET_RELATE_POST: '/api/post/get-relate-posts/{:slug}',
    GET_NEWEST_POST: '/api/post/get-new-posts',
}

const notificationEndpoints = {
    GET_UPCOMING_FOLLOW_UP_NOTIFICATION: '/notification/user/up-comming',
    CREATE_FOLLOW_UP_NOTIFICATION: '/notification/retreatment/create',
}

const contactEndpoints = {
    CREATE_CONTACT: '/api/contact/create',
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
    blogEndpoints,
    medicalReportEndpoint,
    serviceEndpoint,
    chatEndpoint,
    serviceOrderEndpoint,
    medicineOrderEndpoint,
    notificationEndpoints,
    contactEndpoints,
}
