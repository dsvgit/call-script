import { Answer, Id, Listing, Question } from "@/entities.ts";

export interface CallState {
  name: string;
  currentQuestionId: Id | null;
  questions: Record<Id, Question>;
  answers: Record<Id, Answer>;
  listing: Listing;
  setScript: (name: string, content: string) => void;
  setAnswer: (question: Question, answer: Answer) => void;
}
