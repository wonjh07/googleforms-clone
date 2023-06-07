import styled from 'styled-components';
import NavBar from './NavBar';
import CardBox from './CardBox';
import SideMenu from './SideMenu';

const Survey = () => {
  return (
    <>
      <Container>
        <NavBar />
        <SideMenu />
        <CardBox />
        <Footer />
      </Container>
    </>
  );
};

export default Survey;

const Container = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background-color: #efebf7;
`;

const Footer = styled.div`
  width: 100%;
  height: 200px;
`;
