import styled from 'styled-components';
import Heading from './Heading';
import Question from './Qustion';
import { useAppSelector } from '../store/hooks';

const CardBox = () => {
  const questions = useAppSelector((state) => state.survey.questions);

  const getQuestions = () => {
    return questions.map((e, idx) => <Question key={idx} idx={idx} />);
  };

  return (
    <>
      <Container>
        <Heading />
        {getQuestions()}
      </Container>
    </>
  );
};

export default CardBox;

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 1rem 10rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  gap: 1rem;
`;
