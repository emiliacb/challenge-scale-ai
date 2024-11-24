import React from "react";
import { createRoot } from "react-dom/client";

import Pages from "@/pages/index";
import Providers from "@/components/providers";
import { ErrorBoundary, ErrorFallback } from "@/components/error-boundary";

import "@/styles/global.css";

const App = () => {
  return (
    <React.StrictMode>
      <Providers>
        <ErrorBoundary fallback={<ErrorFallback />}>
          <Pages />
        </ErrorBoundary>
      </Providers>
    </React.StrictMode>
  );
};

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(<App />);
