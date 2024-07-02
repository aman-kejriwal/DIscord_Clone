import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
    req:Request,
    {params}:{params:{serverId:string}}
){
    try{
        const profile=await currentProfile();
        if(!profile){
            return new NextResponse("Unauthorized",{status:401});
        }
        const serverId = params.serverId;
        if(!serverId){
            return new NextResponse("serverId Not Found",{status:400});
        }
        const server=await db.server.update({
            where:{
                id:serverId,
                profileId:{
                    not:profile.id
                },
                members:{
                    some:{
                        profileId:profile.id
                    }
                }
            },
            data:{
            members:{
                deleteMany:{
                    profileId:profile.id
                }
            }     
            }
        });
        return NextResponse.json(server);

    }
    catch(err){
        console.log("[leave_Patch]",err);
        return new NextResponse("Internal_error",{status:500});
    }

}