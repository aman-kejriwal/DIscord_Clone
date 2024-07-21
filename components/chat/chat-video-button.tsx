"use client"

import qs from "query-string"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Video, VideoOff } from "lucide-react"

import { ActionTooltip } from "../action-tooltip"
import { useState } from "react"

export const ChatVideoButton = () => {
    const router = useRouter();
    const pathname = usePathname();
    // const [searchParams]=useSearchParams();
    const [isVideo, setIsVideo] = useState(false);
    const Icon = isVideo ?Video:VideoOff;
    const toolTipLabel=isVideo?"End the Video Call":"Start a Video Call"
    return (
        <ActionTooltip label={toolTipLabel} side={"top"} align={"end"}>
            <button>
                <Icon className="dark:text-white mr-5"/>
            </button>
        </ActionTooltip>
    )

}