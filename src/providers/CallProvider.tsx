'use client'
import { JwtPayloadUpdated } from '@/components/Core/modules/Auth/SignIn'
import { IncomingCallPopup } from '@/components/Core/modules/User/Consultation'
import { constants } from '@/settings'
import webStorageClient from '@/utils/webStorageClient'
import { jwtDecode, JwtPayload } from 'jwt-decode'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { StringeeClient } from 'stringee'

export interface JwtPayloadStringee extends JwtPayload {
    userId: string
}

export default function CallProvier({
    children,
}: {
    children: React.ReactNode
}) {
    const pathname = usePathname()
    console.log(pathname)
    if (pathname == '/vi/call') return <>{children}</>
    const [stringeeClient, setStringeeClient] = useState(null)
    const [call, setCall] = useState(null)
    const [userId, setUserId] = useState('')
    const [callAccessToken, setCallAccessToken] = useState('')
    const [callFrom, setCallFrom] = useState<{
        userId: string
        displayName: string
        isVideoCall: boolean
        avatar: string
    } | null>(null)
    const avatar = webStorageClient.get(constants.USER_AVATAR)
    const fullName = webStorageClient.get(constants.USER_FULLNAME)
    useEffect(() => {
        try {
            const stringeeAccessToken = webStorageClient.get(
                constants.CALL_ACCESS_TOKEN,
            )
            const accessToken = webStorageClient.getToken()
            if (!accessToken || !stringeeAccessToken) return
            const role = jwtDecode<JwtPayloadUpdated>(accessToken).role
            if (role != 'user') return
            setCallAccessToken(stringeeAccessToken)
            const userId =
                jwtDecode<JwtPayloadStringee>(stringeeAccessToken).userId
            setUserId(userId)
        } catch (e) {}
    }, [])

    useEffect(() => {
        const accessToken = webStorageClient.getToken()
        if (!accessToken || !callAccessToken) return
        const role = jwtDecode<JwtPayloadUpdated>(accessToken).role
        if (role != 'user') return
        const client = new StringeeClient()

        client.on('connect', () => {
            console.log('Connected to StringeeServer')
            setStringeeClient(client)
        })

        client.on('authen', (res: any) => {
            if (res.r === 0) {
                console.log('Authenticated', res)
            } else {
                console.log('Authentication failed', res.message)
            }
        })

        client.on('incomingcall2', (incomingCall: any) => {
            setCall(incomingCall)
            console.log('Incoming call', incomingCall)
            handleCallEvents(incomingCall)
            setCallFrom(JSON.parse(incomingCall.fromNumber))
        })

        client.on('requestnewtoken', function () {
            // call refreshtoken
            // client.connect(accessToken);
        })

        client.on('otherdeviceauthen', function (data: any) {
            console.log('on otherdeviceauthen:' + JSON.stringify(data))
        })

        client.on('custommessage', function (msg: any) {
            if (msg.message.requestClosePopUp) {
                setCall(null)
            }
        })

        client.connect(callAccessToken)

        return () => {
            if (client) {
                client.disconnect()
            }
        }
    }, [callAccessToken])

    const handleCallEvents = (call: any) => {
        call.on('mediastate', function (data: any) {
            console.log('on mediastate', data)
        })

        call.on('signalingstate', function (data: any) {
            console.log('on signalingstate', data)
        })

        call.on('info', function (data: any) {
            console.log('on info', data)
        })

        call.on('otherdevice', function (data: any) {
            console.log('on otherdevice:' + JSON.stringify(data))
            if (
                (data.type === 'CALL_STATE' && data.code >= 200) ||
                data.type === 'CALL_END'
            ) {
                handleEndCall()
            }
        })
    }

    const handleEndCall = () => {
        if (call) {
            ;(call as any).hangup((res: any) => {
                console.log('Call ended', res)
                setCall(null)
            })
        }
    }

    useEffect(() => {
        let timer: any
        if (stringeeClient && callFrom && call) {
            timer = setInterval(() => {
                ;(stringeeClient as any).sendCustomMessage(
                    callFrom.userId,
                    { test: true },
                    (res: any) => {
                        console.log('Send custom message: ', res)
                        if (res.userNotOnline) {
                            setCall(null)
                            clearInterval(timer)
                        }
                    },
                )
            }, 1000)
        }
        return () => {
            clearInterval(timer)
        }
    }, [stringeeClient, call])
    const domain = process.env.NEXT_PUBLIC_FE_DOMAIN ?? 'http://127.0.0.1:3000'
    return (
        <>
            {stringeeClient && (
                <IncomingCallPopup
                    avatar={callFrom && callFrom.avatar}
                    isVisible={call != null}
                    callerName={callFrom && callFrom.displayName}
                    callerNumber={
                        callFrom && callFrom.isVideoCall
                            ? 'Đang gọi video ...'
                            : 'Đang gọi ...'
                    }
                    onAnswer={() => {
                        window.open(
                            `${domain}/vi/call?from=${userId}&to=${callFrom?.userId}&accessToken=${callAccessToken}&video=${callFrom?.isVideoCall ? 'on' : 'off'}&peerAvatar=${callFrom?.avatar}&peerFullName=${callFrom?.displayName}&avatar=${avatar}&fullName=${fullName}`,
                            '_blank',
                            'width=800,height=600',
                        )
                        setCall(null)
                    }}
                    onDecline={() => {
                        if (!call) return
                        ;(call as any).reject((res: any) => {
                            console.log('Call rejected', res)
                            setCall(null)
                        })
                        setCall(null)
                    }}
                />
            )}
            {children}
        </>
    )
}
