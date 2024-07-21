import { currentProfile } from "@/lib/current-profile"
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import NavigationAction from "./navigation-action";

import { ModeToggle } from "../mode-toggle";
import { Separator } from "../ui/separator";
import { ScrollArea } from "../ui/scroll-area";
import { NavigationItem } from "./navigation-item";
import { UserButton } from "@clerk/nextjs";
export default async function NavigationSidebar() {
    const profile = await currentProfile();
    if (!profile) {
        return redirect("/");
    }
    const servers = await db.server.findMany({
        where: {
            members: {
                some: {
                    profileId: profile.id
                }
            }
        }
    });

    return (
        <div className="bg-zinc-600 dark:bg-zinc-950 text-primary w-full h-full flex-col space-y-4 py-3">
            <NavigationAction />
            <Separator
                className="h-[2px] bg-zinc-400 w-10 dark:bg-zinc-400 rounded-md mx-auto"
            />
            <ScrollArea
                className="w-full flex flex-col items-center space-y-4 overflow-y-auto">
                {servers.map((server) => (
                    <div key={server.id} className="mb-4 mx-auto text-center">
                        <NavigationItem
                            id={server.id}
                            name={server.name}
                            imageUrl={server.imageUrl} />
                    </div>
                ))}
            </ScrollArea>
            <div className="flex flex-col items-center h-fit  gap-y-4 justify-end" >
                <ModeToggle />
                <UserButton
                    afterSignOutUrl="/"
                    appearance={{
                        elements: {
                            avatarBox: "h-[48px] w-[48px]"
                        }
                    }}
                />
            </div>
        </div>
    )
}   