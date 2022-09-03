import React, {useState} from 'react';
import styled from "@emotion/styled";

import Kaleidoscope from "../Kaleidoscope";
import Button from "../Button";

type ImageType = string;
interface Props {
    images: ImageType[];
}

function KaleidoscopeSlide({images}: Props) {
    const [imageIndex, setImageIndex] = useState(0);

    function nextImage() {
        if (imageIndex >= images.length - 1) return setImageIndex(0);
        setImageIndex(imageIndex + 1);
    }

    function prevImage() {
        if (imageIndex <= 0) return setImageIndex(images.length - 1);
        setImageIndex(imageIndex - 1);
    }

    return (
        <div>
            <ButtonContainer>
                <Button onClick={nextImage}>↑</Button>
                <Button onClick={prevImage}>↓</Button>
            </ButtonContainer>
            <KaleidoscopeWrapper>
                <Kaleidoscope blur={2} img={images[imageIndex]}/>
            </KaleidoscopeWrapper>
        </div>
    );
}

const ButtonContainer = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  margin: auto 0;

  display: grid;
  gap: 30px;

  align-content: center;
`;

const KaleidoscopeWrapper = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  text-align: center;
`;

export default KaleidoscopeSlide;