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
import { useModal } from "@/hooks/use-modal-store";
import { useOrigin } from "@/hooks/use-origin";
import { ServerWithMembersWithProfiles } from "@/types";
import { ScrollArea } from "../ui/scroll-area";
import UserAvatar from "../user-avatar";
import { ShieldCheck,ShieldAlert } from "lucide-react";
const roleIconMap={
    "GUEST":null,
    "MODERATOR":<ShieldCheck className="h-4 w-4 ml-2 text-indigo-500"/>,
    "ADMIN":<ShieldAlert className="h-4 w-4 text-rose-500"/>
}
export const MembersModal = () => {
    const {onOpen,isOpen,onClose,type,data}=useModal();
    const isModalOpen=isOpen&&type==="members";  
    //serverId
    const {server}=data as {server:ServerWithMembersWithProfiles};
    const membersCount= server?.members?.length||0;
    const memberLabel=membersCount>1? (membersCount+" Members"): (membersCount==0)? "No Members": "1 Member";
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
                    <ScrollArea className=" mt-8 max-h-[420px] pr-6">
                        {server?.members?.map((member)=>{
                           return <div key={member?.id} className="flex items-center gap-x-2 mb-6">
                                    <UserAvatar src={member.profile.imageUrl} className=""/>  
                                    <span className="text-xs text-black font-semibold">{member.profile.name}
                                        {roleIconMap[member.role]}
                                    </span>

                            </div>
                        })}
                    </ScrollArea>
                </DialogHeader>
                
            </DialogContent>
        </Dialog>
    )
}