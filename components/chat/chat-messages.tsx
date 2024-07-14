"use client"

import { Member } from "@prisma/client";
import { ChatWelcome } from "./chat-welcome";
import { useChatQuery } from "@/hooks/use-chat-query";
import { Loader2, ServerCrash } from "lucide-react";
import { Fragment, useEffect, useRef } from "react";
import { MessageWithMemberWithProfile } from "@/types";
import { ChatItem } from "./chat-item";
import { format } from "date-fns";
const DATE_FORMAT = "d MMM yyyy HH:mm";

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

export const ChatMessages = ({
  name,
  member,
  chatId,
  apiUrl,
  socketUrl,
  socketQuery,
  paramKey,
  paramValue,
  type,
}: ChatMessagesProps) => {
  const queryKey = `chat:${chatId}`;
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
    paramValue,
  });

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [data]);

  if (status !== "error" && status !== "success") {
    return (
      <div className="flex flex-col flex-1 justify-center items-center">
        <Loader2 className="h-7 w-7 text-zinc-500 animate-spin my-4" />
        <p className="text-xl text-zinc-500 dark:text-zinc-400">
          Loading messages....
        </p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="flex flex-col flex-1 justify-center items-center">
        <ServerCrash className="h-7 w-7 text-zinc-500 my-4" />
        <p className="text-xl text-zinc-500 dark:text-zinc-400">
          Server Not Responding😟
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col py-4 overflow-y-scroll" ref={scrollRef}>
      <div className="flex-1">
        <ChatWelcome name={name} type={type} />
      </div>
      <div className="flex flex-col reverse mt-auto dark:text-white">
        {data?.pages?.map((group, i) => (
          <Fragment key={i}>
            {group?.items?.map((message: MessageWithMemberWithProfile) => (
              <ChatItem
                key={message.id}
                id={message?.id}
                fileUrl={message.fileUrl}
                member={message.member}
                currentMember={member}
                content={message.content}
                deleted={message.deleted}
                timestamp={format(new Date(message?.createdAt), DATE_FORMAT)}
                isUpdated={message.createdAt !== message.updatedAt}
                socketQuery={socketQuery}
                socketUrl={socketUrl}
              />
            ))}
          </Fragment>
        ))}
      </div>
    </div>
  );
};
