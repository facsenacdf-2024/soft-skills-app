import { CarouselItem } from "./carousel"
import Feedback from "./feedback"
import { Card, CardContent } from "@/components/ui/card"

interface Props {
  arr: string[],
  title: string,
}

export default function Items({ arr, title }: Readonly<Props>) {
  return (
    arr.map((item: string) => (
      <CarouselItem key={item}>
        <Card>
          <CardContent>
            <Feedback title={title} text={item} />
          </CardContent>
        </Card>
      </CarouselItem>
    ))
  )
}
