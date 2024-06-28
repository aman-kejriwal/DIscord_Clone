"use client" 
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogHeader,
}
    from "@/components/ui/dialog";
    import { Label } from "../ui/label";
    import { Input } from "../ui/input";
import { useModal } from "@/hooks/use-modal-store";
import { Button } from "../ui/button";
import { Copy ,RefreshCw} from "lucide-react";
import { useOrigin } from "@/hooks/use-origin";
export const InviteModal = () => {
    const {isOpen,onClose,type}=useModal();
    const isModalOpen=isOpen&&type==="invite";  
    const origin=useOrigin();
    const inviteUse= `${origin}`;
    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent
                className="bg-white text-black p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="font-bold text-2xl text-center">
                        Invite People
                    </DialogTitle>

                </DialogHeader>
                <div className="p-6">
                    <Label className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                        Server Invite link
                    </Label>
                    <div className="flex items-center mt-2 gap-x-2">
                        <Input className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                        value={origin}>
                        </Input>
                        <Button>
                            <Copy  className="w-4 h-4"/>
                        </Button>
                    </div>
                    <Button
                    variant="link"
                    size="sm"
                    className="mt-4 text-zinc-500 dark:text-secondary/70"
                    >
                        Generate new Link
                    <RefreshCw className="w-4 h-4 mx-1"/>
                    </Button>

                </div>
            </DialogContent>
        </Dialog>

    )
}