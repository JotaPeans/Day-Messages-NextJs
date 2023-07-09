"use client"

import { Spacer, Skeleton } from "@nextui-org/react";
import Header from "./components/Header";
import Add from "./components/Add";
import Card from "./components/Card";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

interface Message {
    id: string
    message: string
    userToId: string
    liked: boolean
    createdAt: string
}

const Page = () => {
    const { data: session } = useSession();
    const [ messages, setMessages ] = useState<Message[] | null>(null);
    const [ queryPagination, setQueryPagination ] = useState({
        skip: 0
    })

    useEffect(() => {
        getMessages()
    }, [queryPagination]);

    async function getMessages() {
        const response = await fetch(`/api/messages/${session?.user.id}/${queryPagination.skip}/5`, {
            cache: "no-store"
        });
    
        var data: Message[] = await response.json();
        for (let message of data) {
            var date = new Date(message.createdAt);
            message.createdAt = date.toLocaleDateString()
        }

        if(messages) setMessages([...messages, ...data]);
        else setMessages(data);
    }

    if(typeof window !== undefined) {
        window.addEventListener("scroll", () => {
            if(window.scrollY + window.innerHeight === document.body.offsetHeight) setQueryPagination({skip: queryPagination.skip + 5})
        });
    }


    return (
        <main className="p-5 w-screen min-h-screen h-full flex flex-col">
            <Header/>
            <Spacer y={5}/>
            <div className="flex flex-col gap-4">
                {messages?.map((item, i) => (
                    <Card key={i} message={item.message} date={item.createdAt}/>
                ))}

                <Skeleton className="rounded-xl border-2">
                    <Card message="" date=""/>
                </Skeleton>
            </div>
            <Add/>
        </main>
    );
}
 
export default Page;