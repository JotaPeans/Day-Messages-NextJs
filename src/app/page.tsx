"use client";

import { useRef } from "react";
import { Input, Button, Spacer } from "@nextui-org/react";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import discordUser from "@/assets/animations/discord-user.json";
import Lottie from "lottie-react"
import { redirect } from "next/navigation";

const Home = () => {
    const session = useSession();
    const cpfRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    if(session && session.data?.user) {
        redirect("/home");
    }

    async function handleCrendentialsLogin() {
        await signIn("credentials", {
            cpf: cpfRef.current!.value,
            password: passwordRef.current!.value,
            redirect: true,
            callbackUrl: "/home"
        });
    }

    return (
        <main className="w-screen h-screen flex flex-col justify-center items-center gap-2">
            <div className="flex flex-col gap-4">
                <div className="h-44">
                    <Lottie className="h-full" animationData={discordUser}/>
                </div>
                <Spacer y={5}/>
                <Input maxLength={11} type="number" ref={cpfRef} variant="bordered" label="cpf"/>
                <Input type="password" ref={passwordRef} variant="bordered" label="password"/>
                <Button onPress={handleCrendentialsLogin} size="lg" color="primary">Enviar</Button>
            </div>
        </main>
    );
}
 
export default Home;