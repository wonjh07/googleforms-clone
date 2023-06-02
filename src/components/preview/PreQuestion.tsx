import styled from 'styled-components';
import { useAppSelector } from '../../store/hooks';
interface QuestionProps {
  idx: number;
}

const PreQuestion: React.FC<QuestionProps> = ({ idx }) => {
  const question = useAppSelector((state) => state.survey.questions[idx]);

  const getAnswersBox = () => {
    const type = question.questionType;

    if (type === '단답형') {
      return <ShortAnswer placeholder="내 답변" onChange={() => {}} />;
    }
    if (type === '장문형') {
      return <LongAnswer placeholder="내 답변" onChange={() => {}} />;
    }
    if (type === '객관식 질문') {
      return (
        <MultipleAnswer>
          {question.options.map((e, idx) => (
            <Option key={idx}>
              <RadioBox
                type="radio"
                id={`site${idx}`}
                value={e}
                name="site"
                onClick={(e) => {
                  console.log(e);
                }}
              />
              <Label htmlFor={`site${idx}`}>{e}</Label>
            </Option>
          ))}
        </MultipleAnswer>
      );
    }
  };

  return (
    <>
      <Container>
        <Category>{question.questionTitle}</Category>
        {getAnswersBox()}
      </Container>
    </>
  );
};

export default PreQuestion;

const Container = styled.div`
  width: 100%;
  max-width: 960px;
  min-width: 640px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  background-color: white;
  border-radius: 10px;
  border: 1px solid #e0e0e0;
  padding: 1.6rem;
`;

const Category = styled.div`
  font-size: 1.1rem;
`;

const ShortAnswer = styled.input`
  width: 50%;
  box-sizing: border-box;
  border: none;
  border-bottom: 1px solid #e0e0e0;
  font-size: 1rem;
  padding: 0.2rem 0;
  &:focus {
    outline: none;
    border-bottom: solid 2px #613cb0;
    margin-bottom: -1px;
  }
  &::placeholder {
    color: #717579;
  }
`;

const LongAnswer = styled.input`
  width: 100%;
  box-sizing: border-box;
  border: none;
  border-bottom: 1px solid #e0e0e0;
  font-size: 1rem;
  padding: 0.2rem 0;
  &:focus {
    outline: none;
    border-bottom: solid 2px #613cb0;
    margin-bottom: -1px;
  }
  &::placeholder {
    color: #717579;
  }
`;

const MultipleAnswer = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  gap: 1rem;
`;

const Option = styled.div`
  height: 2rem;
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  gap: 1rem;
`;

const RadioBox = styled.input`
  vertical-align: middle;
  appearance: none;
  box-sizing: border-box;
  border: 2px solid gray;
  border-radius: 50%;
  width: 1.3rem;
  height: 1.3rem;
  margin-bottom: 0.3rem;
  cursor: pointer;
  transition: 0.3s;

  &:checked {
    border: 0.4em solid #613cb0;
  }
`;

const Label = styled.label`
  height: 100%;
  display: flex;
  align-items: center;
  color: #606367;
`;
