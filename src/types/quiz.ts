interface Quiz {
  id: number
  title: string
  description: string
  slug: string
  duration: number
  type: number
  questions: Question[]
}

interface Question {
  id: number
  question: string
  selected: number
  Options?: Options[]
}

interface Options {
  id: number
  option: string
  selected: number
}