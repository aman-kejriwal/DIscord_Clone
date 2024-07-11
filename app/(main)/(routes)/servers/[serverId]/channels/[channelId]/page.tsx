import { ChatHeader } from "@/components/chat/chat-header";
import { ChatInput } from "@/components/chat/chat-input";
import { currentProfile } from "@/lib/current-profile"
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs/server";
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
    // if (!channel || !member) {
    // redirect(`/servers/${params.serverId}`);
    // }
    return (
        <div className="bg-white dark:bg-zinc-800 flex flex-col h-full w-full">
            <ChatHeader
                name={channel?.name||"Channel Name"}
                type="channel"
                serverId={channel?.serverId||""}
            />
            <div className="flex-1">
                Future Messages
            </div>
                <ChatInput 
                name={channel?.name+""}
                type="channel"
                apiUrl="/api/socket/messages"
                query={{
                    serverId:channel?.serverId,
                    channelId:channel?.id,
                }}
                />
        </div>
    );
}

export default ChannnelIdPage;