import Link from "next/link";

interface CardProps{
    icon: any,
    title: string,
    description: string,
    url: string
}

const CardForm = ({ icon, title, description, url }: CardProps) => {
    return (
        <div className="bg-blue-50 border block border-blue-100 rounded-md w-full hover:bg-blue-100 duration-300">
            <div className="flex items-center gap-2 text-blue-700 px-4 py-2.5">
                {icon}
                <h3 className="min-w-max">
                    {title}
                </h3>
            </div>

            <hr className="border-blue-100" />

            <p className="text-sm px-4 py-2.5 text-neutral-700 h-36 overflow-y-auto">
                {description}
            </p>
            <div className="relative mt-3">
                <p className="absolute right-0 -bottom-5 text-sm text-blue-600 px-4 py-2.5">2min</p>
                <Link href={url}
                    className="block text-center bg-white border-2 border-black w-[140px] mx-auto mb-4 py-1">
                    Começar teste</Link>
            </div>
        </div>
    )
}

export default CardForm;