'use client';
import Anchor from "@/components/anchor";
import Header from "@/components/header";

export default function InteligenciaEmocional() {
  return (
    <>
      <Header page="Inteligência Emocional" />

      <div className="max-w-xs mx-auto my-14 space-y-10 text-xl leading-6">
        <p>
          Essa <span className="font-semibold text-blue-800">Autoavaliação</span> levará menos de 5 minutos
        </p>
        <p>
          Serão apresentadas 10 situações. Leia com atenção e marque a
          alternativa que melhor descreve seu comportamento.
        </p>
        <p>
          Suas respostas serão mantidas em sigilo.
        </p>

      </div>

      <Anchor title="Começar" link="/formularios" className="max-w-xs w-full text-center mx-auto block my-20" />
    </>
  )
}