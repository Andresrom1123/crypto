import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./assets/styles/main.css";
import HomePage from "./Pages/HomePage";
import CoinPage from "./Pages/CoinPage";
import Page404 from "./Pages/Page404";
import Header from "./components/Header";
import Alert from "./components/Alert";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} exact />
        <Route path="/coins/:id" element={<CoinPage />} exact />
        <Route path="*" element={<Page404 />} exact />
      </Routes>
      <Alert />
    </BrowserRouter>
  );
}

export default App;
