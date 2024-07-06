"use client"
import { useForm } from "react-hook-form";
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"; 
import { 
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
 } from "../ui/select";
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
import { FileUpload } from "../file-upload";
import { useParams, useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-modal-store";
import { ChannelType } from "@prisma/client";
import qs from "query-string";
import { useEffect } from "react";
const formSchema = z.object({
    name: z.string().min(1, {
        message: "Channel name is required"
    }).refine(
        name=>name!=="general",
        {
            message:"Channel Name cannot be 'general'"
        }
    ),
    type:z.nativeEnum(ChannelType)
});
export const EditChannelModal = () => {
    const {isOpen,onClose,type,data}=useModal();
    const router=useRouter();
    const isModalOpen=isOpen&&type==="editChannel";
    const {server,channel}=data;
    //form 
    const {channelType}=data;
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            type:channel?.type || ChannelType.TEXT, 
        } 
    });
    useEffect(()=>{
        if(channel){
            form.setValue("name",channel.name);
            form.setValue("type",channel.type);
        }
    },[form,channel]);
    
    const isLoading = form.formState.isSubmitting;
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
      try{
        const url=qs.stringifyUrl({
            url:`/api/channels/${channel?.id}`,
            query:{
                serverId:server?.id
            }
        });
        await axios.patch(url,values);
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
                      Edit Channel
                    </DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8 px-6">
                        <div className="space-y-8 px-6">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="font-bold text-xs ">New Name</FormLabel>
                                        <FormControl >
                                            <Input className="bg-zinc-200" placeholder="Enter server" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                             control={form.control}
                             name="type"
                             render={({ field }) => (
                                 <FormItem>
                                     <FormLabel className="font-bold text-xs">Channel Type</FormLabel>
                                     <Select
                                      disabled={isLoading}
                                      defaultValue={field.value}
                                      onValueChange={field.onChange}
                                     >
                                     <FormControl>
                                        <SelectTrigger className="bg-zinc-300/50 border-0 focus:ring-0 text-black ring-offset-0 focus:ring-offset-0 capitalize outline-none">
                                            <SelectValue placeholder={"Select a Channel type"}/>
                                        </SelectTrigger>
                                     </FormControl>
                                     <SelectContent>
                                        {
                                            Object.values(ChannelType).map((type)=>(
                                                <SelectItem 
                                                key={type}
                                                value={type}>
                                                    {type}
                                                </SelectItem>
                                            ))
                                        }
                                        {/* <SelectItem value="text">TEXT</SelectItem>
                                        <SelectItem value="voice">AUDIO</SelectItem>
                                        <SelectItem value="category">VIDEO</SelectItem> */}
                                     </SelectContent>
                                     </Select>
                                     <FormMessage/>
                                 </FormItem>
                             )}/>
                        </div>
                        <DialogFooter className="bg-green-100 px-6 py-4 flex justify-center items-center rounded-xl">
                            <Button variant="primary">
                                Save
                            </Button>
                        </DialogFooter> 
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}