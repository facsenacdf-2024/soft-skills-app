"use client";
import { redirect } from "next/navigation";
import Anchor from "@/components/anchor";
import Header from "@/components/header";
import quizzes from "../../../quizzes.json";
import { useEffect, useState } from "react";

export default function Page({
  params,
}: Readonly<{ params: { slug: string } }>) {
  const quiz = quizzes.find((c: any) => c.slug === params.slug); // Busca o quiz pelo slug
  const [points, setPoints] = useState(0);

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
  }, [quiz?.id, quiz?.slug]);

  if (!quiz) {
    return redirect("/");
  }

  return (
    <>
      <Header page="Resultados" />

      <div className="sm:grid grid-flow-row-dense grid-cols-5 sm:mx-8 gap-2 text-xl sm:text-sm lg:text-xl max-sm:max-w-xs mx-auto">
        <div className="col-span-5 mt-10">
          <h1 className="text-center">Sua pontuação foi</h1>
          <p className="font-bold text-center text-blue-800 text-2xl">
            {points} / {quiz.questions.length}
          </p>
          <p className="text-center text-sm my-3 font-medium text-neutral-600">
            Quanto mais próximo de 10, melhor sua inteligência emocional
          </p>
        </div>
        <div className="col-span-2 lg:mt-10">
          <form className="my-20 space-y-5">
            <h1 className="leading-5 text-center">
              Insira seu email para receber seu feedback
            </h1>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Insira seu email aqui"
              className="border border-blue-800 rounded-lg py-1.5 text-center w-full focus:outline-none placeholder:font-light lg:w-96 lg:mx-auto lg:block"
            />
            <button className="bg-blue-800 hover:bg-blue-900 text-white font-medium py-2 px-7 min-w-32 mx-auto block my-5 w-fit rounded-xl">
              Receber meu feedback
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
        <a
          href={`/quiz/` + quiz.slug + `/iniciar`}
          className="col-span-5 text-center text-blue-500 w-fit mx-auto block"
        >
          Refazer teste
        </a>
      </div>
    </>
  );
}
