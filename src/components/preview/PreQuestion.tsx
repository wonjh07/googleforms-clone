import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setAnswers, setMultiAnswers } from '../../store/previewSlice';
import { BsCheck } from 'react-icons/bs';
import PreDropDown from './PreDropDown';
interface QuestionProps {
  idx: number;
}

const PreQuestion: React.FC<QuestionProps> = ({ idx }) => {
  const question = useAppSelector((state) => state.survey.questions[idx]);
  const dispatch = useAppDispatch();
  const type = question.questionType;

  const setSingleAnswer = (answer: string) => {
    dispatch(setAnswers({ idx, answer }));
  };

  const setMultipleAnswer = (answer: string) => {
    dispatch(setMultiAnswers({ idx, answer }));
  };

  const getAnswersBox = () => {
    if (type === '단답형') {
      return (
        <ShortAnswer
          placeholder="내 답변"
          onChange={(e: any) => {
            setSingleAnswer(e.target.value);
          }}
        />
      );
    }
    if (type === '장문형') {
      return (
        <LongAnswer
          placeholder="내 답변"
          onChange={(e: any) => {
            setSingleAnswer(e.target.value);
          }}
        />
      );
    }
    if (type === '객관식 질문') {
      return (
        <MultipleAnswer>
          {question.options.map((option, idx) => (
            <Option key={idx}>
              <RadioBox
                type="radio"
                id={`site${idx}`}
                value={option}
                name="site"
                onClick={(e: any) => {
                  setSingleAnswer(e.target.value);
                }}
              />
              <Label htmlFor={`site${idx}`}>{option}</Label>
            </Option>
          ))}
        </MultipleAnswer>
      );
    }
    if (type === '체크박스') {
      return (
        <MultipleAnswer>
          {question.options.map((option, idx) => (
            <Option key={idx}>
              <CheckBox
                type="checkbox"
                id={`site${idx}`}
                value={option}
                name={`site${idx}`}
                onClick={(e: any) => {
                  setMultipleAnswer(e.target.value);
                }}
              />
              <CheckIcon className="check" />
              <Label htmlFor={`site${idx}`}>{option}</Label>
            </Option>
          ))}
        </MultipleAnswer>
      );
    }
    if (type === '드롭다운') {
      return <PreDropDown idx={idx} />;
    }
  };

  return (
    <>
      <Container>
        <Category>
          <Title>{question.questionTitle}</Title>
          <Warn>{question.essential && '*'}</Warn>
        </Category>
        {getAnswersBox()}
      </Container>
    </>
  );
};

export default PreQuestion;

const Container = styled.div`
  width: 100%;
  max-width: 720px;
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

const CheckBox = styled.input`
  vertical-align: middle;
  appearance: none;
  position: relative;
  box-sizing: border-box;
  border: 2px solid gray;
  border-radius: 2px;
  width: 1.3rem;
  height: 1.3rem;
  margin-bottom: 0.3rem;
  cursor: pointer;
  transition: 0.3s;
  background-color: white;
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
  margin-bottom: 0.1rem;
  margin-left: 0.25rem;
  border: none;
  box-sizing: border-box;
  background-color: #613cb0;
  color: white;
  pointer-events: none;
`;

const Label = styled.label`
  height: 100%;
  display: flex;
  align-items: center;
  color: #606367;
`;