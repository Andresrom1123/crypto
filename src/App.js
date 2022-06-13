import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./assets/styles/main.css";
import HomePage from "./Pages/HomePage";
import CoinPage from "./Pages/CoinPage";
import Layout from "./Pages/Layout";
import Page404 from "./Pages/Page404";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} exact />
        <Route path="/" element={<Layout />} exact>
          <Route path="coins/:id" element={<CoinPage />} exact />
          <Route path="*" element={<Page404 />} exact />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
