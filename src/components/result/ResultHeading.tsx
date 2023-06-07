import styled from 'styled-components';
import { useAppSelector } from '../../store/hooks';

const ResultHeading = () => {
  const title = useAppSelector((state) => state.survey.title);
  const desc = useAppSelector((state) => state.survey.desc);

  return (
    <Container>
      <Notch />
      <InputBox>
        <Label>응답은 수정할 수 없습니다.</Label>
        <Title>{title}</Title>
        <Desc>{desc}</Desc>
        <UserInfoBox>
          <Warn>* 표시는 필수 질문임</Warn>
        </UserInfoBox>
      </InputBox>
    </Container>
  );
};

export default ResultHeading;

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

const Label = styled.div`
  width: 100%;
  padding-top: 1.6rem;
  padding-left: 1.6rem;
  color: #606367;
  font-size: 0.8rem;
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
  padding: 0.5rem 1.6rem;
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
