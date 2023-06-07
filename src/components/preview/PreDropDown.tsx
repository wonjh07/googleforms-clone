import { useState } from 'react';
import styled from 'styled-components';
import { MdOutlineArrowDropDown, MdOutlineArrowDropUp } from 'react-icons/md';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setAnswers } from '../../store/previewSlice';

interface DropDownProps {
  idx: number;
}

const PreDropDown: React.FC<DropDownProps> = ({ idx }) => {
  const [open, setOpen] = useState(false);
  const question = useAppSelector((state) => state.survey.questions[idx]);
  const current = useAppSelector((state) => state.preview.data[idx]);
  const dispatch = useAppDispatch();

  const setSingleAnswer = (answer: string) => {
    dispatch(setAnswers({ idx, answer }));
  };

  const changeAnswer = (category: string) => {
    setSingleAnswer(category);
    setOpen(false);
  };

  const getCurrentCard = () => {
    return (
      <OptionCard onClick={() => changeAnswer(current)}>
        <Text>{current === '' ? '선택' : current}</Text>
      </OptionCard>
    );
  };

  return (
    <Container>
      <CurrentOption onClick={() => setOpen(!open)}>
        {getCurrentCard()}
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
            <OptionCard key={idx} onClick={() => changeAnswer('')}>
              <Text>선택</Text>
            </OptionCard>
            {question.options.map((e, idx) => (
              <OptionCard key={idx} onClick={() => changeAnswer(e)}>
                <Text>{e}</Text>
              </OptionCard>
            ))}
          </AllOptions>
        </>
      )}
    </Container>
  );
};

export default PreDropDown;

const Container = styled.div`
  width: 50%;
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
  color: #717579;
  pointer-events: none;
`;

const AllOptions = styled.div`
  overflow: hidden;
  position: relative;
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  transform: translateY(20px);
  background-color: white;
  z-index: 20;
`;

const OptionCard = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  width: 100%;
  height: 60px;
  box-sizing: border-box;
  padding: 1rem 1rem;
  gap: 1rem;
  color: #717579;
  cursor: pointer;

  &:hover {
    background-color: #f1f3f4;
  }
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
