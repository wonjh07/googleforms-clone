import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import PreQuestion from './PreQuestion';
import PreHeading from './PreHeading';
import { initAnswers } from '../../store/previewSlice';
import { useCallback, useEffect } from 'react';

const PreCardBox = () => {
  const questions = useAppSelector((state) => state.survey.questions);
  const answers = useAppSelector((state) => state.preview.data);
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

  useEffect(() => {
    const getAnswerSheet = () => {
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
    };

    getAnswerSheet();
  }, [questions, resetAnswer]);

  return (
    <>
      <Container>
        <PreHeading />
        {getQuestions()}
        <BottomBox>
          <Submit
            onClick={() => {
              console.log(answers);
            }}>
            제출
          </Submit>
          <RemoveAnswer>양식 지우기</RemoveAnswer>
        </BottomBox>
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

const BottomBox = styled.div`
  width: 100%;
  max-width: 720px;
  min-width: 640px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: start;
`;

const Submit = styled.div`
  cursor: pointer;
  color: white;
  padding: 0.6rem 1.4rem;
  border-radius: 4px;
  background-color: #613cb0;
  font-size: 0.9rem;

  &:hover {
    opacity: 0.9;
  }
`;

const RemoveAnswer = styled.div`
  cursor: pointer;
  color: #613cb0;
  padding: 0.6rem;
  border-radius: 4px;
  font-size: 0.9rem;

  &:hover {
    background-color: #e0e0e0;
  }
`;