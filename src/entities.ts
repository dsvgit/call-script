let _id = 1;
export const makeId = (): Id => String(_id++);
export type Id = string;
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
