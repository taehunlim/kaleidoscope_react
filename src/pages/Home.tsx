import React, {useState} from 'react';

import styled from "@emotion/styled";

import Kaleidoscope from "components/Kaleidoscope";
import Templates from "components/templates";
import Button from "components/Button";

import img from 'assets/images/img.jpeg';
import half from 'assets/images/half.jpeg';
import prague from 'assets/images/prague.jpeg';
import swiss from 'assets/images/swiss.jpeg';


const images = [
    img, half, prague, swiss
];

const Home = () => {
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
        <Templates>
            <ButtonContainer>
                <Button onClick={nextImage}>↑</Button>
                <Button onClick={prevImage}>↓</Button>
            </ButtonContainer>
            <KaleidoscopeWrapper>
                <Kaleidoscope img={images[imageIndex]}/>
            </KaleidoscopeWrapper>
        </Templates>
    );
};

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

export default Home;