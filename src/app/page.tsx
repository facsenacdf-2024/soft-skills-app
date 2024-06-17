'use client';

import Anchor from "./components/anchor";

export default function Home() {
  return (
    <main>
      <div className="max-w-xs mx-auto my-10">
        <h1 className="font-semibold text-center">Faculdade de Tecnologia e Inovação SENAC DF</h1>
      </div>

      <div className="bg-blue-800 w-full py-4">
        <h1 className="text-center text-2xl italic font-medium text-white">Soft Skills Check</h1>
      </div>

      <section className="max-w-xs mx-auto my-7">
        <p className="text-center"> 
          Bem-Vindo(a) ao Aplicativo de Autoavaliação de Soft Skills!
          Nós disponibilizamos questionários de autoavaliação para
          ajudá-lo(a) a desenvolver suas habilidades interpessoais.
        </p>

        <Anchor link="/inteligencia-emocional" title="Iniciar" className="my-44 w-fit mx-auto block" />
      </section>
    </main>
  );
}