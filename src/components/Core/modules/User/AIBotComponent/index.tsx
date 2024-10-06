"use client"
import React, { useState } from 'react'
import { Layout, List, Avatar, Input, Button, Skeleton } from 'antd'
import { Send, Settings } from 'lucide-react'
import AIAvatar from '@public/landing/images/ai-avatar.png'
import { MessageType, usePostAnswerMutation } from '@/stores/services/ai/gemini'
const { Sider, Content } = Layout

interface Message extends MessageType {
    id: number,
    isHidden?: boolean
}

const initialMessages: Message[] = [
    { id: 1, parts: [{ text: 'Tôi là bênh nhân của phòng khám tư nhân P-Clinic, hãy đóng vai là 1 chuyên gia y tế tên là PC-AI để trả lời tất cả các câu hỏi của tôi về y tế. Trả về câu trả lời về định dạnh html ví dụ thẻ p dùng để mô tả đoạn trả lời nào đó, thẻ ul, ol, li, strong nếu muốn nhấn mạnh ' }], role: 'user', isHidden: true },
]

export default function AIBotComponent() {
    const [messages, setMessages] = useState<Message[]>(initialMessages)
    const [inputMessage, setInputMessage] = useState('')
    const [postAnswer, { isLoading, isError }] = usePostAnswerMutation();
    const handlePostAnswer = async (messages: Message[]) => {
        try {
            const result = await postAnswer({ messages }).unwrap();
            const reply = result.candidates[0].content.parts[0].text.trim()
            const newMessageAI: Message = {
                id: messages.length + 1,
                parts: [{ text: reply }],
                role: 'model',
            }
            setMessages([...messages, newMessageAI]);
        } catch (error) {
            console.error('error', error);
        }
    }
    const handleSendMessage = () => {
        if (inputMessage.trim() && !isLoading) {
            const newMessage: Message = {
                id: messages.length + 1,
                parts: [{ text: inputMessage }],
                role: 'user',
            }
            const newUserMessage: Message[] = [...messages, newMessage];
            setMessages(newUserMessage)
            handlePostAnswer(newUserMessage)
            setInputMessage('')
        }
    }

    return (
        <Layout className="h-[600px] bg-transparent">
            <Content className="bg-white p-4 ml-5 rounded-[12px] shadow-third">
                <div className="h-full flex flex-col">
                    <div className="p-4 border-b flex justify-between items-center">
                        <div className="flex items-center">
                            <Avatar size={48} shape="square" src={AIAvatar.src} />
                            <div className="ml-3">
                                <h2 className="text-base font-semibold text-secondarySupperDarker">PC-AI</h2>
                                <p className="text-[14px] text-gray-500 text-secondarySupperDarker">Bác sĩ AI</p>
                            </div>
                        </div>
                        <Button className='shadow-third' icon={<Settings className="w-4 h-4" />} type="text">
                            Cài đặt
                        </Button>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 chatbox">
                        {messages.map((message: Message) => (
                            !message.isHidden && <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div
                                    className={`max-w-[75%] shadow-primary rounded-lg px-4 py-2 ${message.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-secondarySupperDarker'
                                        }`}
                                >
                                    <div className='text-base' dangerouslySetInnerHTML={{ __html: message.parts[0]?.text }}></div>
                                </div>
                            </div>
                        ))}
                        <Skeleton loading={isLoading} active paragraph={{ rows: 2 }} />
                    </div>
                    <div className="p-4 border-t">
                        <Input
                            placeholder="Nhập tin nhắn"
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            onPressEnter={handleSendMessage}
                            suffix={
                                <Button className='font-bold' iconPosition='start' type="primary" icon={<Send className="w-4 h-4" />} onClick={handleSendMessage}>
                                    Gửi
                                </Button>
                            }
                        />
                    </div>
                </div>
            </Content>
        </Layout >
    )
}