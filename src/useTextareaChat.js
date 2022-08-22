import { useEffect, useRef, useState } from "react"
import socketIOClient from "socket.io-client";

const SOCKET_SERVER_URL = "http://localhost:4000";
const TEXTAREA_MESSAGE_EVENT = "textareaMessage";

const useTextareaChat = (roomId) => {
    const [textareaValue, setTextareaValue] = useState({value: '', me: true})

    const socketRef = useRef();

    useEffect(() => {
        socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
            query: {roomId}
        })

        socketRef.current.on(TEXTAREA_MESSAGE_EVENT, (message) => {
            setTextareaValue({value: message.body, me: message.senderId === socketRef.current.id})
        })

        return () => {
            socketRef.current.disconnect()
        }
    }, [roomId])

    const updateTextareaValue = (messageValue) => {
        socketRef.current.emit(TEXTAREA_MESSAGE_EVENT, {
            body: messageValue,
            senderId: socketRef.current.id
        })
    }

    return {textareaValue, updateTextareaValue}

}

export default useTextareaChat