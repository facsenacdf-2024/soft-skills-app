'use client'
import { ArrowLeft } from "lucide-react";
import Anchor from "@/components/anchor";
import Button from "@/components/button"
import { redirect } from "next/navigation";
import { useState } from "react";

export default function perguntas() {

    let VT = 10 //Valor total pontos
    let question = 1 //Questão inicial
    let [count, setCount] = useState() //Recupera a ultima questão
    let [point, setPoint] = useState() //Recupera a pontuação final

    return (
        <div>
            <div className="w-full bg-blue-800 py-5 px-5">
                <h1 className="font-medium text-white">Autoavaliação de Soft Skills</h1>
            </div>

            <div className="max-w-xs mx-auto my-14 space-y-5 text-center">

                <p>
                    As perguntas estarão dispostas e serão alternadas, <b>neste mesmo campo</b>, a cada vez que o usuário retornar uma resposta, após 10 perguntas respondidas o questionário termina.
                </p>

                <Button // a cada "sim" pontuação perde 1
                    title="Sim"
                    func={() => {
                        VT--//-1 ponto
                        question++//atualiza questão atual
                        
                        question != 10 ? setCount("") : setCount(question)
                        question != 10 ? setPoint("") : setPoint(VT)
                    }}
                />
                <Button // a cada "não" pontuação permanece a mesma
                    title="Não"
                    func={() => {
                        VT = VT//+0 pontos
                        question++//atualiza questão atual
                    
                        question != 10 ? setCount("") : setCount(question)
                        question != 10 ? setPoint("") : setPoint(VT)
                    }}
                />

            </div>
            <Anchor link="/formularios" title="Começar" className="my-44 w-fit mx-auto block" />
            <div className="max-w-xs mx-auto mt-32">
                <a href="/" className="flex items-center gap-2 text-sm w-fit">
                    <ArrowLeft width={20} />
                    <span>Menu Principal</span>
                </a>
            </div>

            {count && (
                <>
                {redirect(`/results?VT=${point}`)}
                </> //redireciona e envia VT para '/results' após question = 10
            )}

        </div>
    )

}