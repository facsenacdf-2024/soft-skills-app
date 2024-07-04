interface Props {
  className?: string,
  title: string,
  link: string
}

const Anchor = (props: Props) => {
  return (
    <a href={props.link}
      className={`bg-blue-800 hover:bg-blue-900 text-white font-semibold py-2.5 px-7 max-w-72 rounded-xl ${props.className}`}>
      <span>{props.title}</span>
    </a>
  )
}

export default Anchor