"use client"

import { Search } from "lucide-react"
import { useEffect, useState } from "react"
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Dialog } from "../ui/dialog"
import { useRouter, useParams } from "next/navigation"
interface ServerSearchProps {
    data: {
        label: string,
        type: "channel" | "member",
        data: {
            icon: React.ReactNode,
            name: string,
            id: string
        }[] | undefined
    }[]
}
const ServerSearch = ({
    data
}: ServerSearchProps) => {

    const [open, setOpen] = useState(false);
    const router = useRouter();
    const params = useParams();
    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key == "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen(open => !open)
            }
        }
        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down)
    }, []);
    function onClick({ id, type }: { id: string, type: "channel" | "member" }) {
        setOpen(false);
        if (type === 'channel') {
            router.push(`/servers/${params.serverId}/channels/${id}`)
        }
        if(type==="member"){
            router.push(`/servers/${params.serverId}/conversations/${id}`)
        }
    }

    return (
        <div className="">

            <button
                onClick={() => setOpen(true)}
                className="text-zinc-500 dark:hover:bg-zinc-700/50 w-full rounded-md m-1 mr-2 hover:bg-zinc-700/10  flex items-center justify-between transition">
                <div className=" flex group p-2 items-center justify-between  gap-x-2">
                    <Search className="w-4 h-4 " />
                    <p
                        className="font-semibold py-3">
                        Search
                    </p>
                </div>
                <kbd>
                    <span className="pr-3 font-semibold font-sans">
                        Ctrl+K
                    </span>
                </kbd>
            </button>
            <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput placeholder="Search all Channels and members" />
                <CommandList>
                    <CommandEmpty>
                        No result found
                    </CommandEmpty>
                    {data.map(({ label, type, data }) => {
                        if (!data?.length) return null;
                        return (
                            <CommandGroup key={label} heading={label}>
                                {data.map(({ id, icon, name }) => {
                                    return (
                                        <CommandItem key={id} onSelect={()=>onClick({id,type})}>
                                            {icon}
                                            <span>{name}</span>
                                        </CommandItem>
                                    )
                                })}
                            </CommandGroup>
                        )
                    })}
                </CommandList>
            </CommandDialog>
        </div>
    );
}
export default ServerSearch;