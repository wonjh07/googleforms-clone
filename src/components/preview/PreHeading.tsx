import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { useCallback } from 'react';
import { closePreview } from '../../store/previewSlice';

const PreHeading = () => {
  const title = useAppSelector((state) => state.survey.title);
  const desc = useAppSelector((state) => state.survey.desc);
  const dispatch = useAppDispatch();

  const quitPreview = useCallback(() => {
    dispatch(closePreview());
  }, [dispatch]);

  return (
    <>
      <Container>
        <Notch />
        <InputBox>
          <Title>{title}</Title>
          <Desc>{desc}</Desc>
          <UserInfoBox>
            <Warn>* 필수항목</Warn>
            <Close onClick={quitPreview}>미리보기 종료</Close>
          </UserInfoBox>
        </InputBox>
      </Container>
    </>
  );
};

export default PreHeading;

const Container = styled.div`
  width: 100%;
  max-width: 720px;
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
  background-color: white;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border: 1px solid #e0e0e0;
  border-top: 0px;
  border-radius: 0 0 10px 10px;
  overflow: hidden;
`;

const Title = styled.div`
  width: 100%;
  border: none;
  font-size: 2rem;
  padding: 1.6rem;
  padding-bottom: 0.5rem;
`;

const Desc = styled.div`
  width: 100%;
  padding: 0 1.6rem;
  font-size: 1rem;
  color: #717579;
`;

const UserInfoBox = styled.div`
  width: 100%;
  border-top: 1px solid #e0e0e0;
  box-sizing: border-box;
  padding: 1rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: end;
`;

const Warn = styled.div`
  color: #d63725;
  padding: 0.6rem;
`;

const Close = styled.div`
  cursor: pointer;
  color: #613cb0;
  padding: 0.6rem;
  border-radius: 4px;

  &:hover {
    background-color: #e0e0e0;
  }
`;
