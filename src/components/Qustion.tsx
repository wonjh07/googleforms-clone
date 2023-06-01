import styled from 'styled-components';
import DropDown from './DropDown';
import OptionBox from './OptionBox';
import { RxDragHandleDots2 } from 'react-icons/rx';
import { useState } from 'react';

const Question = () => {
  const [category, setCategory] = useState('단답형');

  const getOption = (category: string) => {
    setCategory(category);
  };

  return (
    <>
      <Container>
        <Drag>
          <RxDragHandleDots2 size={20} style={{ transform: 'rotate(90deg)' }} />
        </Drag>
        <TopBox>
          <QuestionTitle placeholder="질문" />
          <DropDown getOption={getOption} />
        </TopBox>
        <OptionBox category={category} />
        <BottomBox>
          <div>복사</div>
          <div>삭제</div>
          <div>필수</div>
        </BottomBox>
      </Container>
    </>
  );
};

export default Question;

const Container = styled.div`
  width: 100%;
  max-width: 960px;
  min-width: 640px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 10px;
  border: 1px solid #e0e0e0;
  padding: 0 1.6rem;
`;

const Drag = styled.div`
  width: 100%;
  height: 1.6rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  cursor: move;
  color: #717579;
`;

const TopBox = styled.div`
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const BottomBox = styled.div`
  width: 100%;
  border-top: 1px solid #e0e0e0;
  box-sizing: border-box;
  padding: 1.6rem;
  display: flex;
  gap: 1.2rem;
  flex-direction: row;
  justify-content: end;
`;

const QuestionTitle = styled.input`
  width: 60%;
  box-sizing: border-box;
  border: none;
  border-bottom: 1px solid #717579;
  font-size: 1rem;
  padding: 1.2rem;
  background-color: #f8f9fa;
  &:focus {
    outline: none;
    border-bottom: solid 2px #613cb0;
    margin-bottom: -1px;
  }

  &:hover {
    background-color: #f1f3f4;
  }
`;
