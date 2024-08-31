interface Props{
    title: string,
    text: string
}

export default function Feedback({title,text}: Props){
    return (
        <div className="border-5 border-red-500 max-h-32 h-28 p-2 pt-1 flex flex-col justify-start gap-2 overflow-x-hidden no-scrollbar">
            <h1 className="font-bold">{title}</h1>
            <p className="text-xs">{text}</p>
        </div>
    )
}