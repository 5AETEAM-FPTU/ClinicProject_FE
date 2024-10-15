'use client'
import { useSearchParams } from 'next/navigation'
import React, { useState, useEffect, useRef } from 'react'
import { StringeeClient, StringeeCall } from 'stringee-chat-js-sdk'

const StringeeCallComponent: React.FC = () => {
    const [client, setClient] = useState(null)
    const [call, setCall] = useState<typeof StringeeCall | null>(null);
    const [connected, setConnected] = useState(false)
    const [incomingCall, setIncomingCall] = useState<null | {
        answer: (callback: (res: any) => void) => void,
        reject: (callback: (res: any) => void) => void,
      }>(null);

    const localVideoRef = useRef<HTMLVideoElement>(null)
    const remoteVideoRef = useRef<HTMLVideoElement>(null)
    const searchParams = useSearchParams()
    const accessToken = searchParams.get('accessToken')
    useEffect(() => {
        const client = new StringeeClient()
        setClient(client)

        client.on('connect', () => {
            console.log('StringeeClient connected')
        })

        client.on('authen', (res: any) => {
            console.log('Authentication result: ', res)
        })

        client.on('incomingcall', (incomingCall: any) => {
            console.log('Incoming call: ', incomingCall)
            setIncomingCall(incomingCall)

            incomingCall.on('addremotestream', (stream: MediaStream) => {
                if (remoteVideoRef.current) {
                    remoteVideoRef.current.srcObject = stream
                }
            })

            incomingCall.on('signalingstate', (state: any) => {
                console.log('Signaling state: ', state)
                if (state.code === 6) {
                    setCall(null)
                }
            })
        })

        // Authenticate client
        client.connect(accessToken)

        return () => {
            client.disconnect()
        }
    }, [])

    const makeCall = () => {
        if (client) {
            const newCall = new StringeeCall(
                client,
                '1',
                'ec999343-0484-44f9-a06a-e53960ddad8f',
                false,
            )
            setCall(newCall)

            newCall.on('addlocalstream', (stream: MediaStream) => {
                if (localVideoRef.current) {
                    localVideoRef.current.srcObject = stream
                }
            })

            newCall.on('addremotestream', (stream: MediaStream) => {
                if (remoteVideoRef.current) {
                    remoteVideoRef.current.srcObject = stream
                }
            })

            newCall.makeCall((res: any) => {
                console.log('Make call response: ', res)
            })
        }
    }

    const acceptCall = () => {
        if (incomingCall) {
            incomingCall.answer((res: any) => {
                console.log('Accept call response: ', res)
            })
        }
    }

    const rejectCall = () => {
        if (incomingCall) {
            incomingCall.reject((res: any) => {
                console.log('Reject call response: ', res)
                setIncomingCall(null)
            })
        }
    }

    const endCall = () => {
        if (call) {
            call.hangup((res: any) => {
                console.log('End call response: ', res)
                setCall(null)
            })
        }
    }

    return (
        <div>
            <h2>Stringee Call with ReactJS</h2>
            {connected ? <p>Client connected!</p> : <p>Connecting...</p>}

            {incomingCall && (
                <div>
                    <p>Incoming call...</p>
                    <button onClick={acceptCall}>Accept</button>
                    <button onClick={rejectCall}>Reject</button>
                </div>
            )}

            <button onClick={makeCall}>Make a Call</button>
            <button onClick={endCall}>End Call</button>

            <div>
                <h3>Local Video</h3>
                <video
                    ref={localVideoRef}
                    autoPlay
                    playsInline
                    muted
                    style={{ width: '300px' }}
                ></video>
            </div>

            <div>
                <h3>Remote Video</h3>
                <video
                    ref={remoteVideoRef}
                    autoPlay
                    playsInline
                    style={{ width: '300px' }}
                ></video>
            </div>
        </div>
    )
}

export default StringeeCallComponent
