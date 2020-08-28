import React from 'react';
import styled from 'styled-components';
import { Answer } from '../types';

type Props = {
  answer: Answer;
};

const StyledAnswer = styled.button`
  position: relative;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  inline-size: 100%;
  font-size: 0.9rem;
  padding: 0.6rem 0.6rem;
  border: 1.4px solid rgb(225, 225, 225);
  border-radius: 6px;
  background-color: transparent;
  outline: none;
  transition: border-color 0.3s;
  overflow: hidden;

  &:hover,
  &:focus {
    border-color: #000000;
  }

  & ::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    inline-size: 10%;
    block-size: 100%;
    background-color: rgb(232, 232, 232);
    z-index: 0;
  }

  & span {
    z-index: 1;
  }

  & .answer__content {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
  }

  & img {
    width: 1rem;
    margin-inline-start: 0.4rem;
  }

  &.is-winner {
    font-weight: bold;

    &::before {
      background-color: rgb(164, 255, 244);
    }
  }
`;

const AnswerOption = ({ answer: { text } }: Props) => {
  return (
    <StyledAnswer aria-label={`Select ${text.slice(2)}`}>
      <span className="answer__content">
        {text}
        <img src={require('../static/check-circle.svg')} />
      </span>

      <span className="answer__percentage">25%</span>
    </StyledAnswer>
  );
};

export default AnswerOption;
