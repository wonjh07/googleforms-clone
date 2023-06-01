import { useState } from 'react';
import styled from 'styled-components';

const Heading = () => {
  const [title, setTitle] = useState('제목 없는 설문지');
  const [desc, setDesc] = useState('설문지 설명');

  const getTitleChange = (str: string) => {
    setTitle(str);
  };

  const getDescChange = (str: string) => {
    setDesc(str);
  };

  return (
    <>
      <Container>
        <Notch />
        <InputBox>
          <Title
            type="text"
            defaultValue={title}
            onChange={(e) => {
              getTitleChange(e.target.value);
            }}
          />
          <Desc
            type="text"
            defaultValue={desc}
            onChange={(e) => {
              getDescChange(e.target.value);
            }}
          />
        </InputBox>
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
`;

const Notch = styled.div`
  width: 100%;
  height: 0.8rem;
  background-color: #613cb0;
  border-radius: 10px 10px 0 0;
`;

const InputBox = styled.div`
  width: 100%;
  padding: 1.6rem;
  background-color: white;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border: 1px solid #e0e0e0;
  border-top: 0px;
  border-radius: 0 0 10px 10px;
`;

const Title = styled.input`
  width: 100%;
  box-sizing: border-box;
  border: none;
  font-size: 2rem;
  border-bottom: solid 2px #e0e0e0;
  &:focus {
    outline: none;
    border-bottom: solid 2px #613cb0;
  }
`;

const Desc = styled.input`
  width: 100%;
  box-sizing: border-box;
  padding-top: 1rem;
  font-size: 1rem;
  border: none;
  border-bottom: solid 2px #e0e0e0;
  color: #717579;
  &:focus {
    outline: none;
    border-bottom: solid 2px #613cb0;
  }
`;
