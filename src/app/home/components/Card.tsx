interface CardProps {
    message: string,
    date: string
}

const Card = ({ message, date }: CardProps) => {
    return (
        <div className="relative flex border-2 min-h-[10rem] rounded-xl p-2 text-sm font-semibold text-zinc-600 shadow-md">
            <p>{ message }</p>
            <span className="font-medium text-xs text-zinc-400 absolute right-2 bottom-2">{ date }</span>
        </div>
    );
}
 
export default Card;