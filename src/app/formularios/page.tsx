'use client'
import Anchor from "@/components/anchor";
import Button from "@/components/button";
import { ArrowLeft } from "lucide-react";
import { redirect } from "next/navigation";
import { useState, useEffect } from "react";
import Questionario from "./questions.json"; // importando o json com as perguntas

const questions = Questionario.map((c: any) => {
  return (
    <div className="box" key={c.id}>
      <p>{c.perg}</p>
    </div>
  )
})

export default function Perguntas() {
  const [cont, setCont] = useState<number>(0)
  const [aux, setAux] = useState<number>(0)
  const [pontos, setPontos] = useState<number>(10)

  useEffect(() => {

  }, [aux, cont, pontos])

  function nextQuestion() {
    let a = aux
    a++
    setAux(a)
  }

  function scoreQuestion() {
    let c = cont
    c++
    setCont(c)
  }

  function subtrairPontos() {
    let p = pontos
    p--
    setPontos(p)
  }

  return (
    <div className="h-screen">
      <div className="w-full bg-blue-800 py-5 px-5">
        <h1 className="font-medium text-white">Autoavaliação de Soft Skills</h1>
      </div>

      <div className="max-w-xs mx-auto my-14 space-y-5 text-center h-80">
        {questions[aux]}

        <div className="flex bottom-0 justify-around">
          <Button // a cada "sim" pontuação perde 1
            title="Sim"
            func={() => {
              nextQuestion()
              scoreQuestion()
              subtrairPontos()
            }}
          />
          <Button // a cada "não" pontuação permanece a mesma
            title="Não"
            func={() => {
              nextQuestion()
              scoreQuestion()
            }}
          />
        </div>

      </div>

      <Anchor link="/formularios" title="Começar" className="my-44 w-fit mx-auto block" />
      <div className="max-w-xs mx-auto bottom-0">
        <a href="/" className="flex items-center gap-2 text-sm w-fit">
          <ArrowLeft width={20} />
          <span>Menu Principal</span>
        </a>
      </div>

      {cont >= 10 && (
        <>
          {redirect(`/results?VT=${pontos}`)}
        </> // redireciona e envia VT para '/results' após question = 10
      )}

    </div>
  )

}