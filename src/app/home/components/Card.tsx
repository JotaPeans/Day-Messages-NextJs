import { twMerge } from "tailwind-merge";
import Lottie from "lottie-react";
import { useRef, useState } from "react";
import likeAnimation from "@/assets/animations/like.json";
import { Message } from "@/assets/types";
import { Heart } from "lucide-react";   

interface CardProps {
    className?: string
    messageData: Message
}

const Card = ({ className, messageData }: CardProps) => {
    const [ _, setReRender ] = useState<string>();
    const now = new Date();
    const isNew = now.toLocaleDateString() === new Date(messageData.createdAt).toLocaleDateString();
    const lottieRef = useRef<any>(null);

    const { id, ...messageDataWithoutId } = messageData;

    async function getDoubleClickOnCard() {
        lottieRef.current.play();

        const res = await fetch(`/api/messages/${id}`, {
            method: "POST",
            headers: {
                "Content-type": "Application/json"
            },
            body: JSON.stringify({
                ...messageDataWithoutId
            })
        });

        if(res.status === 200) {
            messageData.liked = true;
            setReRender("")
        }
    }

    return (
        <div onDoubleClick={() => getDoubleClickOnCard()} className={twMerge("relative flex border-2 min-h-[10rem] rounded-xl p-2 pb-8 text-sm font-semibold text-zinc-600 dark:text-zinc-300 dark:border-zinc-400 dark:bg-zinc-800 shadow-md select-none", className)}>
            <p className="first-letter:uppercase">{ messageData.message }</p>
            <span className="font-medium text-xs text-zinc-400 absolute right-2 bottom-2">{ new Date(messageData.createdAt).toLocaleDateString() }</span>
            <div className="absolute left-2 bottom-2 flex items-center gap-2">
                <span data-new={isNew} className="font-medium text-xs text-rose-400 data-[new=false]:hidden">new!</span>
                <Heart size={18} data-liked={messageData.liked} className="text-rose-500 hidden data-[liked=true]:block animate-appearance-in"/>
            </div>
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                <Lottie
                    onComplete={() => lottieRef.current.destroy()}
                    lottieRef={lottieRef}
                    className="w-1/2 opacity-80"
                    animationData={likeAnimation}
                    loop={false}
                    autoplay={false}
                />
            </div>
        </div>
    );
}
 
export default Card;