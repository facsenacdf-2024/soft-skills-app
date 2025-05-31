"use client"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Button from "./button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import NavigateQuestion from "./navigableQuestion";

const MultipleGroupQuiz = ({ quiz }: { quiz: Quiz }) => {
    const quizLength = quiz.questions.length;

    // Numero da questão, deve começar em 0
    const [questionID, setQuestionID] = useState<number>(0);
    const [alternatives, setAlternatives] = useState<Alternatives[]>([]);
    const [selectedAlternatives, setSelectedAlternatives] = useState<number[]>(Array(quizLength).fill(0));

    const router = useRouter();

    // Mostrar botão de confirmar apenas na ultima questão
    const allQuestionsSelected = questionID === quizLength - 1;

    function navigateQuestion(value: number) {
        if (questionID > 0 && value < 0) setQuestionID(questionID - 1); // Retorna para a questão anterior
        if (questionID < quizLength - 1 && value > 0) setQuestionID(questionID + 1); // Avança para a próxima questão
    }

    function storeResult() {

        // Separa o array maior de length 20 em 5 arrays de length 4
        const groupSize = 4;
        const groups = [];
        const groupResults: Record<string, number> = {
            group1: 0,
            group2: 0,
            group3: 0,
            group4: 0,
            group5: 0,
        }

        for (let i = 0; i < selectedAlternatives.length; i += groupSize) {
            groups.push(selectedAlternatives.slice(i, i + groupSize));
        }
        // Armazena valor das respostas obtidas durante o questionário, por grupo -> resgatar em resultados para conversão correspondente
        groups.forEach((group, index) => {
            const resp1 = group?.filter((alternative) => alternative === 1).length * 1;
            const resp2 = group?.filter((alternative) => alternative === 2).length * 2;
            const resp3 = group?.filter((alternative) => alternative === 3).length * 3;
            const resp4 = group?.filter((alternative) => alternative === 4).length * 4;
            const resp5 = group?.filter((alternative) => alternative === 5).length * 5;

            const total = resp1 + resp2 + resp3 + resp4 + resp5;
            groupResults[`group${index + 1}`] = total;
        });

        let storedResults = JSON.parse(localStorage.getItem("lastResults") ?? "[]");
        const quizResultIndex = storedResults.findIndex(
            (result: GroupResults) => result.qID === quiz?.id
        );

        // Se o quiz já tiver sido respondido, substitui os pontos
        if (quizResultIndex >= 0) {
            storedResults[quizResultIndex].lastResult = {
                group1: groupResults.group1,
                group2: groupResults.group2,
                group3: groupResults.group3,
                group4: groupResults.group4,
                group5: groupResults.group5
            };
        } else {
            storedResults.push({
                qID: quiz?.id, lastResult: {
                    group1: groupResults.group1,
                    group2: groupResults.group2,
                    group3: groupResults.group3,
                    group4: groupResults.group4,
                    group5: groupResults.group5
                },
            });
        };

        localStorage.setItem("lastResults", JSON.stringify(storedResults));
    };

    function confirmAnswers() {
        storeResult();
        router.push(`/autoavaliacao/${quiz.slug}/resultados`);
    }

    useEffect(() => {
        const alternatives = quiz.questions[questionID].alternatives!;

        setAlternatives(alternatives);
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
                                    type="radio"
                                    name="answer"
                                    className="checked:accent-blue-700 mt-1.5"
                                    id={alternative.id}
                                    value={alternative.id}
                                    checked={selectedAlternatives[questionID] === alternative.weigth}
                                    onChange={() => {
                                        const newSelectedAlternatives: any = [...selectedAlternatives];
                                        newSelectedAlternatives[questionID] = alternative.weigth;
                                        setSelectedAlternatives(newSelectedAlternatives);
                                        navigateQuestion(1);
                                        console.log(selectedAlternatives);
                                    }}
                                />
                                <div>
                                    {index === 0 && (<span>a&#41;{' '}</span>)}
                                    {index === 1 && (<span>b&#41;{' '}</span>)}
                                    {index === 2 && (<span>c&#41;{' '}</span>)}
                                    {index === 3 && (<span>d&#41;{' '}</span>)}
                                    {index === 4 && (<span>e&#41;{' '}</span>)}
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
                {selectedAlternatives.indexOf(0) === -1 && (
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
};

export default MultipleGroupQuiz;

