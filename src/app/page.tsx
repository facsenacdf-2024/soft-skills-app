import Github from "@/assets/icons/github";
import CardForm from "@/components/cardForm";
import Header from "@/components/header";
import { Brain, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <main className="pt-20 pb-36 px-0">
        <div className="fixed inset-0 -z-10 h-screen w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#0064c3_100%)]"></div>
        <div className="max-w-xs sm:max-w-2xl mx-auto">
          <div className="text-center space-y-7 mb-72 sm:mt-20">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-blue-700">
              Soft Skills Check
            </h1>
            <p className="text-lg sm:text-xl text-neutral-600 font-medium">
              Questionários de autoavaliação para ajudá-lo(a) a desenvolver suas habilidades comportamentais.
            </p>
          </div>
          <div className="px-6 py-4 pb-7 mb-20 bg-white border rounded-lg space-y-4 relative">
            <Image src={'/mountain.svg'} width={350} height={350} alt="Mulher com mochila caminha em direção a uma grande árvore, com montanhas suaves e sol ao fundo, representando a busca por seus objetivos pessoais" className="w-80 absolute top-0 right-0 -translate-y-full -z-10" />
            <div className="flex items-center gap-3">
              <h2 className="font-semibold text-xl text-blue-600 sm:whitespace-nowrap whitespace-normal">Teste de Autoavaliação de SoftSkills</h2>
              <hr className="w-full border-blue-100" />
            </div>
            <div className="flex flex-col sm:flex-row gap-4">

              <CardForm
                icon={<Brain className="size-4" />}
                title="Inteligência Emocional"
                description="Inteligência emocional é um conceito em psicologia que descreve a capacidade de reconhecer e avaliar os seus próprios sentimentos e os dos outros, assim como a capacidade de lidar com eles."
                url="/autoavaliacao/inteligencia-emocional"
              />

              <CardForm
                icon={<Users className="size-4" />}
                title="Estilos de Liderança"
                description="Existem várias abordagens de liderança amplamente reconhecidas, mas de acordo com o autor Kurt Lewin, os estilos mais clássicos de liderança são: democrática, liberal e autocrática. Assim, o estilo democrático enfatiza a participação, o liberal permite autonomia e o autocrático centraliza o poder decisório."
                url="/autoavaliacao/estilos-de-lideranca"
              />

              {/* <div className="bg-blue-50 border block border-blue-100 rounded-md w-full hover:bg-blue-100 duration-300">
                <div className="flex items-center gap-2 text-blue-700 px-4 py-2.5">
                  <Brain className="size-4" />
                  <h3 className="min-w-max">
                    Inteligência Emocional
                  </h3>
                </div>

                <hr className="border-blue-100" />

                <p className="text-sm px-4 py-2.5 text-neutral-700 h-36 overflow-y-auto">
                  Inteligência emocional é um conceito em psicologia que descreve a capacidade de
                  reconhecer e avaliar os seus próprios sentimentos e os dos outros, assim como a
                  capacidade de lidar com eles.
                </p>
                <div className="relative">
                  <p className="absolute right-0 -bottom-5 text-sm text-blue-600 px-4 py-2.5">2min</p>
                  <Link href={"/autoavaliacao/inteligencia-emocional"}
                    className="block text-center bg-white border-2 border-black w-[140px] mx-auto mb-4 py-1">
                    Começar teste</Link>
                </div>
              </div> */}

              {/* <Link href={"/autoavaliacao/estilos-de-lideranca"}
                className="bg-blue-50 border block border-blue-100 rounded-md w-full hover:bg-blue-100 duration-300">
                <div className="flex items-center gap-2 text-blue-700 px-4 py-2.5">
                  <Users className="size-4" />
                  <h3>
                    Estilos de Liderança
                  </h3>
                </div>

                <hr className="border-blue-100" />

                <p className="text-sm px-4 py-2.5 text-neutral-700 h-36 overflow-y-auto">
                  Existem várias abordagens de liderança amplamente reconhecidas, mas de acordo com o
                  autor Kurt Lewin, os estilos mais clássicos de liderança são: democrática, liberal
                  e autocrática. Assim, o estilo democrático enfatiza a participação, o liberal permite
                  autonomia e o autocrático centraliza o poder decisório.
                </p>
                <p className="text-sm text-end text-blue-600 px-4 py-2.5">2min</p>
              </Link> */}
            </div>
          </div>

          <div className="text-neutral-600 text-xs text-center sm:text-sm w-full mb-10">
            <p>&copy; 2024 Soft Skills Check. Todos os direitos reservados.</p>
            <p>Faculdade de Tecnologia e Inovação Senac DF</p>
          </div>
          <Link
            href={'https://github.com/senac-volunteers/soft-skills-app'}
            target="_blank"
            referrerPolicy="no-referrer"
            className="w-fit block mx-auto"
          >
            <Github className="size-5 text-neutral-700" />
          </Link>
        </div>
      </main>
    </>
  );
}