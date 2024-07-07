"use client"

import { cn } from "@/lib/utils"
import { Channel, ChannelType, MemberRole, Server } from "@prisma/client"
import { Edit, Hash, Lock, Mic, Trash, Video } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { ActionTooltip } from "../action-tooltip"
import { useModal } from "@/hooks/use-modal-store"
interface ServerChannelProps {
    channel: Channel
    server: Server
    role: MemberRole
}

const iconMap = {
    [ChannelType.TEXT]: Hash,
    [ChannelType.AUDIO]: Mic,
    [ChannelType.VIDEO]: Video,
}

const ServerChannel = (
    { channel, server, role }: ServerChannelProps
) => {
    const params = useParams();
    const router = useRouter();
    const Icon = iconMap[channel.type];
    const onClickFunc=()=>{
        router.push(`/servers/${params?.serverId}/channels/${channel?.id}`);
    }
    const {onOpen}=useModal();
    return (
        <button
        className={cn(
            "group mx-2 px-2 py-3 rounded-md flex items-center hover:bg-zinc-700/20 w-full",
            params.channelId === channel.id && "bg-zinc-700/20 dark:bg-zinc-700"
        )}
         onClick={onClickFunc}
        >
            <Icon className="flex-shrink-0 w-5 h-5 text-zinc-500 dark:text-zinc-400" />
            <p className={cn("line-clamp-1 font-semibold text-xs text-zinc-500 px-2 group-hover:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc-300 transition",
                params?.channelId === channel.id && "text-primary dark:text-zinc-200"
            )}
            >{channel.name}
            </p>
            {channel.name !== "general" && role !== MemberRole.GUEST && (
                <div className="ml-auto flex items-center gap-x-2" >
                    <ActionTooltip label="Edit" side={"top"} align={"end"}>
                        <Edit className="group-hover:block hidden w-4 h-4 text-zinc-500"
                        onClick={()=>onOpen("editChannel",{server,channel})}/>
                    </ActionTooltip>
                    <ActionTooltip label="Trash" side={"top"} align={"end"}>
                        <Trash className="group-hover:block hidden w-4 h-4 text-zinc-500" 
                         onClick={()=>{
                            onOpen("deleteChannel",{server,channel})
                         }}/>
                    </ActionTooltip>
                </div>
            )}
            {channel.name === "general" && (
                <Lock className="ml-auto w-4 h-4 text-zinc-500 dark:text-zinc-400 flex justify-end" />
            )}
        </button>
    );
}

export default ServerChannel;