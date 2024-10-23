import { notificationEndpoints } from '@/settings/endpoints'
import { baseApi } from '../base'

export const notificationApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        createFollowUpNotification: build.mutation<any, { patientId: string, examinationDate: Date, retreatmentTypeId: String, message: string, to: string }>({
            query: (body) => ({
                url: notificationEndpoints.CREATE_FOLLOW_UP_NOTIFICATION,
                flashError: true,
                method: 'POST',
                body: {
                    ...body,
                    examinationDate: body.examinationDate.toISOString(),
                },
            }),
        }),
        getUpcommingFollowUpNotification: build.query<any, { userId: string }>({
            query: (query) => ({
                url: notificationEndpoints.GET_UPCOMING_FOLLOW_UP_NOTIFICATION + `?userId=${query.userId}`,
                flashError: true,
                method: 'GET',
            }),
        })
    }),
})

export const {
    useCreateFollowUpNotificationMutation,
    useGetUpcommingFollowUpNotificationQuery
} = notificationApi
