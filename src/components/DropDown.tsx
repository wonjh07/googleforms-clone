import { useState } from 'react';
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

  const changeType = (str: string) => dispatch(setType({ str, idx }));

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
    <Container>
      <CurrentOption onClick={() => setOpen(!open)}>
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
        <AllOptions>
          {getCategoryCard('단답형')}
          {getCategoryCard('장문형')}
          {getCategoryCard('객관식 질문')}
          {getCategoryCard('체크박스')}
          {getCategoryCard('드롭다운')}
        </AllOptions>
      )}
    </Container>
  );
};

export default DropDown;

const Container = styled.div`
  width: 15rem;
  height: 3rem;
  box-sizing: border-box;
  user-select: none;
`;

const CurrentOption = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  overflow: hidden;
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  background-color: white;
  cursor: pointer;
  &:hover {
    background-color: #f1f3f4;
  }
`;

const Arrow = styled.div`
  padding-right: 1rem;
  pointer-events: none;
  color: #717579;
`;

const AllOptions = styled.div`
  overflow: hidden;
  position: absolute;
  transform: translateY(20px);
  width: 15rem;
  box-sizing: border-box;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  background-color: white;
  z-index: 10;
`;

const OptionCard = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  width: 100%;
  height: 50px;
  box-sizing: border-box;
  gap: 1rem;
  padding: 1rem 1rem;
  cursor: pointer;
  color: #717579;

  &:hover {
    background-color: #f1f3f4;
  }
`;

const Icon = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 100%;
  aspect-ratio: 1;
`;

const Text = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 100%;
  margin-top: 3px;
  font-size: 0.9rem;
`;
