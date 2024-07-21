"use client"

import { Member } from "@prisma/client";
import { ChatWelcome } from "./chat-welcome";
import { useChatQuery } from "@/hooks/use-chat-query";
import { Loader2, ServerCrash } from "lucide-react";
import { ElementRef, Fragment, useEffect, useRef } from "react";
import { MessageWithMemberWithProfile } from "@/types";
import { ChatItem } from "./chat-item";
import { format } from "date-fns";
import { useChatSocket } from "../../hooks/use-chat-socket";
import { useChatScroll } from "@/hooks/use-chat-scroll";
const Date_Format="d MMM yyyy  HH:mm"
interface ChatMessagesProps {
  name: string;
  member: Member;
  chatId: string;
  apiUrl: string;
  socketUrl: string;
  socketQuery: Record<string, string>;
  paramKey: "channelId" | "conversationId";
  paramValue: string;
  type: "channel" | "conversation";
}
export const ChatMessages = (
    {
        name,
        member,
        chatId,
        apiUrl,
        socketUrl,
        socketQuery,
        paramKey,
        paramValue,
        type
    }: ChatMessagesProps
) => {
    const queryKey = `chat:${chatId}`;
    const addKey = `chat:${chatId}:messages`;
    const updateKey =`chat:${chatId}:messages:update`;
  
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        status,
    } = useChatQuery({
        queryKey,
        apiUrl,
        paramKey,
        paramValue
    });
    useChatSocket({
        queryKey,
        addKey,
        updateKey,
      });
      const chatRef=useRef<ElementRef<"div">>(null);
      const bottomRef=useRef<ElementRef<"div">>(null);
      useChatScroll({
        chatRef,
        bottomRef,
        loadMore: fetchNextPage,
        shouldLoadMore: !isFetchingNextPage && !!hasNextPage,
        count: data?.pages?.[0]?.items?.length ?? 0,
      });
    // const scrollRef = useRef<HTMLDivElement>(null);
    
    // useEffect(() => {
    //   if (scrollRef.current) {
    //     scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    //   }
    // }, [data]);
    if (status !== "error" && status !== "success") {
        return (
            <div className="flex flex-col flex-1 justify-center items-center">
                <Loader2 className="h-7 w-7 text-zinc-500 animate-spin my-4" />
                <p className="text-xl text-zinc-500 dark:text-zinc-400">
                    Loading messages....
                </p>
            </div>
        )
    }
    if (status === "error") {
        return (
            <div className="flex flex-col flex-1 justify-center items-center">
                <ServerCrash className="h-7 w-7 text-zinc-500 my-4" />
                <p className="text-xl text-zinc-500 dark:text-zinc-400">
                    Server Not Responding😟
                </p>
            </div>
        )
    }
    return (
        <div ref={chatRef} className="flex-1 flex flex-col py-4 overflow-y-auto">
           {!hasNextPage&& <div className="flex-1"/>}
            {!hasNextPage&&(<ChatWelcome name={name} type={type} />)}
            {hasNextPage&&(
                <div className="flex justify-center">
                    {
                        isFetchingNextPage?(
                            <Loader2 className="h-6 w-6 text-zinc-500 animate-spin my-4" />
                        ):(
                            <button
                            onClick={()=>fetchNextPage()}
                            className="dark:bg-zinc-500/30 dark:hover:bg-black font-semibold  p-1 rounded-md text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 text-xs my-4 dark:hover:text-zinc-300 transition"
                            >
                                Load Previous Messages
                            </button>
                        )
                    }
                </div>
            )}
            <div className="flex flex-col reverse mt-auto dark:text-white">
                {data?.pages?.map((group,i)=>(
                    <Fragment key={i}>
                        {group?.items?.map((message:MessageWithMemberWithProfile) => (
                            <ChatItem 
                            key={message.id}
                            id={message?.id}
                            fileUrl={message.fileUrl}
                            member={message.member}
                            currentMember={member}
                            content={message.content}
                            deleted={message.deleted}
                            timestamp={format(new Date(message?.createdAt),Date_Format)}
                            isUpdated={message.createdAt!==message.updatedAt}
                            socketQuery={socketQuery}
                            socketUrl={socketUrl}
                            />
                        ))}
                    </Fragment>
                ))}
            </div>
            <div ref={bottomRef}/>
        </div>
    )
}