import React, { useState } from "react";

import KaleidoscopeSlide from "../components/KaleidoscopeSlide";
import Templates from "components/templates";
import Modal from "components/Modal";

import imagesJson from "images.json";

const Home = () => {
  const [isShow, setIsShow] = useState<boolean>();
  return (
    <Templates>
      <KaleidoscopeSlide images={imagesJson} onChange={(e) => console.log(e)} />
      <Modal show={isShow} onClose={() => setIsShow(false)}></Modal>
    </Templates>
  );
};

export default Home;
