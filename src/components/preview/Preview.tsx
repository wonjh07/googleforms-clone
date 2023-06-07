import styled from 'styled-components';
import PreCardBox from './PreCardBox';

const Preview = () => {
  return (
    <Container>
      <PreCardBox />
      <Footer />
    </Container>
  );
};

export default Preview;

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
