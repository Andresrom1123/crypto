import React, { useState } from "react";
import { CryptoState } from "../../CryptoContext";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

const Login = ({ handleClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setAlert } = CryptoState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setAlert({
        open: true,
        message: "Plese fill all the Fields",
        type: "error",
      });
      return;
    }

    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      setAlert({
        open: true,
        message: `Login Successful. Welcome ${result.user.email}`,
        type: "success",
      });
      handleClose();
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });

      return;
    }
  };
  return (
    <form className="d-flex flex-column p-3 gap-3">
      <input
        className="form-control shadow"
        required
        type="email"
        placeholder="Enter email"
        label="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="form-control shadow"
        type="password"
        required
        placeholder="Enter password"
        label="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="d-grid">
        <button
          type="submit"
          onClick={handleSubmit}
          className="btn border -bg-secondary"
        >
          Login
        </button>
      </div>
    </form>
  );
};

export default Login;
