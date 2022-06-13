import React from "react";
import { useNavigate } from "react-router-dom";
import SelectedCrypto from "./SelectedCrypto";

const Header = () => {
  let navigate = useNavigate();

  return (
    <header className="d-flex justify-content-around p-3 bg-light -color-primary -pointer">
      <h1 onClick={() => navigate("/")} className="">
        Crypto Hunter
      </h1>
      <SelectedCrypto />
    </header>
  );
};

export default Header;
