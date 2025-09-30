import React from "react";
import { LineChart } from "../lib";

const chartData = [
  { label: "Jan", value: 65 },
  { label: "Feb", value: 78 },
  { label: "Mar", value: 90 },
  { label: "Apr", value: 81 },
  { label: "May", value: 95 },
  { label: "Jun", value: 88 },
  { label: "Jul", value: 102 },
];

export const LineChartExample = () => {
  return (
    <div
      style={{
        height: "100vh",
        backgroundColor: "#f9fafb",
        padding: 20,
      }}
    >
      <div
        style={{
          maxWidth: 1000,
          margin: "0 auto",
        }}
      >
        <h1
          style={{
            fontWeight: "bold",
            color: "#1f2937",
          }}
        >
          Interactive Line Chart
        </h1>
        <div
          style={{
            backgroundColor: "#fff",
            padding: 20,
            borderRadius: 16,
            marginTop: 20,
            boxShadow:
              "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
          }}
        >
          <LineChart
            data={chartData}
            height={300}
            lineColor="#3b82f6"
            pointColor="#1d4ed8"
            tooltipTheme="dark"
          />
        </div>
      </div>
    </div>
  );
};
