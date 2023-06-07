import styled from 'styled-components';
import DropDown from './DropDown';
import OptionBox from './OptionBox';
import { RxDragHandleDots2 } from 'react-icons/rx';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { focusOn, setDragMod, setQuestionTitle } from '../store/questionSlice';
import { useEffect, useState } from 'react';
import BottomBox from './BottomBox';
interface QuestionProps {
  idx: number;
  changeStart: (v: number) => void;
  changeEnd: (v: number) => void;
}

const Question: React.FC<QuestionProps> = ({ idx, changeStart, changeEnd }) => {
  const question = useAppSelector((state) => state.survey.questions[idx]);
  const focused = useAppSelector((state) => state.survey.focus);
  const isDraggable = useAppSelector((state) => state.survey.draggable);
  const [selected, setSelected] = useState(false);
  const [grabIcon, setGrabIcon] = useState(false);
  const [grab, setGrab] = useState(false);
  const dispatch = useAppDispatch();

  const focusOnHere = () => {
    if (!selected) {
      dispatch(focusOn(idx));
    }
  };

  const changeTitle = (str: string) => {
    dispatch(setQuestionTitle({ str, idx }));
  };

  const setDraggable = (v: boolean) => {
    dispatch(setDragMod(v));
  };

  useEffect(() => {
    if (focused === idx) {
      setSelected(true);
    } else {
      setSelected(false);
    }
  }, [focused, idx]);

  const dragFunction = (e: any, type: string) => {
    if (type === 'Start') {
      e.dataTransfer.effectAllowed = 'move';
      setGrab(true);
      changeStart(parseInt(e.target.id));
    } else if (type === 'Enter' && e.target.dataset.dropzone) {
      changeEnd(parseInt(e.target.id));
    } else if (type === 'End') {
      setGrab(false);
    }
  };

  return (
    <>
      <Container
        draggable={isDraggable}
        id={`${idx}`}
        onDragStart={(e) => {
          dragFunction(e, 'Start');
        }}
        onDragEnter={(e) => {
          dragFunction(e, 'Enter');
        }}
        onDragOver={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        onDragEnd={(e) => {
          dragFunction(e, 'End');
        }}
        onClick={() => focusOnHere()}
        grab={grab}>
        <SelectedBox selected={selected}>
          <Drag
            data-dropzone={true}
            id={`${idx}`}
            onMouseEnter={() => {
              setDraggable(true);
              setGrabIcon(true);
            }}
            onMouseLeave={() => {
              setDraggable(false);
              setGrabIcon(false);
            }}>
            {grabIcon && (
              <RxDragHandleDots2
                size={20}
                style={{ transform: 'rotate(90deg)' }}
              />
            )}
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
          {grab && <Dragging>...</Dragging>}
          {selected && !grab && <BottomBox idx={idx} />}
        </SelectedBox>
      </Container>
    </>
  );
};

export default Question;

const Container = styled.div<{ grab: boolean }>`
  width: 100%;
  height: 100%;
  max-width: 960px;
  min-width: 640px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 10px;
  border: ${(props) =>
    props.grab ? '4px solid #613cb0' : '1px solid #e0e0e0'};
  overflow: hidden;
  animation-name: PopUp;
  animation-duration: 0.3s;
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

const Dragging = styled.div`
  width: 100%;
  height: 8rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  color: #717579;
`;
