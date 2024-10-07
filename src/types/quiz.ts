interface Quiz {
  id: number,
  title: string,
  description: string,
  slug: string,
  duration: number,
  type: number,
  questions: Question[],
}

interface Question {
  id: number,
  question: string,
  selected: number,
  feedback: string,
  Alternatives?: Alternatives[],
}

interface Alternatives {
  id: string,
  text: string,
  leadershipStyle: "autocrat" | "liberal" | "democrat",
}