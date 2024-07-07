import { Hash, Menu } from "lucide-react"
import { MobileToggle } from "../mobile-toggle"

interface ChatHeaderProps{
    serverId:string,
    name:string ,
    type:"channel" | "conversation",
    imageUrl?:string
}
export const ChatHeader=async (
    {serverId,
        name,
        type,
        imageUrl    
    }:ChatHeaderProps
)=>{
   return (
    <div className="bg-white dark:bg-zinc-700 flex h-12 text-md font-semibold px-3 items-center border-neutral-200 border-b-2 ">
        <MobileToggle serverId={serverId}/>
        {type==="channel"&&(
            <Hash className="w-5 h-5 text-zinc-500 dark-text-zinc-400 mr-2"/>
        )}
        <p className="font-semibold text-md">
            {name}
        </p>
    </div>
   )
}