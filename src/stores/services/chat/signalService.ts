import * as signalR from '@microsoft/signalr'
import { message } from 'antd'

interface ChatContent {
    chatContentId: string
    senderId: string
    message: string
    imageUrls: string[]
    videoUrls: string[]
    time: string
    //...
}


const createChatService = () => {
    let connection: signalR.HubConnection

    const startConnection = async (
        token: string,
        onMessageReceived: (content: ChatContent) => void,
        onTypingReceived: (senderId: string) => void,
        onRemovedMessageReceived: (senderId: string, chatContentId: string) => void
    ) => {
        if (
            connection &&
            connection.state !== signalR.HubConnectionState.Disconnected
        ) {
            await connection.stop()
        }

        connection = new signalR.HubConnectionBuilder()
            .withUrl('https://localhost:7161/chat-hub?token=' + token)
            .withAutomaticReconnect()
            .build()

        connection.off('ReceiveMessage')
        connection.off("ReceiveTyping")

        connection.on('ReceiveMessage', (chatContentId, sender, message, chatRoomId, imageUrls) => {
            let chatContent: ChatContent = {
                chatContentId: chatContentId,
                senderId: sender,
                message: message,
                imageUrls: imageUrls, 
                time: new Date().toLocaleString(),
                videoUrls: [], // Fix
            }
            console.log(`Message received from ${sender}: ${message}`)
            onMessageReceived(chatContent)
        })

        connection.on('ReceiveTyping', (senderId) => {
            console.log(`Typing received from ${senderId}`);
            onTypingReceived(senderId)
        })

        connection.on('ReceiveRemovedMessage', (senderId, chatContentId) => {
            onRemovedMessageReceived(senderId, chatContentId)
        })

        connection.onreconnecting((error) => {
            message.warning("Đang thử kết nối lại...!")
        })

        connection.onreconnected((connectionId) => {
            message.success("Đã kết nối lại thành công");
        })

        connection.onclose((error) => {
            message.error("Kết nối đã bị đóng, hãy thử tải lại trang")
        })

        await connection
            .start()
            .then(() => {
                console.log('Connection established successfully.')
                console.log(`Connection ID: ${connection.connectionId}`)
            })
            .catch((err) => {
                console.error('Failed to connect:', err)
            })
    }

    const stopConnection = async () => {
      if (connection) {
          await connection.stop()
      }
  }

    const sendMessage = async (
        chatContentId: string,
        senderId: string,
        receiverId: string,
        content: string,
        chatRoomId: string,
        imageUrls?: string[],
    ): Promise<boolean> => {
        if (connection) {
            console.log('Send to', receiverId, content)
            const chatMessage = {
                chatContentId: chatContentId,
                senderId: senderId,
                receiverId: receiverId,
                message: content,
                chatRoomId: chatRoomId,
                imageUrls: imageUrls, 
                videoUrls: [], // Fix after
            }

            connection
                .invoke('SendMessageAsync', chatMessage)
                .then(() => {
                    return true
                })
                .catch((err) => {
                    console.error(err)
                    return false
                })
        }
        return Promise.resolve(false)
    }

    const sendTypingMessage = async (senderId: string, receiverId: string) => {
        
        if (connection) {
           
            connection
                .invoke('SendTypingAsync', senderId, receiverId)
                .then(() => {
                    console.log('true for sure', senderId, receiverId)
                })
                .catch((err) => {
                    console.error(err)
                })
        }
    }

    const sendRemovedMessage = async (senderId: string, receiverId: string, chatContentId: string) => {
        if (connection) {
            connection
                .invoke('SendRemovedMessageAsync', senderId, receiverId, chatContentId)
                .then(() => {
                    console.log('true for sure', senderId, receiverId)
                })
                .catch((err) => {
                    console.error(err)
                })
        }
    }

    return {
        startConnection,
        sendMessage,
        sendTypingMessage,
        sendRemovedMessage
    }
}

export default createChatService
