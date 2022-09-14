import React, { MouseEventHandler, useEffect, useState } from "react";
import styled from "@emotion/styled";

import Kaleidoscope from "../Kaleidoscope";
import Button from "../Button";

type ImageType = string;
interface Props {
  images: ImageType[];
  onChange?: (e: ImageType) => void;
  onDetail?: MouseEventHandler<HTMLImageElement>;
}

function KaleidoscopeSlide({ images, onChange, onDetail }: Props) {
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    if (onChange) {
      onChange(images[imageIndex]);
    }
  }, [imageIndex]);

  function nextImage() {
    if (imageIndex >= images.length - 1) return setImageIndex(0);
    setImageIndex(imageIndex + 1);
  }

  function prevImage() {
    if (imageIndex <= 0) return setImageIndex(images.length - 1);
    setImageIndex(imageIndex - 1);
  }

  return (
    <Container>
      <ButtonContainer>
        <Button onClick={nextImage}>↑</Button>
        <Button onClick={prevImage}>↓</Button>
      </ButtonContainer>
      <KaleidoscopeWrapper>
        <Kaleidoscope blur={2} img={images[imageIndex]} onClick={onDetail} />
      </KaleidoscopeWrapper>
    </Container>
  );
}

const Container = styled.div`
  align-self: center;
`;

const ButtonContainer = styled.div`
  display: grid;
  gap: 30px;
`;

const KaleidoscopeWrapper = styled.div`
  position: absolute;

  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;

  display: inline-table;
  justify-content: center;
  text-align: center;
`;

export default KaleidoscopeSlide;
