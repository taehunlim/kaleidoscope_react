import React from 'react';

import KaleidoscopeSlide from "../components/KaleidoscopeSlide";
import Templates from "components/templates";

import img from 'assets/images/img.jpeg';
import half from 'assets/images/half.jpeg';
import prague from 'assets/images/prague.jpeg';
import swiss from 'assets/images/swiss.jpeg';


const images = [
    img, half, prague, swiss
];


const Home = () => {
    return (
        <Templates>
            <KaleidoscopeSlide images={images}/>
        </Templates>
    );
};

export default Home;