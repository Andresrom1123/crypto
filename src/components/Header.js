import React from "react";
import { useNavigate } from "react-router-dom";
import SelectedCrypto from "./SelectedCrypto";

const Header = () => {
  let navigate = useNavigate();

  return (
    <header className="d-flex py-3 px-5 bg-light -color-primary -pointer">
      <h1 onClick={() => navigate("/")} className="col-6">
        Crypto Hunter
      </h1>
      <div className="d-flex justify-content-end col-6">
        <div className="">
          <SelectedCrypto />
        </div>
      </div>
    </header>
  );
};

export default Header;
