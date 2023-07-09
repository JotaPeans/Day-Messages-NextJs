import { twMerge } from "tailwind-merge"

interface CardProps {
    className?: string
    message: string,
    date: string
}

const Card = ({ className, message, date }: CardProps) => {
    return (
        <div className={twMerge("relative flex border-2 min-h-[10rem] rounded-xl p-2 pb-8 text-sm font-semibold text-zinc-600 shadow-md ", className)}>
            <p className="first-letter:uppercase">{ message }</p>
            <span className="font-medium text-xs text-zinc-400 absolute right-2 bottom-2">{ date }</span>
        </div>
    );
}
 
export default Card;