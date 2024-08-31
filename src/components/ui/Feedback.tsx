interface Props {
    title: string,
    text: string,
}

export default function Feedback({ title, text }: Props) {
    return (
        <div className="max-h-32 h-28 pt-1 overflow-x-hidden no-scrollbar ">
            <div className="flex flex-col px-2 justify-start gap-2 z-0">
                <h1 className="font-bold">{title}</h1>
                <p className="text-xs">{text}</p>

            </div>
        </div>

    )
}