import { useCallback } from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setEssential } from '../store/questionSlice';

interface ToggleProps {
  idx: number;
}

const ToggleBox: React.FC<ToggleProps> = ({ idx }) => {
  const dispatch = useAppDispatch();
  const essential = useAppSelector(
    (state) => state.survey.questions[idx].essential,
  );

  const changeEssential = useCallback(
    (essential: boolean): void => {
      dispatch(setEssential({ essential, idx }));
    },
    [dispatch, idx],
  );

  return (
    <Container>
      <Toggle
        checked={essential}
        onClick={() => {
          changeEssential(!essential);
        }}
      />
    </Container>
  );
};

export default ToggleBox;

const Container = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
`;

const Toggle = styled.div<{ checked: boolean }>`
  cursor: pointer;
  height: 16px;
  width: 42px;
  background: ${(props) => (props.checked ? '#d9caf8' : '#B9B9B9')};
  display: block;
  border-radius: 100px;
  position: relative;
  box-sizing: border-box;

  &:after {
    content: '';
    position: absolute;
    top: -4px;
    width: 22px;
    height: 22px;
    background: ${(props) => (props.checked ? '#613CB0' : 'white')};
    border-radius: 90px;
    transition: 0.3s;
    box-shadow: 0px 2px 4px 0px #717579;
    transform: ${(props) => (props.checked ? 'translateX(100%)' : '')};
  }
`;
