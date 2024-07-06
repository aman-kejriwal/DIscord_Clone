import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { MemberRole } from "@prisma/client";
import { useParams } from "next/navigation";
import { NextResponse } from "next/server";

export async function PATCH(
    req: Request,
    { params }: { params: { channelId: string } }
) {
    try {
        const profile = await currentProfile();
        const {name,type}=await req.json();
        const { searchParams } = new URL(req.url);
        const serverId = searchParams.get("serverId");

        if (!profile) {
            return new NextResponse("Unauthorised User", { status: 401 });
        }
        if (!serverId) {
            return new NextResponse("ServerId is Missing", { status: 400 });
        }
        if (!params.channelId) {
            return new NextResponse("ChannelId is Missing", { status: 400 });
        }
        if(name==="general"){
            return new NextResponse("Name cannot be 'General'",{status:400});
        }
        const server = await db.server.update({
            where: {
                id: serverId,
                members: {
                    some: {
                        profileId:profile.id,
                        role:{
                            in:[MemberRole.ADMIN ,MemberRole.MODERATOR]
                        }
                    }
                }
            },
            data: {
                channels: {
                    update:{
                       where:{
                        id:params.channelId,
                        name:{
                            not:"general"
                        }
                       },
                       data:{
                        name,
                        type
                       }
                    }
                }
            }
        });
        return NextResponse.json(server);
    }
    catch (err) {
        console.log("[ChannelId_DELETE]", err);
        return new NextResponse("Internal Error", { status: 500 });
    }

}

export async function DELETE(
    req: Request,
    { params }: { params: { channelId: string } }
) {
    try {
        const profile = await currentProfile();
        const { searchParams } = new URL(req.url);
        const serverId = searchParams.get("serverId");

        if (!profile) {
            return new NextResponse("Unauthorised User", { status: 401 });
        }
        if (!serverId) {
            return new NextResponse("ServerId is Missing", { status: 400 });
        }
        if (!params.channelId) {
            return new NextResponse("ChannelId is Missing", { status: 400 });
        }
        const server = await db.server.update({
            where: {
                id: serverId,
                members: {
                    some: {
                        profileId:profile.id,
                        role:{
                            in:[MemberRole.ADMIN ,MemberRole.MODERATOR]
                        }
                    }
                }
            },
            data: {
                channels: {
                    delete:{
                        id:params.channelId,
                        name:{
                            not:"general"
                        }
                    }
                }
            }
        });
        return NextResponse.json(server);
    }
    catch (err) {
        console.log("[ChannelId_DELETE]", err);
        return new NextResponse("Internal Error", { status: 500 });
    }

}