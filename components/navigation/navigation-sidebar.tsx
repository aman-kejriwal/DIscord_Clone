import { currentProfile } from "@/lib/current-profile"
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import NavigationAction from "./navigation-action";
import { Separator } from "../ui/separator";
import { ScrollArea } from "../ui/scroll-area";
import { NavigationItem } from "./navigation-item";
export default async function NavigationSidebar(){  
    const profile=await currentProfile();
    if(!profile){
        return redirect("/");
    }
    const servers=await db.server.findMany({
        where:{
            members:{
                some:{
                    profileId:profile.id
                } 
            }
        }
    });

return (
    <div className="bg-zinc-700 h-full text-primary w-full flex-col items-center space-y-4 py-3">
      <NavigationAction />
      <Separator
      className="h-[2px] bg-zinc-400 w-10 dark:bg-zinc-700 rounded-md mx-auto"
      />
      <ScrollArea 
       className="w-full h-full flex flex-col items-center space-y-4 overflow-y-auto">
        {servers.map((server) => (
            <div key={server.id} className="mb-4 mx-auto text-center">
                <NavigationItem 
                id={server.id} 
                name={server.name} 
                imageUrl={server.imageUrl}/>
            </div>
        ))}
      </ScrollArea>
    </div>
)
}   