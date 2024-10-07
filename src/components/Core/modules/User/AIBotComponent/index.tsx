"use client"
import React, { useState, useEffect, useRef } from 'react'
import { Layout, List, Avatar, Input, Button, Skeleton, Popover, Slider } from 'antd'
import { Pause, Send, Settings, Volume2, Play, MicOff, Mic } from 'lucide-react'
import AIAvatar from '@public/landing/images/ai-avatar.png'
import { MessageType, usePostAnswerMutation } from '@/stores/services/ai/gemini'
import 'regenerator-runtime/runtime'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import { useGetAllSpecicaltiesQuery } from '@/stores/services/enum/enum'
import DoctorSuggestion from './DoctorSuggestion'

const { Sider, Content } = Layout;
let timeoutId: any = null;


interface Message extends MessageType {
    id: number,
    isHidden?: boolean
}

const SettingVoice = ({ msg }: { msg: SpeechSynthesisUtterance }) => {
    const [speed, setSpeed] = useState(1);
    const [volume, setVolume] = useState(50);

    useEffect(() => {
        msg.rate = speed;
        msg.volume = volume / 50;
    }, [speed, volume])

    return (
        <div className="w-64 p-4 space-y-4">
            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Tốc độ</span>
                    <span className="text-sm text-gray-500">{speed}x</span>
                </div>
                <Slider
                    min={0.5}
                    max={2}
                    step={0.1}
                    value={speed}
                    onChange={(value) => setSpeed(value)}
                />
            </div>
            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Âm lượng</span>
                    <span className="text-sm text-gray-500">{volume}%</span>
                </div>
                <Slider
                    min={0}
                    max={100}
                    value={volume}
                    onChange={(value) => setVolume(value)}
                />
            </div>
        </div>
    )
}


const initialMessages: Message[] = [
    {
        id: 1, parts: [{
            text: 'Tôi là bênh nhân của phòng khám tư nhân P-Clinic'
                + 'hãy đóng vai là 1 chuyên gia y tế tên là PC-AI để trả lời tất cả các câu hỏi của tôi về y tế.'
                + ' Trả về câu trả lời về định dạnh html ví dụ thẻ p dùng để mô tả đoạn trả lời nào đó, thẻ ul, ol, li, strong nếu muốn nhấn mạnh.'
                + ' Câu trả lời phải tự nhiên gần gủi.'
                + ' Lưu ý chỉ gợi ý các chuyên khoa khi bênh nhân đang có vấn đề liên quan đến chuyên khoa đó, bạn chỉ có thể gợi ý 1 chuyên khoa, nếu gợi ý thì bạn phải phản hồi rõ khoa đó liên quan đến tình trạng gì của người hỏi'
        }], role: 'user', isHidden: true
    },
]

function stripHTML(html: string) {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    return tempDiv.textContent || tempDiv.innerText || "";
}

function scrollToEndOfElement(element: HTMLElement | null) {
    element?.scrollTo({
        top: element.scrollHeight, // Vị trí cuối cùng của phần tử
        behavior: 'smooth' // Cuộn mượt mà
    });
}

const AudioComponent = ({ text, msg, isCurrent, onClick, className }: { text: string, msg: SpeechSynthesisUtterance, isCurrent: boolean, onClick: () => void, className?: string }) => {
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    if (!isCurrent) {
        stopSpeaking();
    }

    useEffect(() => {
        const handlEvent = () => {
            setIsSpeaking(false);
            setIsPaused(false);
        };
        msg.addEventListener("end", handlEvent);
        return () => {
            if (handlEvent) {
                msg.removeEventListener('end', handlEvent);
            }
        }
    }, [isCurrent]);


    function speak() {
        window.speechSynthesis.cancel();
        setIsSpeaking(true);
        setIsPaused(false);
        msg.text = text;
        window.speechSynthesis.speak(msg)
    }

    function countinueSpeaking() {
        setIsSpeaking(true);
        setIsPaused(false);
        window.speechSynthesis.resume();
    }
    // Hàm để dừng giọng nói
    function pauseSpeaking() {
        setIsSpeaking(false);
        setIsPaused(true);
        window.speechSynthesis.pause(); // Dừng tất cả giọng nói
    }

    function stopSpeaking() {
        if (isSpeaking || isPaused) {
            setIsSpeaking(false);
            setIsPaused(false);
        }
    }

    return (
        <div className={`${className}`}>
            {!isSpeaking && !isPaused && <Volume2 onClick={() => {
                window.speechSynthesis.cancel();
                onClick(); speak();
            }} className="w-4 h-4" />}
            {isSpeaking && <Pause className="w-4 h-4" onClick={() => pauseSpeaking()} />}
            {isPaused && <Play className="w-4 h-4" onClick={() => countinueSpeaking()} />}
        </div>
    )
}

export default function AIBotComponent() {
    const [messages, setMessages] = useState<Message[]>(initialMessages)
    const msg = useRef(new SpeechSynthesisUtterance()).current;
    const [currentIndex, setCurrentIndex] = useState(0);
    const [inputMessage, setInputMessage] = useState('');
    const [suggestSpecialty, setSuggestSpecialty] = useState<any>([]);
    const { data: specialtiesResult, isFetching: isSpecialtyFetching } = useGetAllSpecicaltiesQuery({});
    useEffect(() => {
        if (specialtiesResult) {
            const newDataMessage: Message = {
                id: messages.length + 1,
                parts: [{ text: 'Dữ liệu danh sách các chuyên khoa: ' + JSON.stringify(specialtiesResult?.body?.specialties) }],
                role: 'user',
                isHidden: true,
            }
            setMessages([newDataMessage, ...messages])
        } specialtiesResult?.body?.specialties
    }, [specialtiesResult]);
    const [postAnswer, { isLoading, isError }] = usePostAnswerMutation();
    const chatboxContainerRef = useRef<HTMLDivElement>(null);
    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition,
        interimTranscript,
        isMicrophoneAvailable
    } = useSpeechRecognition();
    useEffect(() => {
        setInputMessage(transcript || interimTranscript);
    }, [transcript, interimTranscript])
    // Ngôn ngữ của trình nhận diện giọng nói (tiếng Việt)
    const startListeningInVietnamese = () => {
        SpeechRecognition.startListening({ language: 'vi-VN', continuous: true });
    };

    // Thời gian (ms) để tự động dừng nhận diện giọng nói
    const autoStopTime = 2500; // 5 giây

    useEffect(() => {
        // Nếu đang lắng nghe và có bản ghi âm
        if (listening && transcript) {
            // Thiết lập timeout để tự động dừng lắng nghe
            timeoutId = setTimeout(() => {
                SpeechRecognition.stopListening();
            }, autoStopTime);
        }

        // Dọn dẹp timeout khi component unmount hoặc khi không còn lắng nghe
        return () => {
            clearTimeout(timeoutId);
        };
    }, [listening, transcript]);

    if (!browserSupportsSpeechRecognition) {
        console.warn("Browser doesn't support speech recognition");
    }


    useEffect(() => {
        msg.lang = 'vi-VN';
        msg.pitch = 0.5;
    }, [])

    const handlePostAnswer = async (messages: Message[]) => {
        try {
            const result = await postAnswer({ messages }).unwrap();
            console.log('result', result);
            const response = JSON.parse(result.candidates[0].content.parts[0].text);
            const reply = response.response_text.trim();
            setSuggestSpecialty(response.suggested_specialty);
            console.log(response.suggested_specialty);
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
        resetTranscript();
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

    useEffect(() => {
        scrollToEndOfElement(chatboxContainerRef.current)
    }, [messages])

    return (
        <Layout className="min-h-[600px] bg-transparent">
            <Content className="h-[600px] bg-white p-4 ml-5 rounded-[12px] shadow-third">
                <div className="h-full flex flex-col">
                    <div className="p-4 border-b flex justify-between items-center">
                        <div className="flex items-center">
                            <Avatar size={48} shape="square" src={AIAvatar.src} />
                            <div className="ml-3">
                                <h2 className="text-base font-semibold text-secondarySupperDarker">PC-AI</h2>
                                <p className="text-[14px] text-gray-500 text-secondarySupperDarker">Bác sĩ AI</p>
                            </div>
                        </div>

                        <Popover content={<SettingVoice msg={msg} />} title="Cài đặt    " trigger="click">
                            <Button className='shadow-third' icon={<Settings className="w-4 h-4" />} type="text">
                                Cài đặt
                            </Button>
                        </Popover>
                    </div>
                    <div ref={chatboxContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4 chatbox">
                        {messages.map((message: Message) => (
                            !message.isHidden && <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div
                                    className={`max-w-[75%] shadow-primary rounded-lg px-4 py-2 ${message.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-secondarySupperDarker'
                                        }`}
                                >
                                    <div className='text-base' dangerouslySetInnerHTML={{ __html: message.parts[0]?.text }}></div>
                                    <AudioComponent className={`mt-2 ${message.role === 'user' ? 'float-start' : 'float-end'}`} onClick={() => setCurrentIndex(message.id)} isCurrent={currentIndex == message.id} msg={msg} text={stripHTML(message.parts[0]?.text)} />
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
                                <div>
                                    {browserSupportsSpeechRecognition && isMicrophoneAvailable
                                        && (!listening ?
                                            <Button onClick={() => { resetTranscript(); startListeningInVietnamese(); }} className='font-bold mr-2' iconPosition='start' type="primary" icon={<MicOff className='size-4' />} />
                                            :
                                            <Button onClick={() => { SpeechRecognition.stopListening(); clearTimeout(timeoutId) }} className='font-bold mr-2 bg-red-600' iconPosition='start' type="primary" icon={<Mic className='size-4' />} />
                                        )
                                    }
                                    <Button className='font-bold' iconPosition='start' type="primary" icon={<Send className="w-4 h-4" />} onClick={handleSendMessage}>
                                        Gửi
                                    </Button>
                                </div>

                            }
                        />
                    </div>
                </div>
            </Content>
            <DoctorSuggestion doctorSpecialtyId={suggestSpecialty[0]?.id} />
        </Layout >
    )
}