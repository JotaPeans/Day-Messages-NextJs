"use client";

import { useEffect, useRef, useState } from "react";
import { Input, Button, Spacer } from "@nextui-org/react";
import { useSession, signIn } from "next-auth/react";
import discordUser from "@/assets/animations/discord-user.json";
import Lottie from "lottie-react"
import { redirect } from "next/navigation";

const Home = () => {
    const {data: session} = useSession();
    const [ loading, setLoading ] = useState(false);
    const cpfRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    if(session && session?.user) {
        redirect("/home");
    }

    if (typeof window !== "undefined") {
        document.addEventListener("keydown", e => {
            if(e.key === "Enter") {
                handleCrendentialsLogin();
            }
        });
    }

    async function handleCrendentialsLogin() {
        setLoading(true);
        await signIn("credentials", {
            cpf: cpfRef.current!.value,
            password: passwordRef.current!.value,
            redirect: true,
            callbackUrl: "/home"
        });
    }

    useEffect(() => {
        if(typeof Notification !== "undefined") {
            Notification.requestPermission().then(perm => {
                if(perm !== "granted") {
                    alert("É preciso que aceite as notificações!");
                }
            })
        }
    }, []);

    return (
        <main className="w-screen h-screen flex flex-col justify-center items-center gap-2">
            <div className="flex flex-col gap-4">
                <div className="h-44">
                    <Lottie className="h-full" animationData={discordUser}/>
                </div>
                <Spacer y={5}/>
                <Input maxLength={11} type="tel" ref={cpfRef} variant="bordered" label="cpf" classNames={{
                    label: "dark:text-zinc-300 dark:group-data-[focus=true]:text-zinc-300",
                    input: "dark:text-zinc-300",
                    inputWrapper: "dark:border-zinc-500 dark:group-data-[focus=true]:border-zinc-600"
                }}/>
                <Input type="password" ref={passwordRef} variant="bordered" label="password" classNames={{
                    label: "dark:text-zinc-300 dark:group-data-[focus=true]:text-zinc-300",
                    input: "dark:text-zinc-300",
                    inputWrapper: "dark:border-zinc-500 dark:group-data-[focus=true]:border-zinc-600"
                }}/>
                <Button isLoading={loading} onPress={handleCrendentialsLogin} size="lg" color="primary">Enviar</Button>

                <button onClick={() => {
                    const notify = new Notification("first notify", {
                        body: "Ola mundo",
                        icon: "/launch.png"
                    })
                }}>notify</button>
            </div>
        </main>
    );
}
 
export default Home;