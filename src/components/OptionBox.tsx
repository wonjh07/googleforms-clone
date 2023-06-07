import styled from 'styled-components';
import { GrClose } from 'react-icons/gr';
import { BiCheckbox, BiRadioCircle } from 'react-icons/bi';
import { RxDragHandleDots2 } from 'react-icons/rx';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  changeOpts,
  dragOption,
  newOpts,
  removeOpts,
} from '../store/questionSlice';
import { useRef, useState } from 'react';

interface OptionProps {
  category: string;
  idx: number;
}

const OptionBox: React.FC<OptionProps> = ({ category, idx }) => {
  const target = useRef(-1);
  const [grab, setGrab] = useState(false);
  const [grabIcon, setGrabIcon] = useState(false);
  const [draggable, setDraggable] = useState(false);
  const focused = useAppSelector((state) => state.survey.focus);
  const options = useAppSelector(
    (state) => state.survey.questions[idx].options,
  );
  const dispatch = useAppDispatch();
  const removeOption = (oIdx: number) => dispatch(removeOpts(oIdx));
  const changeOption = (oIdx: number, name: string) =>
    dispatch(changeOpts({ oIdx, name }));
  const addOption = () => dispatch(newOpts());
  const dragAndDrop = (x: number, y: number) => dispatch(dragOption({ x, y }));

  const dragStart = (e: any) => {
    if (e.target.dataset.drag === `option ${idx}`) {
      e.dataTransfer.effectAllowed = 'move';
      target.current = parseInt(e.target.id);
      setGrab(true);
    }
  };

  const dragEnter = (e: any) => {
    if (e.target.dataset.dropzone === `option ${idx}` && e.target.id) {
      const v = parseInt(e.target.id);
      if (target.current !== -1 && target.current !== v) {
        dragAndDrop(target.current, v);
        target.current = v;
      }
    }
  };

  const dragEnd = () => {
    if (grab) {
      target.current = -1;
      setGrab(false);
    }
  };

  const dragOver = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const getMutipleIcons = (category: string, num: number) => {
    if (category === '객관식 질문') {
      return (
        <IconBox>
          <BiRadioCircle color="gray" size={'2rem'} />
        </IconBox>
      );
    }
    if (category === '체크박스') {
      return (
        <IconBox>
          <BiCheckbox color="gray" size={'2rem'} />
        </IconBox>
      );
    }
    if (category === '드롭다운') {
      return (
        <IconBox>
          <Text>{num}</Text>
        </IconBox>
      );
    }
  };

  const changeIconState = (state: boolean) => {
    setDraggable(state);
    setGrabIcon(state);
  };

  const getOptions = () => {
    const current = options;
    return current.map((e, oIdx) => (
      <OptionContainer
        key={oIdx}
        grab={target.current === oIdx}
        id={`${oIdx}`}
        draggable={draggable}
        data-drag={`option ${idx}`}
        onDragStart={(e) => dragStart(e)}
        onDragEnter={(e) => dragEnter(e)}
        onDragOver={(e) => dragOver(e)}
        onDragEnd={() => dragEnd()}>
        <DragIcon
          data-dropzone={`option ${idx}`}
          id={`${oIdx}`}
          onMouseEnter={() => changeIconState(true)}
          onMouseLeave={() => changeIconState(false)}>
          {grabIcon && (
            <RxDragHandleDots2 style={{ userSelect: 'none' }} size={18} />
          )}
        </DragIcon>
        {getMutipleIcons(category, oIdx + 1)}
        <Options
          value={e}
          onChange={(e) => changeOption(oIdx, e.target.value)}
        />
        {focused === idx && <CloseButton onClick={() => removeOption(oIdx)} />}
      </OptionContainer>
    ));
  };

  const getBody = () => {
    if (category === '단답형') {
      return <ShortOption>단답형 텍스트</ShortOption>;
    } else if (category === '장문형') {
      return <LongOption>장문형 텍스트</LongOption>;
    } else {
      return (
        <MutipleOption>
          {getOptions()}
          <OptionContainer grab={false}>
            {getMutipleIcons(category, options.length + 1)}
            <OptionAdd onClick={addOption}>옵션 추가</OptionAdd>
          </OptionContainer>
        </MutipleOption>
      );
    }
  };

  return (
    <>
      <Container>{getBody()}</Container>
    </>
  );
};

export default OptionBox;

const Container = styled.div`
  width: 100%;
  min-height: 80px;
  padding: 1.6rem 0;
`;

const ShortOption = styled.div`
  width: 200px;
  padding: 0.6rem 0;
  border-bottom: 1px dotted gray;
  font-size: 1rem;
  color: gray;
`;

const LongOption = styled.div`
  width: 400px;
  padding: 0.6rem 0;
  border-bottom: 1px dotted gray;
  font-size: 1rem;
  color: gray;
`;

const MutipleOption = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  width: 100%;
  gap: 1rem;
`;

const OptionContainer = styled.div<{ grab: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 100%;
  border-bottom: ${(props) => (props.grab ? '2px solid #613cb0' : '')};
  border-top: ${(props) => (props.grab ? '2px solid #613cb0' : '')};
`;

const Options = styled.input`
  width: 90%;
  padding: 0.4rem 0;
  border: none;
  font-size: 1rem;
  &:hover {
    border-bottom: solid 1px gray;
    margin-bottom: -1px;
  }
  &:focus {
    outline: none;
    border-bottom: solid 2px #613cb0;
    margin-bottom: -2px;
  }
`;

const OptionAdd = styled.p`
  box-sizing: border-box;
  margin-top: 2px;
  font-size: 1rem;
  color: gray;
  &:hover {
    border-bottom: solid 1px gray;
    margin-bottom: -1px;
  }
`;

const CloseButton = styled(GrClose)`
  margin-left: 1rem;
  cursor: pointer;
`;

const IconBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2.2rem;
  height: 2rem;
  box-sizing: border-box;
  padding-bottom: 1px;
`;

const DragIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  height: 1rem;
  width: 1rem;
  margin-top: -2px;
  padding: 0.2rem 0;
  transform: translateX(-80%);
  border-radius: 4px;
  cursor: move;
`;

const Text = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 2rem;
  margin-top: 2px;
  font-size: 1.1rem;
`;
