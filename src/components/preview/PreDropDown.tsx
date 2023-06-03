import { useCallback, useState } from 'react';
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

  const setSingleAnswer = useCallback(
    (answer: string) => {
      dispatch(setAnswers({ idx, answer }));
    },
    [dispatch, idx],
  );

  const changeAnswer = useCallback(
    (category: string) => {
      setSingleAnswer(category);
      setOpen(false);
    },
    [setSingleAnswer],
  );

  const getCurrentCard = () => {
    return (
      <OptionCard onClick={() => changeAnswer(current)}>
        <Text>{current === '' ? '선택' : current}</Text>
      </OptionCard>
    );
  };

  return (
    <>
      <Container>
        <CurrentOption
          onClick={() => {
            setOpen(!open);
          }}>
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
    </>
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
  cursor: pointer;
  &:hover {
    background-color: #f1f3f4;
  }
`;

const Arrow = styled.div`
  color: #717579;
  pointer-events: none;
  padding-right: 1rem;
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
  z-index: 20;
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

const Text = styled.div`
  height: 100%;
  margin-top: 3px;
  font-size: 0.9rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
