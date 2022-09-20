import React, { useState } from "react";

import KaleidoscopeSlide from "../components/KaleidoscopeSlide";
import Templates from "components/templates";
import Modal from "components/Modal";
import Slide from "components/Slide";

import imagesJson from "images.json";

const Home = () => {
  const [isShow, setIsShow] = useState<boolean>();
  const [imageIndex, setImageIndex] = useState(0);

  return (
    <Templates>
      <KaleidoscopeSlide
        images={imagesJson}
        defaultIndex={imageIndex}
        onChange={(e) => setImageIndex(e.imageIndex)}
        onDetail={() => {
          setIsShow(true);
        }}
      />

      <Modal show={isShow} onClose={() => setIsShow(false)}>
        <Slide
          onChange={(e) => setImageIndex(e.slideIndex)}
          defaultIndex={imageIndex}
        >
          {imagesJson.map((src, index) => (
            <img key={index} src={src} width="100%" />
          ))}
        </Slide>
      </Modal>
    </Templates>
  );
};

export default Home;
