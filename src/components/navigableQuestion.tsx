import { ChevronLeft, ChevronRight } from "lucide-react"
import Button from "./button"

interface Props {
    navigateQuestion: (direction:number) => void;
    tabPrev?: number,
    tabNext?: number
}

const NavigateQuestion = ({ navigateQuestion, tabNext, tabPrev }: Props) => {
    return (
        <div className="max-w-xs mx-auto mt-44 flex justify-between">
            <Button
                title= "Anterior"
                func={() => navigateQuestion(-1)}
                tabIndex={tabPrev}
                className="rounded-2xl w-20 flex justify-center items-center"
            />
            <Button
                title= "Próximo"
                func={() => navigateQuestion(1)}
                tabIndex={tabNext}
                className="rounded-2xl w-20 flex justify-center items-center"
            />
        </div>
    )
}

export default NavigateQuestion;