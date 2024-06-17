'use client';
import { ArrowLeft } from "lucide-react";
import Button from "../../components/button";

export default function InteligenciaEmocional() {
  return (
    <>
      <div className="w-full bg-blue-800 py-5 px-5">
        <h1 className="font-medium text-white">Autoavaliação de Soft Skills</h1>
      </div>

      <div className="max-w-xs mx-auto my-14 space-y-5 text-center">
        <h1 className="text-xl">Autoavaliação:<br />Inteligência Emocional</h1>
        <p>
          A seguir serão apresentados 10 situações presentes no nosso dia a dia.
          Leia cada uma com atenção e marque a opção que melhor descreve o seu comportamentos nessas situações.
        </p>
        <p>
          Suas respostas serão mantidas em sigilo.
        </p>
        <p>
          Vamos começar?
        </p>

        <a href="/results" className="text-xs text-blue-500">TEMP: ir para pág. resultados</a>
      </div>
      <Button title="Começar" func={() => { }} className="my-20 w-fit mx-auto block" />
      <div className="max-w-xs mx-auto mt-32">
        <a href="/" className="flex items-center gap-2 text-sm w-fit">
          <ArrowLeft width={20}/>
          <span>Menu Principal</span>
        </a>
      </div>
    </>
  )
}