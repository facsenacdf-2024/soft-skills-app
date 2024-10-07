'use client'
import { Brain, Building2, ChevronDown } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const Header = () => {
  return (
    <header className="fixed top-0 left-1/2 -translate-x-1/2 max-w-xl w-full z-50">
      {/* Desktop menu */}
      <div
        className="
        bg-white/20 backdrop-blur border m-6 py-2 pl-4 pr-3 rounded-full 
          hidden sm:flex justify-between items-center w-full mx-auto
        ">
        <Link href={"/"}>
          <Image src="/logo.svg" width={36} height={36} alt="Logo" className="size-9" />
        </Link>
        <ul className="flex gap-2 font-medium text-sm">
          <li className="group">
            <div className="flex items-center gap-1 px-3 py-1.5 hover:bg-neutral-50 rounded-md cursor-pointer">
              <p>Quiz</p>
              <ChevronDown className="size-4 translate-y-0.5 group-hover:rotate-180 duration-300" />
            </div>
            <div
              className="
                absolute mt-3 w-max rounded-md bg-blue-50 border border-blue-100 p-5 space-y-3 -translate-x-7 translate-y-3 invisible opacity-0
                group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible duration-300
              ">
              <h3 className="font-medium text-blue-700">Quizzes disponíveis</h3>
              <hr className="border-blue-100" />
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <Link href="/quiz/inteligencia-emocional"
                    className="w-full flex items-center gap-2 px-5 py-2 rounded-sm text-blue-600 hover:bg-blue-100">
                    <Brain className="size-4" />
                    <span>Inteligência Emocional</span>
                  </Link>
                </li>
                <li className="flex items-center gap-2">
                  <Link href="/quiz/tipos-de-lideranca"
                    className="w-full flex items-center gap-2 px-5 py-2 rounded-sm text-blue-600 hover:bg-blue-100">
                    <Building2 className="size-4" />
                    <span>Tipos de Liderança</span>
                  </Link>
                </li>
              </ul>
            </div>
          </li>
          <li>
            <Link href={"/sobre"}
              className="px-3 py-1.5 block hover:bg-neutral-100 rounded-md cursor-pointer">
              Sobre
            </Link>
          </li>
          <li>
            {/* TODO: Adicionar quando for criado o login
            <Link href={"/login"}
              className="px-6 py-2 ml-4 block bg-blue-500 text-white hover:bg-blue-600 rounded-full cursor-pointer">
              Entrar
            </Link> */}
          </li>
        </ul>
      </div>

      {/* Mobile menu */}
      <div className="sm:hidden inline group absolute top-0 right-0">
        <div className="bg-white border rounded-md p-2 m-4 w-fit">
          <Image src="/logo.svg" width={48} height={48} alt="Logo" className="min-w-12" />
        </div>
        <div
          className="
            absolute w-max rounded-md bg-blue-50 border border-blue-100 p-5 space-y-3 -translate-x-0 translate-y-0 invisible opacity-0
            group-hover:opacity-100 group-hover:-translate-x-2/3 group-hover:visible duration-300 group-hover:z-50
          ">
          <Link href={"/"}
            className="font-medium text-blue-700 block">
            Início
          </Link>

          <hr className="border-blue-100" />

          <Link href={"/sobre"}
            className="font-medium text-blue-700 block">
            Sobre
          </Link>

          <hr className="border-blue-100" />

          <h3 className="font-medium text-blue-700">Quizzes disponíveis</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <Link href="/quiz/inteligencia-emocional"
                className="w-full flex items-center gap-2 px-5 py-2 rounded-sm text-blue-600 hover:bg-blue-100">
                <Brain className="size-4" />
                <span>Inteligência Emocional</span>
              </Link>
            </li>
            <li className="flex items-center gap-2">
              <Link href="/quiz/tipos-de-lideranca"
                className="w-full flex items-center gap-2 px-5 py-2 rounded-sm text-blue-600 hover:bg-blue-100">
                <Building2 className="size-4" />
                <span>Tipos de Liderança</span>
              </Link>
            </li>
          </ul>


          {/* TODO: Adicionar quando for criado o login
          <Link href={"/login"}
            className="px-6 py-2 ml-4 !mt-8 text-center block bg-blue-500 text-white hover:bg-blue-600 rounded-full cursor-pointer">
            Entrar
          </Link> */}
        </div>
      </div>
    </header >
  )
}

export default Header