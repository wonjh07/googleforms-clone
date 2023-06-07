import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setEssential } from '../store/questionSlice';

interface ToggleProps {
  idx: number;
}

const ToggleBox: React.FC<ToggleProps> = ({ idx }) => {
  const essential = useAppSelector(
    (state) => state.survey.questions[idx].essential,
  );
  const dispatch = useAppDispatch();
  const changeEssential = () => dispatch(setEssential(idx));

  return (
    <Container>
      <Toggle checked={essential} onClick={() => changeEssential()} />
    </Container>
  );
};

export default ToggleBox;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  box-sizing: border-box;
`;

const Toggle = styled.div<{ checked: boolean }>`
  display: block;
  position: relative;
  height: 16px;
  width: 42px;
  box-sizing: border-box;
  border-radius: 100px;
  background: ${(props) => (props.checked ? '#d9caf8' : '#B9B9B9')};
  cursor: pointer;

  &:after {
    content: '';
    position: absolute;
    top: -4px;
    width: 22px;
    height: 22px;
    background: ${(props) => (props.checked ? '#613CB0' : 'white')};
    border-radius: 90px;
    box-shadow: 0px 2px 4px 0px #717579;
    transition: 0.3s;
    transform: ${(props) => (props.checked ? 'translateX(100%)' : '')};
  }
`;
