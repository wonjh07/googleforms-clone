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
  const [grabIcon, setGrabIcon] = useState(false);
  const [grab, setGrab] = useState(false);
  const [draggable, setDraggable] = useState(false);
  const target = useRef(-1);
  const focused = useAppSelector((state) => state.survey.focus);
  const options = useAppSelector(
    (state) => state.survey.questions[idx].options,
  );
  const dispatch = useAppDispatch();

  const changeOption = (oIdx: number, name: string): void => {
    dispatch(changeOpts({ oIdx, name }));
  };

  const removeOption = (oIdx: number) => {
    dispatch(removeOpts(oIdx));
  };

  const addOption = () => {
    dispatch(newOpts());
  };

  const dragAndDrop = (x: number, y: number) => {
    dispatch(dragOption({ x, y }));
  };

  const dragOver = (v: number) => {
    if (target.current !== -1 && target.current !== v) {
      dragAndDrop(target.current, v);
      target.current = v;
    }
  };

  const dragFunction = (e: any, type: string) => {
    if (type === 'Start' && e.target.dataset.drag === `option ${idx}`) {
      e.dataTransfer.effectAllowed = 'move';
      target.current = parseInt(e.target.id);
      setGrab(true);
    } else if (
      type === 'Enter' &&
      e.target.dataset.dropzone === `option ${idx}` &&
      e.target.id
    ) {
      dragOver(parseInt(e.target.id));
    } else if (type === 'End') {
      if (grab) {
        target.current = -1;
        setGrab(false);
      }
    }
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
        }}>
        <DragIcon
          data-dropzone={`option ${idx}`}
          id={`${oIdx}`}
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
              data-dropzone={`option ${idx}`}
              id={`${oIdx}`}
              size={18}
            />
          )}
        </DragIcon>

        {category === '객관식 질문' && (
          <IconBox>
            <BiRadioCircle color="gray" size={'2rem'} />
          </IconBox>
        )}
        {category === '체크박스' && (
          <IconBox>
            <BiCheckbox color="gray" size={'2rem'} />
          </IconBox>
        )}
        {category === '드롭다운' && (
          <IconBox>
            <Text>{oIdx + 1}</Text>
          </IconBox>
        )}
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
            {category === '객관식 질문' && (
              <IconBox>
                <BiRadioCircle color="gray" size={'2rem'} />
              </IconBox>
            )}
            {category === '체크박스' && (
              <IconBox>
                <BiCheckbox color="gray" size={'2rem'} />
              </IconBox>
            )}
            {category === '드롭다운' && (
              <IconBox>
                <Text>{options.length + 1}</Text>
              </IconBox>
            )}
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
  border-bottom: 1px dotted gray;
  padding: 0.6rem 0;
  font-size: 1rem;
  color: gray;
`;

const LongOption = styled.div`
  width: 400px;
  border-bottom: 1px dotted gray;
  padding: 0.6rem 0;
  font-size: 1rem;
  color: gray;
`;

const MutipleOption = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  gap: 1rem;
`;

const OptionContainer = styled.div<{ grab: boolean }>`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
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
  font-size: 1rem;
  color: gray;
  box-sizing: border-box;
  margin-top: 2px;
  &:hover {
    border-bottom: solid 1px gray;
    margin-bottom: -1px;
  }
`;

const CloseButton = styled(GrClose)`
  cursor: pointer;
  margin-left: 1rem;
`;

const IconBox = styled.div`
  width: 2.2rem;
  height: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  padding-bottom: 1px;
`;

const DragIcon = styled.div`
  position: absolute;
  height: 1rem;
  width: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: -2px;
  padding: 0.2rem 0;
  transform: translateX(-80%);
  border-radius: 4px;
  cursor: move;
`;

const Text = styled.div`
  width: 100%;
  height: 2rem;
  margin-top: 2px;
  display: flex;
  font-size: 1.1rem;
  justify-content: center;
  align-items: center;
`;
