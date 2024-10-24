import { formServiceEndpoint, generatePdfEndpoint } from '@/settings/endpoints'
import { formServiceBaseApi } from '../formServiceBase'
import { UpdateAdominalReportType } from '@/components/Core/modules/Doctor/DoctorMedicalReport/ModalMedicalReport/UpdateFormAdominalUltrasound'
import { UpdateElectrocarDiogramReportType } from '@/components/Core/modules/Doctor/DoctorMedicalReport/ModalMedicalReport/UpdateFormElectrocarDiogram'

export const formServiceApis = formServiceBaseApi.injectEndpoints({
    endpoints: (build) => ({
        createAdominalUltrasoundReport: build.mutation<
            any,
            {
                serviceOrderedId: string
                doctorName: string
                patientName: string
                reportCode: string
                treatmentDay: string
                ages: string
                gender: string
                address: string
                diagostic: string
            }
        >({
            query: (data) => ({
                url: formServiceEndpoint.CREATE_ADOMINAL_ULTRASOUND,
                method: 'POST',
                body: data,
            }),
        }),
        updateAdominalUltrasoundReport: build.mutation<
            any,
            {
                payload: UpdateAdominalReportType
            }
        >({
            query: (data) => ({
                url: formServiceEndpoint.UPDATE_ADOMINAL_ULTRASOUND,
                method: 'PATCH',
                body: data.payload,
            }),
        }),
        getAbdominalUltrasoundReport: build.query<any, string>({
            query: (id) => ({
                url: formServiceEndpoint.GET_ABDOMINAL_UNTRASOUND,
                method: 'GET',
                params: { serviceOrderedId: id },
            }),
        }),
        createElectrocarDiographyReport: build.mutation<
            any,
            {
                serviceOrderedId: string
                doctorName: string
                patientName: string
                reportCode: string
                treatmentDay: string
                ages: string
                gender: string
                address: string
                diagostic: string
            }
        >({
            query: (data) => ({
                url: formServiceEndpoint.CREATE_ELECTROCAR_DIAGNOSIS,
                body: data,
                method: 'POST',
            }),
        }),
        getElectrocarDiographyReportQuery: build.query<any, string>({
            query: (id) => ({
                url: formServiceEndpoint.GET_ELECTROCAR_DIAGNOSIS,
                method: 'GET',
                params: { serviceOrderedId: id },
            }),
        }),
        updateElectrocarDiographyReportMutation: build.mutation<any, {
            payload: UpdateElectrocarDiogramReportType
        }>({
            query: (data) => ({
                url: formServiceEndpoint.UPDATE_ELECTROCAR_DIAGNOSIS,
                body: data.payload,
                method: 'PATCH',
            }),
        }),
        deleteAbdominalUltrasoundReport: build.mutation<any, string>({
            query: (id) => ({
                url: formServiceEndpoint.DELETE_ABDOMINAL_ULTRASOUND.replace('{:id}', id),
                method: 'DELETE',
                flashError: true,
            }),
        }),
        deleteElectrocarDiographyReport: build.mutation<any, string>({
            query: (id) => ({
                url: formServiceEndpoint.DELETE_ELECTROCAR_DIAGNOSIS.replace('{:id}', id),
                method: 'DELETE',
                flashError: true,
            }),
        })
    }),
})

export const {
    useCreateAdominalUltrasoundReportMutation,
    useUpdateAdominalUltrasoundReportMutation,
    useGetAbdominalUltrasoundReportQuery,
    useCreateElectrocarDiographyReportMutation,
    useGetElectrocarDiographyReportQueryQuery,
    useUpdateElectrocarDiographyReportMutationMutation,
    useDeleteAbdominalUltrasoundReportMutation,
    useDeleteElectrocarDiographyReportMutation
} = formServiceApis
