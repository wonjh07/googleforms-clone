import styled from 'styled-components';
import Heading from './Heading';
import Question from './Qustion';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { useRef } from 'react';
import { dragQuest, focusOn } from '../store/questionSlice';

const CardBox = () => {
  const target = useRef(-1);
  const questions = useAppSelector((state) => state.survey.questions);
  const focused = useAppSelector((state) => state.survey.focus);
  const dispatch = useAppDispatch();
  const dragAndDrop = (x: number, y: number) => dispatch(dragQuest({ x, y }));
  const focusOnHere = (v: number) => dispatch(focusOn(v));

  // drag가 시작되면 최초 컴포넌트의 idx 값을 저장
  const dragStart = (v: number) => {
    if (target.current !== v) {
      target.current = v;
    }
  };

  const dragEnd = () => {
    target.current = -1;
  };

  // drag가 시작된 이후 dropZone에 해당하는 컴포넌트의 idx값을 받아 위치 변경
  const dragEnter = (v: number) => {
    if (target.current !== -1 && target.current !== v) {
      dragAndDrop(target.current, v);

      // 드래그앤 드랍으로 포커스된 질문이 유지될수 있게 변경
      if (focused === target.current) {
        focusOnHere(v);
      } else if (focused === v) {
        focusOnHere(target.current);
      }
      target.current = v;
    }
  };

  const getQuestions = () => {
    return questions.map((e, idx) => (
      <Question
        key={e.id}
        idx={idx}
        dndStart={dragStart}
        dndEnter={dragEnter}
        dndEnd={dragEnd}
      />
    ));
  };

  return (
    <Container>
      <Heading />
      {getQuestions()}
    </Container>
  );
};

export default CardBox;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 1rem 10rem;
  gap: 1rem;
`;
