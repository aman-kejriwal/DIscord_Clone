"use client"

import { ServerWithMembersWithProfiles } from "@/types"
import { ChannelType, MemberRole } from "@prisma/client"
import { ActionTooltip } from "../action-tooltip"
import { Plus, Settings } from "lucide-react"
import { useModal } from "@/hooks/use-modal-store"
import { CreateChannelModal } from "../modals/create-channel-modal"
interface ServerSectionProps {
    label: string,
    role: MemberRole,
    selectionType: "channels" | "members",
    channelType: ChannelType,
    server: ServerWithMembersWithProfiles,
}

export const ServerSection = ({
    label,
    role,
    selectionType,
    channelType,
    server
}: ServerSectionProps) => {
    const { onOpen } = useModal();
    return (
        <div className="hover:text-black flex items-center justify-between py-2 px-2 hover:bg-zinc-700/10 transitio">
            <p className="text-[15px] group-hover:text-black text-zinc-500 dark:text-zinc-400 uppercase font-semibold ">
                {label}
            </p>
            {role !== MemberRole.GUEST && selectionType == "channels" && (
                <ActionTooltip label="Create Channel" side={"top"} align={"start"}>
                    <button
                        onClick={() => onOpen("createChannel", { channelType })}
                        className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 py-1 rounded-md">
                        <Plus className=" hover:zinc-700/50 w-6 h-6" />
                    </button>
                </ActionTooltip>
            )}
            {role === MemberRole.ADMIN && selectionType == "members" && (
                <ActionTooltip label="Manage Members" side={"top"} align={"start"}>
                    <button
                        onClick={() => onOpen("createChannel", {})}
                        className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 ">
                        <Settings className=" hover:zinc-700/50 w-6 h-6" />
                    </button>
                </ActionTooltip>
            )}
        </div>
    )
}