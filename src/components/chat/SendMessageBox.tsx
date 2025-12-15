import { useSelector } from "react-redux"
import { useAuth, type UserProfile } from "../../context/AuthContext"
import type { RootState } from "../../config/store.config"
import { useState } from "react"
import chatService from "../../services/chat.service"
import socket from "../../config/socket.config"

const SendMessageBox = () => {
    const { loggedInUser } = useAuth()
    const selectedUser = useSelector((rootState: RootState) => {
        return rootState?.user?.activeUser as unknown as UserProfile
    })
    const [message, setMessage] = useState<string>("") 

    const sendMessage = async () => {
        
        try {
            const payload = {
                receiver: selectedUser._id,
                message: message.trim()
            } as { receiver: string, message: string }
            await chatService.sendMessage(payload)
            // notify server 
            socket.emit("newMessageSent", { 
                sender: loggedInUser?._id, 
                receiver: selectedUser._id 
            })
            setMessage("")
        } catch {
            // Handle error
        }
    }

    
    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            sendMessage()
        }
    }

    return (<>
        <div className="p-4 bg-blue-950 border-t">
            <div className="flex items-center gap-2">
                <input 
                    type="text"
                    value={message} 
                    onChange={(e) => {
                        setMessage(e.target.value)
                    }}
                    onKeyDown={handleKeyPress} 
                    placeholder="Type your message...."
                    className="flex-1 border bg-white border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
                />
                <button 
                    className="bg-amber-600 hover:bg-amber-800 text-white px-5 py-2 rounded-full font-bold transition disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={sendMessage}
                >
                    Send
                </button>
            </div>
        </div>
    </>)
}
export default SendMessageBox