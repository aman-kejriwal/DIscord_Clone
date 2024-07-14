"use client" 
import { useEffect, useState } from "react";
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
import qs from "query-string";
export const DeleteMessageModal = () => {
    const {onOpen,isOpen,onClose,type,data}=useModal();
    const isModalOpen=isOpen&&type==="deleteMessage";  
    //serverId
    const {apiUrl,query}=data;
    const [isLoading,setIsLoading]=useState(false);
     const onClick= async ()=>{
        try{
            setIsLoading(true);
            const url=qs.stringifyUrl({
                url:apiUrl||"",
                query:query,
            })
            const res=await axios.delete(url);
            onClose(); 

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
                <DialogHeader className="pt-8 px-6 flex justify-center">
                    <DialogTitle className="font-bold text-2xl text-center">
                        Delete Message
                    </DialogTitle>
                    <DialogDescription className="font-semibold text-black">
                        Confirm if you want to delete the Message
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
                    className="bg-rose-600 hover:bg-rose-500"
                    >   
                        Confirm
                    </Button>
                </div>    
              </DialogFooter>
            </DialogContent>
        </Dialog>

    )
}