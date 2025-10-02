import React from "react";
import { BarChart } from "../lib";

const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];

// 단일 시리즈 예제 (기존 BarChart와 동일한 사용법)
const singleSeries = [
  {
    name: "Sales",
    color: "#3b82f6",
    data: [65, 45, 85, 55, 75, 95],
  },
];

// 다중 시리즈 예제
const multiSeries = [
  {
    name: "Q1",
    color: "#ec4899",
    data: [65, 45, 85],
  },
  {
    name: "Q2",
    color: "#8b5cf6",
    data: [55, 75, 95],
  },
];

export const BarChartExample = () => {
  return (
    <div>
      {/* 단일 시리즈 차트 */}
      <div style={{ marginBottom: 40 }}>
        <h3
          style={{
            color: "#374151",
            fontSize: 18,
            marginBottom: 20,
            textAlign: "center",
          }}
        >
          📊 Single Series Bar Chart
        </h3>
        <BarChart
          labels={labels}
          series={singleSeries}
          barWidth={50}
          chartPadding={40}
          height={350}
          gridColor="#e5e7eb"
          labelTextColor="#374151"
          gridTextColor="#6b7280"
          tooltipTheme="dark"
        />
      </div>

      {/* 다중 시리즈 차트 */}
      <div>
        <h3
          style={{
            color: "#374151",
            fontSize: 18,
            marginBottom: 20,
            textAlign: "center",
          }}
        >
          📈 Multi-Series Bar Chart
        </h3>
        <BarChart
          labels={labels.slice(0, 3)}
          series={multiSeries}
          barWidth={40}
          barSpacing={8}
          chartPadding={40}
          height={350}
          gridColor="#e5e7eb"
          labelTextColor="#374151"
          gridTextColor="#6b7280"
          tooltipTheme="dark"
        />
      </div>
    </div>
  );
};
