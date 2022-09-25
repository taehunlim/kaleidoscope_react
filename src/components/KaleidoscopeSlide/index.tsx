import React, { MouseEventHandler, useEffect, useState, useRef } from "react";
import styled from "@emotion/styled";

import Kaleidoscope from "../Kaleidoscope";
import Button from "../Button";

type ImageType = string;
type OnChange = {
  image: ImageType;
  imageIndex: number;
};
interface Props {
  images: ImageType[];
  defaultIndex?: number;
  onChange?: (e: OnChange) => void;
  onDetail?: MouseEventHandler<HTMLImageElement>;
}

function KaleidoscopeSlide({
  images,
  defaultIndex = 0,
  onChange,
  onDetail,
}: Props) {
  const timerRef = useRef<any>(null);
  const [imageIndex, setImageIndex] = useState(defaultIndex);
  const [isAutoPlay, setIsAutoPlay] = useState(false);

  useEffect(() => {
    if (onChange) {
      onChange({
        image: images[imageIndex],
        imageIndex,
      });
    }
  }, [imageIndex]);

  useEffect(() => {
    if (isAutoPlay) {
      timerRef.current = setTimeout(() => {
        return nextImage();
      }, 2000);
    } else {
      return clearTimeout(timerRef.current);
    }
  }, [isAutoPlay, imageIndex]);

  useEffect(() => {
    setImageIndex(defaultIndex);
  }, [defaultIndex]);

  function nextImage() {
    if (imageIndex >= images.length - 1) return setImageIndex(0);
    setImageIndex(imageIndex + 1);
  }

  function prevImage() {
    if (imageIndex <= 0) return setImageIndex(images.length - 1);
    setImageIndex(imageIndex - 1);
  }

  function handleAutoPlay() {
    setIsAutoPlay(!isAutoPlay);
  }
  return (
    <Container>
      <ButtonContainer>
        <Button onClick={nextImage}>↑</Button>
        <Button onClick={handleAutoPlay}>{isAutoPlay ? "| |" : "►"}</Button>
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
