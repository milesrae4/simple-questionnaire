import styled from '@emotion/styled';

export const ActionsWrapper = styled.div`
  position: absolute;
  left: 0;
  bottom: 1.5rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 1rem;

  @media only screen and (min-width: 480px) {
    padding: 0 2rem;
  }
`;

export const ActionButton = styled.button`
  border: none;
  background: white;
  font-size: 1.25rem;
  font-weight: 500;
  color: ${({ color }) => color};
`;
