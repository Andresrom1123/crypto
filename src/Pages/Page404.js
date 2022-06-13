import React from "react";
import Image404 from "../assets/Images/404.webp";

const Page404 = () => {
  return (
    <div className="d-flex justify-content-center">
      <div className="col-md-6 col-12">
        <img src={Image404} alt="404 Image" width="100%" />
      </div>
    </div>
  );
};

export default Page404;
