'use client'
import { Menu } from "lucide-react"
import { useEffect, useRef, useState } from "react"

type Props = {
  page: string
}

const Header = (props: Props) => {
  const [show, setShow] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Fechar o menu apertando ESC
    const handleKeyDown = (e: KeyboardEvent) => { if (e.key === "Escape") setShow(false); }

    document.addEventListener("keydown", handleKeyDown)
    // Remover o evento quando o componente é desmontado
    return () => document.removeEventListener("keydown", handleKeyDown) 
  }, []);

  useEffect(() => {
    // Fechar menu ao clicar fora
    const handleClickOutside = (e: any) => { if (!menuRef.current?.contains(e.target as Node)) setShow(false); }

    document.addEventListener("mousedown", handleClickOutside)
    // Remover o evento quando o componente é desmontado
    return () => document.removeEventListener("mousedown", handleClickOutside)
  })

  return (
    <>
      <div className="w-full bg-blue-800 py-4 sticky top-0">
        <div className="px-5 flex gap-5 items-center">
          <button onClick={() => setShow(!show)}>
            <Menu className="text-neutral-50 size-9" />
          </button>
          <h1 className="text-neutral-50 font-medium text-lg">{props.page}</h1>
        </div>
      </div>

      <div ref={menuRef} className={`h-screen max-w-60 w-full fixed top-0 left-0 bg-blue-800 z-50 duration-500
          ${show ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col justify-center items-start px-5 my-20 divide-y divide-orange-400">
          <a href="/" className="text-neutral-50 text-lg py-1 w-full hover:underline underline-offset-2">
            Início
          </a>
          <a href="/quiz/inteligencia-emocional" className="text-neutral-50 text-lg py-1 w-full hover:underline underline-offset-2">
            Inteligência Emocional
          </a>
        </div>
      </div>
    </>
  )
}

export default Header