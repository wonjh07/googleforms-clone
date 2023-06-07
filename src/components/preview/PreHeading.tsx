import styled from 'styled-components';
import { useAppSelector } from '../../store/hooks';
import { Link } from 'react-router-dom';

const PreHeading = () => {
  const title = useAppSelector((state) => state.survey.title);
  const desc = useAppSelector((state) => state.survey.desc);

  return (
    <Container>
      <Notch />
      <InputBox>
        <Title>{title}</Title>
        <Desc>{desc}</Desc>
        <UserInfoBox>
          <Warn>* 필수항목</Warn>
          <Close to="/">미리보기 종료</Close>
        </UserInfoBox>
      </InputBox>
    </Container>
  );
};

export default PreHeading;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 100%;
  max-width: 720px;
  min-width: 640px;
  height: auto;
  box-sizing: border-box;
`;

const Notch = styled.div`
  width: 100%;
  height: 0.8rem;
  background-color: #613cb0;
  border-radius: 10px 10px 0 0;
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 100%;
  box-sizing: border-box;
  gap: 1rem;
  border: 1px solid #e0e0e0;
  border-top: 0px;
  border-radius: 0 0 10px 10px;
  background-color: white;
`;

const Title = styled.div`
  width: 100%;
  padding: 1.6rem;
  padding-bottom: 0.5rem;
  border: none;
  font-size: 2rem;
`;

const Desc = styled.div`
  width: 100%;
  padding: 0 1.6rem;
  font-size: 1rem;
  color: #717579;
`;

const UserInfoBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: end;
  width: 100%;
  box-sizing: border-box;
  padding: 1rem;
  border-top: 1px solid #e0e0e0;
`;

const Warn = styled.div`
  padding: 0.6rem;
  color: #d63725;
`;

const Close = styled(Link)`
  padding: 0.6rem;
  border-radius: 4px;
  color: #613cb0;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    background-color: #e0e0e0;
  }
`;
