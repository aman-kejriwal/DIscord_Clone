"use client"
import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogHeader,
    DialogDescription
}
    from "@/components/ui/dialog";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuTrigger,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger

} from "../ui/dropdown-menu";
import { useModal } from "@/hooks/use-modal-store";
import { ServerWithMembersWithProfiles } from "@/types";
import { ScrollArea } from "../ui/scroll-area";
import UserAvatar from "../user-avatar";
import {
    Gavel, Shield,
    ShieldQuestion,
    ShieldCheck,
    ShieldAlert,
    MoreVertical,
    Check,
    Loader2
} from "lucide-react";
import { ChannelType, MemberRole } from "@prisma/client";
import axios from "axios";
import qs from "query-string";
import { useRouter } from "next/navigation";
import { METHODS } from "http";
import { NextResponse } from "next/server";
const roleIconMap = {
    "GUEST": null,
    "MODERATOR": <ShieldCheck className="h-4 w-4 ml-2 text-indigo-500" />,
    "ADMIN": <ShieldAlert className="h-4 w-4 text-rose-500" />
}
export const MembersModal = () => {
    const { onOpen, isOpen, onClose, type, data } = useModal();
    const [LoadingId, setLoadingId] = useState("");
    const isModalOpen = isOpen && type === "members";
    //serverId
    const { server } = data as { server: ServerWithMembersWithProfiles };
    const membersCount = server?.members?.length || 0;
    const memberLabel = membersCount > 1 ? (membersCount + " Members") : (membersCount == 0) ? "No Members" : "1 Member";
    const router = useRouter();
    const onKick = async (memberId: string) => {
        try {
            setLoadingId(memberId);
            const url = qs.stringifyUrl({
                url: `/api/members/${memberId}`,
                query: {
                    serverId: server?.id,
                }
            })
            const res=await axios.delete(url);
            router.refresh();
            onOpen("members",{server:res.data});
        }
        catch (err) {
            console.log(err);
        }
        finally {
            setLoadingId("");
        }
    }
    const onRoleChange = async (memberId: string, role: MemberRole) => {
        try {
            setLoadingId(memberId);
            const url = qs.stringifyUrl({
                url: `/api/members/${memberId}`,
                query: {
                    serverId: server?.id
                }
            });
            const res = await axios.patch(url, { role });
            router.refresh();
            onOpen("members", { server: res.data });
        }
        catch (err) {
            console.log(err)
        }
        finally {
            setLoadingId("");
        }
    }
    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent
                className="bg-white text-black p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="font-bold text-2xl text-center">
                        Manage Members
                    </DialogTitle>
                    <DialogDescription className=" text-center text-zinc-600">
                        {memberLabel}
                    </DialogDescription>
                </DialogHeader>
                <ScrollArea className="mt-8 max-h-[420px] pr-6">
                    {server?.members?.map((member) => {
                        return <div key={member?.id} className="flex items-center gap-x-2 mb-6 pl-6">
                            <UserAvatar src={member.profile.imageUrl} className="" />
                            <div className="pl-1">
                                <div className=" flex justify-start     text-xs text-black font-semibold">{member.profile.name}
                                </div>
                                <p className="text-xs text-zinc-500">{member.profile.email}</p>
                            </div>
                            {roleIconMap[member.role]}
                            {server.profileId !== member.profileId && LoadingId !== member.id &&
                                (<div className="ml-auto text-stone-900">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger>
                                            <MoreVertical
                                                className="h-4 w-4"
                                            />
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent side="left">
                                            <DropdownMenuSub>
                                                <DropdownMenuSubTrigger
                                                    className="flex items-center">
                                                    <ShieldQuestion className="h-4 w-4 mr-2" />
                                                    <span>Role</span>
                                                </DropdownMenuSubTrigger>
                                                <DropdownMenuPortal>
                                                    <DropdownMenuSubContent>
                                                        <DropdownMenuItem
                                                            onClick={() => onRoleChange(member.id, "GUEST")}>
                                                            <Shield className="h-4 w-4 mr-2" />
                                                            GUEST
                                                            {member.role === "GUEST" && (
                                                                <Check className="w-4 h-4 ml-auto" />
                                                            )}
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem
                                                            onClick={() => onRoleChange(member.id, "MODERATOR")}>
                                                            <ShieldCheck className="h-4 w-4 mr-2" />
                                                            MODERATOR
                                                            {member.role === "MODERATOR" && (
                                                                <Check className="w-4 h-4 ml-auto" />
                                                            )}
                                                        </DropdownMenuItem>
                                                    </DropdownMenuSubContent>
                                                </DropdownMenuPortal>
                                            </DropdownMenuSub>
                                            <DropdownMenuSeparator />
                                                <DropdownMenuItem
                                                onClick={()=>onKick(member.id)}>
                                                    <Gavel className="h-4 w-4 mr-2" />
                                                    Kick
                                                </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                                )}
                            {LoadingId === member.id && (
                                <Loader2
                                    className="animate-spin text-zinc-500 ml-auto w-4 h-4" />
                            )}
                        </div>
                    })}
                </ScrollArea>

            </DialogContent>
        </Dialog>
    )
}