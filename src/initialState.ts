import {Answer, Id, Question} from "@/entities.ts";

export const questions: Record<Id, Question> = {
  1: {
    id: 1,
    text: "Здравствуйте. Можем поговорить по поводу вакансии менеджер?",
    answerIds: [1, 2],
  },
  2: {
    id: 2,
    text: "Какая работа вам интересна?",
    answerIds: [3, 4],
  },
  3: {
    id: 3,
    text: "Почему вы считаете, что подходите?",
    answerIds: [5, 6],
  },
};

export const answers: Record<Id, Answer> = {
  1: {
    id: 1,
    text: "Можем",
    nextQuestionId: 2,
  },
  2: {
    id: 2,
    text: "Я занят",
    nextQuestionId: 2,
  },
  3: {
    id: 3,
    text: "Ведущим специалистом или руководителем",
    nextQuestionId: 3,
  },
  4: {
    id: 4,
    text: "В продажах",
    nextQuestionId: 3,
  },
  5: {
    id: 5,
    text: "Есть соответсвующий опыт",
    nextQuestionId: null,
  },
  6: {
    id: 6,
    text: "Получается",
    nextQuestionId: null,
  },
};
