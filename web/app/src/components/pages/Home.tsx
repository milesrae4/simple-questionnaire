import React from 'react';
import { useHistory } from 'react-router';
import styled from '@emotion/styled';
import { useTypedTheme } from 'src/hooks';
import { AnimatedText } from '../utility';
import { Button } from '../common/Button';

export const Home: React.VFC = () => {
  const theme = useTypedTheme();
  const history = useHistory();

  const goToQuiz = () => {
    history.push('/quiz');
  };

  return (
    <HomePageWrapper>
      <HomeHeading>
        <AnimatedText charDelay={0.05} content="Take the Quiz!" />
      </HomeHeading>
      <HomeSubHeading>
        <AnimatedText
          charDelay={0.02}
          content="How much do you know about the United States?"
        />
      </HomeSubHeading>
      <Button
        onClick={goToQuiz}
        color={theme.colors.purple}
        hoverColor={theme.colors.darkPurple}>
        Start!
      </Button>
    </HomePageWrapper>
  );
};

const HomePageWrapper = styled.div`
  width: 100%;
  padding: 2rem;
`;

const HomeHeading = styled.h1`
  font-size: 2.25rem;
  margin-bottom: 1rem;

  @media only screen and (min-width: 420px) {
    font-size: 3rem;
    line-height: 1.2;
  }
  @media only screen and (min-width: 767px) {
    font-size: 4.5rem;
    line-height: 1.4;
  }
`;

const HomeSubHeading = styled.h2`
  font-size: 1.3rem;
  width: 24ch;
  margin: 0 auto;
  word-wrap: nowrap;
  margin-bottom: 3rem;

  @media only screen and (min-width: 420px) {
    font-size: 1.75rem;
  }
  @media only screen and (min-width: 767px) {
    font-size: 2rem;
    width: 100%;
  }
`;
