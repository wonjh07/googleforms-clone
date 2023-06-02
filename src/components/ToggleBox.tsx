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
`;

const Toggle = styled.div<{ checked: boolean }>`
  cursor: pointer;
  height: 1rem;
  width: 2.6rem;
  background: ${(props) => (props.checked ? '#d9caf8' : '#717579')};
  display: block;
  border-radius: 100px;
  position: relative;

  &:after {
    content: '';
    position: absolute;
    top: -0.14rem;
    left: 4px;
    width: 1.3rem;
    height: 1.3rem;
    background: ${(props) => (props.checked ? '#613CB0' : 'white')};
    border-radius: 90px;
    transition: 0.3s;
    box-shadow: 0px 2px 4px 0px #606367;
    transform: ${(props) => (props.checked ? 'translateX(60%)' : '')};
  }
`;
