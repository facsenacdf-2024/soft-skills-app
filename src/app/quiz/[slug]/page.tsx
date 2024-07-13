import Anchor from "@/components/anchor";
import Header from "@/components/header";
import quizzes from "../../quizzes.json";
import { redirect } from "next/navigation";
import Image from "next/image";
import banner from "../../../image/hero-soft-skill.webp";

export default function Page({
  params,
}: Readonly<{ params: { slug: string } }>) {
  const quiz = quizzes.find((c: any) => c.slug === params.slug); // Busca o quiz pelo slug

  if (!quiz) {
    return redirect("/");
  }

  return (
    <>
      <Header page={quiz.title} />

      <section className="w-full">
        <div className="sm:grid grid-flow-row-dense grid-cols-5 md:mx-8 gap-2 lg:gap-16 xl:gap-20">
          <div className="col-span-2 md:max-w-xs text-xl md:text-sm lg:text-xl">
            <div className="md:h-[280px] md:py-16 max-sm:w-[320px] max-sm:mx-auto mt-10">
              <p>
                Essa{" "}
                <span className="font-semibold text-blue-800">
                  Autoavaliação
                </span>{" "}
                levará em torno de {quiz.duration} minutos.
              </p>
              <br />
              <p>{quiz.description}</p>
              <br />
              <p className="text-base text-neutral-500">
                Suas respostas serão mantidas em sigilo.
              </p>
            </div>
            <div>
              <Anchor
                title="Começar"
                link="/quiz/inteligencia-emocional/iniciar"
                className="max-w-xs w-full text-center mx-auto block my-20"
              />
            </div>
          </div>
          <div className="col-span-3 mt-10">
            <Image className="max-sm:hidden mx-auto w-3/4" src={banner} alt="" />
          </div>
        </div>
      </section>
    </>
  );
}
