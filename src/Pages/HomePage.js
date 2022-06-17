import React, { Suspense } from "react";
import ErrorFallback from "../components/ErrorBoundary";
import { ErrorBoundary } from "react-error-boundary";
import Banner from "../components/Banner/Banner";
const Coinstable = React.lazy(() => import("../components/Coinstable"));
const HomePage = () => {
  return (
    <>
      <Banner />
      <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => {}}>
        <Suspense fallback={<div>Loading...</div>}>
          <Coinstable />
        </Suspense>
      </ErrorBoundary>
    </>
  );
};

export default HomePage;
