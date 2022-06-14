import React from "react";
import SelectedCrypto from "../SelectedCrypto";
import Carousel from "./Carousel";

const Banner = () => {
  return (
    <section className="-banner d-flex flex-column py-5 px-3">
      <div className="text-center">
        <h1 className="fs-1 -color-primary text-uppercase">Crypto Hunter</h1>
        <p className="fs-6 text-capitalize -color-claro fw-bold">
          Get all the info regarding your favorite Crypto Currency
        </p>
        <Carousel />
      </div>
      <div></div>
    </section>
  );
};

export default Banner;
