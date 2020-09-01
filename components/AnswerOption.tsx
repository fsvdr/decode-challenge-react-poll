import React from 'react';
import styled from 'styled-components';
import { Answer } from '../types';

type Props = {
  answer: Answer;
  showResults: boolean;
  isSelected: boolean;
  isWinner: boolean;
  totalVotes: number;
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

const AnswerOption = ({
  answer,
  showResults,
  isSelected,
  totalVotes,
  isWinner,
  onClick,
}: Props) => {

  const handleClick = () => {
    if (showResults) return; // Lock selection if we already voted
    onClick(answer);
  };

  const votePercentage = getCalculatedPercentage(totalVotes, answer.votes);

  return (
    <StyledAnswer
      type="button"
      isPollClosed={showResults}
      isWinner={isWinner}
      votePercentage={votePercentage}
      onClick={handleClick}
      aria-label={showResults ? `Select ${answer.text}` : `${answer.text} has been voted by ${votePercentage} percent of ${totalVotes} total votes.`}
    >
      <span className="answer__content">
        {answer.text}

        {showResults && isSelected ? (
          <img src={require('../static/check-circle.svg')} alt="" />
        ) : null}
      </span>

      {showResults ? (
        <span className="answer__percentage">{votePercentage}%</span>
      ) : null}
    </StyledAnswer>
  );
};

export default AnswerOption;
