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
}

const doctorEndpoint = {
    GET_PROFILE: "/doctor/profile",
    PATCH_PRIVATE_INFOR: "/doctor/private-info",
    PATCH_ACHIEVEMENT: "/doctor/achievement",
    PATCH_DESCRIPTION: "/doctor/description",
}

export { demoEnpoints, authEndpoint, userEndpoint, doctorEndpoint };