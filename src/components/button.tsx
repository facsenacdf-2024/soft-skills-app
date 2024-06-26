interface Props {
  className?: string,
  title: string,
  func: () => void
}

const Button = (props: Props) => {
  return (
    <button onClick={props.func}
      className={`bg-blue-800 hover:bg-blue-900 text-white text-sm font-medium py-2 px-7 rounded-full ${props.className}`}>
      <span>{props.title}</span>
    </button>
  )
}

export default Button