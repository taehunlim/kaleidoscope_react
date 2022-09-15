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

  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  const [style, setStyle] = useState({
    transform: `translateX(-${currentImgIndex}00%)`,
    transition: `all 0.4s ease-in-out`,
  });

  const nextSlide = () => {
    const lastImgIndex = images.length - 1;
    if (currentImgIndex === lastImgIndex) {
      setCurrentImgIndex(0);
      return setStyle({
        ...style,
        transform: `translateX(0)`,
      });
    }

    setCurrentImgIndex(currentImgIndex + 1);
    setStyle({
      ...style,
      transform: `translateX(-${currentImgIndex + 1}00%)`,
    });
  };

  const prevSlide = () => {
    if (currentImgIndex === 0) {
      const lastImgIndex = images.length - 1;
      setCurrentImgIndex(lastImgIndex);
      return setStyle({
        ...style,
        transform: `translateX(-${lastImgIndex}00%)`,
      });
    }

    setCurrentImgIndex(currentImgIndex - 1);
    setStyle({
      ...style,
      transform: `translateX(-${currentImgIndex - 1}00%)`,
    });
  };

  return (
    <Container>
      <ImageContainer width={imgWidth}>
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
  console.log(width);
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
