import React from 'react';
import styled from '@emotion/styled';
import { FadeIn } from '../utility';

interface ButtonProps {
  color: string;
  hoverColor: string;
  onClick: () => void;
  disabled?: boolean;
  stopAnimation?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  color,
  hoverColor,
  onClick,
  disabled,
  stopAnimation,
}) => {
  const Wrapper = stopAnimation ? NoAnimationWrapper : ButtonWrapper;

  return (
    <Wrapper delay={0.5} duration={3}>
      <StyledButton
        type="button"
        disabled={disabled}
        onClick={onClick}
        color={color}
        hoverColor={hoverColor}>
        {children}
      </StyledButton>
    </Wrapper>
  );
};

const ButtonWrapper = styled(FadeIn)`
  margin: 0 auto;
`;

const NoAnimationWrapper = styled.div`
  margin: 0 auto;
`;

const StyledButton = styled.button<{
  color: string;
  hoverColor: string;
  disabled?: boolean;
}>`
  padding: 0.25rem 1.25rem;
  font-size: 1.25rem;
  border: none;
  border-radius: 0.5rem;
  color: white;
  font-weight: 600;
  background: ${({ color }) => color};
  transition: 0.3s all ease-in-out;

  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};

  &:hover {
    transform: scale(1.035);
    background: ${({ hoverColor }) => hoverColor};
  }

  @media only screen and (min-width: 420px) {
    border-radius: 1rem;
    padding: 0.35rem 2rem;
    font-size: 1.5rem;
  }
  @media only screen and (min-width: 767px) {
    padding: 0.5rem 3rem;
    font-size: 1.75rem;
  }
`;
