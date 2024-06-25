import { Plus } from "lucide-react"
import { ActionTooltip } from "../action-tooltip"
export default async function NavigationAction() {
    return (
        <div>
            <ActionTooltip 
            side="right"
            align="center"
            label="Add a server"
            >
                <button className="group">
                    <div className="flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden items-center justify-center bg-zinc-500 bg-background dark:bg-neutral-700 group-hover:bg-emerald-500">

                        <Plus className="group-hover:text-white transition text-emerald-400">
                        </Plus>
                    </div>
                </button>
            </ActionTooltip>
        </div>
    )
}