import { Answer, Id, Question } from "@/entities.ts";
import { DOMParser } from "xmldom";
import { groupBy } from "ramda";

import { CallState } from "@/store.h.ts";

export const parseScript = (
  content: string,
): Pick<CallState, "currentQuestionId" | "questions" | "answers"> => {
  const parsed = new DOMParser().parseFromString(content);

  const list = parsed.getElementsByTagName("mxCell");
  const elements = Array.from(list);

  elements.forEach(updateAttribute("id", normalizeId));

  const arrowElements = elements.filter(isArrow);
  arrowElements.forEach(updateAttribute("source", normalizeId));
  arrowElements.forEach(updateAttribute("target", normalizeId));

  const connections = arrowsToConnection(arrowElements);
  const beginElement = elements.find(isBegin)!;
  const questionElements = elements.filter(isQuestion);
  const answerElements = elements.filter(isAnswer);

  const currentQuestionId = connections[beginElement.getAttribute("id")!]?.[0]
    .target as Id;

  const questions = Object.fromEntries(
    questionElements.map((el) => {
      const id = el.getAttribute("id") as Id;
      const qustion: Question = {
        id,
        text: el.getAttribute("value")!,
        answerIds: connections[id] ? connections[id]!.map((x) => x.target) : [],
      };

      return [id, qustion] as const;
    }),
  );

  const answers = Object.fromEntries(
    answerElements.map((el) => {
      const id = el.getAttribute("id") as Id;
      const qustion: Answer = {
        id,
        text: el.getAttribute("value")!,
        nextQuestionId:
          connections[id] != null ? connections[id]![0].target : null,
      };

      return [id, qustion] as const;
    }),
  );

  return {
    currentQuestionId,
    questions: questions,
    answers: answers,
  };
};

const isArrow = (el: Element) => el.hasAttribute("target");
const isBlock = (el: Element) => Boolean(el.getAttribute("value"));
const isBegin = (el: Element) =>
  isBlock(el) && el.getAttribute("style")?.includes("rounded=1");
const isQuestion = (el: Element) =>
  isBlock(el) && el.getAttribute("style")?.includes("shape=hexagon");
const isAnswer = (el: Element) =>
  isBlock(el) && !isBegin(el) && !isQuestion(el);

const updateAttribute =
  (attr: string, fn: (value: string) => string) => (el: Element) => {
    const id = el.getAttribute(attr);
    if (id != null) {
      el.setAttribute(attr, fn(id));
    }
  };

const normalizeId = (id: string): string => id;

type Connection = {
  source: string;
  target: string;
};

const arrowsToConnection = (
  arrows: Element[],
): Partial<Record<string, Connection[]>> => {
  return groupBy(
    (connection) => connection.source,
    arrows.map(
      (arrow): Connection => ({
        source: arrow.getAttribute("source")!,
        target: arrow.getAttribute("target")!,
      }),
    ),
  );
};
