import React, { useState } from 'react';
import styled from 'styled-components';
import { Answer } from '../types';

type Props = {
  answer: Answer;
  selection?: string;
  totalVotes: number;
  winner: Answer;
  onClick: (answer: Answer) => void;
};

type StyledProps = {
  isPollClosed: boolean;
  votePercentage: number;
  isWinner: boolean;
};

const StyledAnswer = styled.button<StyledProps>`
  position: relative;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  inline-size: 100%;
  font-size: 1rem;
  font-weight: ${(props) =>
    props.isPollClosed && props.isWinner ? 'bold' : 'normal'};
  padding: 0.6rem 0.6rem;
  border: 1.4px solid rgb(225, 225, 225);
  border-radius: 6px;
  background-color: transparent;
  outline: none;
  transition: border-color 0.3s;
  overflow: hidden;
  cursor: ${(props) => (props.isPollClosed ? 'not-allowed' : 'pointer')};

  &:hover,
  &:focus {
    border-color: ${(props) =>
      props.isPollClosed ? 'rgb(225, 225, 225)' : '#000000'};
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

/**
 * Calculates the percentage that represents the provided votes
 * within the total votes provided
 */
const getCalculatedPercentage = (totalVotes: number, votes: number) =>
  Number(((votes * 100) / totalVotes).toFixed(0));

/**
 * Generates an accessible label for the poll option considering two states:
 *  1. User hasn't voted: Button is described by the text content
 *  2. User has voted: Buttons are described by the poll results
 * @param selection
 * @param text
 * @param votes
 * @param percentage
 */
const getResultLabel = (
  selection: string = '',
  text: string,
  votes: number,
  percentage: number
) => {
  if (!selection) return `Select ${text}`;

  return `${text} has been voted by ${percentage} percent of ${votes} total votes.`;
};
const AnswerOption = ({
  answer,
  selection,
  totalVotes,
  winner,
  onClick,
}: Props) => {
  const [votes, setVotes] = useState<number>(answer.votes);

  const handleClick = () => {
    if (selection) return; // Lock selection if we already voted
    onClick(answer);
    setVotes(votes + 1);
  };

  const votePercentage = getCalculatedPercentage(totalVotes, votes);

  return (
    <StyledAnswer
      type="button"
      isPollClosed={Boolean(selection)}
      isWinner={winner.text === answer.text || winner.votes === votes}
      votePercentage={votePercentage}
      onClick={handleClick}
      aria-label={getResultLabel(
        selection,
        answer.text.slice(2),
        totalVotes,
        votePercentage
      )}
    >
      <span className="answer__content">
        {answer.text}

        {selection && selection === answer.text ? (
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
