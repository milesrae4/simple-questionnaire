import { ApiData } from 'questionnaire-shared';
import React from 'react';
import { useQuizResults } from 'src/hooks';
import { ResultBox } from './ResultBox';

interface ResultsProps {
  results: ApiData.QuizResults;
  lastColorInGradient: string;
  goBackToHome: () => void;
  readonly nextGradient: () => void;
  readonly prevGradient: () => void;
}

export const Results: React.VFC<ResultsProps> = ({
  results,
  lastColorInGradient,
  goBackToHome,
  nextGradient,
  prevGradient,
}) => {
  const {
    prevResult,
    nextResult,
    resultIndex,
    currentQuizResult,
    numOfIncorrectAnswers,
  } = useQuizResults(results);

  const onNext = () => {
    nextGradient();
    nextResult();
  };

  const onPrev = () => {
    prevGradient();
    prevResult();
  };

  const determineResultContent = () => {
    if (!currentQuizResult) {
      return (
        <p>Something went terribly wrong. There is no current result to show</p>
      );
    }

    if (resultIndex === 0) {
      return (
        <ResultBox
          onNext={onNext}
          result={currentQuizResult}
          lastColorInGradient={lastColorInGradient}
        />
      );
    }

    if (resultIndex === numOfIncorrectAnswers - 1) {
      return (
        <ResultBox
          result={currentQuizResult}
          onPrev={onPrev}
          goBackToHome={goBackToHome}
          lastColorInGradient={lastColorInGradient}
        />
      );
    }

    return (
      <ResultBox
        result={currentQuizResult}
        onPrev={onPrev}
        onNext={onNext}
        lastColorInGradient={lastColorInGradient}
      />
    );
  };

  return <>{determineResultContent()}</>;
};
