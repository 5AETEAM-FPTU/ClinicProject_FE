"use client"
import React, { useState } from 'react'
import { Layout, List, Avatar, Input, Button } from 'antd'
import { Phone, Send, Settings, Video } from 'lucide-react'

const { Sider, Content } = Layout

interface Doctor {
    id: number
    name: string
    title: string
    avatar: string
}

interface Message {
    id: number
    text: string
    sender: 'user' | 'doctor'
    timestamp: string
}

const doctors: Doctor[] = [
    { id: 1, name: 'Nguyễn Văn Mạnh', title: 'Bác sĩ - Thạc sĩ', avatar: '/placeholder.svg?height=40&width=40' },
    { id: 2, name: 'Đoàn Bích Ngọc', title: 'Bác sĩ - Thạc sĩ', avatar: '/placeholder.svg?height=40&width=40' },
    { id: 3, name: 'Trần Thị Hoa', title: 'Bác sĩ - Tiến sĩ', avatar: '/placeholder.svg?height=40&width=40' },
    { id: 4, name: 'Lê Văn Hùng', title: 'Bác sĩ - Thạc sĩ', avatar: '/placeholder.svg?height=40&width=40' },
]

const initialMessages: Message[] = [
    { id: 1, text: 'It contains a lot of good lessons about effective practices', sender: 'doctor', timestamp: '3:14am' },
    { id: 2, text: 'Can it generate daily design links that include essays and data visualizations ?', sender: 'user', timestamp: '4:42pm' },
    { id: 3, text: 'Yeah! Responsive Design is geared towards those trying to build web apps', sender: 'doctor', timestamp: '4:31pm' },
    { id: 4, text: 'Excellent, I want it now !', sender: 'user', timestamp: '4:42pm' },
]

export default function ConsultationComponent() {
    const [messages, setMessages] = useState<Message[]>(initialMessages)
    const [inputMessage, setInputMessage] = useState('');
    const userId = `5ffd4aac-b889-4700-98bd-3b6d75966954`;
    const accessToken = `eyJjdHkiOiJzdHJpbmdlZS1hcGk7dj0xIiwidHlwIjoiSldUIiwiYWxnIjoiSFMyNTYifQ.eyJqdGkiOiJTSy4wLjFneU9yZWYzUVRjYmNpV1ZyOHVuaXlDTEpiWjY1WE13LTE3MjkwNDUwOTIiLCJpc3MiOiJTSy4wLjFneU9yZWYzUVRjYmNpV1ZyOHVuaXlDTEpiWjY1WE13IiwiZXhwIjoxNzMxNjM3MDkyLCJ1c2VySWQiOiI1ZmZkNGFhYy1iODg5LTQ3MDAtOThiZC0zYjZkNzU5NjY5NTQiLCJpY2NfYXBpIjp0cnVlfQ.Bjcae5c1LghrfVNh_ccMRNY-ZLfs6pmGk596I3rgoOs`;
    const handleSendMessage = () => {
        if (inputMessage.trim()) {
            const newMessage: Message = {
                id: messages.length + 1,
                text: inputMessage,
                sender: 'user',
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            }
            setMessages([...messages, newMessage])
            setInputMessage('')
        }
    }

    return (
        <Layout className="h-[600px] bg-transparent">
            <Sider width={300} className="bg-white p-4 rounded-[12px] shadow-third">
                <List
                    itemLayout="horizontal"
                    dataSource={doctors}
                    renderItem={(doctor) => (
                        <List.Item className="group cursor-pointer hover:bg-gradient-to-r from-[#00B5F1] to-[#0284C7] rounded-lg p-2 mb-[10px] border-none">
                            <List.Item.Meta
                                avatar={<Avatar size={48} shape="square" src={doctor.avatar} />}
                                title={<span className="text-blue-600 text-secondarySupperDarker group-hover:text-white text-base font-semibold">{doctor.name}</span>}
                                description={<span className='text-base text-secondarySupperDarker group-hover:text-white'>{doctor.title}</span>}
                            />
                        </List.Item>
                    )}
                />
            </Sider>
            <Content className="bg-white p-4 ml-5 rounded-[12px] shadow-third">
                <div className="h-full flex flex-col">
                    <div className="p-4 border-b flex justify-between items-center">
                        <div className="flex items-center">
                            <Avatar size={48} shape="square" src="/placeholder.svg?height=40&width=40" />
                            <div className="ml-3">
                                <h2 className="text-base font-semibold text-secondarySupperDarker">Tư vấn khám tổng quát...</h2>
                                <p className="text-[14px] text-gray-500 text-secondarySupperDarker">Bệnh nhân: Nguyễn Văn Toàn</p>
                            </div>
                        </div>
                        <div className='flex justify-center items-center gap-4'>
                            <Button onClick={() => {
                                var newWindow = window.open(
                                    `http://127.0.0.1:3000/vi/test?from=${userId}&to=887c65e7-274e-41c7-87ec-b48973a38883&accessToken=${accessToken}&isCaller=true&video=on`,
                                    '_blank', 'width=800,height=600');
                            }} className='shadow-third' icon={<Video className="w-6 h-6 text-blue-500" />} />
                            <Button className='shadow-third' icon={<Phone className="w-6 h-6 text-blue-500"
                                onClick={() => {
                                    var newWindow = window.open(
                                        `http://127.0.0.1:3000/vi/test?from=${userId}&to=887c65e7-274e-41c7-87ec-b48973a38883&accessToken=${accessToken}&isCaller=true`,
                                        '_blank', 'width=800,height=600');
                                }}
                            />} />
                            <Button className='shadow-third' icon={<Settings className="w-4 h-4" />} type="text">
                                Cài đặt
                            </Button>
                        </div>

                    </div>
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {messages.map((message: Message) => (
                            <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div
                                    className={`max-w-[75%] shadow-primary rounded-lg px-4 py-2 ${message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-secondarySupperDarker'
                                        }`}
                                >
                                    <p className='text-base'>{message.text}</p>
                                    <span className={`text-xs block mt-1 ${message.sender === 'user' ? 'float-right text-white-200' : 'float-left text-gray-500'}`}>{message.timestamp}</span>
                                </div>
                            </div>
                        ))}
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
        </Layout>
    )
}