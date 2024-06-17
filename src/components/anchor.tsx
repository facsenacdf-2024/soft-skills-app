interface Props {
  className?: string,
  title: string,
  link: string
}

const Anchor = (props: Props) => {
  return (
    <a href={props.link}
      className={`bg-blue-800 hover:bg-blue-900 text-white text-sm font-medium py-1.5 px-7 rounded-full ${props.className}`}>
      <span>{props.title}</span>
    </a>
  )
}

export default Anchor