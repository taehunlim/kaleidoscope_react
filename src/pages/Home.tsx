import React, { useState } from "react";

import KaleidoscopeSlide from "../components/KaleidoscopeSlide";
import Templates from "components/templates";
import Modal from "components/Modal";

import imagesJson from "images.json";

const Home = () => {
  const [isShow, setIsShow] = useState<boolean>();
  const [selectedImage, setSelectedImage] = useState("");

  return (
    <Templates>
      <KaleidoscopeSlide
        images={imagesJson}
        onChange={(e) => console.log(e)}
        onDetail={(e) => {
          setSelectedImage((e.target as HTMLImageElement).src);
          setIsShow(true);
        }}
      />
      <Modal show={isShow} onClose={() => setIsShow(false)}>
        <img width="100%" src={selectedImage} />
      </Modal>
    </Templates>
  );
};

export default Home;
