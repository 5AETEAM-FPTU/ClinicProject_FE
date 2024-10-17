"use client"
import React, { use, useEffect, useState } from 'react'
import { Layout, List, Avatar, Input, Button, Modal } from 'antd'
import { Phone, Send, Settings, Video, PhoneOff, User } from 'lucide-react'
import { StringeeClient, StringeeCall } from "stringee";
import { motion } from 'framer-motion';
import './style.css'

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

interface IncomingCallPopupProps {
    isVisible: boolean;
    callerName: string | null;
    callerNumber: string | null;
    onAnswer: () => void;
    onDecline: () => void;
}

export function IncomingCallPopup({
    isVisible,
    callerName,
    callerNumber,
    onAnswer,
    onDecline
}: IncomingCallPopupProps) {
    return (
        <Modal
            open={isVisible}
            footer={null}
            closable={false}
            centered
            className='w-[400px] wave-effect'
            modalRender={(modal) => (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                >
                    {modal}
                </motion.div>
            )}
        >
            <div className="flex flex-col items-center bg-gradient-to-b from-blue-500 to-blue-600 text-white p-6 rounded-t-lg">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-4">
                    <User className="w-12 h-12 text-blue-500" />
                </div>
                <h2 className="text-2xl font-bold mb-1">{callerName}</h2>
                <p className="text-lg opacity-80">{callerNumber}</p>
            </div>
            <div className="flex justify-around p-4 bg-gray-100 rounded-b-lg">
                <Button
                    type="primary"
                    shape="circle"
                    icon={<Phone className="w-6 h-6" />}
                    size="large"
                    className="bg-green-500 hover:bg-green-600 border-none flex items-center justify-center w-12 h-12 rounded-full"
                    onClick={onAnswer}
                />
                <Button
                    type="primary"
                    danger
                    shape="circle"
                    icon={<PhoneOff className="w-6 h-6" />}
                    size="large"
                    className="flex items-center justify-center w-12 h-12 rounded-full"
                    onClick={onDecline}
                />
            </div>
        </Modal>
    );
}

export default function ConsultationComponent() {
    const [messages, setMessages] = useState<Message[]>(initialMessages)
    const [inputMessage, setInputMessage] = useState('')
    const [stringeeClient, setStringeeClient] = useState(null);
    const [call, setCall] = useState(null);
    const userId = `887c65e7-274e-41c7-87ec-b48973a38883`;
    const [accessToken, setAccessToken] = useState("eyJjdHkiOiJzdHJpbmdlZS1hcGk7dj0xIiwidHlwIjoiSldUIiwiYWxnIjoiSFMyNTYifQ.eyJqdGkiOiJTSy4wLjFneU9yZWYzUVRjYmNpV1ZyOHVuaXlDTEpiWjY1WE13LTE3MjkwNDUxNDciLCJpc3MiOiJTSy4wLjFneU9yZWYzUVRjYmNpV1ZyOHVuaXlDTEpiWjY1WE13IiwiZXhwIjoxNzMxNjM3MTQ3LCJ1c2VySWQiOiI4ODdjNjVlNy0yNzRlLTQxYzctODdlYy1iNDg5NzNhMzg4ODMiLCJpY2NfYXBpIjp0cnVlfQ.aEDd-sGablO6Lg9dKlltikgNWSp3wgtQpaX-yQTrYpc");
    const [callFrom, setCallFrom] = useState<{
        userId: string;
        displayName: string;
        isVideoCall: boolean;
        avatar: string;
    } | null>(null);
    useEffect(() => {
        const client = new StringeeClient();

        client.on("connect", () => {
            console.log("Connected to StringeeServer");
            setStringeeClient(client);
        });

        client.on("authen", (res: any) => {
            if (res.r === 0) {
                console.log("Authenticated", res);
            } else {
                console.log("Authentication failed", res.message);
            }
        });

        client.on("incomingcall", (incomingCall: any) => {
            setCall(incomingCall);
            handleCallEvents(incomingCall);
            setCallFrom(JSON.parse(incomingCall.fromNumber));
        });

        client.on('requestnewtoken', function () {
            // call refreshtoken
            // client.connect(accessToken);
        });


        client.on('otherdeviceauthen', function (data: any) {
            console.log('on otherdeviceauthen:' + JSON.stringify(data));
        });

        client.connect(accessToken);

        return () => {
            if (client) {
                client.disconnect();
            }
        };
    }, []);

    const handleCallEvents = (call: any) => {

        call.on('mediastate', function (data: any) {
            console.log('on mediastate', data);
        });

        call.on('signalingstate', function (data: any) {
            console.log('on signalingstate', data);
        });

        call.on('info', function (data: any) {
            console.log('on info', data);
        });

        call.on('otherdevice', function (data: any) {
            console.log('on otherdevice:' + JSON.stringify(data));
            if ((data.type === 'CALL_STATE' && data.code >= 200) || data.type === 'CALL_END') {
                handleEndCall();
            }
        });

    }

    const handleEndCall = () => {
        if (call) {
            (call as any).hangup((res: any) => {
                console.log("Call ended", res);
                setCall(null);
            });
        }
    };


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

    useEffect(() => {
        let timer: any;
        if (stringeeClient && callFrom && call) {
            timer = setInterval(() => {
                (stringeeClient as any).sendCustomMessage(callFrom.userId, { test: true }, (res: any) => {
                    console.log('Send custom message: ', res);
                    if (res.userNotOnline) {
                        setCall(null);
                        clearInterval(timer);
                    }
                })
            }, 1000);
        }
        return () => {
            clearInterval(timer);
        };
    }, [stringeeClient, call]);

    return (
        <Layout className="h-[600px] bg-transparent">
            <IncomingCallPopup isVisible={call != null} callerName={callFrom && callFrom.displayName} callerNumber={callFrom && callFrom.isVideoCall ? 'Đang gọi video ...' : 'Đang gọi ...'} onAnswer={() => {
                console.log(callFrom);
                window.open(
                    `http://127.0.0.1:3000/vi/test?from=${userId}&to=${callFrom?.userId}&accessToken=${accessToken}&video=${callFrom?.isVideoCall ? 'on' : 'off'}`,
                    '_blank', 'width=800,height=600');
                setCall(null);
            }} onDecline={() => {
                if (!call) return;
                (call as any).reject((res: any) => {
                    console.log("Call rejected", res);
                    setCall(null);
                });
                setCall(null);
            }} />
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