"use client"
import { MessageCircleReply, MessageSquare, MessageSquareReply, SchoolIcon, StarIcon, WorkflowIcon } from 'lucide-react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import "./style.css"

export default function DoctorAppointmentTimeLine() {
    return (
        <div className='relative'>
            <p className='w-full text-center text-base text-secondarySupperDarker font-bold'>Bắt đầu</p>
            <VerticalTimeline lineColor='#06B6D4'>
                <VerticalTimelineElement
                    className="vertical-timeline-element--work"
                    contentStyle={{ borderRadius: '16px' }}
                    contentArrowStyle={{}}
                    date="7:00 - 7:30 29/9/2024"
                    iconStyle={{ background: '#15803D', color: '#fff' }}
                >
                    <div className='bg-white rounded-[12px]'>
                        <div className="rounded-lg shadow-md flex">
                            <img src={'https://cdn.pixabay.com/photo/2024/05/19/09/37/ai-generated-8772169_640.png'} alt={`Tên bệnh nhân`} className="w-16 h-16 rounded-[12px] mr-4" />
                            <div className="flex-grow">
                                <h2 className="text-base text-secondarySupperDarker font-semibold">Tên bệnh nhân</h2>
                                <p className="text-base text-secondarySupperDarker mt-0 font-normal"><span className='font-semibold text-base'>Địa chỉ: </span>{`Thôn A, xã B, quận C`}</p>
                                <div className='flex justify-start'>
                                    <p className="text-base text-secondarySupperDarker mt-0 font-normal">
                                        <span className='font-semibold text-base'>Giới tính: </span>Nam
                                    </p>
                                    <p className="ml-5 text-base text-secondarySupperDarker mt-0 font-normal">
                                        <span className='font-semibold text-base'>Tuổi: </span> 29
                                    </p>
                                </div>
                            </div>
                            <button className='bg-[#00B5F1] h-[34px] w-[46px] rounded-[8px]'>
                                <MessageCircleReply className="w-6 h-6 text-white mx-auto" />
                            </button>
                        </div>
                        <p className="text-base text-secondarySupperDarker line-clamp-3 text-balance mt-0">Mô tả: <span className='font-normal'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Soluta deserunt, dolor facere architecto itaque alias laudantium saepe cupiditate. Officiis voluptatem in consequuntur placeat nisi modi ducimus et quaerat obcaecati dignissimos!</span></p>
                    </div>
                </VerticalTimelineElement>
                <VerticalTimelineElement
                    className="vertical-timeline-element--work"
                    contentStyle={{ borderRadius: '16px' }}
                    contentArrowStyle={{}}
                    date="7:00 - 7:30 29/9/2024"
                    iconStyle={{ background: '#DA0000', color: '#fff' }}
                >
                    <div className='bg-white rounded-[12px]'>
                        <div className="rounded-lg shadow-md flex">
                            <img src={'https://cdn.pixabay.com/photo/2024/05/19/09/37/ai-generated-8772169_640.png'} alt={`Tên bệnh nhân`} className="w-16 h-16 rounded-[12px] mr-4" />
                            <div className="flex-grow">
                                <h2 className="text-base text-secondarySupperDarker font-semibold">Tên bệnh nhân</h2>
                                <p className="text-base text-secondarySupperDarker mt-0 font-normal"><span className='font-semibold text-base'>Địa chỉ: </span>{`Thôn A, xã B, quận C`}</p>
                                <div className='flex justify-start'>
                                    <p className="text-base text-secondarySupperDarker mt-0 font-normal">
                                        <span className='font-semibold text-base'>Giới tính: </span>Nam
                                    </p>
                                    <p className="ml-5 text-base text-secondarySupperDarker mt-0 font-normal">
                                        <span className='font-semibold text-base'>Tuổi: </span> 29
                                    </p>
                                </div>
                            </div>
                            <button className='bg-[#00B5F1] h-[34px] w-[46px] rounded-[8px]'>
                                <MessageCircleReply className="w-6 h-6 text-white mx-auto" />
                            </button>
                        </div>
                        <p className="text-base text-secondarySupperDarker line-clamp-3 text-balance mt-0">Mô tả: <span className='font-normal'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Soluta deserunt, dolor facere architecto itaque alias laudantium saepe cupiditate. Officiis voluptatem in consequuntur placeat nisi modi ducimus et quaerat obcaecati dignissimos!</span></p>
                    </div>
                </VerticalTimelineElement>
                <VerticalTimelineElement
                    className="vertical-timeline-element--work"
                    contentStyle={{ borderRadius: '16px' }}
                    contentArrowStyle={{}}
                    date="7:00 - 7:30 29/9/2024"
                    iconStyle={{ background: '#0284C7', color: '#fff' }}
                >
                    <div className='bg-white rounded-[12px]'>
                        <div className="rounded-lg shadow-md flex">
                            <img src={'https://cdn.pixabay.com/photo/2024/05/19/09/37/ai-generated-8772169_640.png'} alt={`Tên bệnh nhân`} className="w-16 h-16 rounded-[12px] mr-4" />
                            <div className="flex-grow">
                                <h2 className="text-base text-secondarySupperDarker font-semibold">Tên bệnh nhân</h2>
                                <p className="text-base text-secondarySupperDarker mt-0 font-normal"><span className='font-semibold text-base'>Địa chỉ: </span>{`Thôn A, xã B, quận C`}</p>
                                <div className='flex justify-start'>
                                    <p className="text-base text-secondarySupperDarker mt-0 font-normal">
                                        <span className='font-semibold text-base'>Giới tính: </span>Nam
                                    </p>
                                    <p className="ml-5 text-base text-secondarySupperDarker mt-0 font-normal">
                                        <span className='font-semibold text-base'>Tuổi: </span> 29
                                    </p>
                                </div>
                            </div>
                            <button className='bg-[#00B5F1] h-[34px] w-[46px] rounded-[8px]'>
                                <MessageCircleReply className="w-6 h-6 text-white mx-auto" />
                            </button>
                        </div>
                        <p className="text-base text-secondarySupperDarker line-clamp-3 text-balance mt-0">Mô tả: <span className='font-normal'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Soluta deserunt, dolor facere architecto itaque alias laudantium saepe cupiditate. Officiis voluptatem in consequuntur placeat nisi modi ducimus et quaerat obcaecati dignissimos!</span></p>
                    </div>
                </VerticalTimelineElement>
                <VerticalTimelineElement
                    contentStyle={{ display: 'none' }}
                    iconStyle={{ background: 'rgb(16, 204, 82)', color: '#fff' }}
                    icon={<StarIcon />}
                />
            </VerticalTimeline>
        </div>
    )
}