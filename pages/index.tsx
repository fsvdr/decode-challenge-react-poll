import React from 'react';
import styled from 'styled-components';
import dynamic from 'next/dynamic';
import GlobalStyles from '../components/GlobalStyles';
import questions from '../questions.json';
import PollPlaceholder from '../components/PollPlaceholder';

// Server side rendering the poll component results in a mismatch with what
// the client renders since we're basically generating a random question 
// twice, we use a dynamic import here to avoid this issue
const DynamicPoll = dynamic(() => import('../components/Poll'), {
  ssr: false,
  loading: () => <PollPlaceholder />,
});

const IndexPage = styled.div``;

export default () => (
  <IndexPage>
    <GlobalStyles />
    <h1>Decode React Poll Challenge</h1>
    <p>
      Here is some text that is on the page in a paragraph tag. The poll will
      appear within this context below.
    </p>
    <DynamicPoll qandas={questions} />
    <p>
      Here is the rest of the text on the page. We just have something down here
      for context to see it in.
    </p>
  </IndexPage>
);
