'use client'
import { ArrowLeft } from "lucide-react";
import Anchor from "@/components/anchor";
import Button from "@/components/button"
import { redirect } from "next/navigation";
import { useState } from "react";

export default function perguntas() {

    let VT = 10 //Valor total pontos
    let question = 1
    let [count, setCount] = useState()

    // console.log('Retornei, tá tranquilo')
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
                        VT--
                        question++
                        console.log(VT);//visualizar pontuação atual
                        console.log('questão ' + question);//visualizar questão atual
                        question != 10 ? setCount("") : setCount(question)
                    }}
                />
                <Button // a cada "não" pontuação permanece a mesma
                    title="Não"
                    func={() => {
                        VT = VT
                        question++
                        console.log(VT);
                        console.log('questão ' + question);
                        question != 10 ? setCount("") : setCount(question)
                    }}
                />

                <br />
                <a href="/results" className="text-xs text-blue-500">TEMP: ir para pág. resultados</a>

            </div>
            <Anchor link="/formularios" title="Começar" className="my-44 w-fit mx-auto block" />
            <div className="max-w-xs mx-auto mt-32">
                <a href="/" className="flex items-center gap-2 text-sm w-fit">
                    <ArrowLeft width={20} />
                    <span>Menu Principal</span>
                </a>
            </div>

            {count && (
                <>{redirect("/results")}</> //redireciona a pagina após question = 10
            )}

        </div>
    )

}