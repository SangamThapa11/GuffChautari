import { useEffect, useRef } from "react"
import { useSelector } from "react-redux"
import type { RootState } from "../../config/store.config"
import type { UserProfile } from "../../context/AuthContext"
import TopUserDetail from "./TopUserDetail"
import { MessageDetail } from "./MessageDetail"
import SendMessageBox from "./SendMessageBox"

const ChatMessageBox = () => {
    const divRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        if (divRef.current) {
            divRef.current.scrollIntoView({ behavior: "smooth" })
        }
    }, [])

    const activeUser = useSelector((rootState: RootState) => {
        return rootState?.user?.activeUser as unknown as UserProfile
    })
    return (<>
        <div className="w-4/5">
            <div className="flex flex-col h-full bg-linear-to-t from-sky-500 to-indigo-500">
                {/* Header with user profile */}
                {
                    activeUser ? <>
                        <TopUserDetail/>
                        {/* Messages area */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                           <MessageDetail />
                            <div ref={divRef}></div>
                        </div>


                        {/* Message input */}
                        <SendMessageBox/>
                    </> : <>
                        <div className="w-full h-100 flex text-center items-center text-2xl font-bold font-serif justify-center">Please select some users</div>
                    </>
                }
            </div>
        </div>

    </>)
}

export default ChatMessageBox