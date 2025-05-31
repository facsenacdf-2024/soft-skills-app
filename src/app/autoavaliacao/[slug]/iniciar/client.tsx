"use client"
import GoBackButton from "@/components/goBackButton";
import Header from "@/components/header";
import MultipleChoiceQuiz from "@/components/multiple-choice-quiz";
import MultipleGroupQuiz from "@/components/multiple-group-quiz";
import YNQuiz from "@/components/yn-quiz";

export default function Client({
  quiz,
}: Readonly<{ quiz: Quiz }>) {

  return (
    <>
      {/* <Header /> */}
      <GoBackButton />
      {/* quiz.type = 1, renderiza o quiz de Sim ou Não*/}
      {quiz.type === 1 && <YNQuiz quiz={quiz} />}
      {/* quiz.type = 2, renderiza o quiz de multiplas escolhas*/}
      {quiz.type === 2 && <MultipleChoiceQuiz quiz={quiz} />}
      {/* quiz.type = 3, renderiza o quiz de multiplas escolhas por grupo*/}
      {quiz.type === 3 && <MultipleGroupQuiz quiz={quiz} />}
    </>
  );
}
