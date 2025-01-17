import styled from 'styled-components';
import { useAppSelector } from '../../store/hooks';
import ResultQuestion from './ResultQuestion';
import ResultHeading from './ResultHeading';
import { Link } from 'react-router-dom';

const ResultCardBox = () => {
  const questions = useAppSelector((state) => state.survey.questions);

  const getQuestions = () => {
    return questions.map((e, idx) => <ResultQuestion key={idx} idx={idx} />);
  };

  return (
    <Container>
      <ResultHeading />
      {getQuestions()}
      <HomeBtn to="/">홈으로</HomeBtn>
    </Container>
  );
};

export default ResultCardBox;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 1rem 10rem;
  gap: 1rem;
`;

const HomeBtn = styled(Link)`
  text-decoration: none;
`;
