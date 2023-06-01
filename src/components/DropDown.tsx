import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { MdOutlineArrowDropDown, MdOutlineArrowDropUp } from 'react-icons/md';

interface DropDownProps {
  getOption: (option: string) => void;
}

const DropDown: React.FC<DropDownProps> = ({ getOption }) => {
  const [category, setCategory] = useState('단답형');
  const [open, setOpen] = useState(false);

  const changeOption = (category: string) => {
    setCategory(category);
    setOpen(false);
  };

  useEffect(() => {
    getOption(category);
  }, [category, getOption]);

  return (
    <>
      <Container>
        <CurrentOption
          onClick={() => {
            setOpen(!open);
          }}>
          {category}
          {open ? (
            <MdOutlineArrowDropUp size={24} />
          ) : (
            <MdOutlineArrowDropDown size={24} />
          )}
        </CurrentOption>
        {open && (
          <AllOptions>
            <OptionCard onClick={() => changeOption('단답형')}>
              단답형
            </OptionCard>
            <OptionCard onClick={() => changeOption('장문형')}>
              장문형
            </OptionCard>
            <OptionCard onClick={() => changeOption('객관식 질문')}>
              객관식 질문
            </OptionCard>
            <OptionCard onClick={() => changeOption('체크박스')}>
              체크박스
            </OptionCard>
            <OptionCard onClick={() => changeOption('드롭다운')}>
              드롭다운
            </OptionCard>
          </AllOptions>
        )}
      </Container>
    </>
  );
};

export default DropDown;

const Container = styled.div`
  width: 30%;
  height: 3rem;
  box-sizing: border-box;
  user-select: none;
`;

const CurrentOption = styled.div`
  width: 100%;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  font-size: 0.9rem;
  padding: 1rem;
`;

const AllOptions = styled.div`
  width: 100%;
  position: relative;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  transform: translateY(20px);
  box-sizing: border-box;
  overflow: hidden;
  background-color: white;
`;

const OptionCard = styled.div`
  width: 100%;
  padding: 1.4rem 1rem;
  cursor: pointer;
  font-size: 0.9rem;

  &:hover {
    background-color: #f1f3f4;
  }
`;
