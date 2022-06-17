import React, { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./assets/styles/main.css";
import Header from "./components/Header";
import Alert from "./components/Alert";

const HomePage = lazy(() => import("./Pages/HomePage"));
const CoinPage = lazy(() => import("./Pages/CoinPage"));
const Page404 = lazy(() => import("./Pages/Page404"));

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route
          path="*"
          element={
            <Suspense fallback={<>...</>}>
              <Page404 />
            </Suspense>
          }
          exact
        />
        <Route
          path="/"
          element={
            <Suspense fallback={<>...</>}>
              <HomePage />
            </Suspense>
          }
          exact
        />
        <Route
          path="/coins/:id"
          element={
            <Suspense fallback={<>...</>}>
              <CoinPage />
            </Suspense>
          }
          exact
        />
      </Routes>
      <Alert />
    </BrowserRouter>
  );
}

export default App;
