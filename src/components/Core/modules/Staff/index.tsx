export type StaffProfileTypes = {
    achievement: string | null
    avatarUrl: string
    fullName: string | null
    description: string | null
    address: string
    gender: {
        id: string
        genderName: string
    }
    position: {
        id: string
        positionName: string
    }
    specialties: {
        id: string
        specialtyName: string
    }[]
    username: string
    phoneNumber: string | null
    dob: string | null
}


function index() {
    return null
}

export default index
