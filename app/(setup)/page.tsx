// import { Button } from "@/components/ui/button";
// import { UserButton } from "@clerk/nextjs";
// import { ModeToggle } from "@/components/mode-toggle";
// export default function Home() {
//   return ( 
//     <div className="flex flex-col">
//       <UserButton
//       afterSignOutUrl="/sign-in"
//       />
//       <ModeToggle/>
//     </div>
//   );
// }
import { CreateServerModal } from "@/components/modals/create-server-modal";
import { db } from "@/lib/db";
import { initialProfile } from "@/lib/initial-profile";
import { redirect } from "next/navigation";

const SetUpPage = async () => {
  const profile=await initialProfile();
  console.log(profile);
  // we are checking if the user is a part of any server, if he is then redirect to them o/w ask them to create a ner server
  const server=await db.server.findFirst({
    where:{
      members:{
        some:{
          profileId:profile?.id
        }
      }
    }
  });
  if(server){
     return redirect(`/servers/${server.id}`);
  }
  
  return <CreateServerModal />
}
 
export default SetUpPage;