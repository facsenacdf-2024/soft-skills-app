import { Menu } from "lucide-react"

type Props = {
  page: string
}

const Header = (props: Props) => {
  return (
    <div className="w-full bg-blue-800 py-4">
      <div className="px-5 flex gap-5 items-center">
        <button> {/* Este botão não faz nada por enquanto */}
          <Menu className="text-neutral-50 size-9" />
        </button>
        <h1 className="text-neutral-50 font-medium text-lg">{props.page}</h1>
      </div>
    </div>
  )
}

export default Header