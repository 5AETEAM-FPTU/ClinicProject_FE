import { AppointmentEndpoint } from '@/settings/endpoints'
import { baseApi } from '../base'

export const userHistoryTreatmentApis = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getAllUserHistoryTreatments: build.query<
            any,
            {
                pageIndex: string
                pageSize: string
                doctorName?: string
                // medicineTypeId?: string
                // medicineGroupId?: string
            }
        >({
            query: (params) => {
                let url = `${AppointmentEndpoint.GET_ALL_USER_HISTORY_APPOINTMENTS}?pageIndex=${params.pageIndex}&pageSize=${params.pageSize}`
                if (params.doctorName && params.doctorName.trim()) {
                    url += `&keyword=${params.doctorName}`
                }
                // if (params.medicineTypeId && params.medicineTypeId.trim()) {
                //     url += `&medicineTypeId=${params.medicineTypeId}`
                // }
                // if (params.medicineGroupId && params.medicineGroupId.trim()) {
                //     url += `&medicineGroupId=${params.medicineGroupId}`
                // }
                return {
                    url: url,
                    flashError: true,
                    method: 'GET',
                    extraOptions: { skipAuth: false },
                }
            },
        }),
    }),
})

export const { useGetAllUserHistoryTreatmentsQuery } = userHistoryTreatmentApis
