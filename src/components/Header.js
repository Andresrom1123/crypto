import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SelectedCrypto from "./SelectedCrypto";
import AuthModal from "./Authentication/AuthModal";

const Header = () => {
  let navigate = useNavigate();
  return (
    <header className="d-flex py-3 px-5 bg-light shadow align-items-center">
      <h5 className="col-6 my-auto">
        <span onClick={() => navigate("/")} className="-pointer -color-oscuro">
          Crypto Hunter
        </span>
      </h5>
      <div className="d-flex justify-content-end align-items-center my-auto col-6">
        <div className="">
          <SelectedCrypto />
        </div>
        <AuthModal />
      </div>
    </header>
  );
};

export default Header;
