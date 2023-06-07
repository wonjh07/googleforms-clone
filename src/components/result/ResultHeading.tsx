import styled from 'styled-components';
import { useAppSelector } from '../../store/hooks';

const ResultHeading = () => {
  const title = useAppSelector((state) => state.survey.title);
  const desc = useAppSelector((state) => state.survey.desc);

  return (
    <>
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
    </>
  );
};

export default ResultHeading;

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

const Label = styled.div`
  width: 100%;
  font-size: 0.8rem;
  padding-top: 1.6rem;
  padding-left: 1.6rem;
  color: #606367;
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
  padding: 0.5rem 1.6rem;
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
