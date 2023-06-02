import { useCallback, useState } from 'react';
import styled from 'styled-components';
import {
  MdOutlineArrowDropDown,
  MdOutlineArrowDropUp,
  MdShortText,
} from 'react-icons/md';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { ImRadioChecked } from 'react-icons/im';
import { BiCheckSquare } from 'react-icons/bi';
import { GrTextAlignFull } from 'react-icons/gr';
import { IoIosArrowDropdown } from 'react-icons/io';
import { setType } from '../store/questionSlice';

interface DropDownProps {
  idx: number;
}

const DropDown: React.FC<DropDownProps> = ({ idx }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const category = useAppSelector(
    (state) => state.survey.questions[idx].questionType,
  );

  const changeType = useCallback(
    (str: string): void => {
      dispatch(setType({ str, idx }));
    },
    [dispatch, idx],
  );

  const changeOption = (category: string) => {
    changeType(category);
    setOpen(false);
  };

  const getCategoryCard = (ctg: string) => {
    if (ctg === '단답형') {
      return (
        <OptionCard id="option1" onClick={() => changeOption('단답형')}>
          <Icon>
            <MdShortText size={28} />
          </Icon>
          <Text>단답형</Text>
        </OptionCard>
      );
    }

    if (ctg === '장문형') {
      return (
        <OptionCard id="option2" onClick={() => changeOption('장문형')}>
          <Icon>
            <GrTextAlignFull size={22} />
          </Icon>
          <Text>장문형</Text>
        </OptionCard>
      );
    }

    if (ctg === '객관식 질문') {
      return (
        <OptionCard id="option3" onClick={() => changeOption('객관식 질문')}>
          <Icon>
            <ImRadioChecked size={22} />
          </Icon>
          <Text>객관식 질문</Text>
        </OptionCard>
      );
    }

    if (ctg === '체크박스') {
      return (
        <OptionCard id="option4" onClick={() => changeOption('체크박스')}>
          <Icon>
            <BiCheckSquare size={26} />
          </Icon>
          <Text>체크박스</Text>
        </OptionCard>
      );
    }

    if (ctg === '드롭다운') {
      return (
        <OptionCard id="option5" onClick={() => changeOption('드롭다운')}>
          <Icon>
            <IoIosArrowDropdown size={26} />
          </Icon>
          <Text>드롭다운</Text>
        </OptionCard>
      );
    }
  };

  return (
    <>
      <Container>
        <CurrentOption
          onClick={() => {
            setOpen(!open);
          }}>
          {getCategoryCard(category)}
          <Arrow>
            {open ? (
              <MdOutlineArrowDropUp size={24} />
            ) : (
              <MdOutlineArrowDropDown size={24} />
            )}
          </Arrow>
        </CurrentOption>
        {open && (
          <>
            <AllOptions>
              {getCategoryCard('단답형')}
              {getCategoryCard('장문형')}
              {getCategoryCard('객관식 질문')}
              {getCategoryCard('체크박스')}
              {getCategoryCard('드롭다운')}
            </AllOptions>
          </>
        )}
      </Container>
    </>
  );
};

export default DropDown;

const Container = styled.div`
  width: 30%;
  height: 3rem;
  box-sizing: border-box;
  user-select: none;
`;

const CurrentOption = styled.div`
  width: 100%;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  box-sizing: border-box;
  overflow: hidden;
  background-color: white;
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
`;

const Arrow = styled.div`
  position: absolute;
  transform: translateX(950%);
  color: #717579;
  pointer-events: none;
`;

const AllOptions = styled.div`
  width: 100%;
  position: relative;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  transform: translateY(20px);
  box-sizing: border-box;
  overflow: hidden;
  background-color: white;
  z-index: 10;
`;

const OptionCard = styled.div`
  width: 100%;
  height: 60px;
  box-sizing: border-box;
  padding: 1rem 1rem;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  gap: 1rem;
  color: #717579;

  &:hover {
    background-color: #f1f3f4;
  }
`;

const Icon = styled.div`
  height: 100%;
  aspect-ratio: 1;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Text = styled.div`
  height: 100%;
  margin-top: 3px;
  font-size: 0.9rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
