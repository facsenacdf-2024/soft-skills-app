import React from 'react'
import { ArrowLeft } from 'lucide-react'
import Anchor from '../components/anchor'

const Results = () => {
  return (
    <>
    <div className="w-full bg-blue-800 py-5 px-5">
      <h1 className="font-medium text-white">Resultados</h1>
    </div>

    <div className="max-w-xs mx-auto my-14 space-y-5 text-left">
      <h1 className='font-semibold'>
        Seu score no teste foi de 7 pontos. Quanto mais próximo de 10 melhor é sua Inteligência Emocional!
      </h1>
      <h2 className='font-semibold'>
        Saiba mais sobre  Inteligência Emocional
      </h2>
      <p>
        Inteligência emocional abrange o reconhecimento e controle das
        emoções, a capacidade de auto-motivação, habilidades sociais
        e empatia. Para desenvolvê-la, pratique autoconhecimento,
        controle emocional, comunicação e resolução de conflitos, além
        de demonstrar compaixão pelo próximo.
      </p>

    </div>
    <Anchor title="Refazer" link="/inteligencia-emocional" className="my-20 w-fit mx-auto block" />
    <div className="max-w-xs mx-auto mt-32">
      <a href="/" className="flex items-center gap-2 text-sm w-fit">
        <ArrowLeft width={20}/>
        <span>Menu Principal</span>
      </a>
    </div>
  </>
  )
}

export default Results