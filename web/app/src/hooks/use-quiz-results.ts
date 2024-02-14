import { ApiData } from 'questionnaire-shared';
import { useEffect, useState } from 'react';

export const useQuizResults = (results: ApiData.QuizResults) => {
  const [resultIndex, setResultIndex] = useState(0);
  const [currentQuizResult, setCurrentQuizResult] =
    useState<ApiData.QuestionResult>();

  const incorrectAnswers = results.filter(result => !result.isCorrect);

  useEffect(() => {
    setCurrentQuizResult(incorrectAnswers[resultIndex]);
  }, [incorrectAnswers, resultIndex]);

  const prevResult = () => {
    setResultIndex(prev => prev - 1);
  };

  const nextResult = () => {
    setResultIndex(prev => prev + 1);
  };

  return {
    currentQuizResult,
    numOfIncorrectAnswers: incorrectAnswers.length,
    resultIndex,
    prevResult,
    nextResult,
  };
};
