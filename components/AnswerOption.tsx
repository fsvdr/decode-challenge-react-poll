import React from 'react';
import styled from 'styled-components';
import { Answer } from '../types';

type Props = {
  answer: Answer;
  selection?: string;
  percentage?: number;
  isWinner?: boolean;
  onClick: (answer: string) => void;
};

type StyledProps = {
  isWinner: boolean;
};

const StyledAnswer = styled.button<StyledProps>`
  position: relative;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  inline-size: 100%;
  font-size: 0.9rem;
  font-weight: ${(props) => (props.isWinner ? 'bold' : 'normal')};
  padding: 0.6rem 0.6rem;
  border: 1.4px solid rgb(225, 225, 225);
  border-radius: 6px;
  background-color: transparent;
  outline: none;
  transition: border-color 0.3s;
  overflow: hidden;
  cursor: pointer;

  &:hover,
  &:focus {
    border-color: #000000;
  }

  & ::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    inline-size: 0;
    block-size: 100%;
    background-color: ${(props) =>
      props.isWinner ? 'rgb(164, 255, 244)' : 'rgb(232, 232, 232)'};
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
`;

const AnswerOption = ({
  answer: { text },
  selection,
  isWinner,
  onClick,
}: Props) => {
  const handleClick = () => {
    if (selection) return; // Lock selection if we already voted
    onClick(text);
  };

  return (
    <StyledAnswer
      type="button"
      isWinner={isWinner || false}
      onClick={handleClick}
      aria-label={`Select ${text.slice(2)}`}
    >
      <span className="answer__content">
        {text}

        {selection && selection === text ? (
          <img src={require('../static/check-circle.svg')} alt="" />
        ) : null}
      </span>

      <span className="answer__percentage">25%</span>
    </StyledAnswer>
  );
};

export default AnswerOption;
