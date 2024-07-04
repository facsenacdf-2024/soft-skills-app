interface Props {
  className?: string,
  title: string,
  func: () => void
}

const Button = (props: Props) => {
  return (
    <button onClick={props.func}
      className={`bg-blue-100 hover:bg-blue-900 text-blue-800 hover:text-white font-medium py-2 px-7 min-w-32 rounded-xl ${props.className}`}>
      <span>{props.title}</span>
    </button>
  )
}

export default Button