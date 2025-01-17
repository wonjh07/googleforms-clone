import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { initAnswers } from '../../store/previewSlice';
import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PreQuestion from './PreQuestion';
import PreHeading from './PreHeading';

const PreCardBox = () => {
  const questions = useAppSelector((state) => state.survey.questions);
  const [reset, setReset] = useState(true);
  const dispatch = useAppDispatch();

  const getQuestions = () => {
    return questions.map((e, idx) => <PreQuestion key={idx} idx={idx} />);
  };

  const resetAnswer = useCallback(
    (e: any) => {
      dispatch(initAnswers(e));
    },
    [dispatch],
  );

  const getAnswerSheet = useCallback(() => {
    const temp = questions.map((e) => {
      if (e.questionType === '체크박스') {
        const multi: any = {};
        e.options.map((opt) => {
          multi[opt] = false;
        });
        return multi;
      } else {
        return '';
      }
    });
    resetAnswer(temp);
  }, [questions, resetAnswer]);

  useEffect(() => {
    if (reset) {
      getAnswerSheet();
      setReset(false);
    }
  }, [getAnswerSheet, reset]);

  return (
    <Container>
      <PreHeading />
      {!reset && getQuestions()}
      <BottomBox>
        <Submit to="/result">제출</Submit>
        <RemoveAnswer onClick={() => setReset(true)}>양식 지우기</RemoveAnswer>
      </BottomBox>
    </Container>
  );
};

export default PreCardBox;

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

const BottomBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: start;
  width: 100%;
  max-width: 720px;
  min-width: 640px;
`;

const Submit = styled(Link)`
  padding: 0.6rem 1.4rem;
  border-radius: 4px;
  background-color: #613cb0;
  color: white;
  font-size: 0.9rem;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

const RemoveAnswer = styled.div`
  padding: 0.6rem;
  border-radius: 4px;
  color: #613cb0;
  font-size: 0.9rem;
  cursor: pointer;

  &:hover {
    background-color: #e0e0e0;
  }
`;
