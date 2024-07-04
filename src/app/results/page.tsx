'use client'
import React from 'react'
import { useSearchParams } from 'next/navigation'
import Anchor from '@/components/anchor'
import Header from '@/components/header'

function Results() {

  const searchParams = useSearchParams() //acessa os parametros da URL

  const VT = searchParams.get('VT') ? searchParams.get('VT') : 0 //Recupera VT

  return (
    <>
      <Header page="Resultados" />

      <div className="max-w-xs mx-auto my-14 text-left">
        <h1 className='text-center'>
          Sua pontuação foi
        </h1>
        <p className='font-bold text-center text-blue-800 text-2xl'>{VT} / 10</p>
        <form className='my-5 space-y-5'>
          <h1 className='leading-5'>Insira seu email para receber seu feedback</h1>
          <input type="email" name="email" id="email" placeholder='Insira seu email aqui'
            className='border border-blue-800 rounded-lg py-1.5 text-center w-full focus:outline-none placeholder:font-light' />
          <button className='bg-blue-800 hover:bg-blue-900 text-white font-medium py-2 px-7 min-w-32 mx-auto block my-5 w-fit rounded-xl'>
            Receber meu feedback
          </button>
        </form>

        <p className='my-10'>
          Inteligência emocional abrange o reconhecimento e controle das emoções,
          a capacidade de automotivação, habilidades sociais e empatia. Para desenvolver...
        </p>
        <Anchor title="Ver sobre" link="#" className="text-center my-10 w-full block" />
      </div>
    </>
  )
}

export default Results