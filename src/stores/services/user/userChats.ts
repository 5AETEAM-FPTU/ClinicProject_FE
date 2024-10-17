import { userEndpoint } from '@/settings/endpoints'
import { baseApi } from '../base'

export const userChats = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getQueueRoomByUser: build.query<any, void>({
            query: () => ({
                url: userEndpoint.GET_QUEUE_ROOM_BY_USER,
                flashError: true,
                method: 'GET',
                extraOptions: { skipAuth: false },
            }),
        }),
        removeQueueById: build.mutation<any, string>({
            query: (id: string) => ({
                url: `${userEndpoint.REMOVE_QUEUE_ROOM_BY_ID.replace('{queueRoomId}', id)}`,
                flashError: true,
                method: 'DELETE',
            }),
        }),
        addQueueRoom: build.mutation<any, { title: string; message: string }>({
            query: ({ title, message }) => ({
                url: `${userEndpoint.ADD_QUEUE_ROOM}`,
                flashError: true,
                body: {
                    title: title,
                    message: message,
                },
                method: 'POST',
            }),
        }),
        getChatRoomByUser: build.query<any, void>({
            query: () => ({
                url: userEndpoint.GET_CHAT_ROOM_BY_USER,
                flashError: true,
                method: 'GET',
                extraOptions: { skipAuth: false },
            }),
        }),
        getChatContentByChatRoom: build.query<
            any,
            { lastReportDate: string; chatRoomId: string; pageSize: number }
        >({
            query: (params) => ({
                url:
                    userEndpoint.GET_CHAT_CONTENT_BY_CHAT_ROOM +
                    '?' +
                    `${params.lastReportDate ? `lastReportDate=${params.lastReportDate}&` : ''}` +
                    `${params.chatRoomId ? `chatRoomId=${params.chatRoomId}&` : ''}` +
                    `${params.pageSize ? `pageSize=${params.pageSize}` : ''}`,
                flashError: true,
                method: 'GET',
                extraOptions: { skipAuth: false },
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
} = userChats
