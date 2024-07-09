"use client" 
import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogHeader,
    DialogDescription,
    DialogFooter,
}
    from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-modal-store";
import { Button } from "../ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
export const LeaveServerModal = () => {
    const {onOpen,isOpen,onClose,type,data}=useModal();
    const isModalOpen=isOpen&&type==="leaveServer";  
    //serverId
    const {server}=data;
    const [isLoading,setIsLoading]=useState(false);
    const router=useRouter();
     const onClick= async ()=>{
        try{
            setIsLoading(true);
            const res=await axios.patch(`/api/servers/${server?.id}/leave`);
            onClose();
            router.push("/");
            router.refresh();
        }   
        catch(err){
            console.log(err);
        }
        finally{
            setIsLoading(false);
        }
     }
    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent
                className="bg-white text-black p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="font-bold text-2xl text-center">
                        Leave Server
                    </DialogTitle>
                    <DialogDescription className="text-zinc-800">
                        Are you sure you want to leave <span className="font-semibold">
                            {server?.name}
                        </span>
                    </DialogDescription>
                </DialogHeader>
              <DialogFooter className="bg-gray-100 px-6 py-4">
                <div className="flex items-center justify-between w-full">
                    <Button
                    disabled={isLoading}
                    onClick={()=>onClose()}
                    variant="ghost"
                    >   
                        Cancel
                    </Button>
                    <Button
                    disabled={isLoading}
                    variant="primary"
                    onClick={()=>onClick()}
                    >   
                        Confirm
                    </Button>
                </div>    
              </DialogFooter>
            </DialogContent>
        </Dialog>

    )
}