"use client";
import { redirect } from "next/navigation";
import Anchor from "@/components/anchor";
import Header from "@/components/header";
import quizzes from "../../../quizzes.json";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Undo2 } from "lucide-react";

export default function Client({
  quiz,
}: Readonly<{ quiz: Quiz }>) {
  const [points, setPoints] = useState(0);

  function recoverFeedback() {
    let feedback = [];
    if (localStorage.finalFeedback) {
      feedback = JSON.parse(localStorage.finalFeedback)
      
      //Baseado no valor de cada feedback ele retorna alguma informação
      //A princípio armazenado em options no json
      feedback.forEach((resp: number, id: any) => {
        if (resp === 1) {
          console.log(quizzes[0].questions[id].about[0]);
        } else {
          console.log(quizzes[0].questions[id].about[1]);
        }
      });
    }
  }

  useEffect(() => {
    const lastPoints = localStorage.getItem("lastPoints");
    if (!lastPoints) {
      redirect("/quiz/" + quiz?.slug + "/iniciar");
    }

    const parsedData = JSON.parse(lastPoints);
    const quizResult = parsedData.find(
      (result: LastPoints) => result.qID === quiz?.id
    );

    if (quizResult) {
      setPoints(quizResult.lastPoints);
    } else {
      return redirect("/quiz/" + quiz?.slug + "/iniciar");
    }

    recoverFeedback();
  }, [quiz?.id, quiz?.slug]);

  return (
    <>
      <Header />

      <div className="mx-auto py-32 max-w-xs sm:max-w-4xl sm:px-5">
        <div className="">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-violet-500 w-max ">{quiz.title}</h1>
            <h2 className="text-2xl font-semibold text-neutral-400">Autoavaliação</h2>
          </div>
          <h1 className="text-xl font-medium text-neutral-800">Sua pontuação</h1>
          <p className="text-sm font-medium text-neutral-600">
            Quanto mais próximo de {quiz.questions.length}, melhor foi sua pontuação.
          </p>
          <p className="font-light text-violet-500 text-7xl my-4">
            {points}
          </p>
          <p className="text-neutral-600 text-lg">/ {quiz.questions.length}</p>
          <Link
            href={`/quiz/` + quiz.slug + `/iniciar`}
            className="text-violet-500 w-fit my-4 flex items-center gap-1 hover:underline">
            <Undo2 className="size-4" />
            Refazer teste
          </Link>
        </div>
        <div className="col-span-2 lg:mt-10">
          <form className="my-20">
            <h1 className="leading-5 font-medium text-neutral-800">
              Deseja receber seus resultados?
            </h1>
            <p className="text-sm text-neutral-600">Receba seu resultado por email</p>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Insira seu email aqui"
              className="border rounded-lg my-3 py-1.5 px-3 w-full placeholder:font-light"
            />
            <button
              className="bg-violet-500 hover:bg-violet-600 text-white font-medium py-2 px-7 min-w-32 mx-auto block my-5 w-fit rounded-full">
              Enviar feedback
            </button>
          </form>
        </div>
        <div className="banner col-span-3 lg:mt-10">
          <div className="img bg-contain bg-center bg-no-repeat max-sm:hidden"></div>
        </div>
        <div className="banner col-span-3 lg:mt-10">
          <div className="img bg-contain bg-center bg-no-repeat max-sm:hidden"></div>
        </div>

        <div className="col-span-2 lg:mt-10">
          <p className="my-10">
            Inteligência emocional abrange o reconhecimento e controle das
            emoções, a capacidade de automotivação, habilidades sociais e
            empatia. Para desenvolver...
          </p>
          <Anchor
            title="Ver sobre"
            link="#"
            className="text-center my-10 w-full block"
          />
        </div>

      </div>
    </>
  );
}
