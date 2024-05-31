import React from 'react';
import styled, { keyframes } from 'styled-components';

const bounce = keyframes`
  to {
    opacity: 0.3;
    transform: translate3d(0, -1rem, 0);
  }
`;

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const ripple = keyframes`
  from {
    transform: scale(0);
    opacity: 1;
  }
  to {
    transform: scale(1);
    opacity: 0;
  }
`;

const fancy = keyframes`
  to {
    transform: rotate(360deg) scale(0.5);
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #282a37;
`;

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Circle = styled.div`
  width: 1rem;
  height: 1rem;
  margin: 2rem 0.3rem;
  background: #979fd0;
  border-radius: 50%;
  animation: ${bounce} 0.9s infinite alternate;

  &:nth-child(2) {
    animation-delay: 0.3s;
  }

  &:nth-child(3) {
    animation-delay: 0.6s;
  }
`;

const Donut = styled.div`
  width: 2rem;
  height: 2rem;
  margin: 2rem;
  border-radius: 50%;
  border: 0.3rem solid rgba(151, 159, 208, 0.3);
  border-top-color: #979fd0;
  animation: ${spin} 1.5s infinite linear;

  &.multi {
    border-bottom-color: #979fd0;
  }
`;

const Ripple = styled.div`
  width: 2rem;
  height: 2rem;
  margin: 2rem;
  border-radius: 50%;
  border: 0.3rem solid #979fd0;
  transform: translate(50%);
  animation: ${ripple} 1s ease-out infinite;
`;

const MultiRippleContainer = styled.div`
  width: 2.6rem;
  height: 2.6rem;
  margin: 2rem;
`;

const MultiRippleCircle = styled.div`
  position: absolute;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  border: 0.3rem solid #979fd0;
  animation: ${ripple} 1.5s infinite;

  &:nth-child(2) {
    animation-delay: 0.5s;
  }
`;

const FancySpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 5rem;
  height: 5rem;
`;

const Ring = styled.div`
  position: absolute;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  border-width: 0.5rem;
  border-style: solid;
  border-color: transparent;
  animation: ${fancy} 2s infinite alternate;

  &:nth-child(1) {
    border-left-color: #979fd0;
    border-right-color: #979fd0;
  }

  &:nth-child(2) {
    border-top-color: #979fd0;
    border-bottom-color: #979fd0;
    animation-delay: 1s;
  }
`;

const Dot = styled.div`
  width: 1rem;
  height: 1rem;
  background: #979fd0;
`;

const LoadingSpinner = () => {
  return (
    <LoadingContainer className='w-100 d-flex justify-content-center align-items-center'>
      <LoadingWrapper>
        <Circle></Circle>
        <Circle style={{ animationDelay: '0.3s' }}></Circle>
        <Circle style={{ animationDelay: '0.6s' }}></Circle>
      </LoadingWrapper>
      {/* <Donut></Donut> */}
      {/* <Donut className="multi"></Donut> */}
      {/* <Ripple></Ripple> */}
      {/* <MultiRippleContainer>
        <MultiRippleCircle></MultiRippleCircle>
        <MultiRippleCircle style={{ animationDelay: '0.5s' }}></MultiRippleCircle>
      </MultiRippleContainer> */}
      {/* <FancySpinner>
        <Ring>
          <Ring style={{ borderLeftColor: '#979fd0', borderRightColor: '#979fd0' }}></Ring>
          <Ring style={{ borderTopColor: '#979fd0', borderBottomColor: '#979fd0', animationDelay: '1s' }}></Ring>
        </Ring>
        <Dot></Dot>
      </FancySpinner> */}
    </LoadingContainer>
  );
};

export default LoadingSpinner;
