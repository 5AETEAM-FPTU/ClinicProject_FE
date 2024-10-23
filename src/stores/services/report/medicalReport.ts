'use client'
import { medicalReportEndpoint, serviceEndpoint } from '@/settings/endpoints'
import { baseApi } from '../base'

export const medicalReportApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getMedicalReportById: build.query<any, string>({
            query: (id) => ({
                url: `${medicalReportEndpoint.GET_MEDICAL_REPORT_BY_ID}?reportId=${id}`,
                method: 'GET',
                flashError: true,
            }),
        }),
        updateMedicalReportPatientInformation: build.mutation<any, any>({
            query: (data) => ({
                url: medicalReportEndpoint.UPDATE_MEDICAL_REPORT_PATIENT_INFORMATION,
                method: 'PATCH',
                body: data,
                flashError: true,
            }),
        }),
        updateMainMedicalReportInformation: build.mutation<any, any>({
            query: (data) => ({
                url: medicalReportEndpoint.UPDATE_MAIN_MEDICAL_REPORT_INFORMATION,
                method: 'PATCH',
                body: data,
                flashError: true,
            }),
        }),
        getAllService: build.query<any, {
            pageIndex: number,
            pageSize: number,
            key: string,
        }>({
            query: (param) => ({
                url: serviceEndpoint.GET_ALL_SERVICE,
                params: param,
                method: 'GET',
                flashError: true,

            }),
        }),
        createNewMedicalReport: build.mutation<any, any>({
            query: (data) => ({
                url: medicalReportEndpoint.CREATE_NEW_MEDICAL_REPORT,
                method: 'POST',
                body: data,
                flashError: true,
            }),
        }),
        getAllMedicalReportRecentOfUser: build.query<any, { pageIndex: number, pageSize: number, userId: string }>({
            query: (param) => ({
                url: `${medicalReportEndpoint.GET_ALL_MEDICAL_REPORT_RECENT_OF_USER.replace("{userId}", param.userId)}?pageIndex=${param.pageIndex}&pageSize=${param.pageSize}`,
                method: 'GET',
                flashError: true,
            }),
        }),
        getMedicalReportDetailById: build.query<any, string>({
            query: (id) => ({
                url: `${medicalReportEndpoint.GET_MEDICAL_REPORT_DETAIL}?reportId=${id}`,
                method: 'GET',
                flashError: true,
            }),
        })
    }),
})

export const {
    useGetMedicalReportByIdQuery,
    useUpdateMedicalReportPatientInformationMutation,
    useUpdateMainMedicalReportInformationMutation,
    useGetAllServiceQuery,
    useCreateNewMedicalReportMutation,
    useGetAllMedicalReportRecentOfUserQuery,
    useGetMedicalReportDetailByIdQuery
} = medicalReportApi
