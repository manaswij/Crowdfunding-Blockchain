import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { ThirdwebProvider, ChainId } from "@thirdweb-dev/react";
import "./styles/layout-output.css";


const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <ThirdwebProvider
      clientId="d897f8b8a896ceb0b682f84f5cb44c9a"
      activeChain={ChainId.Sepolia}
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThirdwebProvider>
  </React.StrictMode>
);
