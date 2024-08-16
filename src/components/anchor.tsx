interface Props {
  className?: string,
  title: string,
  link: string
}

const Anchor = (props: Props) => {
  return (
    <a href={props.link}
      className={`bg-violet-500 hover:bg-violet-600 text-white font-semibold py-2.5 px-7 rounded-xl ${props.className}`}>
      <span>{props.title}</span>
    </a>
  )
}

export default Anchor