'use client'
import React, { useEffect, useState } from "react";
import { MessageCircle, MessageCircleReply } from 'lucide-react'
import { Button, message, Skeleton } from "antd";
import Paginate from "@/components/Core/common/Paginate";
import { useAddChatRoomMutation, useLazyGetAllQueueRoomsQuery } from "@/stores/services/chat/chats";
import Image from 'next/image'
import { set } from "lodash";
import { useRouter } from "next-nprogress-bar";
interface PatientQueue {
  patientId: string;
  queueRoomId: string;
  patientName: string;
  patientAvatar: string;
  message: string;
}

interface ApiResponse {
  contents: PatientQueue[];
  pageIndex: number;
  pageSize: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export default function DoctorQueueRoom() {
  const pageSizeDefault = 7;
  const [patientQueues, setPatientQueues] = useState<PatientQueue[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [queueRoomFunc, { data, isLoading }] = useLazyGetAllQueueRoomsQuery();
  const [addChatRoomFunc, { data: addChatRoomData, isLoading: addChatRoomLoading }] = useAddChatRoomMutation();
  const router = useRouter();

  const handleFetchQueueRooms = async (page: number, pageSize: number) => {
    const result = await queueRoomFunc({
      pageIndex: page,
      pageSize: pageSizeDefault,
    })

    const apiResponse = result?.data?.body?.patientQueues as ApiResponse

    if (result) {
      setPatientQueues(apiResponse.contents);
      setTotalPages(apiResponse.totalPages);
    }
  };

  const handleFetchChatRoom = async (patientId: string, queueRoomId: string, initialMessage: string, peerAvatar: string) => {
    console.log(patientId, queueRoomId, initialMessage);
    try {
      const result = await addChatRoomFunc({
        patientId: patientId,
        queueRoomId: queueRoomId,
        initialMessage: initialMessage,
      }).unwrap()

      console.log("assignChatRoomId", result.body.assignChatRoomId);

      router.push(`/doctor/consultation/conversation/?chat=${result?.body?.assignChatRoomId}&user=${patientId}&peerAvt=${peerAvatar}`)
      message.success('Tạo đoạn hội thoại thành công!')
    } catch (error) {
      console.log(error);
      message.error('Tạo đoạn hội thoại thểat bị!')
    }
  }

  useEffect(() => {
    handleFetchQueueRooms(page, pageSizeDefault);
  }, [page]);

  const handlePageChange = (page: number) => {
    setPage(page);
    handleFetchQueueRooms(page, pageSizeDefault);
  }

  const handleAcceptReply = (message: string) => {

  }

  return (
    <div className="max-w-full mx-auto">
      <h3 className="text-[20px] font-semibold text-[#003553] mb-4">Tin nhắn chờ</h3>
      {isLoading && Array.from({ length: 4 }).map((_, index) => <Skeleton key={index} active />)}
      <div className="w-full">
        <ul className="space-y-1">
          {patientQueues.map((queue) => (
            <li key={queue.queueRoomId} className="bg-white rounded-lg shadow-sm flex justify-between items-center px-4 h-[70px]">
              <div className="flex items-center gap-2">
                <Image
                  src={queue.patientAvatar}
                  alt="Avatar"
                  width={200}
                  height={200}
                  className="w-10 h-10 rounded-full mr-4"
                />
                <div className="flex flex-col gap-[2px]">
                  <div className="text-sm text-[#003553]">
                    Yêu cầu tư vấn từ:
                  </div>
                  <span className="font-semibold text-black text-[16px] ml-1">{queue.patientName}</span>
                </div>
              </div>
              <div className="mt-2 w-[60%] flex items-center">
                <div className="h-6 bg-[#003553] w-1 mr-[6px]"></div>
                <p className="">{queue.message}</p>
              </div>
              <Button
                onClick={() => handleFetchChatRoom(queue.patientId, queue.queueRoomId, queue.message, queue.patientAvatar)}
                className="bg-[#00B5F1] hover:bg-blue-600 text-white font-bold py-5 px-5 rounded-xl flex items-center">
                <MessageCircleReply size={24} />
                Trả lời
              </Button>
            </li>
          ))}
        </ul>
      </div>
      <Paginate page={page} totalPages={totalPages} onPageChange={(page) => handlePageChange(page)} />
    </div>
  )
}