import React from 'react';

import KaleidoscopeSlide from "../components/KaleidoscopeSlide";
import Templates from "components/templates";

import imagesJson from 'images.json';

const Home = () => {
    return (
        <Templates>
            <KaleidoscopeSlide images={imagesJson}/>
        </Templates>
    );
};

export default Home;