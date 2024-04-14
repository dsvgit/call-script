import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { useCallStore } from "@/store.ts";
import { HeaderComponent } from "@/Header.tsx";
import { Id } from "@/entities.ts";
import { UploadScriptButton } from "@/components/UploadScriptButton.tsx";

export const App = () => {
  // useEffect(() => {
  //   const listener = (e: BeforeUnloadEvent) => {
  //     e.preventDefault();
  //     e.returnValue = true;
  //   };
  //
  //   window.addEventListener("beforeunload", listener);
  //
  //   return () => window.removeEventListener("beforeunload", listener);
  // }, []);

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
            <FinishedOnAnswerMessageComponent answerId={response.answerId} />
          </>
        ))}
        {currentQuestionId && (
          <>
            <QuestionComponent questionId={currentQuestionId} />
            <FinishedOnQuestionMessageComponent
              questionId={currentQuestionId}
            />
          </>
        )}
        {!currentQuestionId && (
          <div className="text-center flex flex-col gap-3 py-10">
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
              Для начала работы загрузите скрипт
            </h3>
            <UploadScriptButton />
          </div>
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
      <CardHeader>
        <div dangerouslySetInnerHTML={{ __html: question.text }} />
      </CardHeader>

      <CardFooter className="flex gap-2 flex-wrap">
        {questionAnswers.map((answer) => (
          <Button
            key={answer.id}
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
            <div dangerouslySetInnerHTML={{ __html: answer.text }} />
          </Button>
        ))}
      </CardFooter>
    </Card>
  );
});

type FinishedOnAnswerMessageComponentProps = {
  answerId: Id;
};

const FinishedOnAnswerMessageComponent = React.memo(
  (props: FinishedOnAnswerMessageComponentProps) => {
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
  },
);

type FinishedOnQuestionMessageComponentProps = {
  questionId: Id;
};

const FinishedOnQuestionMessageComponent = React.memo(
  (props: FinishedOnQuestionMessageComponentProps) => {
    const { questionId } = props;

    const question = useCallStore((state) => state.questions[questionId]);

    if (question.answerIds.length > 0) {
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
  },
);
