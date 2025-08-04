import React from 'react';
import styled from 'styled-components';

const Loader = () => {
  return (
    <StyledWrapper>
      <div className="shimmer-bg" />
      <div className="container">
        <div className="loader" />
        <div className="loader" />
        <div className="loader" />
        <div className="loader" />
        <div className="loader" />
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  .shimmer-bg {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      120deg,
      #e0e0e0 30%,
      #f5f5f5 38%,
      #f5f5f5 40%,
      #e0e0e0 48%
    );
    background-size: 200% 100%;
    animation: shimmer 1.6s infinite;
    z-index: -1;
  }

  .container {
    width: 200px;
    height: 200px;
    display: flex;
    justify-content: space-between;
    align-items: end;
  }

  .loader {
    width: 20px;
    height: 40px;
    border-radius: 10px 50px;
    box-shadow: 0px 0px 5px black;
    animation: dominos 1s ease infinite;
    transform-origin: bottom center;
  }

  .loader:nth-child(1) {
    animation-delay: 0.325s;
    background-color: #5d9960;
  }

  .loader:nth-child(2) {
    animation-delay: 0.5s;
    background-color: #82a587;
  }

  .loader:nth-child(3) {
    animation-delay: 0.625s;
    background-color: #8bac74;
  }

  .loader:nth-child(4) {
    animation-delay: 0.74s;
    background-color: #b9bf90;
  }

  .loader:nth-child(5) {
    animation-delay: 0.865s;
    background-color: #e7d2ab;
  }

  @keyframes dominos {
    0% {
      transform: rotate(0);
      opacity: 1;
    }
    50% {
      opacity: 0.7;
    }
    75% {
      transform: rotate(90deg);
    }
    100% {
      transform: rotate(0);
      opacity: 1;
    }
  }

  @keyframes shimmer {
    100% {
      background-position: -100% 0;
    }
  }
`;

export default Loader;
