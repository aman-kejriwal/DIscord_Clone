"use client"

import { PopoverContent, PopoverTrigger } from "./ui/popover";
import { Popover } from "./ui/popover";
import { Smile } from "lucide-react";
import Picker from "@emoji-mart/react"
import data from "@emoji-mart/data"
import { useTheme } from "next-themes";
interface EmojiPickerProps {
    onChange: (value: string) => void;
}
export const EmojiPicker = ({
    onChange
}: EmojiPickerProps) => {
    const {resolvedTheme} = useTheme();
    return (
        <Popover>
            <PopoverTrigger>
                <Smile className="dark:text-zinc-400 dark:hover:text-inc-300 text-black  hover:text-zinc-500 transition" />
            </PopoverTrigger>
            <PopoverContent
                side="right"
                sideOffset={40}
                className="bg-transparent border=-none shadow-none drop-shadow-none mb-16"
            >
                <Picker
                    theme={resolvedTheme}
                    data={data}
                    onEmojiSelect={(emoji: any) => onChange(emoji.native)}
                />
            </PopoverContent>
        </Popover>
    )
}