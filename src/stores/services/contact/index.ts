import { contactEndpoints } from "@/settings/endpoints";
import { formServiceBaseApi } from "../formServiceBase";

const contactService = formServiceBaseApi.injectEndpoints({
    endpoints: (build) => ({
        createNewContact: build.mutation<any, { fullname: string, emailOrPhone: string, content: string, gender: number, age: number }>({
            query: (data) => ({
                url: contactEndpoints.CREATE_CONTACT,
                method: 'POST',
                body: {
                    ...data,
                    status: 1
                },
                flashError: true,
            }),
        }),
    }),
})

export const {
    useCreateNewContactMutation
} = contactService;