import { CarouselItem } from "./carousel"
import Feedback from "./Feedback"
import { Card, CardContent } from "@/components/ui/card"

interface Props {
    arr: string[] | any,
    title: string,
}

export default function Items({ arr, title}: Props) {

    return (

        arr.map((item: string | any, index: number) => (
            <CarouselItem key={index}>
                <Card>
                    <CardContent>
                        <Feedback title={title} text={item} />
                    </CardContent>
                </Card>
            </CarouselItem>
        ))
    )
}