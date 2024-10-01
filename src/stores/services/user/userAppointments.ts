'use client'
import { userEndpoint } from "@/settings/endpoints";
import { baseApi } from "../base";
import { UserProfileTypes } from "@/components/Core/modules/User";


export const userAppointments = baseApi.injectEndpoints({
    endpoints: (build) => ({
        changeProfileAvatar: build.mutation<any, { avatarUrl: string }>({
            query: (params) => ({
                url: userEndpoint.CHANGE_AVATAR,
                body: {
                    avatar: params.avatarUrl
                },
                flashError: true,
                method: 'PATCH',
                extraOptions: { skipAuth: false }
            }),
        }),
        getAllDoctorForBooking: build.query<any, void>({
            query: () => ({
                url: userEndpoint.GET_DOCTORS_FOR_APPOINTMENT,
                flashError: true,
                method: 'GET',
                extraOptions: { skipAuth: false }
            }),
        }),
        getBookedAppointments: build.query<any, void>({
            query: () => ({
                url: userEndpoint.GET_BOOKED_APPOINTMENTS,
                flashError: true,
                method: 'GET',
                extraOptions: { skipAuth: false }
            }),
        }),
    })
})

export const {
    useChangeProfileAvatarMutation,
    useGetAllDoctorForBookingQuery,
    useGetBookedAppointmentsQuery,
} = userAppointments;