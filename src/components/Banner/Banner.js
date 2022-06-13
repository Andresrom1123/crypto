import React from "react";
import SelectedCrypto from "../SelectedCrypto";
import Carousel from "./Carousel";

const Banner = () => {
  return (
    <section className="-banner d-flex flex-column justify-content-between p-5">
      <div className=" d-flex justify-content-end">
        <div className="col-3 col-md-2 -pointer">
          <SelectedCrypto />
        </div>
      </div>
      <div className="text-center">
        <h1 className="fs-1 -color-primary text-uppercase">Crypto Hunter</h1>
        <p className="fs-6 text-capitalize text-white">
          Get all the info regarding your favorite Crypto Currency
        </p>
        <Carousel />
      </div>
      <div></div>
    </section>
  );
};

export default Banner;
