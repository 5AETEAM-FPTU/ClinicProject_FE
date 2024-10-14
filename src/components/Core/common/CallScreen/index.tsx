"use client"
import React, { useEffect, useRef, useState } from "react";
import { Layout, Button, Avatar, Tooltip, Popover, message } from "antd";
import { AudioOutlined, AudioMutedOutlined, VideoCameraOutlined, VideoCameraAddOutlined, PhoneOutlined, EllipsisOutlined, CloseCircleOutlined, CloseOutlined } from "@ant-design/icons";
import { StringeeClient, StringeeCall } from "stringee-chat-js-sdk";
import { useSearchParams } from "next/navigation";

const { Header, Footer, Content } = Layout;

export default function VideoCall() {
    const searchParams = useSearchParams();
    const [isMuted, setIsMuted] = useState(false);
    const [isVideoOn, setIsVideoOn] = useState(searchParams.get('video') === "on");
    const to = searchParams.get('to');
    const from = searchParams.get('from');

    const [client, setClient] = useState(null);
    const [call, setCall] = useState(null);
    const [connected, setConnected] = useState(false);
    const [selfConnected, setSelfConnected] = useState(false);
    const [isEndCall, setIsEndCall] = useState(false);
    const localVideoRef = useRef<HTMLVideoElement>(null);
    const remoteVideoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const client = new StringeeClient();
        setClient(client);

        client.on('connect', () => {
            console.log('StringeeClient connected');
            setSelfConnected(true);
        });

        client.on('authen', (res: any) => {
            console.log('Authentication result: ', res);
        });

        client.on('incomingcall', (incomingCall: any) => {
            if (call) return;
            console.log('Incoming call: ', incomingCall);
            setCall(incomingCall);
            incomingCall.answer((res: any) => {
                console.log('Answer call response: ', res);
            });
            handleCallEvents(incomingCall);
        });

        // Authenticate client
        client.connect(`${searchParams.get("accessToken")}`);

        return () => {
            client.disconnect();
        };
    }, []);

    const handleCallEvents = (call: any) => {

        call.on('addremotestream', (stream: MediaStream) => {
            console.log('Remote stream added: ', stream);
            if (remoteVideoRef.current) {
                remoteVideoRef.current.srcObject = stream;
            }
        });

        call.on('addlocalstream', (stream: MediaStream) => {
            if (!call) return;
            console.log('Local stream added: ', stream);
            call.enableLocalVideo(isVideoOn);
            if (localVideoRef.current) {
                localVideoRef.current.srcObject = stream;
            }
        });

        call.on('info', (info: any) => {
            console.log('Info: ', info);
        });

        call.on('mediastate', (data: any) => {
            console.log('Media state: ', data);
            if (data.code == 2) {
                message.error('Người dùng ngắt kết nối');
                endCall();
            } else if (data.code == 1) {
                setConnected(true);
            }
        });

        call.on('signalingstate', (state: any) => {
            console.log('Signaling state: ', state);
            if (state.code === 6) {
                setCall(null);
                message.error('Kết thúc cuộc gọi');
                setIsEndCall(true);
            } else if (state.code === 5) {
                message.error('Từ chối cuộc gọi');
                setIsEndCall(true);
                setCall(null);
            }
        });
    }


    const makeCall = () => {
        if (!searchParams.get("isCaller")) return;
        const from = {
            userId: searchParams.get('from'),
            displayName: "Bác sĩ Nguyễn Văn A",
            isVideoCall: searchParams.get('video') === "on",
            avatar: "/placeholder.svg?height=40&width=40",
        }
        if (client) {
            const newCall = new StringeeCall(client, JSON.stringify(from), to, true);
            setCall(newCall);
            handleCallEvents(newCall);

            newCall.makeCall((res: any) => {
                console.log('Make call response: ', res);
            });
        }
    };

    const handleToggleMute = () => {
        if (!call) return;

        (call as any).mute(!isMuted, (res: any) => {
            console.log('Mute response: ', res);
        });
        setIsMuted(!isMuted);
    }

    const handleToggleVideo = () => {
        if (!call) return;
        (call as any).enableLocalVideo(!isVideoOn);
        console.log('Toggle video: ', !isVideoOn);
        setIsVideoOn(!isVideoOn);
    }

    useEffect(() => {
        if (!selfConnected) return;
        if (searchParams.get("isCaller")) makeCall();
    }, [selfConnected]);

    const endCall = () => {
        if (call) {
            console.log('End call');
            (call as any).hangup((res: any) => {
                console.log('End call response: ', res);
                setCall(null);
            });
            setIsEndCall(true);
        }
    };

    return (
        isEndCall ?
            <Layout className="h-screen">
                <Content className="p-4 bg-gray-100">
                    <div className="relative h-full bg-black rounded-lg overflow-hidden">
                        <div className="w-full h-full bg-gray-900 flex items-center justify-center flex-col text-white text-xl">
                            <div>
                                Cuộc gọi đã kết thúc
                            </div>
                            <div className="flex justify-center items-center gap-2 mt-2">
                                <Button className="text-red-500" icon={<CloseOutlined />} size="large" shape="circle" onClick={() => window.close()} />
                            </div>

                        </div>
                    </div>
                </Content>
            </Layout>
            :
            <Layout className="h-screen">
                <Content className="p-4 bg-gray-100">
                    <div className="relative h-full bg-black rounded-lg overflow-hidden">
                        <video id="remoteVideo" ref={remoteVideoRef} className={`w-full h-full object-cover ${connected ? "block" : "hidden"}`} autoPlay playsInline />
                        <div className={`w-full h-full bg-gray-900 flex items-center justify-center text-white text-xl ${connected ? "hidden" : "block"}`}>Đang kết nối...</div>
                        <div className="absolute top-4 right-4 bg-gray-900 bg-opacity-50 px-2 py-1 rounded text-white text-sm">Đối phương</div>

                        {/* Self-view (caller's video) */}
                        <div className="absolute bottom-4 right-4 w-48 h-36 bg-gray-800 rounded-lg overflow-hidden border-2 border-white">
                            <video className={`w-full h-full object-cover ${isVideoOn ? "block" : "hidden"}`} ref={localVideoRef} id="localVideo" autoPlay playsInline muted />
                            <div className={`w-full h-full bg-gray-900 flex items-center justify-center text-white text-xl ${isVideoOn ? "hidden" : "block"}`}>Video off</div>
                            <div className="absolute bottom-2 left-2 bg-gray-900 bg-opacity-50 px-2 py-1 rounded text-white text-xs">You</div>
                        </div>
                    </div>
                </Content>

                {/* Control bar */}
                <Footer className="flex justify-between items-center p-4 bg-gray-800">
                    <Button type="text" icon={<EllipsisOutlined />} className="text-white" />
                    <div className="flex space-x-4">
                        <Tooltip title={isMuted ? "Unmute" : "Mute"}>
                            <Button
                                type="text"
                                icon={isMuted ? <AudioMutedOutlined /> : <AudioOutlined />}
                                className="text-white hover:bg-gray-700 rounded-full"
                                onClick={() => handleToggleMute()}
                            />
                        </Tooltip>

                        <Tooltip title={isVideoOn ? "Turn off video" : "Turn on video"}>
                            <Button
                                type="text"
                                icon={isVideoOn ? <VideoCameraOutlined /> : <VideoCameraAddOutlined />}
                                className="text-white hover:bg-gray-700 rounded-full"
                                onClick={() => handleToggleVideo()}
                            />
                        </Tooltip>

                        <Tooltip title="End call">
                            <Button type="primary" danger icon={<PhoneOutlined />} className="bg-red-600 hover:bg-red-700 rounded-full" onClick={() => endCall()} />
                        </Tooltip>
                    </div>
                    <div className="w-10"></div> {/* Spacer to balance the layout */}
                </Footer>
            </Layout>
    );
}