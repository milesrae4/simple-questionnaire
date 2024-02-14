import React, { useState } from 'react';
import styled from '@emotion/styled';
import { useTypedTheme, useRandomGradient, useQuiz } from 'src/hooks';
import { useHistory } from 'react-router';
import { QuizBox } from '../quiz';
import { FadeIn, GradientContainer, Loader, PageWrapper } from '../utility';
import { Button, Box } from '../common';
import { CompletionBox } from '../quiz/CompletionBox';
import { Results } from '../quiz/Results';

export const Quiz: React.VFC = () => {
  const theme = useTypedTheme();
  const history = useHistory();
  const [showResults, setShowResults] = useState(false);
  const { gradient, next, prev } = useRandomGradient(theme);
  const {
    currentQuestionStep,
    currentQuestion,
    currentQuestionAnswer,
    quizQuestions,
    isLoadingQuestions,
    setPrevQuestion,
    setNextQuestion,
    submitQuiz,
    quizResults,
  } = useQuiz();

  const goBackToHome = () => {
    history.push('/');
  };

  const onPrev = () => {
    setPrevQuestion();
    prev();
  };

  const onNext = (answer: string) => {
    setNextQuestion(answer);
    next();
  };

  const onSubmit = (answer: string) => {
    submitQuiz(answer);
  };

  if (!currentQuestion && !isLoadingQuestions) {
    return (
      <Box>
        <ErrorHeading color={theme.colors.ash}>
          Oops! Something went wrong
        </ErrorHeading>
        <Button
          onClick={goBackToHome}
          color={theme.colors.purple}
          hoverColor={theme.colors.darkPurple}>
          Go Back to Start
        </Button>
      </Box>
    );
  }

  const lastColorInGradient = gradient.colors[gradient.colors.length - 1];

  // the solution here is quite messy, if this were for production use I would refactor heavily
  const determineQuizContent = () => {
    if (showResults && quizResults) {
      return (
        <Results
          results={quizResults}
          lastColorInGradient={lastColorInGradient}
          goBackToHome={goBackToHome}
          nextGradient={next}
          prevGradient={prev}
        />
      );
    }

    if (quizResults) {
      const userScore = quizResults.reduce((score, { isCorrect }) => {
        if (isCorrect) {
          return score + 1;
        }

        return score;
      }, 0);

      const score = `${userScore}/${quizQuestions.length}`;

      if (userScore !== quizQuestions.length) {
        return (
          <CompletionBox
            score={score}
            showResults={() => setShowResults(true)}
            goBackToHome={goBackToHome}
          />
        );
      }
      return <CompletionBox score={score} goBackToHome={goBackToHome} />;
    }

    if (currentQuestionStep === 0) {
      return (
        <QuizBox
          question={currentQuestion}
          currentQuestionAnswer={currentQuestionAnswer}
          lastColorInGradient={lastColorInGradient}
          onNext={onNext}
        />
      );
    }
    if (currentQuestionStep === quizQuestions.length - 1) {
      return (
        <QuizBox
          question={currentQuestion}
          currentQuestionAnswer={currentQuestionAnswer}
          lastColorInGradient={lastColorInGradient}
          onPrev={onPrev}
          onSubmit={onSubmit}
        />
      );
    }

    return (
      <QuizBox
        question={currentQuestion}
        currentQuestionAnswer={currentQuestionAnswer}
        lastColorInGradient={lastColorInGradient}
        onPrev={onPrev}
        onNext={onNext}
      />
    );
  };

  return (
    <ScreenFadeIn delay={0.5} duration={2}>
      <GradientContainer aria-label="gradient background" background={gradient}>
        <PageWrapper>
          {/* add current question check here for TS */}
          {!currentQuestion || isLoadingQuestions ? (
            <Box>
              <Loader />
            </Box>
          ) : (
            determineQuizContent()
          )}
        </PageWrapper>
      </GradientContainer>
    </ScreenFadeIn>
  );
};

const ScreenFadeIn = styled(FadeIn)`
  width: 100%;
  height: 100%;
`;

const ErrorHeading = styled.h1`
  font-size: 2.25rem;
  margin-bottom: 1rem;
  color: ${({ color }) => color};

  @media only screen and (min-width: 420px) {
    font-size: 3rem;
    line-height: 1.2;
  }
`;
