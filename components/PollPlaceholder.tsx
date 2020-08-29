import React from 'react';
import styled from 'styled-components';

const Placeholder = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  inline-size: min(80%, 300px);
  height: calc(320px - 3rem);
  padding: 1.2rem;
  background-color: #ffffff;
  border-radius: 8px;
  margin: 3rem auto;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  border: 1px solid rgb(239, 239, 239);
`;

const PollPlaceholder = () => <Placeholder></Placeholder>;

export default PollPlaceholder;
