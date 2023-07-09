"use client"

import { signOut, useSession } from "next-auth/react";
import { Button, User } from "@nextui-org/react";
import { LogOut } from "lucide-react";

const Header = () => {
    const { data: session } = useSession();
    
    return (
        <header className="flex justify-between items-center">
            <div className="flex gap-2 items-center">
                <User name="" avatarProps={{src: session!.user!.image!}}/>
                <h1 className="font-bold text-xl text-zinc-700">{ session?.user?.name }</h1>
            </div>

            <Button size="sm" isIconOnly color="secondary" variant="flat" onPress={() => signOut()}>
                <LogOut size={14}/>
            </Button>
        </header>
    );
}
 
export default Header;