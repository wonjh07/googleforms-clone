import styled from 'styled-components';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { useAppDispatch } from '../store/hooks';
import { setNewQuestion } from '../store/questionSlice';

const SideMenu = () => {
  const dispatch = useAppDispatch();
  const newQuest = () => dispatch(setNewQuestion());
  return (
    <FlexBox>
      <LeftPadding />
      <Center />
      <RightPadding>
        <Container>
          <CreateBtn onClick={() => newQuest()} />
        </Container>
      </RightPadding>
    </FlexBox>
  );
};

export default SideMenu;

const FlexBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 5rem;
  width: 100%;
  pointer-events: none;
`;

const LeftPadding = styled.div`
  width: 14rem;
`;
const RightPadding = styled.div`
  width: 14rem;
`;

const Center = styled.div`
  width: 100%;
  max-width: 960px;
  min-width: 640px;
`;

const Container = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  margin-left: 1rem;
  border-radius: 10px;
  border: 1px solid #e0e0e0;
  box-shadow: 0px 2px 4px 0px #e0e0e0;
  color: #717579;
  background-color: white;
  pointer-events: auto;
  transition: 0.4s;
`;

const CreateBtn = styled(AiOutlinePlusCircle)`
  width: 2rem;
  height: 2rem;
  padding: 4px;
  border-radius: 999px;
  transition: 0.4s;
  cursor: pointer;

  &:hover {
    background-color: #e0e0e0;
  }
`;
