const ACCESS_TOKEN = '_accessToken';
const REFRESH_TOKEN = "_refreshToken";
const USER_ID = "_sub";
const ROLE = "_way";
const USER_AVATAR = "_avt";
const USER_FULLNAME = "_fullname";
const EMAIL = "_email";
const VNPAY_PAYMENT_URL = "_vnpay_payment_url";
const CALL_ACCESS_TOKEN = "_callAccessToken";
const REDIRECT_URL = "_redirectUrl";
const BOOKED_ID = "_bookedId"

const API_SERVER = process.env.NEXT_PUBLIC_API_SERVER;
const SERVICE_API_SERVIER = process.env.NEXT_PUBLIC_SERVICE_API_SERVER;

const NOTIFICATION_TYPES = {
    SUCCESS: 'Thành công',
    ERROR: 'Lỗi',
    WARNING: 'Cảnh báo',
    INFO: 'Thông tin',
}

const constants = {
    ACCESS_TOKEN,
    REFRESH_TOKEN,
    API_SERVER,
    USER_ID,
    ROLE,
    USER_AVATAR,
    USER_FULLNAME,
    EMAIL,
    NOTIFICATION_TYPES,
    VNPAY_PAYMENT_URL,
    SERVICE_API_SERVIER,
    CALL_ACCESS_TOKEN,
    REDIRECT_URL,
    BOOKED_ID
}

export default constants;