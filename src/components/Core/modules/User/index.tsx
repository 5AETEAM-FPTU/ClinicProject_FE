import React from 'react'
export type UserProfileTypes = {
    avatarUrl: string
    fullName: string | null
    description: string | null
    address: string
    gender: {
        id: string;
        genderName:string;
    }
    username: string
    phoneNumber: string | null
    dob: string | null
}

function index() {
    return null
}

export default index
