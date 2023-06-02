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
      <Container>
        <CreateBtn
          onClick={() => {
            newQuest();
          }}
        />
      </Container>
    </>
  );
};

export default SideMenu;

const Container = styled.div`
  position: fixed;
  top: 5rem;
  right: 6rem;
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
