import { Answer, Id, Listing, Question } from "@/entities.ts";

export interface CallState {
  currentQuestionId: Id | null;
  questions: Record<Id, Question>;
  answers: Record<Id, Answer>;
  listing: Listing;
  setScript: (content: string) => void;
  setAnswer: (question: Question, answer: Answer) => void;
}
