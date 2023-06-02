import styled from 'styled-components';
import icon from '../assets/google_forms.svg';
import { AiOutlineEye } from 'react-icons/ai';
import { useAppDispatch } from '../store/hooks';
import { openPreview } from '../store/previewSlice';

const NavBar = () => {
  const dispatch = useAppDispatch();

  const getPreview = () => {
    dispatch(openPreview());
  };

  return (
    <>
      <NavContainer>
        <Icon src={icon} />
        <Title>Google Forms Clone</Title>
        <PreviewBtn size={30} onClick={getPreview} />
      </NavContainer>
      <Margin />
    </>
  );
};

export default NavBar;

const NavContainer = styled.div`
  position: fixed;
  width: 100%;
  height: 4rem;
  padding: 0.6rem 2rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
  background-color: white;
  box-sizing: border-box;
  box-shadow: 0px 2px 4px 0px #e0e0e0;
`;

const Icon = styled.img`
  box-sizing: border-box;
  height: 100%;
`;

const Title = styled.p`
  font-size: 1.2rem;
`;

const Margin = styled.div`
  width: 100%;
  height: 4rem;
`;

const PreviewBtn = styled(AiOutlineEye)`
  cursor: pointer;
`;
