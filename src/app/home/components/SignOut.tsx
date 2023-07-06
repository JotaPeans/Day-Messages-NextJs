"use client"

import { Button } from "@nextui-org/react";
import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

const SignOut = () => {
    return (
        <Button isIconOnly color="primary" variant="flat" onPress={() => signOut()}>
            <LogOut size={18}/>
        </Button>
    );
}
 
export default SignOut;