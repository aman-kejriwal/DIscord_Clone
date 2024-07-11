"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem
} from "../ui/form";
import { Plus, Smile } from "lucide-react";
import axios from "axios";
import qs from "query-string";
import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-modal-store";
import { EmojiPicker } from "../emoji-picker";

interface ChatInputProps {
    apiUrl: string;
    query: Record<string, any>;
    name: string;
    type: "conversation" | "channel";
}

const formSchema = z.object({
    content: z.string().min(1),
});

export const ChatInput = ({ apiUrl, query, name, type }: ChatInputProps) => {
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            content: "",
        }
    });
    const { onOpen } = useModal();
    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const url = qs.stringifyUrl({
                url: apiUrl,
                query
            });
            await axios.post(url, values);
            form.reset();
            router.refresh();
        } catch (err) {
            console.log("[ChatInput]", err);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <div className="relative p-4 pb-6 flex justify-center items-center">
                                    <button
                                        type="button"
                                        onClick={() => onOpen("messageFile", { apiUrl, query })}
                                        className="absolute left-8 h-[32px] w-[32px] bg-zinc-500 dark:bg-zinc-400 hover:bg-zinc-600 dark:hover:bg-zinc-300 rounded-full flex items-center justify-center text-zinc-600"
                                    >
                                        <Plus className="text-white" />
                                    </button>
                                    <input
                                        disabled={isLoading}
                                        placeholder={`Messages ${type === "conversation" ? name : "#" + name}`}
                                        {...field}
                                        className="font-serif text-xl px-14 py-6 bg-zinc-200/90 border-none border-0 focus-visible:ring-0 items-center w-full focus-visible:ring-offset-0"
                                    />
                                    <div className="absolute h-8 w-8 right-10">
                                        <EmojiPicker onChange={(emoji: string) => field.onChange(`${field.value}${emoji}`)} />
                                    </div>
                                </div>
                            </FormControl>
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    );
};
