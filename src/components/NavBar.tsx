import styled from 'styled-components';
import icon from '../assets/google_forms.svg';
import { AiOutlineEye } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <>
      <Container>
        <Icon src={icon} />
        <Title>Google Forms Clone</Title>
        <Link to="/preview">
          <PreviewBtn size={30} />
        </Link>
      </Container>
      <Margin />
    </>
  );
};

export default NavBar;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  position: fixed;
  width: 100%;
  height: 4rem;
  box-sizing: border-box;
  padding: 0.6rem 2rem;
  gap: 1rem;
  background-color: white;
  box-shadow: 0px 2px 4px 0px #e0e0e0;
  z-index: 10;
`;

const Icon = styled.img`
  height: 100%;
  box-sizing: border-box;
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
