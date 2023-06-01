import styled from 'styled-components';
import DropDown from './DropDown';
import OptionBox from './OptionBox';
import { RxDragHandleDots2 } from 'react-icons/rx';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  copyQuestion,
  deleteQuestion,
  setQuestionTitle,
} from '../store/questionSlice';
import { useCallback } from 'react';
interface QuestionProps {
  idx: number;
}

const Question: React.FC<QuestionProps> = ({ idx }) => {
  const question = useAppSelector((state) => state.survey.questions[idx]);
  const dispatch = useAppDispatch();

  const changeTitle = useCallback(
    (str: string): void => {
      dispatch(setQuestionTitle({ str, idx }));
    },
    [dispatch, idx],
  );

  const copyQuest = useCallback(
    (idx: number): void => {
      dispatch(copyQuestion(idx));
    },
    [dispatch],
  );

  const deleteQuest = useCallback(
    (idx: number): void => {
      dispatch(deleteQuestion(idx));
    },
    [dispatch],
  );

  return (
    <>
      <Container>
        <Drag>
          <RxDragHandleDots2 size={20} style={{ transform: 'rotate(90deg)' }} />
        </Drag>
        <TopBox>
          <QuestionTitle
            placeholder="질문"
            value={question.questionTitle}
            onChange={(e) => {
              changeTitle(e.target.value);
            }}
          />
          <DropDown idx={idx} />
        </TopBox>
        <OptionBox category={question.questionType} idx={idx} />
        <BottomBox>
          <div onClick={() => copyQuest(idx)}>복사</div>
          <div onClick={() => deleteQuest(idx)}>삭제</div>
          <div>필수</div>
        </BottomBox>
      </Container>
    </>
  );
};

export default Question;

const Container = styled.div`
  width: 100%;
  max-width: 960px;
  min-width: 640px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 10px;
  border: 1px solid #e0e0e0;
  padding: 0 1.6rem;
`;

const Drag = styled.div`
  width: 100%;
  height: 1.6rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  cursor: move;
  color: #717579;
`;

const TopBox = styled.div`
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const BottomBox = styled.div`
  width: 100%;
  border-top: 1px solid #e0e0e0;
  box-sizing: border-box;
  padding: 1.6rem;
  display: flex;
  gap: 1.2rem;
  flex-direction: row;
  justify-content: end;
`;

const QuestionTitle = styled.input`
  width: 60%;
  box-sizing: border-box;
  border: none;
  border-bottom: 1px solid #717579;
  font-size: 1rem;
  padding: 1.2rem;
  background-color: #f8f9fa;
  &:focus {
    outline: none;
    border-bottom: solid 2px #613cb0;
    margin-bottom: -1px;
  }

  &:hover {
    background-color: #f1f3f4;
  }
`;
