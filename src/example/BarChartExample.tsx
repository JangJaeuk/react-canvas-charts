import React from "react";
import { BarChart } from "../lib";

const sampleData = [
  { label: "Jan", value: 65, color: "#ec4899" },
  { label: "Feb", value: 45, color: "#8b5cf6" },
  { label: "Mar", value: 85, color: "#3b82f6" },
  { label: "Apr", value: 55, color: "#10b981" },
  { label: "May", value: 75, color: "#f59e0b" },
  { label: "Jun", value: 95, color: "#ef4444" },
];

export const BarChartExample = () => {
  return (
    <BarChart
      data={sampleData}
      barWidth={50}
      chartPadding={40}
      height={350}
      gridColor="#e5e7eb"
      labelTextColor="#374151"
      gridTextColor="#6b7280"
      tooltipTheme="dark"
    />
  );
};
