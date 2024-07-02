"use client"

import { CreateChannelModal } from "@/components/modals/create-channel-modal";
//This Modal is to remove the hydration error
import { CreateServerModal } from "@/components/modals/create-server-modal"
import { EditServerModal } from "@/components/modals/edit-server-modal";
import { InviteModal } from "@/components/modals/invite-modal";
import { MembersModal } from "@/components/modals/members-modal";
import { useEffect, useState } from "react"

export const ModalProvider=()=>{
    const [isMounted,setIsMounted]=useState(false);
    useEffect(()=>{
        setIsMounted(true)
    },[])
    
    if(!isMounted)
        return null;
    return(
        <>
           <CreateChannelModal/>
           <MembersModal />
           <InviteModal/>   
           <EditServerModal/>
           <CreateServerModal/>
        </>
    )
}