"use client";
//imports next e react
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

import { Check, TriangleAlert, Undo2 } from "lucide-react";

//imports para email
import { sendResults } from "@/actions/results.action";
import { sendResultsSchema, SendResultsValues } from "@/lib/validation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

//componentes
import Header from "@/components/header";
import { Input } from "@/components/ui/input";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel"
import { Form, FormField, FormItem, FormMessage, FormControl } from "@/components/ui/form";

export default function Client({
  quiz,
}: Readonly<{ quiz: Quiz }>) {
  const [points, setPoints] = useState<number>(0);
  const [success, setSuccess] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [feedbacks, setFeedbacks] = useState<{ [key: string]: string | number }[]>([]);
  const [feedbackYes, setFeedbackYes] = useState<string[]>([]);

  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!api) {
      return
    }

    setCurrent(api.selectedScrollSnap() + 1)

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  const form = useForm({
    resolver: zodResolver(sendResultsSchema),
    defaultValues: { email: "" },
  });

  async function onSubmit(data: SendResultsValues) {
    // Quantidade de questões, que é o total de pontos
    const totalPoints = quiz.questions.length;
    setLoading(true);

    try {
      const resp = await sendResults(data.email, quiz.title, points, totalPoints, feedbacks);
      setLoading(false);
      setSuccess(resp.success);
      setMessage(resp.message);
    } catch (error: any) {
      setLoading(false);
      setSuccess(false);
      setMessage('Algo deu errado. Tente novamente mais tarde.');
    }
  }

  function recoverFeedback() {
    let feedback = [];
    if (localStorage.finalFeedback) {
      feedback = JSON.parse(localStorage.finalFeedback)

      //Baseado no valor de cada feedback ele retorna alguma informação
      //A princípio armazenado em options no json
      feedback.forEach((resp: number, id: any) => {

        //Conteúdo de feedbacks marcados com "Sim"
        if (resp === 1) {
          const questionId = quiz.questions[id].id;
          const questionTitle = quiz.questions[id].question;
          const questionFeedback = quiz.questions[id].feedback;

          //Defini os feedbacks que apareceram no carrossel
          setFeedbackYes(prevFeedbacksYes => [
            ...prevFeedbacksYes,
            questionFeedback,
          ])

          //Defini conteúdo de feedbacks enviados por e-mail
          setFeedbacks(prevFeedbacks => [
            ...prevFeedbacks,
            {
              ['questionId']: questionId,
              ['questionTitle']: questionTitle,
              ['questionFeedback']: questionFeedback
            },
          ]);

        }

      });
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

    recoverFeedback();
  }, [quiz?.id, quiz?.slug]);

  return (
    <>
      <Header />

      <div className="mx-auto py-32 max-w-xs sm:max-w-4xl sm:px-5">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-blue-700 w-max ">{quiz.title}</h1>
          <h2 className="text-2xl font-semibold text-neutral-400">Autoavalição</h2>
        </div>
        <div className="flex flex-col items-start">
          <h1 className="text-xl font-medium text-neutral-800">Sua pontuação</h1>
          <p className="text-sm text-neutral-600">
            Quanto mais próximo de {quiz.questions.length}, melhor foi sua pontuação.
          </p>
          <p className="font-light text-blue-700 text-7xl my-4">
            {points}
          </p>
          <p className="text-neutral-600 text-lg">/ {quiz.questions.length}</p>
          <Link
            href={`/quiz/` + quiz.slug + `/iniciar`}
            className="text-blue-700 w-fit my-4 mb-4 flex items-center gap-1 hover:underline">
            <Undo2 className="size-4" />
            Refazer teste
          </Link>

          <hr className="my-4 w-full" />

          <h1 className="text-xl font-medium text-neutral-800">Feedback</h1>

          <p className="text-sm text-neutral-600">
            Essas foram as situações que você respondeu sim e que precisa
            desenvolver melhor para fortalecer sua Inteligência Emocional
          </p>

          <Carousel
            className="
              border border-blue-600 rounded-lg max-w-full
              flex flex-col gap-4 mx-auto p-4 my-7
            "
            opts={{ loop: true }}
            setApi={setApi}
          >
            <CarouselContent>
              {feedbacks.map((feedback) => (
                <CarouselItem key={feedback.questionId}>
                  <p className="font-medium mb-2">
                    {feedback.questionId + ". " + feedback.questionTitle}
                  </p>
                  <hr />
                  <p className="text-sm mt-2">
                    {feedback.questionFeedback}
                  </p>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />

            {/* Marcadores do feedback selecionado */}
            <ul className="flex justify-center gap-2">
              {feedbackYes.map((feedback, index) => (
                <li
                  key={feedback}
                  className={`w-2 h-2 ${index + 1 == current ? 'bg-blue-700' : 'bg-neutral-400'} rounded-xl`}
                />
              ))}
            </ul>
          </Carousel>
        </div>

        <hr />

        {/*
          Pra entender como funciona o form do shadcn
          https://ui.shadcn.com/docs/components/form
        */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mb-20 mt-7" noValidate>
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
                      className="focus-visible:ring-blue-500"
                      type="email"
                      placeholder="Insira seu email aqui"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <button
              className="bg-blue-600 hover:bg-blue-600 text-white font-medium py-2 px-7 min-w-32 mx-auto block my-5 w-fit rounded-full">
              Enviar feedback
            </button>
            {loading &&
              <div className="border-4 border-blue-500 border-r-transparent rounded-full size-9 mx-auto animate-spin"></div>
            }
            {!success && message && // Erro
              <p className="text-red-600 bg-red-100 font-medium py-2.5 px-5 rounded-md flex items-center justify-between flex-wrap">
                {message}
                <TriangleAlert className="size-4 min-w-4" />
              </p>
            }
            {success && message && // Sucesso
              <p className="text-green-600 bg-green-100 font-medium py-2.5 px-5 rounded-md flex items-center justify-between flex-wrap">
                {message}
                <Check className="size-4 min-w-4" />
              </p>
            }
          </form>
        </Form>
      </div >
    </>
  );
}
