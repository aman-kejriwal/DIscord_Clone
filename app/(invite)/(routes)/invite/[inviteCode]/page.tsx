import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

interface InviteCodePageProps{
   params:{
     inviteCode:string
   }
}
const InviteCodepage = async ({
    params
}:InviteCodePageProps) => {
    const profile=await currentProfile();
    if(!profile){
        auth().redirectToSignIn();
    }
    if(!params.inviteCode){
        redirect("/");
    }
    //you are already a member of the inviteCode
    const existingServer=await db.server.findFirst({
        where:{
            inviteCode:params.inviteCode,
            members:{
                some:{
                    profileId:profile?.id,
                }
            }
        }    
    });
    if(existingServer){
        redirect(`/servers/${existingServer.id}`)
    }

    //Updating the server with Adding the GUEST through the given InviteCode
    const server=await db.server.update({
        where:{
            inviteCode:params.inviteCode,
        },
        data:{
            members:{
                create:[
                    {
                     profileId:profile?.id+""
                    }
                ]
            }
        }
    });
    if(server){
        return redirect(`/servers/${server.id}`);
    }
    return null;
}
 
export default InviteCodepage;