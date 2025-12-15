import React, { useEffect, useRef, useState } from "react"
import { useAuth, type UserProfile } from "../../context/AuthContext";
import { useSelector } from "react-redux";
import type { RootState } from "../../config/store.config";
import { convertToHumanTime } from "../../utilities/helpers";
import chatService from "../../services/chat.service";
import type { AxiosSuccessResponse } from "../../config/axios.config";
import socket from "../../config/socket.config";

export interface IMessageDetail {
    _id: string;
    sender: UserProfile;
    receiver: UserProfile;
    message: string;
    createdAt: Date | string;
    updatedAt: Date | string;
    _v: number
}
export const MessageDetail = () => {
    const [messages, setMessages] = useState<Array<IMessageDetail>>()
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 0,
        total: 0
    })
    const { loggedInUser } = useAuth()
    const activeUser = useSelector((rootState: RootState) => {
        return rootState?.user?.activeUser as unknown as UserProfile
    })
    const getMessageDetailList = async () => {
        try {
            const response = await chatService.detailChatMessage(activeUser._id, {
                page: 1,
                limit: 100,
                search: null
            }) as unknown as AxiosSuccessResponse
            setMessages(response.data.reverse())
            setPagination({
                ...pagination,
                ...response.options.pagination
            })

        } catch {
            //
        }
    }
    useEffect(() => {
        getMessageDetailList()
    }, [activeUser])
    useEffect(() => {
        const handleMessageReceivedEvent = async () => {
            await getMessageDetailList()
        }
        const handleSelfMessageReceivedEvent = async () => {
            await getMessageDetailList()
        }
        //socket handle
        socket.on("messageReceiver", handleMessageReceivedEvent)
        socket.on("selfMessageReceived", handleSelfMessageReceivedEvent);
        return () => {
            socket.off("messageReceiver", handleMessageReceivedEvent)
            socket.off("selfMessageReceived", handleSelfMessageReceivedEvent)
        }
    }, [])

    const divRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        if (divRef.current) {
            divRef.current.scrollIntoView({ behavior: "smooth" })
        }
    }, [messages])
    return (<>
        {
            messages && messages.map((message: IMessageDetail) => (
                <React.Fragment key={message._id} >
                    {
                        message.receiver._id === loggedInUser?._id ? (<>
                            <div className="flex justify-start gap-3">
                                <img
                                    src={activeUser.image}
                                    alt="User Avatar"
                                    className="w-8 h-8 rounded-full object-cover" />
                                <div>
                                    <div className="bg-linear-to-r/increasing from-indigo-500 to-teal-400 font-sans rounded-lg p-3 max-w-xs shadow-sm">
                                        <p className="text-sm">{message.message}</p>
                                    </div>
                                    <span className="text-xs text-white ml-1">{convertToHumanTime(message.createdAt as string)}</span>
                                </div>

                            </div>
                        </>) : (<>
                            <div className="flex justify-end">
                                <div>
                                    <div className="bg-linear-[25deg,red_5%,yellow_60%,lime_90%,teal] rounded-lg p-3 max-w-xs font-sans">
                                        <p className="text-sm ">{message.message}</p>
                                    </div>
                                    <span className="text-xs text-white ml-1">{convertToHumanTime(message.createdAt as string)}</span>
                                </div>
                                <img src={loggedInUser?.image || ""}
                                    alt="User Avatar"
                                    className="w-8 h-8 rounded-full object-cover" />
                            </div>

                        </>)

                    }

                </React.Fragment>
            ))}
        <div ref={divRef}></div>
    </>)
}