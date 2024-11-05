interface Quiz {
  id: number,
  image: string,
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
  alternatives?: Alternatives[],
}

interface Alternatives {
  id: string,
  text: string,
  leadershipStyle: string,
}