import React, {
  ReactNode,
  TouchEvent,
  useEffect,
  useRef,
  useState,
} from "react";

import styled from "@emotion/styled";
import { css } from "@emotion/react";

interface Props {
  slideWidth?: string | number;
  children?: ReactNode;
}

interface WidthProps {
  width?: string | number;
}

function Slide({ slideWidth, children }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const currentSlideIndex = useRef(0);
  const touchStart = useRef(0);

  const slideTransition = useRef("all 0.4s ease-in-out");

  const [width, setWidth] = useState(slideWidth);

  const [slidePosition, setSlidePosition] = useState(
    `translateX(-${currentSlideIndex}00%)`
  );

  useEffect(() => {
    if (slideWidth === "auto" || !slideWidth) {
      const container = containerRef.current;
      if (container) {
        setWidth(container.clientWidth);

        window.addEventListener("resize", () => {
          setWidth(container.clientWidth);
        });
      }
    }
  }, [containerRef]);

  function currentSlide() {
    slideTransition.current = "all 0.4s ease-in-out";
    setSlidePosition(`translateX(-${currentSlideIndex.current}00%)`);
  }

  function nextSlide() {
    const lastSlideIndex = React.Children.count(children) - 1;
    slideTransition.current = "all 0.4s ease-in-out";

    if (currentSlideIndex.current === lastSlideIndex) {
      currentSlideIndex.current = 0;
      return setSlidePosition(`translateX(0)`);
    }

    currentSlideIndex.current += 1;
    setSlidePosition(`translateX(-${currentSlideIndex.current}00%)`);
  }

  function prevSlide() {
    slideTransition.current = "all 0.4s ease-in-out";

    if (currentSlideIndex.current === 0) {
      const lastSlideIndex = React.Children.count(children) - 1;
      currentSlideIndex.current = lastSlideIndex;
      return setSlidePosition(`translateX(-${currentSlideIndex.current}00%)`);
    }

    currentSlideIndex.current -= 1;
    setSlidePosition(`translateX(-${currentSlideIndex.current}00%)`);
  }

  function handleTouchStart(e: TouchEvent<HTMLDivElement>) {
    touchStart.current = e.touches[0].pageX;
  }

  function handleTouchMove(e: TouchEvent<HTMLDivElement>) {
    if (wrapperRef.current) {
      const current =
        wrapperRef.current.clientWidth * currentSlideIndex.current;
      const result = e.targetTouches[0].pageX - touchStart.current - current;
      setSlidePosition(`translateX(${result}px)`);

      slideTransition.current = "0ms";
    }
  }

  function handleTouchEnd(e: TouchEvent<HTMLDivElement>) {
    const end = e.changedTouches[0].pageX;

    const { current } = wrapperRef;
    if (current) {
      const slideReferencePoint = current.clientWidth / 3;
      if (touchStart.current - end > slideReferencePoint) {
        nextSlide();
      }

      if (end - touchStart.current > slideReferencePoint) {
        prevSlide();
      }

      currentSlide();
    }
  }

  const style = {
    transform: slidePosition,
    transition: slideTransition.current,
  };

  return (
    <Container ref={containerRef} width={slideWidth}>
      <SlideContainer
        width={width}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <Wrapper ref={wrapperRef} style={style}>
          {React.Children.toArray(children).map((child, index) => {
            return (
              <SlideItem key={index} width={width}>
                {child}
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
  return (width || "auto") + (typeof width === "string" ? "" : "px");
};

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
  width: ${widthProps};
`;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
`;

const SlideItem = styled.div`
  display: flex;
  flex-shrink: 0;
  width: ${widthProps};

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

Slide.Item = SlideItem;

export default Slide;
