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
import { useIsMobile } from "@/hooks/use-mobile";

export default function Client({
  quiz,
}: Readonly<{ quiz: Quiz }>) {
  const [points, setPoints] = useState<number>(0);
  const [success, setSuccess] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [feedbacks, setFeedbacks] = useState<{ [key: string]: string | number }[]>([]);
  const [higherPercentage, setHigherPercentage] = useState<string>('');
  const [autocratPercentage, setAutocratPercentage] = useState<number>(0);
  const [liberalPercentage, setLiberalPercentage] = useState<number>(0);
  const [democratPercentage, setDemocratPercentage] = useState<number>(0);

  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  const isMobile = useIsMobile();

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

      // Baseado no valor de cada feedback ele retorna alguma informação
      // A princípio armazenado em options no json
      feedback.forEach((resp: number, id: any) => {

        // Conteúdo de feedbacks marcados com "Sim"
        if (resp === 1) {
          const questionId = quiz.questions[id].id;
          const questionTitle = quiz.questions[id].question;
          const questionFeedback = quiz.questions[id].feedback;

          // Define o conteúdo de feedbacks enviados por e-mail
          setFeedbacks(prevFeedbacks => [
            ...prevFeedbacks,
            {
              ['questionId']: questionId,
              ['questionTitle']: questionTitle,
              ['questionFeedback']: questionFeedback
            },
          ]);
        };
      });
    };
  };

  function getLeadershipResults() {
    // Verifica se o tipo do quiz é 2 (multiple choice)
    // para dar continuidade na função
    if (quiz.type !== 2) return;

    const lastResults = localStorage.getItem("lastResults");
    if (!lastResults) redirect("/quiz/" + quiz?.slug + "/iniciar");

    // Transforma o plaintext armazenado no localStorage em JSON
    const parsedResults = JSON.parse(lastResults);

    if (parsedResults) {
      // Busca o quiz pelo ID armazenado no localStorage
      const quizResults = parsedResults.find(
        (result: LastResults) => result.qID === quiz?.id
      );

      if (quizResults) {
        const autocrat = quizResults.lastResult?.autocrat || 0;
        const liberal = quizResults.lastResult?.liberal || 0;
        const democrat = quizResults.lastResult?.democrat || 0;

        // Define o estilo mais respondido
        const higher = Math.max(autocrat, liberal, democrat);
        if (higher === autocrat) setHigherPercentage('autocrat');
        if (higher === liberal) setHigherPercentage('liberal');
        if (higher === democrat) setHigherPercentage('democrat');

        // Setar os percentuais de cada estilo
        setAutocratPercentage(autocrat / quiz.questions.length * 100);
        setLiberalPercentage(liberal / quiz.questions.length * 100);
        setDemocratPercentage(democrat / quiz.questions.length * 100);
      };
    };
  };

  function getPoints() {
    // Verifica se o tipo do quiz é 1 (sim ou não)
    // para dar continuidade à função
    if (quiz.type !== 1) return;

    const lastPoints = localStorage.getItem("lastPoints");
    if (!lastPoints) redirect("/quiz/" + quiz?.slug + "/iniciar");

    // Transforma o plaintext armazenado no localStorage em JSON
    const parsedPoints = JSON.parse(lastPoints);

    if (parsedPoints) {
      // Busca o quiz pelo ID armazenado no localStorage
      const quizResultPoints = parsedPoints.find(
        (result: LastPoints) => result.qID === quiz?.id,
      );

      if (quizResultPoints) setPoints(quizResultPoints.lastPoints);
    };

    if (quiz.type === 1) recoverFeedback();
  };

  useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  useEffect(() => {
    setMessage('') // Limpar mensagem ao alterar email
  }, [form.watch("email")]);

  useEffect(() => {
    getPoints();
    getLeadershipResults();
  }, [quiz?.id, quiz?.slug]);

  return (
    <>
      <Header />

      <div className="mx-auto py-32 max-w-xs sm:max-w-4xl sm:px-5">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-blue-700 w-max ">{quiz.title}</h1>
          <h2 className="text-2xl font-semibold text-neutral-400">Autoavaliação</h2>
        </div>
        <div className="flex flex-col items-start">
          {quiz.type === 1 && (
            <>
              <h1 className="text-xl font-medium text-neutral-800">Sua pontuação</h1>
              <p className="text-sm text-neutral-600">
                Quanto mais próximo de {quiz.questions.length}, melhor foi sua pontuação.
              </p>
              <p className="font-light text-blue-700 text-7xl my-4">
                {points}
              </p>
              <p className="text-neutral-600 text-lg">/ {quiz.questions.length}</p>
            </>
          )}

          {quiz.type === 2 && (
            <>
              <h1 className="text-xl font-medium text-neutral-800">Sua pontuação</h1>
              <div className="flex flex-col sm:flex-row justify-between w-full mt-4">
                <div className="flex-1">
                  <p className="text-neutral-600 text-lg">Autocrática</p>
                  <p className="font-light text-blue-700 text-5xl my-2 mb-5">
                    {autocratPercentage.toFixed(0)}%
                  </p>

                  <p className="text-neutral-600 text-lg">Liberal</p>
                  <p className="font-light text-blue-700 text-5xl my-2 mb-5">
                    {liberalPercentage.toFixed(0)}%
                  </p>

                  <p className="text-neutral-600 text-lg">Democrática</p>
                  <p className="font-light text-blue-700 text-5xl my-2 mb-5">
                    {democratPercentage.toFixed(0)}%
                  </p>
                </div>

                <div className="flex-1">
                  <p className="text-neutral-600 text-lg">Seu perfil de liderança</p>
                  <p className="font-light text-blue-700 text-5xl my-2 mb-5">
                    {higherPercentage === 'autocrat' && <>Autocrático</>}
                    {higherPercentage === 'liberal' && <>Liberal</>}
                    {higherPercentage === 'democrat' && <>Democrático</>}
                  </p>

                  <p className="my-4">
                    {higherPercentage === 'autocrat' && (
                      <>
                        Caracteriza-se por um controle centralizado e unilateral, onde
                        o líder toma todas as decisões importantes e define as direções
                        sem consulta ou colaboração com a equipe. Embora esse estilo
                        possa ser eficaz em situações em que a rapidez na tomada de
                        decisões é crucial ou onde a disciplina é necessária, ele também
                        apresenta desvantagens significativas.
                      </>
                    )}

                    {higherPercentage === 'liberal' && (
                      <>
                        O líder liberal permite que a equipe trabalhe de forma autônoma,
                        sem intervenção direta, confiando que os membros experientes e
                        competentes possam tomar suas próprias decisões e se autogerenciar.
                        Esse estilo de liderança funciona melhor com equipes qualificadas
                        e independentes, mas pode ser inadequado onde os membros precisam
                        de mais orientação e apoio.
                      </>
                    )}

                    {higherPercentage === 'democrat' && (
                      <>
                        O líder democrático, também conhecido como participativo, envolve
                        o grupo nas decisões e incentiva o debate, delegando responsabilidades
                        e aceitando opiniões divergentes. Esse estilo promove alto engajamento
                        e qualidade nos resultados, mas pode tornar a tomada de decisões
                        e a execução das tarefas mais lentas devido à necessidade de considerar
                        todas as opiniões.
                      </>
                    )}
                  </p>

                  <p className="font-semibold">
                    Pontos fortes:
                  </p>
                  <p>
                    {higherPercentage === 'autocrat' && (
                      <>
                        O líder autocrático apresenta foca nas atividades, conseguindo
                        manter a equipe concentrada nas tarefas e nos objetivos,
                        gerando alta produtividade.
                      </>
                    )}

                    {higherPercentage === 'liberal' && (
                      <>
                        Estimula a autonomia, criatividade e desenvolvimento de habilidades,
                        favorecendo profissionais qualificados.
                      </>
                    )}

                    {higherPercentage === 'democrat' && (
                      <>
                        Foco nas pessoas e alto engajamento, resultando em produção de
                        alta qualidade.
                      </>
                    )}
                  </p>

                  <p className="font-semibold mt-4">
                    Pontos fracos:
                  </p>
                  <p>
                    {higherPercentage === 'autocrat' && (
                      <>
                        A falta de participação nas decisões pode gerar insatisfação entre os
                        membros da equipe, levando a um ambiente de trabalho pouco motivador
                        e possivelmente até à resistência passiva. Embora a produtividade possa
                        ser alta, a qualidade dos resultados pode ser comprometida pela falta
                        de autonomia da equipe.
                      </>
                    )}

                    {higherPercentage === 'liberal' && (
                      <>
                        Pode gerar sensação de abandono e permitir que erros passem despercebidos
                        devido à falta de supervisão.
                      </>
                    )}

                    {higherPercentage === 'democrat' && (
                      <>
                        Pode causar lentidão nas atividades devido à necessidade de discussão
                        e consideração de todas as ideias.
                      </>
                    )}
                  </p>
                </div>
              </div>
            </>
          )}
          <Link
            href={`/quiz/` + quiz.slug + `/iniciar`}
            className="text-blue-700 w-fit my-4 mb-4 flex items-center gap-1 hover:underline">
            <Undo2 className="size-4" />
            Refazer teste
          </Link>

          <hr className="my-4 w-full" />

          <h1 className="text-xl font-medium text-neutral-800">
            {quiz.type === 1 && <>Feedback</>}
            {quiz.type === 2 && <>Saiba Mais</>}
          </h1>

          <p className="text-sm text-neutral-600">
            {quiz.type === 1 &&
              <>
                Essas foram as situações que você respondeu sim e que precisa
                desenvolver melhor para fortalecer sua Inteligência Emocional
              </>
            }
            {quiz.type === 2 && <>Curioso? Descubra mais sobre os outros estilos de liderança.</>}
          </p>

          <Carousel
            className="
              border border-blue-600 rounded-lg max-w-full
              flex flex-col gap-4 mx-auto p-4 my-7
            "
            opts={{ loop: true }}
            setApi={setApi}
          >
            {quiz.type === 1 && (
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
            )}

            {quiz.type === 2 && (
              <CarouselContent>
                <CarouselItem key={'autocrat'}>
                  <p className="font-medium mb-2">
                    Autocrático
                  </p>
                  <hr />
                  <p className="text-sm my-4">
                    Caracteriza-se por um controle centralizado e unilateral, onde
                    o líder toma todas as decisões importantes e define as direções
                    sem consulta ou colaboração com a equipe. Embora esse estilo
                    possa ser eficaz em situações em que a rapidez na tomada de
                    decisões é crucial ou onde a disciplina é necessária, ele também
                    apresenta desvantagens significativas.
                  </p>

                  <p className="text-sm mt-2">
                    <span className="font-semibold">Pontos fortes:</span>{' '}
                    O líder autocrático apresenta foca nas atividades, conseguindo
                    manter a equipe concentrada nas tarefas e nos objetivos,
                    gerando alta produtividade.
                  </p>

                  <p className="text-sm mt-2">
                    <span className="font-semibold">Pontos fracos:</span>{' '}
                    A falta de participação nas decisões pode gerar insatisfação entre os
                    membros da equipe, levando a um ambiente de trabalho pouco motivador
                    e possivelmente até à resistência passiva. Embora a produtividade possa
                    ser alta, a qualidade dos resultados pode ser comprometida pela falta
                    de autonomia da equipe.
                  </p>
                </CarouselItem>
                <CarouselItem key={'liberal'}>
                  <p className="font-medium mb-2">
                    Liberal
                  </p>
                  <hr />
                  <p className="text-sm my-4">
                    O líder liberal permite que a equipe trabalhe de forma autônoma,
                    sem intervenção direta, confiando que os membros experientes e
                    competentes possam tomar suas próprias decisões e se autogerenciar.
                    Esse estilo de liderança funciona melhor com equipes qualificadas
                    e independentes, mas pode ser inadequado onde os membros precisam
                    de mais orientação e apoio.
                  </p>

                  <p className="text-sm mt-2">
                    <span className="font-semibold">Pontos fortes:</span>{' '}
                    Estimula a autonomia, criatividade e desenvolvimento de habilidades,
                    favorecendo profissionais qualificados.
                  </p>

                  <p className="text-sm mt-2">
                    <span className="font-semibold">Pontos fracos:</span>{' '}
                    Pode gerar sensação de abandono e permitir que erros passem despercebidos
                    devido à falta de supervisão.
                  </p>
                </CarouselItem>

                <CarouselItem key={'democrat'}>
                  <p className="font-medium mb-2">
                    Democrático
                  </p>
                  <hr />
                  <p className="text-sm my-4">
                    O líder democrático, também conhecido como participativo, envolve
                    o grupo nas decisões e incentiva o debate, delegando responsabilidades
                    e aceitando opiniões divergentes. Esse estilo promove alto engajamento
                    e qualidade nos resultados, mas pode tornar a tomada de decisões
                    e a execução das tarefas mais lentas devido à necessidade de considerar
                    todas as opiniões.
                  </p>

                  <p className="text-sm mt-2">
                    <span className="font-semibold">Pontos fortes:</span>{' '}
                    Foco nas pessoas e alto engajamento, resultando em produção de
                    alta qualidade.
                  </p>

                  <p className="text-sm mt-2">
                    <span className="font-semibold">Pontos fracos:</span>{' '}
                    Pode causar lentidão nas atividades devido à necessidade de discussão
                    e consideração de todas as ideias.
                  </p>
                </CarouselItem>
              </CarouselContent>
            )}
            {!isMobile && (
              <>
                <CarouselPrevious />
                <CarouselNext />
              </>
            )}

            {/* Marcadores do feedback selecionado */}
            <ul className="flex justify-center gap-2">
              {feedbacks.map((feedback, index) => (
                <li
                  key={feedback.questionId}
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
