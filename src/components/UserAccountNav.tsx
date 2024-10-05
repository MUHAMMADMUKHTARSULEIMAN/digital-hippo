"use client";

import { User } from "@/payload-types";
import { Button, buttonVariants } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const UserAccountNav = ({user}: {user: User}) => {
  const router = useRouter() 
  const signOut = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/logout`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json"
          }
        },
      )
      if(!res.ok) return new Error();

      toast.success("Signed out successfully.");

      router.push("/sign-in")
      router.refresh();
    }
    catch (error) {
      toast.error("Could not sign out. Please try again.")
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="overflow-visible">
        <Button className={buttonVariants({variant: "outline", size: "sm", className: "relative"})}>
          My account
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="bg-background w-60" align="end">
        <div className="flex justify-start items-center gap-2 p-2">
          <div className="flex flex-col space-y-0.5 leading-none">
            <p className="font-medium text-sm text-foreground">{user.email}</p>
          </div>
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuItem  asChild>
          <Link href={"/sell"}>Seller Dashboard</Link>
        </DropdownMenuItem>

        <DropdownMenuItem onClick={signOut} className="cursor-pointer">
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserAccountNav;