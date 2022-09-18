import styled from "@emotion/styled";
import { css } from "@emotion/react";

interface WidthProps {
  width?: string | number;
}

const Container = styled.div<WidthProps>`
  position: relative;
  height: 100%;

  margin: 0 50px;

  display: flex;
  align-items: center;
  justify-content: center;

  ${({ width }) => {
    if (!width || typeof width === "string") {
      return css`
        container-type: inline-size;
      `;
    }
  }}
`;

const SlideContainer = styled.div`
  overflow: hidden;
`;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
`;

const SlideItem = styled.div`
  display: flex;
  flex-shrink: 0;

  width: 100%;

  img {
    object-fit: contain;
    height: auto;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;

  position: absolute;
  top: 50%;
  transform: translateY(-50%);

  button {
    color: #ffffff;
  }
`;

const styledComponent = {
  Container,
  SlideContainer,
  Wrapper,
  SlideItem,
  ButtonContainer,
};

export default styledComponent;
