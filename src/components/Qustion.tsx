import styled from 'styled-components';
import DropDown from './DropDown';
import OptionBox from './OptionBox';
import { RxDragHandleDots2 } from 'react-icons/rx';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { MdContentCopy } from 'react-icons/md';
import { RiDeleteBin6Line } from 'react-icons/ri';
import {
  copyQuestion,
  deleteQuestion,
  focusOn,
  setQuestionTitle,
} from '../store/questionSlice';
import { useCallback, useEffect, useState } from 'react';
import ToggleBox from './ToggleBox';
interface QuestionProps {
  idx: number;
  changeStart: (v: number) => void;
  changeEnd: (v: number) => void;
}

const Question: React.FC<QuestionProps> = ({ idx, changeStart, changeEnd }) => {
  const question = useAppSelector((state) => state.survey.questions[idx]);
  const focused = useAppSelector((state) => state.survey.focus);
  const [selected, setSelected] = useState(false);
  const [grab, setGrab] = useState(false);
  const dispatch = useAppDispatch();

  const focusOnHere = useCallback(() => {
    if (!selected) {
      dispatch(focusOn(idx));
    }
  }, [dispatch, idx, selected]);

  useEffect(() => {
    if (focused === idx) {
      setSelected(true);
    } else {
      setSelected(false);
    }
  }, [focused, idx]);

  const changeTitle = useCallback(
    (str: string) => {
      dispatch(setQuestionTitle({ str, idx }));
    },
    [dispatch, idx],
  );

  const copyQuest = useCallback(() => {
    dispatch(copyQuestion());
  }, [dispatch]);

  const deleteQuest = useCallback(() => {
    dispatch(deleteQuestion());
  }, [dispatch]);

  const dragFunction = (event: any, type: string) => {
    if (type === 'Start') {
      changeStart(parseInt(event.target.id));
    } else if (type === 'Enter' && event.target.dataset.dragzone) {
      changeEnd(parseInt(event.target.id));
    }
  };

  return (
    <>
      <Container
        draggable
        id={`${idx}`}
        onDragStart={(e) => {
          dragFunction(e, 'Start');
        }}
        onDragOver={(e) => {
          dragFunction(e, 'Enter');
          e.preventDefault();
        }}
        onClick={() => focusOnHere()}>
        <SelectedBox selected={selected}>
          <Drag data-dragzone={true} id={`${idx}`}>
            <RxDragHandleDots2
              size={20}
              style={{ transform: 'rotate(90deg)' }}
            />
          </Drag>
          <TopBox>
            {!selected && (
              <Title>
                {question.questionTitle ? question.questionTitle : '질문'}
              </Title>
            )}
            {selected && (
              <>
                <QuestionTitle
                  placeholder="질문"
                  value={question.questionTitle}
                  onChange={(e) => {
                    changeTitle(e.target.value);
                  }}
                />
                <DropDown idx={idx} />
              </>
            )}
          </TopBox>
          {!grab && <OptionBox category={question.questionType} idx={idx} />}
          {selected && (
            <BottomBox>
              <LeftBox>
                <MdContentCopy
                  style={{ cursor: 'pointer' }}
                  size={22}
                  onClick={() => copyQuest()}
                />
                <RiDeleteBin6Line
                  style={{ cursor: 'pointer' }}
                  size={24}
                  onClick={() => deleteQuest()}
                />
              </LeftBox>
              <RightBox>
                <p>필수</p>
                <ToggleBox idx={idx} />
              </RightBox>
            </BottomBox>
          )}
        </SelectedBox>
      </Container>
    </>
  );
};

export default Question;

const Container = styled.div`
  width: 100%;
  height: 100%;
  max-width: 960px;
  min-width: 640px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 10px;
  border: 1px solid #e0e0e0;
  overflow: hidden;
  animation-name: PopUp;
  animation-duration: 0.25s;
  animation-timing-function: ease-in-out;
`;

const SelectedBox = styled.div<{ selected: boolean }>`
  width: 100%;
  padding: 0 1.1rem;
  box-sizing: border-box;
  border-left: 0.5rem solid ${(props) => (props.selected ? '#5383ec' : 'white')};
  border-right: 0.5rem solid white;
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
  height: 5rem;
  border-top: 1px solid #e0e0e0;
  box-sizing: border-box;
  padding: 1.4rem;
  display: flex;
  gap: 1.2rem;
  flex-direction: row;
  justify-content: end;
  align-items: center;
`;

const Title = styled.div`
  width: 60%;
  font-weight: 500;
  box-sizing: border-box;
  border: none;
  padding-top: 1.2rem;
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

const LeftBox = styled.div`
  width: auto;
  height: 100%;
  gap: 1rem;
  padding: 0 1rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-right: 1px solid #a1a2a3;
  color: #717579;
`;

const RightBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  font-size: 0.9rem;
`;
