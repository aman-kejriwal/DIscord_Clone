import { currentProfilePages } from "@/lib/current-profile-pages";
import { db } from "@/lib/db";
import { NextApiResponseServerIo } from "@/types";
import { NextApiRequest } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponseServerIo
) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }
    try {
        const profile = await currentProfilePages(req);
        const { content, fileUrl } = req.body;
        const { serverId, channelId } = req.query;
        if (!profile) {
            res.status(401).json({ message: "Unauthorized User" });
        }
        if (!serverId)
            res.status(400).json({ message: "ServerId is Missing" });
        if (!channelId) {
            res.status(400).json({ message: "ChannelId is Missing" });
        }
        if (!content) {
            res.status(400).json({ message: "Content is Missing" });
        }

        const server = await db.server.findFirst({
            where: {
                id: serverId as string,
                members: {
                    some: {
                        profileId: profile?.id
                    }
                }
            },
            include: {
                members: true,
            }
        });
        if (!server) {
            return res.status(404).json({ message: "server not found" });
        }

        const channel = await db.channel.findFirst({
            where: {
                id: channelId as string,
                serverId: serverId as string
            }
        });
        if (!channel) {
            return res.status(404).json({ message: "channel not found" });
        }

        const member = server.members.find((member) => profile?.id === member.id);
        if (!member) {
            return res.status(404).json({ message: "message not found" });
        }
        
        const message = await db.message.create({
            data: {
                content,
                fileUrl,
                channelId: channel.id,
                memberId: member.id,
            },
            include: {
                member: {
                    include: {
                        profile: true
                    }
                }
            }
        });
        const channelKey=`chat:${channelId}:messages`;
        res?.socket?.server?.io?.emit(channelKey,message);
        return res.status(200).json(message);
    }
    catch (err) {
        console.log("[Messages_POST]", err);
        return res.status(500).json({ Messages: "internal Error" });
    }
}