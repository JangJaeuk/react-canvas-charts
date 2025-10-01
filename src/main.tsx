import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ExamplesDashboard } from "./example/ExamplesDashboard";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ExamplesDashboard />
  </StrictMode>
);
