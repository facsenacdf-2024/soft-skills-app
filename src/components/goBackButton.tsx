import { ArrowLeft, ArrowLeftCircle } from "lucide-react";
import { useRouter } from "next/navigation";

interface GoBack {
    redirect?: string,
    tabButton?: number,
    style?: string
}

const GoBackButton = ({ redirect, tabButton, style }: GoBack) => {
    const router = useRouter();

    const handleBack = () => {
        if (redirect) {
            router.push(redirect);
        } else if (document.referrer && document.referrer !== window.location.href) {
            router.back();
        } else {
            router.push("/");
        }
    };
    return (
        <header className={`${style? style : "relative top-8 left-[60%] sm:left-1/2"} -translate-x-1/2 max-w-xl w-full z-50 `}>
            <button onClick={handleBack} tabIndex={tabButton}>
                <ArrowLeftCircle size={40} color="rgb(37 99 235)" />
            </button>
        </header>
    )
}

export default GoBackButton;