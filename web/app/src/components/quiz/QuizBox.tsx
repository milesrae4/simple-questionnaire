import React, { useEffect, useState } from 'react';
import { ApiData } from 'questionnaire-shared';
import styled from '@emotion/styled';
import { useTypedTheme } from 'src/hooks';
import { ActionButton, ActionsWrapper, Box } from '../common';
import { FadeIn } from '../utility';
import { OptionSelect } from './OptionSelect';

export interface QuizBoxProps {
  readonly question: ApiData.Question;
  readonly currentQuestionAnswer: string | undefined;
  readonly onPrev?: () => void;
  readonly onNext?: (answer: string) => void;
  readonly onSubmit?: (finalAnswer: string) => void;
  readonly lastColorInGradient: string;
}

export const QuizBox: React.VFC<QuizBoxProps> = ({
  question,
  currentQuestionAnswer,
  onPrev,
  onNext,
  onSubmit,
  lastColorInGradient,
}) => {
  const theme = useTypedTheme();
  const [currentSelection, setCurrentSelection] = useState<string | undefined>(
    currentQuestionAnswer,
  );
  const { question: prompt, options } = question;

  useEffect(() => {
    setCurrentSelection(currentQuestionAnswer);
  }, [currentQuestionAnswer]);

  return (
    <Box>
      <Question color={theme.colors.ash}>{prompt}</Question>
      <OptionsFadeIn delay={0.5}>
        <OptionsFieldset id={prompt}>
          {options.map(option => {
            return (
              <OptionSelect
                key={option}
                option={option}
                defaultChecked={currentQuestionAnswer === option}
                onSelect={setCurrentSelection}
                radioSelectColor={lastColorInGradient}
              />
            );
          })}
        </OptionsFieldset>
      </OptionsFadeIn>
      <ActionsWrapper>
        {onPrev ? (
          <ActionButton
            type="button"
            onClick={() => {
              onPrev();
            }}
            color={lastColorInGradient}>
            Go Back
          </ActionButton>
        ) : (
          <div />
        )}
        {!!currentSelection && !!onSubmit && (
          <FadeIn>
            <ActionButton
              type="button"
              onClick={() => onSubmit(currentSelection)}
              color={lastColorInGradient}>
              Complete Quiz
            </ActionButton>
          </FadeIn>
        )}
        {!!currentSelection && !!onNext && (
          <FadeIn>
            <ActionButton
              type="button"
              onClick={() => {
                onNext(currentSelection);
                setCurrentSelection(undefined);
              }}
              color={lastColorInGradient}>
              Next Question
            </ActionButton>
          </FadeIn>
        )}
      </ActionsWrapper>
    </Box>
  );
};

const Question = styled.h2<{ color: string }>`
  font-size: 1.45rem;
  font-size: 1.875rem;
  margin-bottom: 1rem;
  color: ${({ color }) => color};
  font-weight: 500;
`;

const OptionsFadeIn = styled(FadeIn)`
  height: 12.5rem;
  width: fit-content;
  margin: 0 auto;
  display: grid;
  place-items: center;
  grid-template-rows: 1fr auto;

  @media only screen and (min-width: 640px) {
    height: 13rem;
  }
`;

const OptionsFieldset = styled.fieldset`
  padding: 0;
  margin: 0;
  border: none;
  width: 100%;
  display: grid;
  place-items: start;
  grid-gap: 1rem;

  @media only screen and (min-width: 640px) {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    grid-auto-columns: 1fr;
    gap: 3rem 2rem;
    grid-template-areas:
      '. .'
      '. .';
  }
`;
