const ACCESS_TOKEN = '_accessToken';
const REFRESH_TOKEN = "_refreshToken";
const USER_ID = "_sub";
const ROLE = "_way";
const USER_AVATAR = "_avt";
const USER_FULLNAME = "_fullname";
const EMAIL = "_email";
const VNPAY_PAYMENT_URL = "_vnpay_payment_url";


const API_SERVER = process.env.NEXT_PUBLIC_API_SERVER;

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
}

export default constants;