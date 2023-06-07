import styled from 'styled-components';
import { MdOutlineArrowDropDown } from 'react-icons/md';
import { useAppSelector } from '../../store/hooks';

interface DropDownProps {
  idx: number;
}

const ResultDropDown: React.FC<DropDownProps> = ({ idx }) => {
  const current = useAppSelector((state) => state.preview.data[idx]);

  return (
    <Container>
      <CurrentOption>
        <OptionCard>
          <Text>{current === '' ? '선택' : current}</Text>
        </OptionCard>
        <Arrow>
          <MdOutlineArrowDropDown size={24} />
        </Arrow>
      </CurrentOption>
    </Container>
  );
};

export default ResultDropDown;

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
`;

const Arrow = styled.div`
  padding-right: 1rem;
  color: #717579;
  pointer-events: none;
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
