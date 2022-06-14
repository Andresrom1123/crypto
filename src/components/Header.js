import React from "react";
import { useNavigate } from "react-router-dom";
import SelectedCrypto from "./SelectedCrypto";

const Header = () => {
  let navigate = useNavigate();

  return (
    <header className="d-flex py-3 px-5 bg-light -color-primary shadow">
      <h3 className="col-6">
        <span onClick={() => navigate("/")} className="-pointer">
          Crypto Hunter
        </span>
      </h3>
      <div className="d-flex justify-content-end my-auto col-6">
        <div className="">
          <SelectedCrypto />
        </div>
      </div>
    </header>
  );
};

export default Header;
