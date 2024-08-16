interface Props {
  title: string | JSX.Element,
  className?: string,
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'],
  func?: () => void
}

const Button = (props: Props) => {
  return (
    <button onClick={props.func} type={props.type}
      className={`${props.className} bg-violet-100 hover:bg-violet-500 text-violet-600 hover:text-white font-medium py-2 px-7 min-w-32 rounded-xl`}>
      <span>{props.title}</span>
    </button>
  )
}

export default Button