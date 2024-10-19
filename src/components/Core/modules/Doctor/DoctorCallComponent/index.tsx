"use client"
import React, { useEffect, useState } from 'react'
import { Button } from 'antd'
import { Phone, Video } from 'lucide-react'
import webStorageClient from '@/utils/webStorageClient'
import { constants } from '@/settings'
import { JwtPayloadStringee } from '@/providers/CallProvider'
import { jwtDecode } from 'jwt-decode'

export default function CallComponent({ to, toAvatar, toFullName }: { to: string | null, toAvatar: string | null, toFullName: string | null }) {
    const [userId, setUserId] = useState('');
    const [callAccessToken, setCallAccessToken] = useState('');
    const fullName = webStorageClient.get(constants.USER_FULLNAME);
    const avatar = webStorageClient.get(constants.USER_AVATAR);
    useEffect(() => {
        const stringeeAccessToken = webStorageClient.get(constants.CALL_ACCESS_TOKEN);
        if (!stringeeAccessToken) return;
        setCallAccessToken(stringeeAccessToken);
        const userId = jwtDecode<JwtPayloadStringee>(stringeeAccessToken).userId;
        setUserId(userId);
    }, []);
    console.log(to);
    const domain = process.env.NEXT_PUBLIC_DOMAIN ?? 'http://127.0.0.1:3000';
    return (
        <>
            <Button onClick={() => {
                if (!to) return;
                var newWindow = window.open(
                    `${domain}/vi/call?from=${userId}&to=${to}&accessToken=${callAccessToken}&isCaller=true&video=on&fullName=${fullName}&avatar=${avatar}&peerAvatar=${toAvatar}&peerFullName=${toFullName}`,
                    '_blank', 'width=800,height=600');
            }} className="shadow-third"
                icon={<Video className="h-4 w-4" />}
                type="text"
            />
            <Button className="shadow-third"
                icon={<Phone className='h-4 w-4' />}
                type="text"
                onClick={() => {
                    if (!to) return;
                    var newWindow = window.open(
                        `${domain}/vi/call?from=${userId}&to=${to}&accessToken=${callAccessToken}&isCaller=true&fullName=${fullName}&avatar=${avatar}&peerAvatar=${toAvatar}&peerFullName=${toFullName}`,
                        '_blank', 'width=800,height=600');
                }}
            />
        </>
    )
}