import { create } from "zustand";
import { produce } from "immer";
import { Answer, makeId, Question } from "@/entities.ts";
import { CallState } from "@/store.h.ts";
import { parseScript } from "@/parseScript.ts";

export const useCallStore = create<CallState>()((set) => ({
  name: "",
  currentQuestionId: null,
  questions: {},
  answers: {},
  listing: [],
  setScript: (name: string, content: string) => {
    const scriptState = parseScript(content);

    set({
      ...scriptState,
      name,
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
