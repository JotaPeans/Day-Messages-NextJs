"use client"

import { Button, Spacer } from "@nextui-org/react";
import { X } from "lucide-react";
import { ReactNode } from "react";

interface ModalProps {
    open: boolean
    onClose: () => void
    children: ReactNode
}

const Modal = ({ open, onClose, children }: ModalProps) => {
    return (
        <div 
            data-open={open}
            className="transition-all data-[open=true]:bg-black/60 data-[open=true]:pointer-events-auto pointer-events-none w-screen h-screen fixed left-0 top-0 flex justify-center items-center z-40"
        >
            <div
                data-open={open} 
                className="relative transition-all w-[90%] h-96 rounded-xl bg-zinc-50 dark:bg-zinc-800 shadow-lg data-[open=true]:animate-appearance-in data-[open=false]:animate-appearance-out flex flex-col p-2 z-50"
            >
                <Button className="self-end" size="sm" variant="flat" color="danger" isIconOnly onPress={onClose}>
                    <X size={16}/>
                </Button>

                <Spacer y={2}/>

                {children}

            </div>
        </div>
    );
}
 
export default Modal;