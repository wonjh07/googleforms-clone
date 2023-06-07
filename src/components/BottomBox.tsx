import styled from 'styled-components';
import ToggleBox from './ToggleBox';
import { MdContentCopy } from 'react-icons/md';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { useAppDispatch } from '../store/hooks';
import { copyQuestion, deleteQuestion } from '../store/questionSlice';

interface BottomBoxProps {
  idx: number;
}

const BottomBox: React.FC<BottomBoxProps> = ({ idx }) => {
  const dispatch = useAppDispatch();
  const copyQuest = () => {
    dispatch(copyQuestion());
  };

  const deleteQuest = () => {
    dispatch(deleteQuestion());
  };

  return (
    <>
      <Container>
        <LeftBox>
          <MdContentCopy
            style={{ cursor: 'pointer' }}
            size={22}
            onClick={() => copyQuest()}
          />
          <RiDeleteBin6Line
            style={{ cursor: 'pointer' }}
            size={24}
            onClick={() => deleteQuest()}
          />
        </LeftBox>
        <RightBox>
          <p>필수</p>
          <ToggleBox idx={idx} />
        </RightBox>
      </Container>
    </>
  );
};

export default BottomBox;

const Container = styled.div`
  width: 100%;
  height: 5rem;
  border-top: 1px solid #e0e0e0;
  box-sizing: border-box;
  padding: 1.4rem;
  display: flex;
  gap: 1.2rem;
  flex-direction: row;
  justify-content: end;
  align-items: center;
`;

const LeftBox = styled.div`
  width: auto;
  height: 100%;
  gap: 1rem;
  padding: 0 1rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-right: 1px solid #a1a2a3;
  color: #717579;
`;

const RightBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  font-size: 0.9rem;
`;
