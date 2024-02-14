import { ServiceError } from '../../utils';
import { isServiceError } from '../../utils/is-service-error';
import QuestionRepo from './repo';

export default class QuizService {
  constructor(private readonly questionRepo: QuestionRepo) {}

  async getQuestions() {
    try {
      const questions = await this.questionRepo.getQuestions();

      return questions;
    } catch (e: any) {
      throw new ServiceError({
        type: QuizServiceError.FileReadError,
        message: 'Something went wrong while reading questions file',
      });
    }
  }

  async determineQuizResults(
    answers: { questionId: number; answer: string }[],
  ) {
    try {
      const quizAnswers = answers.reduce(
        (acc: { [questionId: number]: string }, { questionId, answer }) => {
          acc[questionId] = answer;
          return acc;
        },
        {},
      );

      const questions = await this.questionRepo.getQuestions();

      const questionsMap: { [questionId: number]: string } = {};

      questions.forEach(({ id, question, options }) => {
        const questionAnswer: string | undefined = quizAnswers[id];

        questionsMap[id] = question;

        const doesAnswerExistForQuestion = !questionAnswer;

        if (doesAnswerExistForQuestion) {
          throw new ServiceError({
            type: QuizServiceError.MissingQuestionAnswer,
            message: 'An answer is missing for a quiz question',
            data: {
              id,
              question,
              options,
            },
          });
        }

        const isAnswerInOptions = options.includes(questionAnswer);

        if (!isAnswerInOptions) {
          throw new ServiceError({
            type: QuizServiceError.AnswerNotFound,
            message: `Answer for question ${id} was not found`,
            data: {
              id,
              question,
              options,
              answerGiven: questionAnswer,
            },
          });
        }
      });

      const questionAnswers = await this.questionRepo.getQuestionAnswers();

      const quizResults = questionAnswers.map(
        ({ question_id: questionId, answer }) => {
          const quizAnswer = quizAnswers[questionId];
          const isCorrect = quizAnswer === answer;

          return {
            questionId,
            isCorrect,
            question: questionsMap[questionId],
            answerGiven: quizAnswer,
            correctAnswer: answer,
          };
        },
      );

      return quizResults;
    } catch (e: any) {
      if (isServiceError(e)) throw e;

      throw new ServiceError({
        type: QuizServiceError.FileReadError,
        message: 'Something went wrong while reading questions or answers file',
      });
    }
  }
}

export enum QuizServiceError {
  FileReadError = 'question/file-read',
  AnswerNotFound = 'question/answer-not-found',
  MissingQuestionAnswer = 'question/missing-answer',
}
