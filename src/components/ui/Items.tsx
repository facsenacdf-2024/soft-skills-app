import { CarouselItem } from "./carousel"
import Feedback from "./Feedback"

interface Props {
    arr: string[] | any,
    title: string
}

export default function Items({ arr, title }: Props) {



    return (

        arr.map((item: string | any) => (
            <CarouselItem>
                <Feedback title={title} text={item}/>
            </CarouselItem>
        ))
    )
}