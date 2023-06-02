import styled from 'styled-components';
import { GrClose } from 'react-icons/gr';
import { BiCheckbox, BiRadioCircle } from 'react-icons/bi';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setOpts } from '../store/questionSlice';
import { useCallback } from 'react';

interface OptionProps {
  category: string;
  idx: number;
}

const OptionBox: React.FC<OptionProps> = ({ category, idx }) => {
  let bodyContent = <ShortOption>단답형 텍스트</ShortOption>;
  const dispatch = useAppDispatch();

  const options = useAppSelector(
    (state) => state.survey.questions[idx].options,
  );

  const changeOption = useCallback(
    (options: string[]): void => {
      dispatch(setOpts({ options, idx }));
    },
    [dispatch, idx],
  );

  const removeOption = (idx: number) => {
    const current = [...options];
    current.splice(idx, 1);
    changeOption(current);
  };

  const addOption = () => {
    const current = [...options];
    current.push(`옵션 ${current.length + 1}`);
    changeOption(current);
  };

  const ChangeOptName = (idx: number, name: string) => {
    const current = [...options];
    current[idx] = name;
    changeOption(current);
  };

  const getOptions = () => {
    const current = options;
    return current.map((e, idx) => (
      <OptionContainer key={idx}>
        {category === '객관식 질문' && (
          <IconBox>
            <BiRadioCircle color="gray" size={'2rem'} />
          </IconBox>
        )}
        {category === '체크박스' && (
          <IconBox>
            <BiCheckbox color="gray" size={'2rem'} />
          </IconBox>
        )}
        {category === '드롭다운' && (
          <IconBox>
            <p>{idx + 1}</p>
          </IconBox>
        )}
        <Options
          value={e}
          onChange={(e) => ChangeOptName(idx, e.target.value)}
        />
        <CloseButton onClick={() => removeOption(idx)} />
      </OptionContainer>
    ));
  };

  if (category === '단답형') {
    bodyContent = <ShortOption>단답형 텍스트</ShortOption>;
  } else if (category === '장문형') {
    bodyContent = <LongOption>장문형 텍스트</LongOption>;
  } else {
    bodyContent = (
      <MutipleOption>
        {getOptions()}
        <OptionContainer>
          {category === '객관식 질문' && (
            <IconBox>
              <BiRadioCircle color="gray" size={'2rem'} />
            </IconBox>
          )}
          {category === '체크박스' && (
            <IconBox>
              <BiCheckbox color="gray" size={'2rem'} />
            </IconBox>
          )}
          {category === '드롭다운' && (
            <IconBox>
              <p>{options.length + 1}</p>
            </IconBox>
          )}

          <OptionAdd onClick={addOption}>옵션 추가</OptionAdd>
        </OptionContainer>
      </MutipleOption>
    );
  }

  return (
    <>
      <Container>{bodyContent}</Container>
    </>
  );
};

export default OptionBox;

const Container = styled.div`
  width: 100%;
  min-height: 80px;
  padding: 1.6rem 0;
`;

const ShortOption = styled.div`
  width: 200px;
  border-bottom: 1px dotted gray;
  padding: 0.6rem 0;
  font-size: 1rem;
  color: gray;
`;

const LongOption = styled.div`
  width: 400px;
  border-bottom: 1px dotted gray;
  padding: 0.6rem 0;
  font-size: 1rem;
  color: gray;
`;

const MutipleOption = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  gap: 1rem;
`;

const OptionContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`;

const Options = styled.input`
  width: 90%;
  padding: 0.4rem 0;
  border: none;
  font-size: 1rem;
  &:hover {
    border-bottom: solid 1px gray;
    margin-bottom: -1px;
  }
  &:focus {
    outline: none;
    border-bottom: solid 2px #613cb0;
    margin-bottom: -2px;
  }
`;

const OptionAdd = styled.p`
  font-size: 1rem;
  color: gray;
  padding: 0.5rem 0;
  &:hover {
    border-bottom: solid 1px gray;
    margin-bottom: -1px;
  }
`;

const CloseButton = styled(GrClose)`
  cursor: pointer;
  margin-left: 1rem;
`;

const IconBox = styled.div`
  width: 2rem;
  height: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 1rem;
`;
