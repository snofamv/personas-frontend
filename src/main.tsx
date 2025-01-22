import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { CrudPersonasApp } from "./CrudPersonasApp";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CrudPersonasApp />
  </StrictMode>
);
