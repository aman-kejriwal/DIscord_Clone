"use client"

import Image from "next/image"
import { useRouter,useParams } from "next/navigation"

import { cn } from "@/lib/utils"
import { ActionTooltip } from "../action-tooltip"
interface NavigationItemProps{
    id:string;
    imageUrl:string;
    name:string;
}

export const NavigationItem=({
    id,imageUrl,name
}:NavigationItemProps)=>{
    const params=useParams();
    const router=useRouter();

    const onClick=()=>{
        router.push(`/servers/${id}`);
    }
    return(
        <ActionTooltip
        side="right"
        align="center"
        label={name}
        >
          <button onClick={onClick}
            className="group relative flex items-center">
                <div className={cn("rounded-r-full w-[4px] absolute left-0 bg-primary transition-all bg-white",
                    params?.serverId!==id&&"group-hover:h-[20px]",
                    params?.serverId===id?"h-[36px]":"h-[8px]",
                )}
                >
                </div>
                <div className={
                    cn(
                        "relative group flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden",
                        params?.serverId!==id&&"bg-primary/10 text-primary rounded-[16px]"
                    )
                }>
                    <Image
                    fill
                    src={imageUrl}
                    alt="Channel"
                    />
                </div>
          </button>
        </ActionTooltip>
    )
}