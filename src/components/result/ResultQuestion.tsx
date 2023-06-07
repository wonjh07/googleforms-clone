import styled from 'styled-components';
import { useAppSelector } from '../../store/hooks';
import { BsCheck } from 'react-icons/bs';
import ResultDropDown from './ResultDropDown';

interface QuestionProps {
  idx: number;
}

const ResultQuestion: React.FC<QuestionProps> = ({ idx }) => {
  const question = useAppSelector((state) => state.survey.questions[idx]);
  const answer = useAppSelector((state) => state.preview.data[idx]);
  const type = question.questionType;

  const getAnswersBox = () => {
    if (type === '단답형') {
      return <ShortAnswer value={answer} disabled />;
    }
    if (type === '장문형') {
      return <LongAnswer value={answer} disabled />;
    }
    if (type === '객관식 질문') {
      return (
        <MultipleAnswer>
          {question.options.map((option, oIdx) => (
            <Option key={oIdx}>
              <RadioBox
                type="radio"
                id={`site${oIdx}`}
                value={option}
                name="site"
                checked={option === answer}
                disabled
              />
              <Label htmlFor={`site${oIdx}`}>{option}</Label>
            </Option>
          ))}
        </MultipleAnswer>
      );
    }
    if (type === '체크박스') {
      return (
        <MultipleAnswer>
          {question.options.map((option, oIdx) => (
            <Option key={oIdx}>
              <CheckBox
                type="checkbox"
                id={`site${oIdx}`}
                value={option}
                name={`site${oIdx}`}
                checked={answer[option]}
                disabled
              />
              <CheckIcon className="check" />
              <Label htmlFor={`site${oIdx}`}>{option}</Label>
            </Option>
          ))}
        </MultipleAnswer>
      );
    }
    if (type === '드롭다운') {
      return <ResultDropDown idx={idx} />;
    }
  };

  return (
    <Container>
      <Category>
        <Title>{question.questionTitle}</Title>
        <Warn>{question.essential && '*'}</Warn>
      </Category>
      {getAnswersBox()}
    </Container>
  );
};

export default ResultQuestion;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 720px;
  min-width: 640px;
  box-sizing: border-box;
  padding: 1.6rem;
  gap: 2rem;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  background-color: white;
`;

const Category = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.4rem;
`;

const Title = styled.p`
  font-size: 1.1rem;
`;

const Warn = styled.p`
  color: #d63725;
  font-size: 1.3rem;
`;

const ShortAnswer = styled.input`
  width: 50%;
  box-sizing: border-box;
  padding: 0.2rem 0;
  border: none;
  border-bottom: 1px solid #e0e0e0;
  font-size: 1rem;
`;

const LongAnswer = styled.input`
  width: 100%;
  box-sizing: border-box;
  padding: 0.2rem 0;
  border: none;
  border-bottom: 1px solid #e0e0e0;
  font-size: 1rem;
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
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  height: 2rem;
  gap: 1rem;
`;

const RadioBox = styled.input`
  width: 1.3rem;
  height: 1.3rem;
  box-sizing: border-box;
  margin-bottom: 0.3rem;
  border: 2px solid gray;
  border-radius: 50%;
  appearance: none;
  vertical-align: middle;
  transition: 0.3s;
  cursor: pointer;

  &:checked {
    border: 0.4em solid #613cb0;
  }
`;

const CheckBox = styled.input`
  position: relative;
  box-sizing: border-box;
  width: 1.3rem;
  height: 1.3rem;
  margin-bottom: 0.3rem;
  border: 2px solid gray;
  border-radius: 2px;
  background-color: white;
  vertical-align: middle;
  appearance: none;
  cursor: pointer;
  transition: 0.3s;
  z-index: 10;

  &:checked {
    border: 10px solid #613cb0;
    z-index: 0;
  }
`;

const CheckIcon = styled(BsCheck)`
  position: absolute;
  width: 1.2rem;
  height: 1.2rem;
  box-sizing: border-box;
  margin-bottom: 0.1rem;
  margin-left: 0.25rem;
  border: none;
  background-color: #613cb0;
  color: white;
  pointer-events: none;
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  height: 100%;
  color: #606367;
`;
