"use client"
import { useRouter } from "next/navigation";
import { useState } from "react";
import Button from "./button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const MultipleChoiceQuiz = ({ quiz }: { quiz: Quiz }) => {
  const quizLength = quiz.questions.length;

  const router = useRouter();

  // Numero da questão, deve começar em 0
  const [questionID, setQuestionID] = useState<number>(0);

  const [selectedQuestions, setSelectedQuestions] = useState<number[]>(Array(quizLength).fill(0));

  // Mostrar botão de confirmar apenas na ultima questão
  const allQuestionsSelected = questionID === quizLength - 1;

  function navigateQuestion(value: number) {
    if (questionID > 0 && value < 0) setQuestionID(questionID - 1); // Retorna para a questão anterior
    if (questionID < quizLength - 1 && value > 0) setQuestionID(questionID + 1); // Avança para a próxima questão
  }

  function confirmAnswers() {
    router.push(`/quiz/${quiz.slug}/resultados`);
  }

  return (
    <section className="w-full py-24">
      <div className="mx-3 mt-10 px-5 md:mx-auto md:w-[520px]">
        <p className="h-44 mb-3 text-xl font-medium">
          {(questionID + 1) + ". " + quiz.questions[questionID].question}
        </p>

        <ul className="my-3 h-72 flex flex-col justify-center border-t border-b">
          {quiz.questions[questionID].alternatives?.map((alternative, index) => (
            <li
              key={alternative.id}
              className="py-2"
            >
              <input
                type="checkbox"
                name="answer"
                className="checked:accent-blue-700 cursor-pointer"
                id={alternative.id}
                value={alternative.id}
                checked={selectedQuestions[questionID] === index}

                onChange={() => {
                  const newSelectedQuestions = [...selectedQuestions];
                  newSelectedQuestions[questionID] = index;
                  setSelectedQuestions(newSelectedQuestions);
                  console.log(selectedQuestions)
                }}
              />
              <label
                htmlFor={alternative.id}
                className="ml-2 cursor-pointer"
              >
                {index === 0 && (<span>a&#41;{' '}</span>)}
                {index === 1 && (<span>b&#41;{' '}</span>)}
                {index === 2 && (<span>c&#41;{' '}</span>)}
                {alternative.text}
              </label>
            </li>
          ))}
        </ul>

        <div
          className="bg-blue-700 h-2 rounded-full mt-6 duration-300"
          // Calcula o percentual de completude das questões do valor total de questões
          style={{ width: `${(100 * questionID + 100) / quizLength}%` }}
        />
        <Button
          title={"Confirmar respostas"}
          className={
            // Se todas as questões tiverem sido respondidas, mostrar o botão
            allQuestionsSelected
              ? `w-full mx-auto my-10`
              : "hidden"
          }
        />
        <div className="max-w-xs mx-auto mt-10 flex justify-between">
          <Button
            title={<ChevronLeft size={60} strokeWidth={4} />}
            func={() => navigateQuestion(-1)}
            className="rounded-2xl !min-w-20 w-20 flex justify-center"
          />
          <Button
            title={<ChevronRight size={60} strokeWidth={4} />}
            func={() => navigateQuestion(1)}
            className="rounded-2xl !min-w-20 w-20 flex justify-center"
          />
        </div>
      </div>
    </section>
  )
}

export default MultipleChoiceQuiz;