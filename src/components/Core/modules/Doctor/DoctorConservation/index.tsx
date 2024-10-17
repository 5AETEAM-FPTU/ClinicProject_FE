'use client'
import React, { useEffect, useState } from 'react'
import { Layout, List, Avatar, Input, Button } from 'antd'
import { Send, Settings } from 'lucide-react'
import { jwtDecode, JwtPayload } from 'jwt-decode'
import webStorageClient from '@/utils/webStorageClient'
import { sendMessage, startConnection } from "../../../../../stores/services/chat/signalService"
import _ from 'lodash'

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
    {
        id: 1,
        name: 'Nguyễn Văn Mạnh',
        title: 'Bác sĩ - Thạc sĩ',
        avatar: '/placeholder.svg?height=40&width=40',
    },
    {
        id: 2,
        name: 'Đoàn Bích Ngọc',
        title: 'Bác sĩ - Thạc sĩ',
        avatar: '/placeholder.svg?height=40&width=40',
    },
    {
        id: 3,
        name: 'Trần Thị Hoa',
        title: 'Bác sĩ - Tiến sĩ',
        avatar: '/placeholder.svg?height=40&width=40',
    },
    {
        id: 4,
        name: 'Lê Văn Hùng',
        title: 'Bác sĩ - Thạc sĩ',
        avatar: '/placeholder.svg?height=40&width=40',
    },
]

const initialMessages: Message[] = [
    {
        id: 1,
        text: 'It contains a lot of good lessons about effective practices',
        sender: 'doctor',
        timestamp: '3:14am',
    },
    {
        id: 2,
        text: 'Can it generate daily design links that include essays and data visualizations ?',
        sender: 'user',
        timestamp: '4:42pm',
    },
    {
        id: 3,
        text: 'Yeah! Responsive Design is geared towards those trying to build web apps',
        sender: 'doctor',
        timestamp: '4:31pm',
    },
    {
        id: 4,
        text: 'Excellent, I want it now !',
        sender: 'user',
        timestamp: '4:42pm',
    },
]

export default function DoctorConservation() {
    const [messages, setMessages] = useState<Message[]>(initialMessages)
    const [inputMessage, setInputMessage] = useState('')
    const _userId = jwtDecode<JwtPayload>(webStorageClient.getToken()!).sub!
    const _accessToken = webStorageClient.getToken()!.toString()
    const _doctorId = '1a6c3e77-4097-40e2-b447-f00d1f82cf73'
    const connectionRef = React.useRef<any>(null)

    console.log(_accessToken, _userId);

    const handleSendMessage = () => {
        if (inputMessage.trim()) {
            const newMessage: Message = {
                id: messages.length + 1,
                text: inputMessage,
                sender: 'user',
                timestamp: new Date().toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                }),
            }
            sendMessage(_userId, _doctorId, inputMessage)
            setMessages([...messages, newMessage])
            setInputMessage('')
        }
    }

    useEffect(() => {
        const initializeConnection = async () => {
            if (!connectionRef.current) {
                connectionRef.current = await startConnection(
                    _accessToken,
                    (chatContent) => {
                        console.log(
                            `Received message from ${chatContent.senderId}: ${chatContent.senderId}`,
                        )
                        setMessages((prev) => [
                            ...prev,
                            {
                                id: prev.length + 1,
                                text: chatContent.message,
                                sender: 'doctor',
                                timestamp: new Date().toLocaleTimeString([], {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                }),
                            },
                        ])
                    },
                )
            }
        };

        initializeConnection();

        return () => {
            if (connectionRef.current) {
                connectionRef.current.stop()
                connectionRef.current = null
            }
        }
    }, [_accessToken])

    return (
        <Layout className="h-[600px] bg-transparent">
            <Sider
                width={300}
                className="rounded-[12px] bg-white p-4 shadow-third"
            >
                <List
                    itemLayout="horizontal"
                    dataSource={doctors}
                    renderItem={(doctor) => (
                        <List.Item className="group mb-[10px] cursor-pointer rounded-lg border-none from-[#00B5F1] to-[#0284C7] p-2 hover:bg-gradient-to-r">
                            <List.Item.Meta
                                avatar={
                                    <Avatar
                                        size={48}
                                        shape="square"
                                        src={doctor.avatar}
                                    />
                                }
                                title={
                                    <span className="text-base font-semibold text-blue-600 text-secondarySupperDarker group-hover:text-white">
                                        {doctor.name}
                                    </span>
                                }
                                description={
                                    <span className="text-base text-secondarySupperDarker group-hover:text-white">
                                        {doctor.title}
                                    </span>
                                }
                            />
                        </List.Item>
                    )}
                />
            </Sider>
            <Content className="ml-5 rounded-[12px] bg-white p-4 shadow-third">
                <div className="flex h-full flex-col">
                    <div className="flex items-center justify-between border-b p-4">
                        <div className="flex items-center">
                            <Avatar
                                size={48}
                                shape="square"
                                src="/placeholder.svg?height=40&width=40"
                            />
                            <div className="ml-3">
                                <h2 className="text-base font-semibold text-secondarySupperDarker">
                                    Tư vấn khám tổng quát...
                                </h2>
                                <p className="text-[14px] text-gray-500 text-secondarySupperDarker">
                                    Bệnh nhân: Nguyễn Văn Toàn
                                </p>
                            </div>
                        </div>
                        <Button
                            className="shadow-third"
                            icon={<Settings className="h-4 w-4" />}
                            type="text"
                        >
                            Cài đặt
                        </Button>
                    </div>
                    <div className="flex-1 space-y-4 overflow-y-auto p-4">
                        {messages.map((message: Message) => (
                            <div
                                key={message.id}
                                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`max-w-[75%] rounded-lg px-4 py-2 shadow-primary ${
                                        message.sender === 'user'
                                            ? 'bg-blue-500 text-white'
                                            : 'bg-gray-200 text-secondarySupperDarker'
                                    }`}
                                >
                                    <p className="text-base">{message.text}</p>
                                    <span
                                        className={`mt-1 block text-xs ${message.sender === 'user' ? 'text-white-200 float-right' : 'float-left text-gray-500'}`}
                                    >
                                        {message.timestamp}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="border-t p-4">
                        <Input
                            placeholder="Nhập tin nhắn"
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            onPressEnter={handleSendMessage}
                            suffix={
                                <Button
                                    className="font-bold"
                                    iconPosition="start"
                                    type="primary"
                                    icon={<Send className="h-4 w-4" />}
                                    onClick={handleSendMessage}
                                >
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
