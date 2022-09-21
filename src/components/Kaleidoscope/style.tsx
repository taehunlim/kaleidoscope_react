import styled from "@emotion/styled";

const Wrapper = styled.div`
  position: relative;
  align-self: center;
`;

const StyledImg = styled.img`
  z-index: 1;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto 18px;
  cursor: pointer;
  transition: 0.3s;

  :hover {
    transform: scale(1.1);
  }
`;

const styledComponent = {
  Wrapper,
  StyledImg,
};

export default styledComponent;
