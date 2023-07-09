"use client"

import { User, Button, Textarea, Spacer, Chip } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import Modal from "./Modal";
import axios from "axios";

interface User {
    id: string
    name: string
    image: string
}

const Add = () => {
    const { data: session } = useSession();
    const [ open, setOpen ] = useState(false);
    const [ message, setMessage ] = useState("");
    const [ users, setUsers ] = useState<User[]>();
    const [ selected, setSelected ] = useState<User | null>(null);
    const [ status, setStatus ] = useState<null | "loading" | "success" | "error">(null);

    useEffect(() => {
        getUsers()
    }, []);

    useEffect(() => {
        if(!open) {
            setSelected(null);
            setMessage("")
        }
    }, [open]);

    async function getUsers() {
        try {
            const { data } = await axios.get<User[]>("/api/user");
            var users = []
            for (let user of data) {
                if(user.name !== session?.user?.name) users.push(user)
            }
            setUsers(users);
            
        } catch (error) {
            console.log(error)
        }
    }

    async function postNewMessage() {
        setStatus("loading");
        try {
            await axios.post("/api/messages", JSON.stringify({
                message,
                userToId: selected?.id,
            }), {
                headers: {
                    "Content-Type": "application/json"
                }
            });

            setStatus("success");
            
        } catch (error) {
            setStatus("error")
        }
    }

    return (
        <>
            <Modal open={open} onClose={() => setOpen(false)}>
                {selected ? <Chip variant="flat" color="primary" className="absolute left-2 top-2 animate-appearance-in">{selected.name}</Chip> : null}
                
                <div className="flex gap-1 overflow-x-auto">
                    {users?.map((item, i) => (
                        <User className="cursor-pointer" onClick={() => setSelected(item)} key={i} name="" avatarProps={{src: item.image}}/>
                    ))}
                </div>

                <Spacer y={4}/>
                
                <Textarea
                    minRows={10}
                    aria-label="Message"
                    variant="faded"
                    placeholder="Write your message"
                    value={message}
                    onValueChange={setMessage}
                />

                <Spacer y={4}/>

                <Button 
                    isLoading={status === "loading" ? true : false} 
                    variant="flat" 
                    isDisabled={message.length >= 1 && selected ? false : true} 
                    color={status === null || status === "loading" ? "primary" : status === "success" ? "success" : "danger"} 
                    size="lg" 
                    onPress={postNewMessage}
                >
                    {status === null ? "Enviar" : status === "loading" ? "Carregando" : status === "success" ? "Enviado" : "Erro"}
                </Button>
            </Modal>


            <Button className="fixed bottom-4 right-4 animate-appearance-in" variant="flat" color="primary" isIconOnly onPress={() => setOpen(true)}>
                <Plus/>
            </Button>
        </>
    );
}
 
export default Add;