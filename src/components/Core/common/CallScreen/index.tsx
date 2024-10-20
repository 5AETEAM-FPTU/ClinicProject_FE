"use client";
import React, { useEffect, useState, useRef } from "react";
import { Layout, Button, message } from "antd";
import {
    AudioOutlined,
    AudioMutedOutlined,
    VideoCameraOutlined,
    VideoCameraAddOutlined,
    PhoneOutlined,
    CloseOutlined,
} from "@ant-design/icons";
import { StringeeClient, StringeeCall2, StringeeUtil } from "stringee";
import { useSearchParams } from "next/navigation";
import { Mic, MicOff, Phone, Video, VideoOff } from "lucide-react";

const { Header, Footer, Content } = Layout;

export default function VideoCall() {
    const [isAllowed, setIsAllowed] = useState(false);
    const searchParams = useSearchParams();
    const [isMuted, setIsMuted] = useState(false);
    const [isVideoOn, setIsVideoOn] = useState(searchParams.get("video") === "on");
    const [isRemoteVideoOn, setIsRemoteVideoOn] = useState(searchParams.get("video") === "on");
    const [isVoiceCall, setIsVoiceCall] = useState(searchParams.get("video") !== "on");
    const to = searchParams.get("to");
    const from = searchParams.get("from");

    const [client, setClient] = useState(null);
    const [call, setCall] = useState(null);
    const [connected, setConnected] = useState(false);
    const [selfConnected, setSelfConnected] = useState(false);
    const [isEndCall, setIsEndCall] = useState(false);

    const checkMediaPermissions = async () => {
        console.log("support ? : ", StringeeUtil.isWebRTCSupported());

        if (!StringeeUtil.isWebRTCSupported()) {
            message.error("Trình duyệt không hỗ trợ cuộc gọi video");
            return <div>Trình duyệt không hỗ trợ cuộc gọi video</div>;
        }

        try {
            // Đợi người dùng cấp quyền truy cập micro và camera
            const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            console.log("Micro và camera đã được cấp quyền.");
            // Khi người dùng cho phép, bạn có thể tiếp tục với logic cuộc gọi video
            return stream;  // Trả về stream video/audio để dùng tiếp trong ứng dụng
        } catch (err: any) {
            // Xử lý lỗi nếu người dùng từ chối hoặc không có thiết bị
            console.error("Lỗi khi yêu cầu quyền truy cập micro/camera: ", err);
            if (err.name === "NotAllowedError") {
                message.error("Bạn cần cho phép truy cập micro và camera để thực hiện cuộc gọi video.");
            } else if (err.name === "NotFoundError") {
                message.error("Không tìm thấy thiết bị micro hoặc camera.");
            } else {
                message.error("Đã xảy ra lỗi khi yêu cầu quyền truy cập micro/camera.");
            }
            return null;  // Trả về null nếu không có quyền truy cập
        }
    };

    // Ref for managing local and remote video elements
    const localVideoRef = useRef<HTMLDivElement>(null);
    const remoteVideoRef = useRef<HTMLDivElement>(null);

    const localVoiceRef = useRef<HTMLVideoElement>(null);
    const remoteVoiceRef = useRef<HTMLVideoElement>(null);
    useEffect(() => {
        if (!isAllowed) return;
        const client = new StringeeClient();
        setClient(client);

        client.on("connect", () => {
            console.log("StringeeClient connected");
        });

        client.on("authen", (res: any) => {
            console.log("Authentication result: ", res);
            if (res.r == 0) {
                setSelfConnected(true);
            } else {
                message.error("Không thể kết nối đến máy chủ");
                setIsEndCall(true);
            }

        });

        client.on("incomingcall2", (incomingCall: any) => {
            if (call) return;
            console.log("Incoming call: ", incomingCall);
            if (searchParams.get("video") === "on") incomingCall.enableLocalVideo(true);
            else {
                incomingCall.enableLocalVideo(true);
                incomingCall.enableLocalVideo(false);
            }
            setCall(incomingCall);
            incomingCall.answer((res: any) => {
                console.log("Answer call response: ", res);
            });
            handleCallEvents(incomingCall);
        });

        client.connect(`${searchParams.get("accessToken")}`);

        client.on("custommessage", (msg: any) => {
            console.log("Custom message: ", msg);
            if (msg.message) {
                const data = msg.message;
                if (data.video != undefined) setIsRemoteVideoOn(data.video);
            }
        });

        return () => {
            client.disconnect();
        };
    }, [isAllowed]);

    const handleCallEvents = (call: any) => {
        if (!call) return;

        call.on('addremotestream', function (stream: any) {
            console.log('addremotestream');
            // reset srcObject to work around minor bugs in Chrome and Edge.
            if (remoteVoiceRef.current) {
                remoteVoiceRef.current.srcObject = stream;
            }
        });

        call.on('addlocalstream', function (stream: any) {
            console.log('addlocalstream');
            if (localVoiceRef.current) {
                localVoiceRef.current.srcObject = stream;
            }
        });


        call.on("addlocaltrack", (localTrack: any) => {
            const localElement = localTrack.attach();
            if (localVideoRef.current) {
                localElement.style.width = "100%";
                localElement.style.height = "100%";
                localVideoRef.current.appendChild(localElement);
            }
        });

        call.on("addremotetrack", (remoteTrack: any) => {
            const remoteElement = remoteTrack.attach();
            if (remoteVideoRef.current) {
                remoteElement.style.width = "100%";
                remoteElement.style.height = "100%";
                remoteVideoRef.current.appendChild(remoteElement);
            }
            console.log("Remote track added: ", remoteTrack);
        });

        call.on("removelocaltrack", (localTrack: any) => {
            localTrack.detachAndRemove();

            if (localVideoRef.current) {
                localVideoRef.current.innerHTML = ""; // Clear video on remove
            }
        });

        call.on("removeremotetrack", (remoteTrack: any) => {
            remoteTrack.detachAndRemove();
            if (remoteVideoRef.current) {
                remoteVideoRef.current.innerHTML = ""; // Clear video on remove
            }
        });

        call.on("mediastate", (data: any) => {
            console.log("Media state: ", data);
            if (data.code === 2) {
                message.error("Người dùng ngắt kết nối");
                endCall();
            }
            setConnected(data.isConnected);
        });

        call.on("signalingstate", (state: any) => {
            console.log("Signaling state: ", state);
            if (state.code === 6) {
                setCall(null);
                message.error("Kết thúc cuộc gọi");
                setIsEndCall(true);
            } else if (state.code === 5) {
                message.error("Từ chối cuộc gọi");
                (client as any).sendCustomMessage(to, { requestClosePopUp: true }, (res: any) => {
                    if (res.userNotOnline) {
                        message.error("Người dùng ngắt kết nối");
                    }
                })
                setIsEndCall(true);
                setCall(null);
            } else if (state.code === 3) {
                (client as any).sendCustomMessage(to, { requestClosePopUp: true }, (res: any) => {
                    if (res.userNotOnline) {
                        message.error("Người dùng ngắt kết nối");
                        endCall();
                    }
                })
            }
        });


        call.on('otherdevice', function (msg: any) {
            console.log('otherdevice ', msg);
            if (msg.type == 'CALL2_STATE') {
                if (msg.code == 200 || msg.code == 486) {
                    console.log('CALL2_STATE', msg.code);
                }
            }
        });
    };

    const makeCall = () => {
        if (!isAllowed) return;
        if (!searchParams.get("isCaller")) return;
        console.log(searchParams.get("avatar"));
        const from = {
            userId: searchParams.get("from"),
            displayName: searchParams.get("fullName"),
            avatar: searchParams.get("avatar"),
            isVideoCall: searchParams.get("video") === "on",
        };
        if (client) {
            const newCall = new StringeeCall2(client, JSON.stringify(from), to, searchParams.get("video") === "on");
            setCall(newCall);
            handleCallEvents(newCall);

            newCall.makeCall((res: any) => {
                // do no thing
            });
        }
    };

    const handleToggleMute = () => {
        if (!call) return;

        (call as any).mute(!isMuted, (res: any) => {
            console.log("Mute response: ", res);
        });
        setIsMuted(!isMuted);
    };

    const handleToggleVideo = () => {
        if (!call) return;
        if (!isVideoOn) setIsVoiceCall(false);
        (call as any).enableLocalVideo(!isVideoOn);
        (client as any).sendCustomMessage(to, { video: !isVideoOn }, (res: any) => {
            if (res.userNotOnline) {
                message.error("Người dùng ngắt kết nối");
                endCall();
            }
        })
        console.log("Toggle video: ", !isVideoOn);
        setIsVideoOn(!isVideoOn);
    };

    useEffect(() => {
        if (!selfConnected || isEndCall || call) return;
        if (searchParams.get("isCaller")) {
            makeCall();
            console.log("Make call");
        }
    }, [selfConnected, isEndCall, isAllowed]);

    const endCall = () => {
        if (call) {
            console.log("End call");
            (call as any).hangup((res: any) => {
                console.log("End call response: ", res);
                setCall(null);
            });
            setIsEndCall(true);
        }
    };
    if (!isAllowed) {
        checkMediaPermissions().then((stream) => {
            if (stream) {
                setIsAllowed(true);
                // Thực hiện các thao tác khi đã có quyền truy cập micro/camera
                console.log("Đã có stream từ camera/micro", stream);
                // Bạn có thể dùng stream này để thực hiện cuộc gọi video
            } else {
                (client as any).disconnect();
                console.log("Người dùng không cấp quyền hoặc không có thiết bị.");
            }
        });
        return <div>Bạn chưa cho phép trình duyệt truy cập microphone và camera</div>;
    }
    return isEndCall ? (
        <Layout className="h-screen">
            <Content className="p-4 bg-gray-100">
                <div className="relative h-full bg-black rounded-lg overflow-hidden">
                    <div className="w-full h-full bg-gray-900 flex items-center justify-center flex-col text-white text-xl">
                        <div>Cuộc gọi đã kết thúc</div>
                        <div className="flex justify-center items-center gap-2 mt-2">
                            <Button
                                className="text-red-500"
                                icon={<CloseOutlined />}
                                size="large"
                                shape="circle"
                                onClick={() => window.close()}
                            />
                        </div>
                    </div>
                </div>
            </Content>
        </Layout>
    ) : (
        <Layout className="h-screen">
            <Content className="p-4 bg-gray-100">
                <div className="relative h-full bg-black rounded-lg overflow-hidden">
                    {/* Remote video */}

                    <div ref={remoteVideoRef} className={`w-full h-full ${connected && isRemoteVideoOn ? "block" : "hidden"}`} >
                        {isVoiceCall && <audio ref={remoteVoiceRef} autoPlay playsInline />}
                    </div>
                    <div
                        className={`w-full h-full bg-gray-900 flex items-center justify-center text-white text-xl ${connected && !isRemoteVideoOn ? "block" : "hidden"
                            }`} >
                        {searchParams.get("peerAvatar") && <img src={searchParams.get("peerAvatar") || ""} className="w-full h-full object-cover" />}
                    </div>
                    <div
                        className={`w-full h-full bg-gray-900 flex items-center justify-center text-white text-xl ${connected ? "hidden" : "block"
                            }`}
                    >
                        Đang kết nối...
                    </div>
                    <div className="absolute top-4 right-4 bg-gray-900 bg-opacity-50 px-2 py-1 rounded text-white text-sm">
                        {searchParams.get("peerFullName")}
                    </div>

                    {/* Self-view (local video) */}
                    <div className="absolute bottom-4 right-4 w-48 h-36 bg-gray-800 rounded-lg overflow-hidden border-2 border-white">

                        <div ref={localVideoRef} className={`w-full h-full ${isVideoOn ? "block" : "hidden"}`} >
                            {isVoiceCall && <audio ref={localVoiceRef} autoPlay playsInline muted />}
                        </div>
                        <div
                            className={`w-full h-full bg-gray-900 flex items-center justify-center text-white ${isVideoOn ? "hidden" : "flex"
                                }`}
                        >
                            {searchParams.get("avatar") && <img src={searchParams.get("avatar") || ""} className="w-full h-full object-cover" />}
                        </div>
                    </div>
                </div>
            </Content>
            <Footer className="bg-gray-200">
                <div className="flex items-center justify-center gap-2">
                    <Button
                        className="text-secondaryDarker hover:bg-slate-50 transition-all rounded-full bg-white h-[50px] w-[50px]"
                        icon={isMuted ? <MicOff size={26} /> : <Mic size={26} />}
                        onClick={handleToggleMute}
                    />
                    <Button
                        className="text-secondaryDarker hover:bg-slate-50 transition-all rounded-full bg-white h-[50px] w-[50px]"
                        icon={isVideoOn ? <Video size={26} /> : <VideoOff size={26} />}
                        onClick={handleToggleVideo}
                    />
                    <Button icon={<Phone size={24} />} className="text-white rounded-full bg-red-600 h-[50px] w-[50px]" shape="circle" onClick={endCall} />
                </div>
            </Footer>
        </Layout>
    );
}
