import React, {
  ReactNode,
  TouchEvent,
  useEffect,
  useRef,
  useState,
} from "react";

import styledComponent from "./style";

const { Container, SlideContainer, Wrapper, SlideItem, ButtonContainer } =
  styledComponent;

interface Props {
  slideWidth?: string | number;
  slidePerView?: number;
  slideGap?: number;

  children: ReactNode;
  onChange?: (e: OnChangeType) => void;
}

type OnChangeType = {
  element: Element;
  slideIndex: number;
};

function Slide({
  slideWidth,
  slidePerView = 1,
  slideGap = 0,
  onChange,
  children,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const currentSlideIndex = useRef(0);
  const touchStart = useRef(0);

  const slideTransition = useRef("all 0.4s ease-in-out");

  const [width, setWidth] = useState(slideWidth);

  const itemWidth = Number(width) / slidePerView - slideGap;

  const [slidePosition, setSlidePosition] = useState(`translateX(0)`);

  useEffect(() => {
    if (slideWidth === "auto" || !slideWidth) {
      const container = containerRef.current;
      if (container) {
        setWidth(container.clientWidth);

        window.addEventListener("resize", () => {
          setWidth(container.clientWidth);
        });

        return () => {
          window.removeEventListener("resize", () => {
            setWidth(container.clientWidth);
          });
        };
      }
    }
  }, [containerRef]);

  const wrapper = wrapperRef.current;

  if (wrapper) {
    if (onChange) {
      onChange({
        element: wrapper.children[currentSlideIndex.current],
        slideIndex: currentSlideIndex.current,
      });
    }
  }

  function handleSlidePosition() {
    return setSlidePosition(
      `translateX(-${(currentSlideIndex.current * 100) / slidePerView}%)`
    );
  }

  function currentSlide() {
    slideTransition.current = "all 0.4s ease-in-out";
    handleSlidePosition();
  }

  function nextSlide() {
    const lastSlideIndex = React.Children.count(children) - 1;
    slideTransition.current = "all 0.4s ease-in-out";

    if (currentSlideIndex.current === lastSlideIndex) {
      currentSlideIndex.current = 0;
      return setSlidePosition(`translateX(0)`);
    }

    currentSlideIndex.current += 1;
    handleSlidePosition();
  }

  function prevSlide() {
    slideTransition.current = "all 0.4s ease-in-out";

    if (currentSlideIndex.current === 0) {
      const lastSlideIndex = React.Children.count(children) - 1;
      currentSlideIndex.current = lastSlideIndex;

      return handleSlidePosition();
    }

    currentSlideIndex.current -= 1;
    handleSlidePosition();
  }

  function handleTouchStart(e: TouchEvent<HTMLDivElement>) {
    touchStart.current = e.touches[0].pageX;
  }

  function handleTouchMove(e: TouchEvent<HTMLDivElement>) {
    if (wrapperRef.current) {
      const current =
        wrapperRef.current.clientWidth * currentSlideIndex.current;

      const result =
        e.targetTouches[0].pageX - touchStart.current - current / slidePerView;
      setSlidePosition(`translateX(${result}px)`);

      slideTransition.current = "0ms";
    }
  }

  function handleTouchEnd(e: TouchEvent<HTMLDivElement>) {
    const end = e.changedTouches[0].pageX;

    const { current } = wrapperRef;
    if (current) {
      const slideReferencePoint = current.clientWidth / 3 / slidePerView;
      if (touchStart.current - end > slideReferencePoint) {
        return nextSlide();
      }

      if (end - touchStart.current > slideReferencePoint) {
        return prevSlide();
      }

      return currentSlide();
    }
  }

  const style = {
    transform: slidePosition,
    transition: slideTransition.current,
  };

  const itemStyle = {
    width: !isNaN(itemWidth) ? itemWidth : "",
    margin: `0 ${slideGap / 2}`,
  };

  return (
    <Container ref={containerRef} width={slideWidth}>
      <SlideContainer
        style={{ width }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <Wrapper ref={wrapperRef} style={style}>
          {React.Children.toArray(children).map((child, index) => {
            return (
              <SlideItem key={index} style={itemStyle}>
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

export default Slide;
