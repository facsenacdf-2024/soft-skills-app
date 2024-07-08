'use client'
import { redirect } from 'next/navigation'
import Anchor from '@/components/anchor'
import Header from '@/components/header'
import quizzes from '../../../quizzes.json'
import { useEffect, useState } from 'react'

export default function Page({ params }: Readonly<{ params: { slug: string } }>) {
  const quiz = quizzes.find((c: any) => c.slug === params.slug) // Busca o quiz pelo slug
  const [points, setPoints] = useState(0)

  useEffect(() => {
    const lastPoints = localStorage.getItem("lastPoints")
    if (!lastPoints) {
      redirect('/quiz/' + quiz?.slug + '/iniciar')
    }

    const parsedData = JSON.parse(lastPoints)
    const quizResult = parsedData.find((result: LastPoints) => result.qID === quiz?.id)

    if (quizResult) {
      setPoints(quizResult.lastPoints)
    } else {
      return redirect('/quiz/' + quiz?.slug + '/iniciar')
    }

  }, [quiz?.id, quiz?.slug])

  if (!quiz) {
    return redirect('/')
  }

  return (
    <>
      <Header page="Resultados" />

      <div className="max-w-xs sm:max-w-sm mx-auto my-14 text-left">
        <h1 className='text-center'>
          Sua pontuação foi
        </h1>
        <p className='font-bold text-center text-blue-800 text-2xl'>{points} / {quiz.questions.length}</p>
        <p className='text-center text-sm my-3 font-medium text-neutral-600'>Quanto mais próximo de 10, melhor sua inteligência emocional</p>
        <form className='my-20 space-y-5'>
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

        <a href={`/quiz/` + quiz.slug + `/iniciar`} className='text-center text-blue-500 w-fit mx-auto block'>
          Refazer teste
        </a>
      </div>
    </>
  )
}