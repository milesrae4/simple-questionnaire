import styled from '@emotion/styled';

export const Box = styled.div`
  position: relative;
  padding: 2rem;
  width: clamp(15rem, 100%, 45rem);
  height: clamp(20rem, 60vh, 35rem);
  border-radius: 1.75rem;
  background: white;

  @media only screen and (min-width: 420px) {
    height: clamp(20rem, 45vh, 30rem);
  }

  @media only screen and (min-width: 640px) {
    height: clamp(10rem, 100%, 25rem);
  }
`;
