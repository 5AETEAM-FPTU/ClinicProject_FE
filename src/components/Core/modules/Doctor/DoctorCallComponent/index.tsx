"use client"
import React, { useEffect, useState } from 'react'
import { Button } from 'antd'
import { Phone, Video } from 'lucide-react'
import webStorageClient from '@/utils/webStorageClient'
import { constants } from '@/settings'
import { JwtPayloadStringee } from '@/providers/CallProvider'
import { jwtDecode } from 'jwt-decode'

export default function CallComponent() {
    const [userId, setUserId] = useState('');
    const [callAccessToken, setCallAccessToken] = useState('');

    useEffect(() => {
        const stringeeAccessToken = webStorageClient.get(constants.CALL_ACCESS_TOKEN);
        if (!stringeeAccessToken) return;
        setCallAccessToken(stringeeAccessToken);
        const userId = jwtDecode<JwtPayloadStringee>(stringeeAccessToken).userId;
        setUserId(userId);
    }, []);

    return (
        <>
            <Button onClick={() => {
                var newWindow = window.open(
                    `http://127.0.0.1:3000/vi/test?from=${userId}&to=1a6c3e77-4097-40e2-b447-f00d1f82cf73&accessToken=${callAccessToken}&isCaller=true&video=on`,
                    '_blank', 'width=800,height=600');
            }} className="shadow-third"
                icon={<Video className="h-4 w-4" />}
                type="text"
            />
            <Button className="shadow-third"
                icon={<Phone className='h-4 w-4' />}
                type="text"
                onClick={() => {
                    var newWindow = window.open(
                        `http://127.0.0.1:3000/vi/test?from=${userId}&to=1a6c3e77-4097-40e2-b447-f00d1f82cf73&accessToken=${callAccessToken}&isCaller=true`,
                        '_blank', 'width=800,height=600');
                }}
            />
        </>
    )
}