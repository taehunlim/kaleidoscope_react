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
        <Container>
            <ButtonContainer>
                <Button onClick={nextImage}>↑</Button>
                <Button onClick={prevImage}>↓</Button>
            </ButtonContainer>
            <KaleidoscopeWrapper>
                <Kaleidoscope blur={2} img={images[imageIndex]}/>
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
  width: 100%;
  height: 100%;
  position: absolute;
  
  top: 0;
  left: 0;
  
  margin: auto;

  display: flex;
  justify-content: center;
  text-align: center;
`;

export default KaleidoscopeSlide;