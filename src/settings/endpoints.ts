const demoEnpoints = {
    GET_AMOUNT_OF_QUESTION: ''
}
const authEndpoint = {
    SIGNIN: "/auth/login",
    FORGET_PASSWORD: "/auth/forgot-password",
    CHANGE_PASSWORD: "/auth/changing-password",
    LOGOUT: "/auth/logout",
    SIGNUP: "/auth/register-user",
    CONFIRM_EMAIL: "/auth/confirm-email",
    RESEND_EMAIL: "/auth/resend-email-confirmation",
    GOOGLE_AUTH: "/auth/login/google",
    UPDATE_PASSWORD: "/auth/update-password",
    REFRESH_ACCESS_TOKEN: "/auth/refresh-access-token",
}

const userEndpoint = {
    CHANGE_AVATAR: "/user/avatar",
    PATCH_PRIVATE_INFOR: "/user/private-info",
    GET_PROFILE: "/user/profile",
    PATCH_DESCRIPTION: "/user/description",
    GET_DOCTORS_FOR_APPOINTMENT: 'doctor/getAllDoctorForBooking',
    GET_BOOKED_APPOINTMENTS: '/appointment/getUserBookedAppointment',
}

const doctorEndpoint = {
    GET_PROFILE: "/doctor/profile",
    PATCH_PRIVATE_INFOR: "/doctor/private-info",
    PATCH_ACHIEVEMENT: "/doctor/achievement",
    PATCH_DESCRIPTION: "/doctor/description",

    GET_APPOINTMENTS_ON_DAY: "/doctor/appointments",
    UPDATE_DUTY: "/doctor/duty",
}

const scheduleEndpoint = {
    GET_SCHEDULES_BY_DATE: "/schedules/{date}",
    POST_CREATE_SCHEDULES: "/schedules",
}

const enumEndpoint = {
    GET_SPECIALTY: "/enum/getAllSpecialty",
    GET_RETREATMENT_TYPE: "/enum/getAllRetreatmentType",
    GET_POSITION: "/enum/getAllPosition",
    GET_GENDER: "/enum/getAllGender",
    GET_APPOINTMENT_STATUS: "/enum/getAllAppointmentStatus"

}

export { demoEnpoints, authEndpoint, userEndpoint, doctorEndpoint, enumEndpoint, scheduleEndpoint };
