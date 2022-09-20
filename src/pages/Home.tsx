import React, { useState } from "react";

import KaleidoscopeSlide from "../components/KaleidoscopeSlide";
import Templates from "components/templates";
import Modal from "components/Modal";
import Slide from "components/Slide";

import imagesJson from "images.json";

const Home = () => {
  const [isShow, setIsShow] = useState<boolean>();

  return (
    <Templates>
      <KaleidoscopeSlide
        images={imagesJson}
        onChange={(e) => console.log(e)}
        onDetail={() => {
          setIsShow(true);
        }}
      />

      <Modal show={isShow} onClose={() => setIsShow(false)}>
        <Slide onChange={(e) => console.log(e)}>
          {imagesJson.map((src, index) => (
            <img key={index} src={src} width="100%" />
          ))}
        </Slide>
      </Modal>
    </Templates>
  );
};

export default Home;
