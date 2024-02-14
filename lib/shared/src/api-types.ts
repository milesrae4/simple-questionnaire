export namespace ApiData {
  export type Question = {
    id: number;
    question: string;
    options: string[];
  };

  export type QuestionsList = ApiData.Question[];

  export type Answer = {
    questionId: number;
    answer: string;
  };

  export type QuestionResult = {
    questionId: number;
    isCorrect: boolean;
    question: string;
    answerGiven: string;
    correctAnswer: string;
  };

  export type QuizResults = QuestionResult[];
}
