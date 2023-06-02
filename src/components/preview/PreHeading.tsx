import styled from 'styled-components';
import { useAppSelector } from '../../store/hooks';

const PreHeading = () => {
  const title = useAppSelector((state) => state.survey.title);
  const desc = useAppSelector((state) => state.survey.desc);

  return (
    <>
      <Container>
        <Notch />
        <InputBox>
          <Title>{title}</Title>
          <Desc>{desc}</Desc>
          <UserInfoBox>* 필수항목</UserInfoBox>
        </InputBox>
      </Container>
    </>
  );
};

export default PreHeading;

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
  height: 100px;
  border-top: 1px solid #e0e0e0;
  box-sizing: border-box;
  padding: 1.6rem;
  display: flex;
  flex-direction: column;
  justify-content: end;
  color: #d63725;
`;
