"use client"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Button from "./button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import NavigateQuestion from "./navigableQuestion";

const MultipleChoiceQuiz = ({ quiz }: { quiz: Quiz }) => {
  const quizLength = quiz.questions.length;

  // Numero da questão, deve começar em 0
  const [questionID, setQuestionID] = useState<number>(0);
  const [alternatives, setAlternatives] = useState<Alternatives[]>([]);
  const [selectedAlternatives, setSelectedAlternatives] = useState<string[]>(Array(quizLength).fill(''));

  const router = useRouter();

  // Mostrar botão de confirmar apenas na ultima questão
  const allQuestionsSelected = questionID === quizLength - 1;

  function navigateQuestion(value: number) {
    if (questionID > 0 && value < 0) setQuestionID(questionID - 1); // Retorna para a questão anterior
    if (questionID < quizLength - 1 && value > 0) setQuestionID(questionID + 1); // Avança para a próxima questão
  }

  function storeResult() {
    // Armazena valor das respostas obtidas durante o questionário -> resgatar em resultados para conversão correspondente
    const autocrat = selectedAlternatives?.filter((alternative) => alternative === 'autocrat').length;
    const liberal = selectedAlternatives?.filter((alternative) => alternative === 'liberal').length;
    const democrat = selectedAlternatives?.filter((alternative) => alternative === 'democrat').length;

    let storedResults = JSON.parse(localStorage.getItem("lastResults") ?? "[]");
    const quizResultIndex = storedResults.findIndex(
      (result: LastResults) => result.qID === quiz?.id
    );

    // Se o quiz já tiver sido respondido, substitui os pontos
    if (quizResultIndex >= 0) {
      storedResults[quizResultIndex].lastResult = {
        autocrat,
        liberal,
        democrat,
      };
    } else {
      storedResults.push({
        qID: quiz?.id, lastResult: {
          autocrat,
          liberal,
          democrat,
        },
      });
    };

    localStorage.setItem("lastResults", JSON.stringify(storedResults));
  };

  function shuffle(array: Alternatives[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  function confirmAnswers() {
    storeResult();
    router.push(`/autoavaliacao/${quiz.slug}/resultados`);
  }

  useEffect(() => {
    const shuffledAlternatives = shuffle(quiz.questions[questionID].alternatives!);

    setAlternatives(shuffledAlternatives);
  }, [questionID])

  return (
    <section className="w-full py-24">
      <div className="mx-3 mt-10 px-5 md:mx-auto md:w-[520px]">
        <p className="mb-3 text-xl font-medium">
          {(questionID + 1) + ". " + quiz.questions[questionID].question}
        </p>

        <ul className="my-3 flex flex-col justify-center border-t border-b">
          {alternatives.map((alternative, index) => (
            <li
              key={alternative.id}
              className="py-2"
            >
              <label
                htmlFor={alternative.id}
                className="flex gap-2 items-start cursor-pointer"
              >
                <input
                  type="checkbox"
                  name="answer"
                  className="checked:accent-blue-700 mt-1.5"
                  id={alternative.id}
                  value={alternative.id}
                  checked={selectedAlternatives[questionID] === alternative.leadershipStyle}
                  onChange={() => {
                    const newSelectedAlternatives: any = [...selectedAlternatives];
                    newSelectedAlternatives[questionID] = alternative.leadershipStyle;
                    setSelectedAlternatives(newSelectedAlternatives);
                    navigateQuestion(1);
                    console.log(selectedAlternatives);
                  }}
                />
                <div>
                  {index === 0 && (<span>a&#41;{' '}</span>)}
                  {index === 1 && (<span>b&#41;{' '}</span>)}
                  {index === 2 && (<span>c&#41;{' '}</span>)}
                  {alternative.text}
                </div>
              </label>
            </li>
          ))}
        </ul>
        <div className="bg-blue-100 rounded-full">
          <div
            className="bg-blue-700 h-2 rounded-full mt-6 duration-300"
            // Calcula o percentual de completude das questões do valor total de questões
            style={{ width: `${(100 * questionID + 100) / quizLength}%` }}
          />
        </div>
        {selectedAlternatives.indexOf("") === -1 && (
          <Button
            title={"Confirmar respostas"}
            className={
              // Se todas as questões tiverem sido respondidas, mostrar o botão
              allQuestionsSelected
                ? `w-full mx-auto my-10`
                : "hidden"
            }
            func={confirmAnswers}
          />
        )}
        <NavigateQuestion navigateQuestion={navigateQuestion} />
      </div>
    </section>
  )
}

export default MultipleChoiceQuiz;