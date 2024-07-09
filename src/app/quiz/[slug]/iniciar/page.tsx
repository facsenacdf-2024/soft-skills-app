"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/button";
import Header from "@/components/header";
import quizzes from "../../../quizzes.json";
import { ChevronLeft, ChevronRight } from "lucide-react";

/*
NOTA: Em algumas partes do código é possível notar
que utiliza-se do total das questões - 1 como em

function nextQuestion() { if (questionID < quizLength - 1) setQuestionID(questionID + 1) }

Isso é porque o array começa em 0 e por isso é
preciso usar o total de questões - 1
*/

export default function Page({
  params,
}: Readonly<{ params: { slug: string } }>) {
  const quiz: Quiz = quizzes.find((quiz) => quiz.slug === params.slug)!; // Busca o quiz pelo slug
  const quizLength = quiz.questions.length;
  const allQuestionsSelected = quiz.questions.every(question => question.selected !== 0);

  const router = useRouter();

  // Numero da questão, deve começar em 0
  const [questionID, setQuestionID] = useState<number>(0);

  // Pontos iniciais equivalente ao total de perguntas
  const [points, setPoints] = useState<number>(quizLength);

  // Se o quiz não for encontrado no JSON, redireciona para a página inicial
  if (!quiz) {
    return router.push("/");
  }

  function nextQuestion() {
    if (questionID < quizLength - 1) setQuestionID(questionID + 1);
  }

  function subtractPoints() {
    if (points > 0 && quiz.questions[questionID].selected != 1) setPoints(points - 1);
    quiz.questions[questionID].selected = 1; // Marca a questão selecionada como "Sim"
  }

  function navigateQuestion(value: number) {
    if (questionID > 0 && value < 0) setQuestionID(questionID - 1); // Retorna para a questão anterior
    if (questionID < quizLength - 1 && value > 0) setQuestionID(questionID + 1); // Avança para a próxima questão
  }

  function adjustPoints() {
    if (quiz.questions[questionID].selected == 1) {
      // Se a questão foi selecionada "Sim"
      setPoints(points + 1);
    }

    quiz.questions[questionID].selected = 2;
  }

  function storePoints() {
    const lastPoints = points || 0;
    let storedResults = JSON.parse(localStorage.getItem("lastPoints") ?? "[]");
    const quizResultIndex = storedResults.findIndex(
      (result: LastPoints) => result.qID === quiz?.id
    );

    // Se o quiz ja tiver sido respondido, substitui os pontos
    if (quizResultIndex >= 0) {
      storedResults[quizResultIndex].lastPoints = lastPoints;
    } else {
      storedResults.push({ qID: quiz?.id, lastPoints: lastPoints });
    }

    localStorage.setItem("lastPoints", JSON.stringify(storedResults));
  }

  // Ao terminar o quiz, salva os pontos e redireciona para o resultado
  function persistPoints() {
    storePoints();
    router.push(`/quiz/${quiz.slug}/resultados`);
  }

  return (
    <>
      <Header page={quiz.title} />

      <section className="w-full">
        <div className="mx-3 md:mx-auto md:w-[520px] text-center text-xl lg:text-2xl">
          <p className="h-20 mt-10">
            {quiz.questions[questionID].id + ". " + quiz.questions[questionID].question}
          </p>
          <div className="flex justify-evenly items-center my-20">
            <Button
              className={
                quiz.questions[questionID].selected === 1
                  ? "!bg-blue-800 !text-white"
                  : " "
              }
              title="Sim"
              func={() => {
                nextQuestion();
                subtractPoints(); // Diminui os pontos a cada "Sim"
              }}
            />
            <Button
              className={
                quiz.questions[questionID].selected === 2
                  ? "!bg-blue-800 !text-white"
                  : " "
              }
              title="Não"
              func={() => {
                nextQuestion();
                adjustPoints();
              }}
            />
          </div>
          <div className="w-full h-2 bg-blue-100 rounded-full">
            <div
              className="bg-blue-800 h-2 rounded-full duration-300"
              // Calcula o percentual de completude das questões do valor total de questões
              style={{ width: `${(100 * questionID + 100) / quizLength}%` }}
            ></div>
            <Button
              title={"Confirmar respostas"}
              func={persistPoints}
              className={
                // Se todas as questões tiverem sido respondidas, mostrar o botão
                allQuestionsSelected
                  ? `w-9/12 mt-10`
                  : "hidden"
              }
            />
          </div>
          <div className="max-w-xs mx-auto mt-64 flex justify-between">
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
    </>
  );
}
