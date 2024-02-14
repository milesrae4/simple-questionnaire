import { ApiData } from 'questionnaire-shared';
import { useState } from 'react';
import { coreServiceApi } from 'src/api';
import { useAsyncEffect } from './use-async-effect';

export const useQuiz = () => {
  const [quizAnswers, setQuizAnswers] = useState<{
    [questionId: number]: string;
  }>({});
  const [quizQuestions, setQuizQuestions] = useState<ApiData.QuestionsList>([]);
  const [quizResults, setQuizResults] = useState<ApiData.QuizResults>();
  const [currentQuestionStep, setCurrentQuestionStep] = useState<number>(0);
  const [isLoadingQuestions, setIsLoadingQuestions] = useState(true);

  useAsyncEffect(async () => {
    const questions = await coreServiceApi.questions.getQuestionsList();
    setQuizQuestions(questions);
    setIsLoadingQuestions(false);
  }, []);

  const currentQuestion: ApiData.Question | undefined =
    quizQuestions[currentQuestionStep];

  const setQuizAnswer = (answer: string) => {
    setQuizAnswers(prevState => {
      const { id: questionId } = currentQuestion;
      return { ...prevState, [questionId]: answer };
    });
  };

  const setPrevQuestion = () => {
    setCurrentQuestionStep(prev => prev - 1);
  };

  const setNextQuestion = (answer: string) => {
    setQuizAnswer(answer);
    setCurrentQuestionStep(prev => prev + 1);
  };

  const submitQuiz = async (finalQuestionAnswer: string) => {
    const formattedAnswers = Object.entries(quizAnswers).map(
      ([questionId, answer]) => {
        return {
          questionId: parseInt(questionId, 10),
          answer,
        };
      },
    );

    const results = await coreServiceApi.questions.postQuizAnswers([
      ...formattedAnswers,
      { questionId: currentQuestion.id, answer: finalQuestionAnswer },
    ]);

    setQuizResults(results);
  };

  return {
    currentQuestionStep,
    currentQuestion,
    currentQuestionAnswer: currentQuestion
      ? quizAnswers[currentQuestion.id]
      : undefined,
    quizQuestions,
    isLoadingQuestions,
    setPrevQuestion,
    setNextQuestion,
    setQuizAnswer,
    submitQuiz,
    quizResults,
  };
};
