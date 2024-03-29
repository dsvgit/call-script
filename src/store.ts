import { create } from "zustand";
import { produce } from "immer";
import { answers, questions } from "@/initialState.ts";

interface CallState {
  currentQuestionId: Id | null;
  questions: Record<Id, Question>;
  answers: Record<Id, Answer>;
  listing: Listing;
  setAnswer: (question: Question, answer: Answer) => void;
}

export const useCallStore = create<CallState>()((set) => ({
  currentQuestionId: 1,
  questions,
  answers,
  listing: [],
  setAnswer: (question: Question, answer: Answer) => {
    set(
      produce((state: CallState) => {
        state.listing.push({
          id: makeId(),
          questionId: question.id,
          answerId: answer.id,
        });

        state.currentQuestionId = answer.nextQuestionId;
      }),
    );
  },
}));

let _id = 1;
const makeId = () => _id++;

export type Id = number;

export type Response = {
  id: Id;
  questionId: Id;
  answerId: Id;
};

export type Listing = Response[];

export type Question = {
  id: Id;
  text: string;
  answerIds: Id[];
};

export type Answer = {
  id: Id;
  text: string;
  nextQuestionId: Id | null;
};
