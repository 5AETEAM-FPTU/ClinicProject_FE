import { chatEndpoint } from '@/settings/endpoints'
import { baseApi } from '../base'

export const chats = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getQueueRoomByUser: build.query<any, void>({
            query: () => ({
                url: chatEndpoint.GET_QUEUE_ROOM_BY_USER,
                flashError: true,
                method: 'GET',
                extraOptions: { skipAuth: false },
            }),
        }),
        removeQueueById: build.mutation<any, string>({
            query: (id: string) => ({
                url: `${chatEndpoint.REMOVE_QUEUE_ROOM_BY_ID.replace('{queueRoomId}', id)}`,
                flashError: true,
                method: 'DELETE',
            }),
        }),
        addQueueRoom: build.mutation<any, { title: string; message: string }>({
            query: ({ title, message }) => ({
                url: `${chatEndpoint.ADD_QUEUE_ROOM}`,
                flashError: true,
                body: {
                    title: title,
                    message: message,
                },
                method: 'POST',
            }),
        }),
        getChatRoomByUser: build.query<any,  {lastConversationTime: string, pageSize: number}>({

            query: (param) => ({
                url: chatEndpoint.GET_CHAT_ROOM_BY_USER,
                flashError: true,
                method: 'GET',
                params: {
                    lastConversationTime: param.lastConversationTime,
                    pageSize: param.pageSize,
                },
                extraOptions: { skipAuth: false },
            }),
        }),
        getChatRoomByDoctor: build.query<any, {lastConversationTime: string, pageSize: number}>({
            query: (param) => ({
                url: chatEndpoint.GET_CHAT_ROOM_BY_DOCTOR,
                flashError: true,
                method: 'GET',
                params: {
                    lastConversationTime: param.lastConversationTime,
                    pageSize: param.pageSize,
                },
                extraOptions: { skipAuth: false },
            }),
        }),
        getChatContentByChatRoom: build.query<
            any,
            { lastReportDate: string; chatRoomId: string; pageSize: number }
        >({
            query: (params) => ({
                url:
                    chatEndpoint.GET_CHAT_CONTENT_BY_CHAT_ROOM +
                    '?' +
                    `${params.lastReportDate ? `lastReportDate=${params.lastReportDate}&` : ''}` +
                    `${params.chatRoomId ? `chatRoomId=${params.chatRoomId}&` : ''}` +
                    `${params.pageSize ? `pageSize=${params.pageSize}` : ''}`,
                flashError: true,
                method: 'GET',
                extraOptions: { skipAuth: false },
            }),
        }),
        removeChatContentById: build.mutation<any, string>({
            query: (id: string) => ({
                url: `${chatEndpoint.REMOVE_CHAT_CONTENT_BY_ID.replace('{chatContentId}', id)}`,
                flashError: true,
                method: 'DELETE',
            }),
        }),
        getAllQueueRooms: build.query<
            any,
            { pageIndex: number, pageSize: number, }
        >({
            query: (params) => ({
                url:
                    chatEndpoint.GET_ALL_QUEUE_ROOM +
                    '?' +
                    `${params.pageIndex ? `pageIndex=${params.pageIndex}&` : ''}` +
                    `${params.pageSize ? `pageSize=${params.pageSize}` : ''}`,
                flashError: true,
                method: 'GET',
                extraOptions: { skipAuth: false },
            }),
        }),
        addChatRoom: build.mutation<any, { patientId: string; queueRoomId: string; initialMessage: string }>({
            query: ({ patientId, queueRoomId, initialMessage }) => ({
                url: `${chatEndpoint.ADD_CHAT_ROOM}`,
                flashError: true,
                body: {
                    patientId: patientId,
                    queueRoomId: queueRoomId,
                    initialMessage: initialMessage
                },
                method: 'POST',
            }),
        }),
    }),
})

export const {
    useGetQueueRoomByUserQuery,
    useRemoveQueueByIdMutation,
    useAddQueueRoomMutation,
    useGetChatRoomByUserQuery,
    useLazyGetChatContentByChatRoomQuery,
    useRemoveChatContentByIdMutation,
    useGetChatRoomByDoctorQuery,
    useLazyGetAllQueueRoomsQuery,
    useGetAllQueueRoomsQuery,
    useAddChatRoomMutation
} = chats
