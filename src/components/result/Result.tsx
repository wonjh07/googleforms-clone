import styled from 'styled-components';
import ResultCardBox from './ResultCardBox';

const Result = () => {
  return (
    <Container>
      <ResultCardBox />
      <Footer />
    </Container>
  );
};

export default Result;

const Container = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background-color: #efebf7;
`;

const Footer = styled.div`
  width: 100%;
  height: 200px;
`;
