"use client"
import Header from "@/components/header";
import MultipleChoiceQuiz from "@/components/multiple-choice-quiz";
import YNQuiz from "@/components/yn-quiz";

export default function Client({
  quiz,
}: Readonly<{ quiz: Quiz }>) {

  return (
    <>
      <Header />
      {/* Se o tipo for 1, renderiza o componente de Sim ou Não*/}
      {quiz.type === 1 && <YNQuiz quiz={quiz} />}
      {quiz.type === 2 && <MultipleChoiceQuiz quiz={quiz} />}
    </>
  );
}
