import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import PreQuestion from './PreQuestion';
import PreHeading from './PreHeading';
import { closePreview, setAnswers } from '../../store/previewSlice';
import { useCallback, useEffect } from 'react';

const PreCardBox = () => {
  const questions = useAppSelector((state) => state.survey.questions);
  const dispatch = useAppDispatch();

  const getQuestions = () => {
    return questions.map((e, idx) => <PreQuestion key={idx} idx={idx} />);
  };

  const quitPreview = useCallback(() => {
    dispatch(closePreview());
  }, [dispatch]);

  const resetAnswer = useCallback(
    (e: any) => {
      dispatch(setAnswers(e));
    },
    [dispatch],
  );

  useEffect(() => {
    const getAnswerSheet = () => {
      const temp = questions.map(() => []);
      resetAnswer(temp);
    };

    getAnswerSheet();
  }, [questions, resetAnswer]);

  return (
    <>
      <Container>
        <PreHeading />
        {getQuestions()}
        <Close onClick={quitPreview}>미리보기 종료</Close>
      </Container>
    </>
  );
};

export default PreCardBox;

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

const Close = styled.div`
  cursor: pointer;
  color: #613cb0;
`;
