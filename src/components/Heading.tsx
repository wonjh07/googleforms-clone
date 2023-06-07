import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { focusOn, setDesc, setTitle } from '../store/questionSlice';
import { useEffect, useState } from 'react';

const Heading = () => {
  const title = useAppSelector((state) => state.survey.title);
  const desc = useAppSelector((state) => state.survey.desc);
  const focused = useAppSelector((state) => state.survey.focus);
  const [selected, setSelected] = useState(false);
  const dispatch = useAppDispatch();
  const focusOnHere = () => {
    dispatch(focusOn(-1));
  };

  const getTitleChange = (str: string) => {
    dispatch(setTitle(str));
  };

  const getDescChange = (str: string) => {
    dispatch(setDesc(str));
  };

  useEffect(() => {
    if (focused === -1) {
      setSelected(true);
    } else {
      setSelected(false);
    }
  }, [focused]);

  return (
    <>
      <Container onClick={() => focusOnHere()}>
        <Notch />
        <FlexBox selected={selected}>
          <InputBox selected={selected}>
            <Title
              selected={selected}
              type="text"
              defaultValue={title}
              onChange={(e) => {
                getTitleChange(e.target.value);
              }}
            />
            <Desc
              type="text"
              selected={selected}
              defaultValue={desc}
              onChange={(e) => {
                getDescChange(e.target.value);
              }}
            />
          </InputBox>
        </FlexBox>
      </Container>
    </>
  );
};

export default Heading;

const Container = styled.div`
  width: 100%;
  max-width: 960px;
  min-width: 640px;
  height: auto;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
`;

const Notch = styled.div`
  width: 100%;
  height: 0.8rem;
  background-color: #613cb0;
  border-radius: 10px 10px 0 0;
`;

const FlexBox = styled.div<{ selected: boolean }>`
  width: 100%;
  box-sizing: border-box;
  border-top: 0px;
  overflow: hidden;
  border-radius: 0 0 10px 10px;
`;

const InputBox = styled.div<{ selected: boolean }>`
  width: 100%;
  padding: 1.6rem 1.1rem;
  background-color: white;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 2px;
  border-left: 0.5rem solid ${(props) => (props.selected ? '#5383ec' : 'white')};
`;

const Title = styled.input<{ selected: boolean }>`
  width: 100%;
  box-sizing: border-box;
  border: none;
  font-size: 2rem;
  border-bottom: solid 1px ${(props) => (props.selected ? '#e0e0e0;' : 'white')};
  padding-bottom: 0.5rem;
  &:focus {
    outline: none;
    border-bottom: solid 2px #613cb0;
    margin-bottom: -1px;
  }
`;

const Desc = styled.input<{ selected: boolean }>`
  width: 100%;
  box-sizing: border-box;
  padding-top: 1rem;
  font-size: 1rem;
  padding-bottom: 0.5rem;
  border: none;
  border-bottom: solid 1px ${(props) => (props.selected ? '#e0e0e0;' : 'white')};
  color: #717579;

  &:focus {
    outline: none;
    border-bottom: solid 2px #613cb0;
    margin-bottom: -1px;
  }
`;
