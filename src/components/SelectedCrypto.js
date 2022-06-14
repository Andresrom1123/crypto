import React from "react";
import { CryptoState } from "../CryptoContext";

const SelectedCrypto = () => {
  const { currency, setCurrency } = CryptoState();

  return (
    <div className="my-auto ">
      <select
        className="form-select -pointer -color-oscuro -select"
        value={currency}
        onChange={(e) => setCurrency(e.target.value)}
      >
        <option value={"USD"}>USD</option>
        <option value={"INR"}>INR</option>
      </select>
    </div>
  );
};

export default SelectedCrypto;
