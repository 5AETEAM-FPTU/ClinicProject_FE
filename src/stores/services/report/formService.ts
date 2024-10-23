import { formServiceEndpoint, generatePdfEndpoint } from '@/settings/endpoints'
import { formServiceBaseApi } from '../formServiceBase'
import { UpdateAdominalReportType } from '@/components/Core/modules/Doctor/DoctorMedicalReport/ModalMedicalReport/UpdateForms/UpdateAdominalUtrasound'

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
    }),
})

export const {
    useCreateAdominalUltrasoundReportMutation,
    useUpdateAdominalUltrasoundReportMutation,
} = formServiceApis
