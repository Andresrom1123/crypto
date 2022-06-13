import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./styles/main.css";
import HomePage from "./Pages/HomePage";
import CoinPage from "./Pages/CoinPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} exact />
        <Route path="/coins/:id" element={<CoinPage />} exact />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
