import React, { useState } from 'react';
import styled from 'styled-components';
import { Answer } from '../types';

type Props = {
  answer: Answer;
  selection?: string;
  totalVotes: number;
  isWinner?: boolean;
  onClick: (answer: string) => void;
};

type StyledProps = {
  isPollClosed: boolean;
  votePercentage: number;
  isWinner: boolean;
};

const getCalculatedPercentage = (totalVotes: number, votes: number) =>
  Number(((votes * 100) / totalVotes).toFixed(0));

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
    inline-size: ${(props) =>
      props.isPollClosed ? `${props.votePercentage}%` : 0};
    block-size: 100%;
    background-color: ${(props) =>
      props.isWinner ? 'rgb(164, 255, 244)' : 'rgb(232, 232, 232)'};
    transition: inline-size 0.6s;
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
  answer: { text, votes: initialVotes },
  selection,
  totalVotes,
  isWinner,
  onClick,
}: Props) => {
  const [votes, setVotes] = useState<number>(initialVotes);

  const handleClick = () => {
    if (selection) return; // Lock selection if we already voted
    onClick(text);
    setVotes(votes + 1);
  };

  const votePercentage = getCalculatedPercentage(totalVotes, votes);

  return (
    <StyledAnswer
      type="button"
      isPollClosed={Boolean(selection)}
      isWinner={isWinner || false}
      votePercentage={votePercentage}
      onClick={handleClick}
      aria-label={`Select ${text.slice(2)}`}
    >
      <span className="answer__content">
        {text}

        {selection && selection === text ? (
          <img src={require('../static/check-circle.svg')} alt="" />
        ) : null}
      </span>

      {selection ? (
        <span className="answer__percentage">{votePercentage}%</span>
      ) : null}
    </StyledAnswer>
  );
};

export default AnswerOption;
