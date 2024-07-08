'use client'
import { useState } from "react";
import { redirect } from "next/navigation";
import Button from "@/components/button";
import Header from "@/components/header";
import quizzes from "../../../quizzes.json"; // importando o json com as perguntas


export default function Page({ params }: Readonly<{ params: { slug: string } }>) {
  const quiz = quizzes.find((c: any) => c.slug === params.slug) // Busca o quiz pelo slug

  // Numero da questão, deve começar em 0
  const [count, setCount] = useState<number>(0)

  // Pontos iniciais equivalente ao total de perguntas
  const [points, setPoints] = useState<number>(quiz?.questions.length!)

  if (!quiz) {
    return redirect('/')
  }

  function nextQuestion() { setCount(count + 1) }

  function subtractPoints() { setPoints(points - 1) }

  function storePoints() {
    const lastPoints = points || 0
    let storedResults = JSON.parse(localStorage.getItem("lastPoints") ?? "[]")
    const quizResultIndex = storedResults.findIndex((result: LastPoints) => result.qID === quiz?.id)

    // Se o quiz ja tiver sido respondido, substitui os pontos
    if (quizResultIndex >= 0) {
      storedResults[quizResultIndex].lastPoints = lastPoints
    } else {
      storedResults.push({ qID: quiz?.id, lastPoints: lastPoints })
    }

    localStorage.setItem("lastPoints", JSON.stringify(storedResults))
  }

  // Ao terminar o quiz, salva os pontos e redireciona para o resultado
  if (count === quiz.questions.length) {
    storePoints()
    redirect(`/quiz/${quiz.slug}/resultados`)
  }

  return (
    <>
      <Header page={quiz.title} />

      <div className="max-w-xs mx-auto my-14 text-center">
        <p className="h-20">
          {quiz.questions[count].question}
        </p>

        <div className="flex justify-evenly items-center my-20">
          <Button // a cada "sim" pontuação perde 1
            title="Sim"
            func={() => {
              nextQuestion()
              subtractPoints()
            }}
          />
          <Button // a cada "não" pontuação permanece a mesma
            title="Não"
            func={() => {
              nextQuestion()
            }}
          />
        </div>
        <div className="w-full h-2 bg-blue-100 rounded-full">
          <div className="bg-blue-800 h-2 rounded-full duration-300" style={{ width: `${(100 * count) / quiz.questions.length}%` }}></div>
        </div>
      </div>
    </>
  )

}