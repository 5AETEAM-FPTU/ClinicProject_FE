'use client'
import { doctorEndpoint, userEndpoint } from "@/settings/endpoints";
import { baseApi } from "../base";

export const doctorSettingsApi = baseApi.injectEndpoints({
     endpoints: (build) => ({
        getDoctorProfile: build.query<any, void>({
            query: () => ({
                url: doctorEndpoint.GET_PROFILE,
                flashError: true,
                method: 'GET',
                extraOptions: { skipAuth: true }
            }),
            extraOptions: { skipAuth: false }
        })
     })
})

export const {
    useGetDoctorProfileQuery
} = doctorSettingsApi;