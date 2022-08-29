import React, {useState} from 'react';

import styled from "@emotion/styled";

import Kaleidoscope from "../components/Kaleidoscope";
import Templates from "../components/templates";

import img from '../assets/images/img.jpeg';
import half from '../assets/images/half.jpeg';
import prague from '../assets/images/prague.jpeg';
import swiss from '../assets/images/swiss.jpeg';


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
                <button id="button" onClick={nextImage}>+</button>
                <button onClick={prevImage}>-</button>
            </ButtonContainer>
            <Kaleidoscope img={images[imageIndex]}/>
        </Templates>
    );
};

const ButtonContainer = styled.div`
  display: grid;
`;

export default Home;