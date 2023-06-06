import styled from 'styled-components';
import Heading from './Heading';
import Question from './Qustion';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { useRef } from 'react';
import { changeIdx, focusOn } from '../store/questionSlice';

const CardBox = () => {
  const questions = useAppSelector((state) => state.survey.questions);
  const target = useRef(-1);
  const focused = useAppSelector((state) => state.survey.focus);
  const dispatch = useAppDispatch();

  const dnd = (x: number, y: number) => {
    dispatch(changeIdx({ x, y }));
  };

  const focusOnHere = (v: number) => {
    dispatch(focusOn(v));
  };

  const changeStart = (v: number) => {
    if (target.current !== v) {
      target.current = v;
    }
  };

  const changeEnd = (v: number) => {
    if (target.current !== v) {
      dnd(target.current, v);
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
        changeStart={changeStart}
        changeEnd={changeEnd}
      />
    ));
  };

  return (
    <>
      <Container>
        <Heading />
        {getQuestions()}
      </Container>
    </>
  );
};

export default CardBox;

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 1rem 10rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  gap: 1rem;
`;
