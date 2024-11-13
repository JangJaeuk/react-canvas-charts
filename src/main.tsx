import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import BarChartExample from "./example/BarChartExample";
import MultiSeriesBarChartExample from "./example/MultiSeriesBarChartExample";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MultiSeriesBarChartExample />
  </StrictMode>,
);
