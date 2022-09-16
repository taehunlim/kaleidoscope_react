import React, { useRef, useState } from "react";

import styled from "@emotion/styled";

interface Props {
  images: string[];
  imgWidth?: string | number;
}

interface WidthProps {
  width?: string | number;
}

function Slider({ images, imgWidth }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);

  const [slidePosition, setSlidePosition] = useState(
    `translateX(-${currentSlideIndex}00%)`
  );
  const [slideTransition, setSlideTransition] =
    useState(`all 0.4s ease-in-out`);

  function nextSlide() {
    const lastImgIndex = images.length - 1;
    if (currentSlideIndex === lastImgIndex) {
      setCurrentSlideIndex(0);
      return setSlidePosition(`translateX(0)`);
    }

    setCurrentSlideIndex(currentSlideIndex + 1);
    setSlidePosition(`translateX(-${currentSlideIndex + 1}00%)`);
  }

  function prevSlide() {
    if (currentSlideIndex === 0) {
      const lastImgIndex = images.length - 1;
      setCurrentSlideIndex(lastImgIndex);
      return setSlidePosition(`translateX(-${lastImgIndex}00%)`);
    }

    setCurrentSlideIndex(currentSlideIndex - 1);
    setSlidePosition(`translateX(-${currentSlideIndex - 1}00%)`);
  }

  const style = {
    transform: slidePosition,
    transition: slideTransition,
  };

  return (
    <Container>
      <ImageContainer
        width={imgWidth}
        onTouchStart={(e) => {
          setTouchStart(e.touches[0].pageX);
        }}
        onTouchMove={(e) => {
          if (ref.current) {
            const current = ref.current.clientWidth * currentSlideIndex;
            const result = e.targetTouches[0].pageX - touchStart - current;
            setSlidePosition(`translateX(${result}px)`);
            setSlideTransition("0ms");
          }
        }}
        onTouchEnd={(e) => {
          const end = e.changedTouches[0].pageX;

          if (touchStart > end) {
            nextSlide();
            setSlideTransition("all 0.4s ease-in-out");
          }

          if (touchStart < end) {
            prevSlide();
            setSlideTransition("all 0.4s ease-in-out");
          }
        }}
      >
        <Wrapper ref={ref} style={style} width={imgWidth}>
          {images.map((img, index) => {
            return (
              <div key={index}>
                <img src={img} />
              </div>
            );
          })}
        </Wrapper>
      </ImageContainer>
      <ButtonContainer>
        <button onClick={prevSlide}>←</button>
        <button onClick={nextSlide}>→</button>
      </ButtonContainer>
    </Container>
  );
}

const widthProps = ({ width }: WidthProps) => {
  return (width || 500) + (typeof width === "string" ? "" : "px");
};

const Container = styled.div`
  position: relative;
  height: 100%;

  margin: 0 50px;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const ImageContainer = styled.div<WidthProps>`
  overflow: hidden;
  max-width: ${widthProps};
`;

const Wrapper = styled.div<WidthProps>`
  display: flex;
  width: 100%;
  img {
    object-fit: contain;
    width: ${widthProps};
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

export default Slider;
