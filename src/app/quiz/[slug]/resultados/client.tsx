"use client";
import { redirect } from "next/navigation";
import Anchor from "@/components/anchor";
import Header from "@/components/header";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Check, TriangleAlert, Undo2 } from "lucide-react";
import { sendResults } from "@/actions/results.action";
import { sendResultsSchema, SendResultsValues } from "@/lib/validation";
import { Form, FormField, FormItem, FormMessage, FormControl } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";

export default function Client({
  quiz,
}: Readonly<{ quiz: Quiz }>) {
  const [points, setPoints] = useState<number>(0);
  const [success, setSuccess] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const form = useForm({
    resolver: zodResolver(sendResultsSchema),
    defaultValues: { email: "" },
  });

  async function onSubmit(data: SendResultsValues) {
    try {
      const resp = await sendResults(data.email, points);
      setSuccess(resp.success);
      setMessage(resp.message);
    } catch (error: any) {
      setSuccess(false);
      setMessage('Algo deu errado. Tente novamente mais tarde.');
    }
  }

  useEffect(() => {
    setMessage('') // Limpar mensagem ao alterar email
  }, [form.watch("email")]);

  useEffect(() => {
    const lastPoints = localStorage.getItem("lastPoints");
    if (!lastPoints) {
      redirect("/quiz/" + quiz?.slug + "/iniciar");
    }

    const parsedData = JSON.parse(lastPoints);
    const quizResult = parsedData.find(
      (result: LastPoints) => result.qID === quiz?.id
    );

    if (quizResult) {
      setPoints(quizResult.lastPoints);
    } else {
      return redirect("/quiz/" + quiz?.slug + "/iniciar");
    }
  }, [quiz?.id, quiz?.slug]);

  return (
    <>
      <Header />

      <div className="mx-auto py-32 max-w-xs sm:max-w-4xl sm:px-5">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-violet-500 w-max ">{quiz.title}</h1>
          <h2 className="text-2xl font-semibold text-neutral-400">Autoavalição</h2>
        </div>
        <h1 className="text-xl font-medium text-neutral-800">Sua pontuação</h1>
        <p className="text-sm font-medium text-neutral-600">
          Quanto mais próximo de {quiz.questions.length}, melhor foi sua pontuação.
        </p>
        <p className="font-light text-violet-500 text-7xl my-4">
          {points}
        </p>
        <p className="text-neutral-600 text-lg">/ {quiz.questions.length}</p>
        <Link
          href={`/quiz/` + quiz.slug + `/iniciar`}
          className="text-violet-500 w-fit my-4 mb-10 flex items-center gap-1 hover:underline">
          <Undo2 className="size-4" />
          Refazer teste
        </Link>

        {/*
          Pra entender como funciona o form do shadcn
          https://ui.shadcn.com/docs/components/form
        */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mb-20" noValidate>
            <h1 className="leading-5 font-medium text-neutral-800">
              Deseja receber seus resultados?
            </h1>
            <p className="text-sm text-neutral-600 mb-3">Receba seu resultado por email</p>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormMessage />
                  <FormControl >
                    <Input
                      type="email"
                      placeholder="Insira seu email aqui"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <button
              className="bg-violet-500 hover:bg-violet-600 text-white font-medium py-2 px-7 min-w-32 mx-auto block my-5 w-fit rounded-full">
              Enviar feedback
            </button>
            {!success && message &&  // Sucesso
              <p className="text-red-600 bg-red-100 font-medium py-2.5 px-5 rounded-md flex items-center justify-between">
                {message}
                <TriangleAlert className="size-4" />
              </p>
            }
            {success && message &&  // Erro
              <p className="text-green-600 bg-green-100 font-medium py-2.5 px-5 rounded-md flex items-center justify-between">
                {message}
                <Check className="size-4" />
              </p>
            }
          </form>
        </Form>

        <div className="col-span-2 lg:mt-10">
          <p className="my-10">
            Inteligência emocional abrange o reconhecimento e controle das
            emoções, a capacidade de automotivação, habilidades sociais e
            empatia. Para desenvolver...
          </p>
          <Anchor
            title="Ver sobre"
            link="#"
            className="text-center my-10 w-full block"
          />
        </div>

      </div >
    </>
  );
}
