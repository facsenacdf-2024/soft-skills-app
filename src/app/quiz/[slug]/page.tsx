import Anchor from "@/components/anchor";
import Header from "@/components/header";
import quizzes from "../../quizzes.json"
import { redirect } from "next/navigation";

export default function Page({ params }: Readonly<{ params: { slug: string } }>) {
  const quiz = quizzes.find((c: any) => c.slug === params.slug) // Busca o quiz pelo slug

  if (!quiz) {
    return redirect('/')
  }

  return (
    <>
      <Header page={quiz.title} />

      <div className="max-w-xs mx-auto my-14 space-y-10 text-xl leading-6">
        <p>
          Essa <span className="font-semibold text-blue-800">Autoavaliação</span>{' '}
          levará em torno de {quiz.duration} minutos.
        </p>

        <p>{quiz.description}</p>

        <p className="text-base text-neutral-500">
          Suas respostas serão mantidas em sigilo.
        </p>
      </div>

      <Anchor title="Começar" link="/quiz/inteligencia-emocional/iniciar" className="max-w-xs w-full text-center mx-auto block my-20" />
    </>
  )
}