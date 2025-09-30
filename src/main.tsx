import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { LineChartExample } from "./example/LineChartExample";
// import { BarChartExample } from "./example/BarChartExample";
// import MultiSeriesBarChartExample from "./example/MultiSeriesBarChartExample";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LineChartExample />
    {/* <BarChartExample /> */}
    {/* <MultiSeriesBarChartExample /> */}
  </StrictMode>
);
