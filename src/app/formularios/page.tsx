'use client'
import Button from "@/components/button";
import { redirect } from "next/navigation";
import { useState, useEffect } from "react";
import quiz from "../questions.json"; // importando o json com as perguntas
import Header from "@/components/header";
import { ChevronLeft, ChevronRight } from "lucide-react";

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

  // console.log(`Questão inicial: ${aux}`);// consoles para debug de questões
  // console.log(`valor resp: ${quiz[aux].resp}`);
  // console.log(typeof(quiz[aux].styl));
  
  useEffect(() => { }, [aux, cont, pontos])

  function nextQuestion() {
    let a = aux

    if (aux < 10) {
      a++ //avança uma questão
      setAux(a)
    }
  }

  function currentQuestion(act: number) {
    let a = aux    

    if (act == 1 && aux < 10) {
      a++ //avança uma questão 
      setAux(a)
    }

    if (act == 0 && aux > 1) {
      a-- //volta uma questão
      setAux(a)
    }
  }

  function scoreQuestion() {

    if (quiz[aux].resp == 0) {//N contabiliza questões já respondidas
      let c = cont
      c++
      setCont(c)
    }

  }

  function subtrairPontos() {
    let p = pontos
    p--
    quiz[aux].resp = 1 //valor para 'sim'
    setPontos(p)
  }

  function permanecerPontos() {
    if (quiz[aux].resp == 1) { //caso a quiz[aux].resp seja alterada, equilibra a pontuação
      let p = pontos
      p++ 
      setPontos(p)
    }

    quiz[aux].resp = 2 //valor para 'não'
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
              scoreQuestion()
              subtrairPontos()
              nextQuestion() //Após todos os valores pendentes serem atribuídos aciona a função nextQuestion 
            }}
            className={quiz[aux].resp == 1? '!bg-blue-800 !text-white' : ' '}
          />
          <Button // a cada "não" pontuação permanece a mesma
            title="Não"
            func={() => {
              scoreQuestion()
              permanecerPontos()
              nextQuestion()
            }}
            className={quiz[aux].resp == 2 ? '!bg-blue-800 !text-white' : ' '}
          />
        </div>
        <div className="w-full h-2 bg-blue-100 rounded-full">
          <div className="bg-blue-800 h-2 rounded-full duration-300" style={{ width: `${cont * 10}%` }}></div>
        </div>
      </div>

      <div className="max-w-xs mx-auto mt-64 flex justify-between">
        <Button
          title={<ChevronLeft size={60} strokeWidth={4} />}
          func={() => {
            currentQuestion(0)
          }}
          className="rounded-2xl w-20 flex justify-center"
        />

        <Button
          title={<ChevronRight size={60} strokeWidth={4} />}
          func={() => {
            currentQuestion(1)
          }}
          className="rounded-2xl w-20 flex justify-center"
        />

      </div>


      {cont >= 10 && (
        <>
          {redirect(`/results?VT=${pontos}`)}
        </> // redireciona e envia VT para '/results' após question = 10
      )}

    </>
  )

}