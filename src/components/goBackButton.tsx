import { ArrowLeft, ArrowLeftCircle } from "lucide-react";
import { useRouter } from "next/navigation";

interface GoBack {
    redirect?: string
}

const GoBackButton = ({ redirect }: GoBack) => {
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
        <header className="relative top-8 left-1/2 -translate-x-1/2 max-w-xl w-full z-50">
            <button onClick={handleBack}>
                <ArrowLeftCircle size={40} color="rgb(37 99 235)" />
            </button>
        </header>
    )
}

export default GoBackButton;