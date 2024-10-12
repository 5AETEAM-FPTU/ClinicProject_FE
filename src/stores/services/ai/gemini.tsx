'use client'
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { geminiEndpoint } from "@/settings/endpoints";
export interface MessageType {
    role: string,
    parts: [{ text: string }],
}

const generateConfig = {
    "generationConfig": {
        "response_mime_type": "application/json",
        "response_schema": {
            "type": "object",
            "properties": {
                "response_text": {
                    "type": "string",
                    "description": "Phản hồi từ AI về tình trạng của bệnh nhân"
                },
                "suggested_specialty": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "properties": {
                            "id": {
                                "type": "string",
                                "description": "ID của chuyên khoa được AI gợi ý từ danh sách"
                            },
                            "specialtyName": {
                                "type": "string",
                                "description": "Tên chuyên khoa được AI gợi ý từ danh sách"
                            },
                            "constant": {
                                "type": "string",
                                "description": "Chuyên khoa được AI gợi ý từ danh sách"
                            }
                        },
                    },
                    "description": "Các chuyên khoa được AI gợi ý từ danh sách, có thể gợi ý nhiều chuyên khoa. Lưu ý: chỉ gợi ý khi bệnh nhân có vấn đề sức khỏe và cần một cuộc hẹn với bác sĩ chuyên khoa"
                }
            },
            "required": ["response_text", "suggested_specialty"]
        }
    }
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
                    ...generateConfig,
                },
            }),
        }),
    }),
});

export const {
    usePostAnswerMutation
} = geminiApis;