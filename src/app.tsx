import React from "react";
import { createRoot } from "react-dom/client";

import Home from "@/pages/index";
import { Providers } from "@/components/providers";

import "@/styles/global.css";

const App = () => {
  return (
    <React.StrictMode>
      <Providers>
        <Home />
      </Providers>
    </React.StrictMode>
  );
};

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(<App />);
