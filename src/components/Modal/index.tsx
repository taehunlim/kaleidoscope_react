import React from "react";

import styledComponent from "./style";

const { Container, Wrapper, Content, CloseButton } = styledComponent;

interface Props {
  show: boolean | undefined;
  onClose: () => void;
  children?: React.ReactNode;
}

function Modal({ show, onClose, children }: Props) {
  const isHidden = typeof show === "undefined" ? "" : "hidden";

  const showClass = show ? "show" : isHidden;

  return (
    <Container className={`unfolding ${showClass}`}>
      <Wrapper>
        <CloseButton onClick={onClose}>✕</CloseButton>
        <Content>{children}</Content>
      </Wrapper>
    </Container>
  );
}

export default Modal;
