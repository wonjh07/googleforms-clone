import styled from 'styled-components';
import Heading from './Heading';

const CardBox = () => {
  return (
    <>
      <Container>
        <Heading />
      </Container>
    </>
  );
};

export default CardBox;

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 1rem 10rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
`;
