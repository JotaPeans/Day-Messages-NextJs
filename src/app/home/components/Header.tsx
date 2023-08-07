"use client"

import { signOut, useSession } from "next-auth/react";
import { Button, User, Badge, Dropdown, DropdownTrigger, DropdownItem, DropdownMenu } from "@nextui-org/react";
import { LogOut, Bell } from "lucide-react";
import { Message } from "@/assets/types";

const Header = () => {
    const { data: session } = useSession();

    // async function getMessages() {
    //     const response = await fetch(`/api/messages/${session?.user.id}/${queryPagination.skip}/5`, {
    //         cache: "no-store"
    //     });
    
    //     var data: Message[] = await response.json();

    //     if(messages) setMessages([...messages, ...data]);
    //     else setMessages(data);
    // }
    
    return (
        <header className="flex justify-between items-center">
            <div className="flex gap-2 items-center">
                <User name="" avatarProps={{src: session!.user!.image!}}/>
                <h1 className="font-bold text-xl text-zinc-700 dark:text-zinc-300">{ session?.user?.name }</h1>
            </div>
            
            <div className="flex gap-4 items-center">
                <Dropdown>
                    <DropdownTrigger>
                        <Button size="sm" isIconOnly disableRipple className="bg-white/0">
                            <Badge isInvisible={false
                            } color="danger" shape="circle" content="" disableOutline classNames={{
                                badge: "w-2.5 h-2.5 min-w-2.5 min-h-2.5"
                            }}>
                                <Bell size={20} color="white" className="animate-shake"/>
                            </Badge>
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu>
                        <DropdownItem key="Teste">in Comming...</DropdownItem>
                    </DropdownMenu>
                </Dropdown>

                <Button size="sm" isIconOnly color="danger" variant="flat" onPress={() => signOut()}>
                    <LogOut size={14}/>
                </Button>
            </div>
        </header>
    );
}
 
export default Header;