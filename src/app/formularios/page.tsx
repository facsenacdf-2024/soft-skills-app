'use client'
import Button from "@/components/button";
import { redirect } from "next/navigation";
import { useState, useEffect } from "react";
import quiz from "../questions.json"; // importando o json com as perguntas
import Header from "@/components/header";

const questions = quiz.map((c: any) => {
  return (
    <div className="h-20" key={c.id}>
      <p>{c.question}</p>
    </div>
  )
})

export default function Perguntas() {
  const [cont, setCont] = useState<number>(0)
  const [aux, setAux] = useState<number>(1)
  const [pontos, setPontos] = useState<number>(10)
  const title = quiz[0].title

  useEffect(() => {}, [aux, cont, pontos])

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
    <>
      <Header page={title!} /> 

      <div className="max-w-xs mx-auto my-14 text-center">
        {questions[aux]}

        <div className="flex justify-evenly items-center my-20">
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
        <div className="w-full h-2 bg-blue-100 rounded-full">
          <div className="bg-blue-800 h-2 rounded-full duration-300" style={{ width: `${cont * 10}%` }}></div>
        </div>
      </div>

      {cont >= 10 && (
        <>
          {redirect(`/results?VT=${pontos}`)}
        </> // redireciona e envia VT para '/results' após question = 10
      )}

    </>
  )

}