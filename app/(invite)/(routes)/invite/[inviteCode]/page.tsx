import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";


interface InviteCodePageProps{
   params:{
    inviteCode:string
   }
}
const InviteCodepage = async ({
    params
}:InviteCodePageProps) => {
    const profile=await  currentProfile();
    if(!profile){
       redirectToSignIn();
    }
    if(!params.inviteCode){
        redirect("/");
    }
    const existingServer=await db.server.findFirst({
        where:{
            inviteCode:params.inviteCode,
            members:{
                some:{
                    profileId:params.inviteCode,
                }
            }
        }    
    });
    if(existingServer){
        redirect(`/server/${existingServer.id}`)
    }

    // const server=await db.server.update({
    //     where:{
    //         inviteCode:params.inviteCode
    //     },
    //     data:{
    //         members:{
    //             create:[
    //                 {
    //                 profileId:profile?.id
    //                 }
    //             ]
    //         }
    //     }
    // });
    return ( 
        <div>
            InviteCode is Here
        </div>
     );
}
 
export default InviteCodepage;