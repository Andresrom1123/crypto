import React from "react";
import ImageError from "../assets/Images/404.webp";

const Page404 = () => {
  return (
    <div className="d-flex justify-content-center">
      <div className="col-md-6 col-12">
        <input type="image" src={ImageError} alt="404 Image" width="100%" />
      </div>
    </div>
  );
};

export default Page404;
