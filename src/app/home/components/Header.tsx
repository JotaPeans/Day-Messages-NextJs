"use client"

import { signOut, useSession } from "next-auth/react";
import { Button, User, Badge, Dropdown, DropdownTrigger, DropdownItem, DropdownMenu, Modal, ModalContent, ModalBody, ModalHeader, ModalFooter, useDisclosure } from "@nextui-org/react";
import { LogOut, Bell, Inspect } from "lucide-react";
import { useState, useEffect } from "react";
import { Message } from "@/assets/types";
import { User as UserModel } from "@prisma/client";

const Header = () => {
    const { data: session } = useSession();
    const [ lastMessage, setLastMessage ] = useState<Message>({
        id: '',
        message: '',
        userToId: '',
        userFromId: '',
        createdAt: '',
        liked: false
    });
    const [ userToIdData, setUserToIdData ] = useState<UserModel>();
    const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

    useEffect(() => {
        fetchData()
    }, []);

    async function fetchData() {
        const messageRes = await fetch(`/api/message/${session?.user.id}`, {
            cache: "no-store"
        });
    
        var messageData: Message = await messageRes.json();

        if(messageRes.ok) setLastMessage(messageData);

        const userRes = await fetch(`/api/user/${messageData.userToId}`, {
            cache: "no-store"
        });
    
        var userData: UserModel = await userRes.json();

        if(userRes.ok) setUserToIdData(userData);
    }

    let now = new Date().toLocaleDateString();
    const newNotifications = lastMessage.liked && new Date(lastMessage.createdAt).toLocaleDateString() === now ? true : false;
    
    return (
        <>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent className="my-auto dark:dark dark:text-zinc-100">
                    <ModalHeader>
                        <User name={session?.user.name} avatarProps={{src: session?.user.image}}/>
                    </ModalHeader>

                    <ModalBody>
                        {lastMessage.message}
                    </ModalBody>

                    <ModalFooter>
                        <Button onPress={onClose} variant="flat" color="danger">Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            <header className="flex justify-between items-center">
                <div className="flex gap-2 items-center">
                    <User name="" avatarProps={{src: session!.user!.image!}}/>
                    <h1 className="font-bold text-xl text-zinc-700 dark:text-zinc-300">{ session?.user?.name }</h1>
                </div>
                
                <div className="flex gap-4 items-center">
                    <Dropdown shadow="md" className="dark:dark dark:text-zinc-100">
                        <DropdownTrigger>
                            <Button isDisabled={!newNotifications} size="sm" isIconOnly disableRipple className="bg-white/0">
                                <Badge isInvisible={!newNotifications} color="danger" shape="circle" content="" disableOutline classNames={{
                                    badge: "w-2.5 h-2.5 min-w-2.5 min-h-2.5"
                                }}>
                                    <Bell data-enable={newNotifications} size={20} className="data-[enable=true]:animate-shake text-zinc-700 dark:text-white"/>
                                </Badge>
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu onAction={onOpen}>
                            <DropdownItem aria-label="Notifications">
                                <div className="flex items-center justify-center gap-2 flex-wrap w-full text-xs">
                                    <User name="" avatarProps={{src: userToIdData?.image}}/>
                                    <p className="text-zinc-700 dark:text-zinc-200">
                                        <span className="font-semibold">{userToIdData?.name}</span> curtiu sua última mensagem
                                    </p>
                                    <Inspect size={18} className="text-zinc-700 dark:text-zinc-200" strokeWidth={2.5}/>
                                </div>
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>

                    <Button size="sm" isIconOnly color="danger" variant="flat" onPress={() => signOut()}>
                        <LogOut size={14}/>
                    </Button>
                </div>
            </header>
        </>
    );
}
 
export default Header;