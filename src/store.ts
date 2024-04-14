import { create } from "zustand";
import { produce } from "immer";
import { answers, questions } from "@/initialState.ts";
import { Answer, makeId, Question } from "@/entities.ts";
import { CallState } from "@/store.h.ts";
import { parseScript } from "@/parseScript.ts";

export const useCallStore = create<CallState>()((set) => ({
  currentQuestionId: null,
  questions,
  answers,
  listing: [],
  setScript: (content: string) => {
    const scriptState = parseScript(content);

    set({
      ...scriptState,
      listing: [],
    });
  },
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
