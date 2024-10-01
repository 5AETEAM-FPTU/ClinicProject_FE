'use client'
import { doctorEndpoint, userEndpoint } from "@/settings/endpoints";
import { baseApi } from "../base";

export const doctorOverviewApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        updateDoctorDuty: build.mutation<any, { status: boolean }>({
            query: (params) => ({
                url: doctorEndpoint.UPDATE_DUTY,
                flashError: true,
                method: 'PATCH',
                body: params,
            }),
            extraOptions: { skipAuth: false }
        }),
    })
})

export const {
    useUpdateDoctorDutyMutation,
} = doctorOverviewApi;