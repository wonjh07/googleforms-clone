import styled from 'styled-components';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { useAppDispatch } from '../store/hooks';
import { useCallback } from 'react';
import { setNewQuestion } from '../store/questionSlice';

const SideMenu = () => {
  const dispatch = useAppDispatch();
  const newQuest = useCallback(() => dispatch(setNewQuestion()), [dispatch]);
  return (
    <>
      <FlexBox>
        <LeftPadding />
        <Center />
        <RightPadding>
          <Container>
            <CreateBtn
              onClick={() => {
                newQuest();
              }}
            />
          </Container>
        </RightPadding>
      </FlexBox>
    </>
  );
};

export default SideMenu;

const FlexBox = styled.div`
  width: 100%;
  position: fixed;
  top: 5rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  z-index: 0;
`;

const LeftPadding = styled.div`
  width: 14rem;
  height: 100px;
`;
const RightPadding = styled.div`
  width: 14rem;
  height: 100px;
`;

const Center = styled.div`
  width: 100%;
  height: 100px;
  max-width: 960px;
  min-width: 640px;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  background-color: white;
  border-radius: 10px;
  border: 1px solid #e0e0e0;
  box-shadow: 0px 2px 4px 0px #e0e0e0;
  color: #717579;
  transition: 0.4s;
  margin-left: 1rem;
`;

const CreateBtn = styled(AiOutlinePlusCircle)`
  cursor: pointer;
  width: 2rem;
  height: 2rem;
  padding: 4px;
  border-radius: 999px;
  transition: 0.4s;

  &:hover {
    background-color: #e0e0e0;
  }
`;
