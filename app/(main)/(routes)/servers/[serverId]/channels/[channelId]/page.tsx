import { ChatHeader } from "@/components/chat/chat-header";
import { ChatInput } from "@/components/chat/chat-input";
import { ChatMessages } from "@/components/chat/chat-messages";
import MediaRoom from "@/components/media-room";
import { currentProfile } from "@/lib/current-profile"
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs/server";
import { ChannelType, Member } from "@prisma/client";
import { redirect } from "next/navigation";

interface ChannelIdPageProps {
    params: {
        channelId: string,
        serverId: string
    }
}
const ChannnelIdPage = async (
    { params }: ChannelIdPageProps
) => {
    const profile = await currentProfile();
    if (!profile) {
        return redirectToSignIn();
    }
    const channel = await db.channel.findUnique({
        where: {
            id: params.channelId
        }
    });
    const member = await db.member.findFirst({
        where: {
            id: params.serverId,
            profileId: profile.id
        }
    });
    return (
        <div className="bg-white dark:bg-zinc-800/10 flex flex-col h-full w-full">
            <ChatHeader
                name={channel?.name || "Channel Name"}
                type="channel"
                serverId={channel?.serverId || ""}
            />
            {channel?.type === ChannelType.TEXT && (
                <>
                    <ChatMessages
                        member={member as Member}
                        name={channel?.name + ""}
                        chatId={channel?.id + ""}
                        type="channel"
                        apiUrl="/api/messages"
                        socketUrl="/api/socket/messages"
                        socketQuery={{
                            channelId: channel?.id + "",
                            serverId: channel?.serverId + ""
                        }}
                        paramKey="channelId"
                        paramValue={channel?.id + ""}
                    />
                    <ChatInput
                        name={channel?.name + ""}
                        type="channel"
                        apiUrl="/api/socket/messages"
                        query={{
                            serverId: channel?.serverId,
                            channelId: channel?.id,
                        }}
                    />
                </>
            )}
            {channel?.type===ChannelType.VIDEO &&(
                <MediaRoom 
                chatId={channel.id}
                audio={false}
                video={true}
                />
            )}
            {channel?.type===ChannelType.AUDIO &&(
                <MediaRoom 
                chatId={channel.id}
                audio={true}
                video={false}
                />
            )}
        </div>
    );
}

export default ChannnelIdPage;