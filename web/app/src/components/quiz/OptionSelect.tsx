import styled from '@emotion/styled';
import React from 'react';
import { useTypedTheme } from 'src/hooks';

interface OptionSelectProps {
  readonly onSelect: React.Dispatch<React.SetStateAction<string | undefined>>;
  readonly option: string;
  readonly defaultChecked: boolean;
  readonly radioSelectColor: string;
}

export const OptionSelect: React.VFC<OptionSelectProps> = ({
  onSelect,
  option,
  defaultChecked,
  radioSelectColor,
}) => {
  const theme = useTypedTheme();

  return (
    <div>
      <StyledRadio
        type="radio"
        name="selected-answer"
        defaultChecked={defaultChecked}
        id={option}
        radioSelectColor={radioSelectColor}
        onClick={() => onSelect(option)}
      />
      <StyledLabel color={theme.colors.ash} htmlFor={option}>
        {option}
      </StyledLabel>
    </div>
  );
};

const StyledRadio = styled.input<{ radioSelectColor: string }>`
  margin-right: 1rem;

  &::after {
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    left: -0.5rem;
    top: -0.5rem;
    position: relative;
    background-color: white;
    border: 2px solid;
    border-color: ${({ radioSelectColor }) => radioSelectColor};
    content: '';
    display: inline-block;
    visibility: visible;
  }

  &:checked::after {
    background-color: ${({ radioSelectColor }) => radioSelectColor};
    visibility: visible;
  }
`;

const StyledLabel = styled.label`
  font-size: 1.25rem;
  color: ${({ color }) => color};

  @media only screen and (min-width: 420px) {
    font-size: 1.3rem;
  }

  @media only screen and (min-width: 640px) {
    font-size: 1.5rem;
  }
`;
