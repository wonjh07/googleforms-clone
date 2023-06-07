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
  dndStart: (v: number) => void;
  dndEnter: (v: number) => void;
  dndEnd: () => void;
}

const Question: React.FC<QuestionProps> = ({
  idx,
  dndStart,
  dndEnter,
  dndEnd,
}) => {
  const [grab, setGrab] = useState(false);
  const [selected, setSelected] = useState(false);
  const [grabIcon, setGrabIcon] = useState(false);
  const isDraggable = useAppSelector((state) => state.survey.draggable);
  const question = useAppSelector((state) => state.survey.questions[idx]);
  const focused = useAppSelector((state) => state.survey.focus);
  const dispatch = useAppDispatch();
  const changeTitle = (str: string) => dispatch(setQuestionTitle({ str, idx }));
  const focusOnHere = () => {
    if (!selected) {
      dispatch(focusOn(idx));
    }
  };

  const setDraggable = (v: boolean) => {
    if (isDraggable !== v) {
      dispatch(setDragMod(v));
    }
  };

  const changeIconState = (state: boolean) => {
    setDraggable(state);
    setGrabIcon(state);
  };

  const dragStart = (e: any) => {
    if (e.target.dataset.drag === 'quest') {
      e.dataTransfer.effectAllowed = 'move';
      setGrab(true);
      dndStart(parseInt(e.target.id));
    }
  };

  const dragEnter = (e: any) => {
    if (e.target.dataset.dropzone === 'quest' && e.target.id) {
      dndEnter(parseInt(e.target.id));
    }
  };

  const dragEnd = () => {
    if (grab) {
      setGrab(false);
      dndEnd();
    }
  };

  const dragOver = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
  };

  useEffect(() => {
    if (focused === idx) {
      setSelected(true);
    } else {
      setSelected(false);
    }
  }, [focused, idx]);

  return (
    <Container
      draggable={isDraggable}
      id={`${idx}`}
      grab={grab}
      data-drag="quest"
      onDragStart={(e) => dragStart(e)}
      onDragEnter={(e) => dragEnter(e)}
      onDragOver={(e) => dragOver(e)}
      onDragEnd={() => dragEnd()}
      onClick={() => focusOnHere()}>
      <SelectedBox selected={selected}>
        <Drag
          data-dropzone="quest"
          id={`${idx}`}
          onMouseEnter={() => changeIconState(true)}
          onMouseLeave={() => changeIconState(false)}>
          {grabIcon && (
            <RxDragHandleDots2
              size={20}
              style={{ transform: 'rotate(90deg)', userSelect: 'none' }}
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
                onChange={(e) => changeTitle(e.target.value)}
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
  );
};

export default Question;

const Container = styled.div<{ grab: boolean }>`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 100%;
  height: 100%;
  max-width: 960px;
  min-width: 640px;
  box-sizing: border-box;
  border-radius: 10px;
  border: ${(props) =>
    props.grab ? '4px solid #613cb0' : '1px solid #e0e0e0'};
  background-color: white;
  animation-name: 'PopUp';
  animation-duration: 0.3s;
  animation-timing-function: ease-in-out;

  @keyframes PopUp {
    0% {
      transform: translateY(-25%);
      opacity: 0;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

const SelectedBox = styled.div<{ selected: boolean }>`
  width: 100%;
  box-sizing: border-box;
  padding: 0 1.1rem;
  border-left: 0.5rem solid ${(props) => (props.selected ? '#5383ec' : 'white')};
  border-right: 0.5rem solid white;
`;

const Drag = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 1.6rem;
  cursor: move;
  color: #717579;
`;

const TopBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  box-sizing: border-box;
`;

const Title = styled.div`
  width: 60%;
  box-sizing: border-box;
  padding-top: 1.2rem;
  border: none;
  font-weight: 500;
`;

const QuestionTitle = styled.input`
  width: 60%;
  box-sizing: border-box;
  padding: 1.2rem;
  border: none;
  border-bottom: 1px solid #717579;
  font-size: 1rem;
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
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 8rem;
  font-size: 2rem;
  color: #717579;
`;
