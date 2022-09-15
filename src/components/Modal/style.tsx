import styled from "@emotion/styled";

import { unfoldingStyle } from "./animations";

const Content = styled.div`
  background: #fff;
  // padding: 50px;
  width: 100%;
  background: transparent;
  height: 100%;

  display: inline-block;
  border-radius: 3px;
  position: relative;

  h2 {
    font-size: 25px;
    line-height: 25px;
    margin-bottom: 15px;
  }

  p {
    font-size: 18px;
    line-height: 22px;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  z-index: 9;
  right: 15px;
  top: 15px;
  cursor: pointer;
  color: #ffffff;
`;

const Wrapper = styled.div`
  display: table-cell;
  background: rgba(0, 0, 0, 0.8);
  text-align: center;
  vertical-align: middle;
`;

const Container = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  display: table;
  height: 100%;
  width: 100%;
  z-index: 1;
  /* hidden 처리 */
  transform: scale(0);

  ${unfoldingStyle(Content)}
`;

const styledComponent = {
  Container,
  Wrapper,
  CloseButton,
  Content,
};

export default styledComponent;
