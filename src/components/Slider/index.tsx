import React, { useRef, useState } from "react";

import styled from "@emotion/styled";

interface Props {
  images: string[];
  slideWidth?: string | number;
}

interface WidthProps {
  width?: string | number;
}

function Slider({ images, slideWidth }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);

  const [slidePosition, setSlidePosition] = useState(
    `translateX(-${currentSlideIndex}00%)`
  );
  const [slideTransition, setSlideTransition] =
    useState(`all 0.4s ease-in-out`);

  function nextSlide() {
    const lastSlideIndex = images.length - 1;
    if (currentSlideIndex === lastSlideIndex) {
      setCurrentSlideIndex(0);
      return setSlidePosition(`translateX(0)`);
    }

    setCurrentSlideIndex(currentSlideIndex + 1);
    setSlidePosition(`translateX(-${currentSlideIndex + 1}00%)`);
  }

  function prevSlide() {
    if (currentSlideIndex === 0) {
      const lastSlideIndex = images.length - 1;
      setCurrentSlideIndex(lastSlideIndex);
      return setSlidePosition(`translateX(-${lastSlideIndex}00%)`);
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
      <SlideContainer
        width={slideWidth}
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
        <Wrapper ref={ref} style={style}>
          {images.map((img, index) => {
            return (
              <SlideItem key={index} width={slideWidth}>
                <img src={img} width="100%" />
              </SlideItem>
            );
          })}
        </Wrapper>
      </SlideContainer>
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

const SlideContainer = styled.div`
  overflow: hidden;
  max-width: ${widthProps};
`;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
`;

const SlideItem = styled.div`
  display: flex;
  min-width: ${widthProps};

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

export default Slider;
