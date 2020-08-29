import React, { useState } from 'react';
import styled from 'styled-components';
import { QandAsDocument, QandA, Answer } from '../types';
import AnswerOption from './AnswerOption';

type Props = {
  qandas: QandAsDocument /* q and a's -- questions and answers document */;
};

const PollWrapper = styled.form`
  inline-size: min(80%, 300px);
  padding: 1.2rem;
  background-color: #ffffff;
  border-radius: 8px;
  margin: 3rem auto;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  border: 1px solid rgb(239, 239, 239);

  & h1 {
    font-size: 1.2rem;
    margin-block-start: 0;
  }

  & .poll__options {
    padding-block-start: 0.8rem;
    margin-block-end: 1rem;

    & button {
      margin-block-end: 0.6rem;
    }
  }

  & .poll__votes {
    font-size: 0.8rem;
    color: rgb(157, 157, 157);
    margin-block-end: 0;
  }
`;

/**
 * Calculates the total amount of votes within the provided answers
 * @param answers
 */
const getTotalVotes = (answers: Answer[]): number =>
  answers.reduce((acc, answer) => acc + answer.votes, 0);

/**
 * Identifies the answer with most votes within the provided set
 * @param answers
 */
const getMostPopularAnswer = (answers: Answer[]): Answer =>
  answers.reduce(
    (acc: Answer, answer) => {
      return answer.votes > acc.votes ? answer : acc;
    },
    { text: '', votes: 0 }
  );

/**
 * Get a random question within the provided set
 * @param questions
 */
const getRandomQuestion = (questions: QandA[]) => {
  const randomIndex = Math.floor(Math.random() * questions.length);
  return questions[randomIndex];
};

/**
 * Generates an accessible label for the poll results considering wether there's a tie
 * and wether the user voted for the winning choice
 * @param isTie
 * @param isWinner
 * @param winner
 */
const getPollResultLabel = (
  isTie: boolean,
  isWinner: boolean,
  winner: Answer
) => {
  if (isTie)
    return `Your answer and ${winner.text} are tied with ${winner.votes} each`;

  return isWinner
    ? 'Your answer is ahead on the poll!'
    : `${winner.text} is winning the poll with ${winner.votes} votes`;
};

export default function Poll({ qandas }: Props) {
  const [question] = useState<QandA>(() => getRandomQuestion(qandas.questions));
  const [selection, setSelection] = useState<string>();
  const [votes, setVotes] = useState<number>(() =>
    getTotalVotes(question.answers)
  );
  const [winner, setWinner] = useState<Answer>(() =>
    getMostPopularAnswer(question.answers)
  );
  const [resultLabel, setResultLabel] = useState<string>('');

  const selectAnswer = (answer: Answer) => {
    const updatedVotes = votes + 1;
    const isTie = answer.votes + 1 === winner.votes;
    const isWinner = answer.votes + 1 > winner.votes;

    setSelection(answer.text);
    setVotes(updatedVotes);

    setResultLabel(getPollResultLabel(isTie, isWinner, winner));

    if (!isWinner) return;

    setWinner(answer);
  };

  return (
    <PollWrapper>
      <h1>{question.question.text}</h1>

      <div className="poll__options">
        {question.answers.map((answer) => (
          <AnswerOption
            answer={answer}
            selection={selection}
            totalVotes={votes}
            winner={winner}
            onClick={selectAnswer}
            key={answer.text}
          />
        ))}
      </div>

      <p
        className="poll__votes"
        aria-label={`This poll has ${votes} votes. ${resultLabel}`}
      >
        {votes} votes
      </p>
    </PollWrapper>
  );
}
