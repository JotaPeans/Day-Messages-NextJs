"use client"
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

interface  HomeLayoutProps {
    children: ReactNode
}

const HomeLayout = ({ children }: HomeLayoutProps) => {
    const { data: session, status } = useSession();

    if(status === "unauthenticated") { 
        redirect("/")
    }

    if(session && session.user && status === "authenticated") {
        return (
            <>
                { children }
            </>
        );
    }
}
 
export default HomeLayout;