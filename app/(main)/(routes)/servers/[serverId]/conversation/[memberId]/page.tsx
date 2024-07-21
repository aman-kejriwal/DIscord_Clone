import { ChatHeader } from "@/components/chat/chat-header";
import { ChatInput } from "@/components/chat/chat-input";
import { ChatMessages } from "@/components/chat/chat-messages";
import { getOrCreateConversation } from "@/lib/conversation";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

interface MemerIdPageProps {
    params: {
        memberId: string,
        serverId: string,
    }
}
const MemberIdPage = async ({
    params
}: MemerIdPageProps) => {
    const profile = await currentProfile()
    if (!profile) {
        redirectToSignIn();
    }
    const currentMember = await db.member.findFirst({
        where: {
            profileId: profile?.id,
            serverId: params.serverId
        },
        include: {
            profile: true
        }
    });
    if (!currentMember) {
        return redirect("/");
    }
    const conversation = await getOrCreateConversation(currentMember.id, params.memberId);

    if (!conversation) {
        return redirect(`/server/${params.serverId}`);
    }
    const { MemberOne, MemberTwo } = conversation;
    const otherMember = MemberOne.profileId === profile?.id ? MemberTwo : MemberOne;

    return (
        <div className="bg-white dark:bg-zinc-800/10 flex flex-col h-full w-full">
            <ChatHeader
                imageUrl={otherMember.profile.imageUrl}
                name={otherMember.profile.name}
                serverId={params.serverId}
                type="conversation"
            />
            <ChatMessages
                member={currentMember}
                name={otherMember.profile.name}
                chatId={conversation.id}
                type="conversation"
                apiUrl="/api/direct-messages"
                paramKey="conversationId"
                paramValue={conversation.id}
                socketUrl="/api/socket/direct-messages"
                socketQuery={{
                    conversationId: conversation.id
                }}

            />
            <ChatInput
                apiUrl="/api/socket/direct-messages"
                query={{
                    conversationId: conversation.id
                }}
                name={otherMember.profile.name}
                type={"conversation"} />
        </div>
    );
}

export default MemberIdPage;;