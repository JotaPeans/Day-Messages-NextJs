import { twMerge } from "tailwind-merge";

interface CardProps {
    className?: string
    message: string,
    date: string
}

const Card = ({ className, message, date }: CardProps) => {
    const now = new Date();
    const isNew = now.toLocaleDateString() === date;

    return (
        <div className={twMerge("relative flex border-2 min-h-[10rem] rounded-xl p-2 pb-8 text-sm font-semibold text-zinc-600 dark:text-zinc-300 dark:border-zinc-400 dark:bg-zinc-800 shadow-md ", className)}>
            <p className="first-letter:uppercase">{ message }</p>
            <span className="font-medium text-xs text-zinc-400 absolute right-2 bottom-2">{ date }</span>
            <span data-new={isNew} className="font-medium text-xs text-rose-400 absolute left-2 bottom-2 data-[new=false]:hidden">new!</span>
        </div>
    );
}
 
export default Card;