"use client"
import { useForm } from "react-hook-form";
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"; 
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogTitle,
    DialogHeader
}
    from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormLabel,
    FormItem,
    FormMessage
} from '@/components/ui/form'
import { Button } from "@/components/ui/button";
import { Input } from "../ui/input";
// import { useEffect, useState } from "react";
import { FileUpload } from "../file-upload";
import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-modal-store";
import { useEffect } from "react";
const formSchema = z.object({
    name: z.string().min(1, {
        message: "Server name is Required"
    }),
    imageUrl: z.string().min(1, {
        message: "Server image is required"
    })
})
export const CreateServerModal = () => {
    const {onOpen,isOpen,onClose,type}=useModal();
    const router=useRouter() ;
    useEffect(()=>{
        onOpen("createServer",{});
    },[]);
    const isModalOpen=isOpen&&type==="createServer";
    //form 
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            imageUrl: "",
        }
    });
    const isLoading = form.formState.isSubmitting;
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
      try{
         axios.post("/api/servers",values);
         form.reset();
         router.refresh();
         onClose();
      } 
      catch(error){
        console.log(error)
      } 
    }

    const handleClose=()=>{
          form.reset();
          onClose();  
    }
    
    return (
        <Dialog open={isModalOpen} onOpenChange={handleClose}>  
            <DialogContent
                className="bg-white text-black p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="font-bold text-2xl text-center">
                        Cutomize Your Server
                    </DialogTitle>
                    <DialogDescription className="text-center text-black-500">
                        Give your server a personality name and a cool Avatar,you can edit you preferences later through setting.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8 px-6">
                        <div className="space-y-8 px-6">
                            <div className="flex items-center justify-center text-center">
                                <FormField
                                    control={form.control}
                                    name="imageUrl"
                                    render={({field})=>(
                                        <FormItem>
                                            <FormControl>
                                                <FileUpload
                                                    endpoint="serverImage"
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                    >

                                </FormField>
                            </div>
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="font-bold text-xs ">Name Of Server</FormLabel>
                                        <FormControl >
                                            <Input className="bg-zinc-200" placeholder="Enter server" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <DialogFooter className="bg-green-100 px-6 py-4 flex justify-center items-center">
                            <Button variant="primary">
                                Create
                            </Button>
                        </DialogFooter> 
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}