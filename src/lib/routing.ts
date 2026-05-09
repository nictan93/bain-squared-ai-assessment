import {
  BASE_QUESTION_ORDER,
  CONDITIONAL_ORDER_WITH_Q7A,
} from "@/content/questions";

type Answers = Record<string, string | string[]>;

function getActiveOrder(answers: Answers): readonly string[] {
  if (answers["current_ai_use"] === "barely_use_ai") {
    return CONDITIONAL_ORDER_WITH_Q7A;
  }
  return BASE_QUESTION_ORDER;
}

export function getNextQuestionId(
  currentId: string,
  answers: Answers
): string | null {
  const order = getActiveOrder(answers);
  const idx = order.indexOf(currentId);
  if (idx === -1 || idx === order.length - 1) return null;
  return order[idx + 1];
}

export function isLastQuestion(
  questionId: string,
  answers: Answers
): boolean {
  const order = getActiveOrder(answers);
  return questionId === order[order.length - 1];
}

export function getQuestionProgress(
  questionId: string,
  answers: Answers
): { current: number; total: number } {
  const order = getActiveOrder(answers);
  const idx = order.indexOf(questionId);
  return {
    current: idx >= 0 ? idx + 1 : 1,
    total: order.length,
  };
}
