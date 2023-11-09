"use client"

import { Spacer, Skeleton } from "@nextui-org/react";
import Header from "./components/Header";
import Add from "./components/Add";
import Card from "./components/Card";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Message } from "@/assets/types";

const Page = () => {
    const { data: session } = useSession();
    const [ messages, setMessages ] = useState<Message[] | null>(null);
    const [ queryPagination, setQueryPagination ] = useState({
        skip: 0
    });

    useEffect(() => {
        getMessages()
    }, [queryPagination]);

    async function getMessages() {
        const response = await fetch(`/api/messages/${session?.user.id}/${queryPagination.skip}/5`, {
            cache: "no-store"
        });
    
        var data: Message[] = await response.json();

        if(messages) setMessages([...messages, ...data]);
        else setMessages(data);
    }

    if(typeof window !== undefined) {
        window.addEventListener("scroll", () => {
            if(window.scrollY + window.innerHeight === document.body.offsetHeight) setQueryPagination({skip: queryPagination.skip + 5})
        });
    }


    return (
        <main className="p-5 w-screen min-h-screen h-full flex flex-col max-w-md mx-auto">
            <Header/>
            <Spacer y={5}/>
            <div className="flex flex-col gap-4">
                {messages?.map((item, i) => (
                    <Card key={i} messageData={{...item}}/>
                ))}

                <Skeleton className="rounded-xl border-2">
                    <Card messageData={{
                        id: "",
                        createdAt: new Date().toISOString(),
                        liked: false,
                        message: "",
                        userToId: ""
                    }}/>
                </Skeleton>
            </div>
            <Add/>
        </main>
    );
}
 
export default Page;