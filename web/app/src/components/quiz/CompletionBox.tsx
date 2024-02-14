import React, { useEffect, useState } from 'react';
import Confetti from 'react-dom-confetti';
import styled from '@emotion/styled';
import { useTypedTheme } from 'src/hooks';
import { Box, Button } from '../common';
import { FadeIn } from '../utility';

interface CompletionBoxProps {
  readonly score: string;
  readonly goBackToHome: () => void;
  readonly showResults?: () => void;
}

export const CompletionBox: React.VFC<CompletionBoxProps> = ({
  score,
  showResults,
  goBackToHome,
}) => {
  const theme = useTypedTheme();
  const [isConfettiActive, setIsConfettiActive] = useState(false);

  useEffect(() => {
    // confetti will trigger whenever the active prop goes from falsy to truthy
    setIsConfettiActive(true);
  }, []);

  const config = {
    angle: 90,
    spread: 280,
    startVelocity: 30,
    elementCount: 70,
    dragFriction: 0.12,
    duration: 3000,
    stagger: 3,
    width: '0.75rem',
    height: '0.75rem',
    perspective: '25rem',
    colors: ['#a864fd', '#29cdff', '#78ff44', '#ff718d', '#fdff6a'],
  };

  return (
    <Box>
      <ContentWrapper>
        <Confetti active={isConfettiActive} config={config} />
        <SuccessHeading color={theme.colors.ash}>
          Here&apos;s how you did!
        </SuccessHeading>
        <FadeIn>
          <ResultText color={theme.colors.ash}>{score}</ResultText>
        </FadeIn>
        <ButtonWrapper>
          <Button
            onClick={goBackToHome}
            color={theme.colors.purple}
            hoverColor={theme.colors.darkPurple}>
            Back to Start
          </Button>
          {!!showResults && (
            <Button
              onClick={showResults}
              color={theme.colors.purple}
              hoverColor={theme.colors.darkPurple}>
              See Results
            </Button>
          )}
        </ButtonWrapper>
      </ContentWrapper>
    </Box>
  );
};

const ContentWrapper = styled.div`
  display: grid;
  place-items: center;
  height: 100%;
  padding-bottom: 3rem;

  @media only screen and (min-width: 640px) {
    padding-bottom: 0;
  }
`;

const SuccessHeading = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: ${({ color }) => color};

  @media only screen and (min-width: 640px) {
    font-size: 2.5rem;
  }

  @media only screen and (min-width: 640px) {
    font-size: 3rem;
  }
`;

const ResultText = styled.p`
  font-size: 4rem;
  margin-bottom: 2.5rem;
  color: ${({ color }) => color};
  font-weight: 600;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1rem;

  @media only screen and (min-width: 640px) {
    flex-direction: row;
  }
`;
