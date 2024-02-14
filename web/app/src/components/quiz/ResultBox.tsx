import React from 'react';
import styled from '@emotion/styled';
import { useTypedTheme } from 'src/hooks';
import { ApiData } from 'questionnaire-shared';
import { ActionButton, ActionsWrapper, Box } from '../common';
import { FadeIn } from '../utility';

interface ResultBoxProps {
  readonly result: ApiData.QuestionResult;
  readonly lastColorInGradient: string;
  readonly onNext?: () => void;
  readonly onPrev?: () => void;
  readonly goBackToHome?: () => void;
}

export const ResultBox: React.VFC<ResultBoxProps> = ({
  result,
  lastColorInGradient,
  onNext,
  onPrev,
  goBackToHome,
}) => {
  const theme = useTypedTheme();

  const { question, answerGiven, correctAnswer } = result;

  return (
    <Box>
      <ContentWrapper>
        <QuestionHeading color={theme.colors.ash}>{question}</QuestionHeading>
        <FadeIn>
          <ResultWrapper>
            <ResultText color={theme.colors.ash}>Your Answer:</ResultText>
            <ResultText color={theme.colors.red} strikethrough>
              {answerGiven}
            </ResultText>
          </ResultWrapper>
          <ResultWrapper>
            <ResultText color={theme.colors.ash}>Correct Answer:</ResultText>
            <ResultText color={theme.colors.green}>{correctAnswer}</ResultText>
          </ResultWrapper>
        </FadeIn>
        <ActionsWrapper>
          {onPrev ? (
            <ActionButton
              type="button"
              onClick={onPrev}
              color={lastColorInGradient}>
              Go Back
            </ActionButton>
          ) : (
            <div />
          )}
          {!!goBackToHome && (
            <FadeIn>
              <ActionButton
                type="button"
                onClick={goBackToHome}
                color={lastColorInGradient}>
                Try again?
              </ActionButton>
            </FadeIn>
          )}
          {!!onNext && (
            <ActionButton
              type="button"
              onClick={onNext}
              color={lastColorInGradient}>
              Next Question
            </ActionButton>
          )}
        </ActionsWrapper>
      </ContentWrapper>
    </Box>
  );
};

const ContentWrapper = styled.div`
  display: grid;
`;

const QuestionHeading = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: ${({ color }) => color};

  @media only screen and (min-width: 640px) {
    font-size: 2.25rem;
  }
`;

const ResultWrapper = styled.div`
  display: grid;
  place-items: center;
  height: fit-content;
`;

const ResultText = styled.p<{ strikethrough?: boolean }>`
  width: fit-content;
  color: ${({ color }) => color};
  margin-bottom: 1rem;
  font-size: 1.5rem;
  font-weight: 500;
  position: relative;

  &::before {
    content: '';
    display: ${({ strikethrough }) => (strikethrough ? 'block' : 'none')};
    width: 120%;
    height: 3px;
    background-color: ${({ color }) => color};
    position: absolute;
    left: -10%;
    top: 1.1rem;
  }
`;
