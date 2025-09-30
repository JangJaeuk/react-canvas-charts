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
            lineColor="#ec4899"
            pointColor="#be185d"
            pointShape="triangle"
            pointRadius={6}
            lineWidth={3}
            tooltipTheme="dark"
          />

          <div style={{ marginTop: 40 }}>
            <h2 style={{ color: "#374151", marginBottom: 20 }}>
              Different Point Shapes
            </h2>
            <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
              <div style={{ flex: 1, minWidth: 300 }}>
                <h3
                  style={{ color: "#6b7280", fontSize: 14, marginBottom: 10 }}
                >
                  Circle Points
                </h3>
                <LineChart
                  data={chartData.slice(0, 4)}
                  height={200}
                  lineColor="#3b82f6"
                  pointColor="#1d4ed8"
                  pointShape="circle"
                  pointRadius={5}
                />
              </div>
              <div style={{ flex: 1, minWidth: 300 }}>
                <h3
                  style={{ color: "#6b7280", fontSize: 14, marginBottom: 10 }}
                >
                  Square Points
                </h3>
                <LineChart
                  data={chartData.slice(0, 4)}
                  height={200}
                  lineColor="#10b981"
                  pointColor="#047857"
                  pointShape="square"
                  pointRadius={5}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
