'use client'
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { geminiEndpoint } from "@/settings/endpoints";
export interface MessageType {
    role: string,
    parts: [{ text: string }],
}

export const geminiApis = createApi({
    reducerPath: 'geminiApis', // Đặt tên cho reducer
    baseQuery: fetchBaseQuery({
        baseUrl: `${geminiEndpoint.TEXT_GENERATION}`, // Đặt baseUrl cho API
    }),
    endpoints: (build) => ({
        postAnswer: build.mutation<any, { messages: MessageType[] }>({
            query: (params) => ({
                url: `?key=${process.env.NEXT_PUBLIC_GEMINI_API_KEY}`,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                flashError: true,
                body: {
                    contents: params.messages.map((message) => {
                        return {
                            role: message.role,
                            parts: message.parts.map((part) => {
                                return {
                                    text: part.text
                                }
                            })
                        }
                    }),
                },
            }),
        }),
    }),
});

export const {
    usePostAnswerMutation
} = geminiApis;