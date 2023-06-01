import styled from 'styled-components';

const NavBar = () => {
  return (
    <>
      <NavContainer></NavContainer>
    </>
  );
};

export default NavBar;

const NavContainer = styled.div`
  width: 100%;
  height: 4rem;
  top: 0px;
  background-color: white;
  box-shadow: 0px 2px 4px 0px #e0e0e0;
`;
