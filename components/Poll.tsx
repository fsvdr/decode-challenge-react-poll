import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { QandAsDocument, QandA, Answer } from '../types';
import AnswerOption from './AnswerOption';

type Props = {
  qandas: QandAsDocument /* q and a's -- questions and answers document */;
};

const PollWrapper = styled.form`
  inline-size: min(80%, 300px);
  padding: 1.6rem;
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

export default function Poll({ qandas }: Props) {
  const question = useRef<QandA>(getRandomQuestion(qandas.questions));
  const [answers, setAnswers] = useState<Answer[]>(question.current.answers);
  const [votes, setVotes] = useState<number>(() =>
    getTotalVotes(answers)
  );
  const [selection, setSelection] = useState<Answer>();
  const [winner, setWinner] = useState<Answer>();
  const [resultLabel, setResultLabel] = useState<string>('');

  const selectAnswer = (answer: Answer) => {
    const updatedAnswer = { ... answer, votes: answer.votes + 1};
    const updatedAnswers: Answer[] = answers.map(a =>  a.text === updatedAnswer.text ? updatedAnswer : a);
    const updatedWinner = getMostPopularAnswer(updatedAnswers);
    const updatedVotes = getTotalVotes(updatedAnswers);

    const isWinner = updatedAnswer.text === updatedWinner.text;
    const isTie = !isWinner && updatedAnswer.votes === updatedWinner.votes;
    const updatedResultLabel = isTie ? `Your answer and ${updatedWinner.text} is tied with ${updatedWinner.votes} each` : ``;

    setAnswers(updatedAnswers);
    setSelection(updatedAnswer);
    setWinner(updatedWinner);
    setVotes(updatedVotes);
    setResultLabel(updatedResultLabel);
  };

  return (
    <PollWrapper>
      <h1>{question.current.question.text}</h1>

      <div className="poll__options">
        {answers.map((answer) => (
          <AnswerOption
            answer={answer}
            showResults={Boolean(winner)}
            isSelected={selection && selection.text === answer.text || false}
            isWinner={winner && (answer.text === winner.text || answer.votes === winner.votes) || false}
            totalVotes={votes}
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
