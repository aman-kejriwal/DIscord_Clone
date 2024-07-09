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
const MemberIdPage =  async ({
    params
}:MemerIdPageProps) => {
    const profile=await currentProfile()
    if(!profile){
        redirectToSignIn();
    }
    const currentMember=await db.member.findFirst({
        where: {
            profileId:profile?.id,
            serverId:params.serverId
        },
        include:{
            profile:true
        }
    });
    if(!currentMember){
        return redirect("/");
    }
    const conversation=await getOrCreateConversation(currentMember.id,params.memberId);

    if(!conversation){
        return redirect(`/server/${params.serverId}`);
    }
    const {MemberOne,MemberTwo}= conversation;
    const otherMember=MemberOne.profileId==profile?.id;
    return (
        <div>
            MemberId page is here!
        </div>
    );
}

export default MemberIdPage;;