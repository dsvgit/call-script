import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { Id, useCallStore } from "@/store.ts";
import { HeaderComponent } from "@/Header.tsx";

export const App = () => {
  useEffect(() => {
    const listener = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = true;
    };

    window.addEventListener("beforeunload", listener);

    return () => window.removeEventListener("beforeunload", listener);
  }, []);

  const currentQuestionId = useCallStore((state) => state.currentQuestionId);
  const listing = useCallStore((state) => state.listing);

  return (
    <div className="flex min-h-screen flex-col">
      <HeaderComponent />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8 container mx-auto">
        {listing.map((response) => (
          <>
            <QuestionComponent
              key={response.id}
              questionId={response.questionId}
              answeredId={response.answerId}
            />
            <CallOverComponent answerId={response.answerId} />
          </>
        ))}
        {currentQuestionId && (
          <QuestionComponent questionId={currentQuestionId} />
        )}
      </main>
    </div>
  );
};

type QuestionComponentProps = {
  questionId: Id;
  answeredId?: Id;
};

const QuestionComponent = React.memo((props: QuestionComponentProps) => {
  const { questionId, answeredId } = props;

  const question = useCallStore((state) => state.questions[questionId]);
  const questionAnswers = useCallStore((state) =>
    question.answerIds.map((answerId) => state.answers[answerId]),
  );

  const setAnswer = useCallStore((state) => state.setAnswer);

  return (
    <Card>
      <CardHeader>{question.text}</CardHeader>

      <CardFooter className="flex gap-2 flex-wrap">
        {questionAnswers.map((answer) => (
          <Button
            variant={answeredId !== answer.id ? "outline" : "default"}
            onClick={() => {
              setAnswer(question, answer);
              setTimeout(() => {
                window.scrollTo({
                  top: document.body.scrollHeight,
                  behavior: "smooth",
                });
              }, 0);
            }}
          >
            {answer.text}
          </Button>
        ))}
      </CardFooter>
    </Card>
  );
});

type CallOverComponentProps = {
  answerId: Id;
};

const CallOverComponent = React.memo((props: CallOverComponentProps) => {
  const { answerId } = props;

  const answer = useCallStore((state) => state.answers[answerId]);

  if (answer.nextQuestionId) {
    return null;
  }

  return (
    <div className="inline-flex items-center justify-center w-full">
      <hr className="w-full h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
      <span className="absolute px-3 font-medium text-gray-900 -translate-x-1/2 bg-white left-1/2 dark:text-white dark:bg-gray-900">
        Скрипт завершен
      </span>
    </div>
  );
});
