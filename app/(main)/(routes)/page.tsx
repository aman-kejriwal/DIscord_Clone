// import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { ModeToggle } from "@/components/mode-toggle";
export default function Home() {
  return ( 
    <div className="flex flex-col">
      <UserButton
      afterSignOutUrl="/sign-in"
      />
      <ModeToggle/>
    </div>
  );
}
