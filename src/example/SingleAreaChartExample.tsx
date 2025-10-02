import React from "react";
import { AreaChart } from "../lib";

const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];

// 단일 시리즈 예제 (기존 AreaChart와 동일한 사용법)
const singleSeries = [
  {
    name: "Sales",
    color: "#3b82f6",
    data: [65, 78, 90, 81, 95, 88, 102],
  },
];

export const SingleAreaChartExample = () => {
  return (
    <div>
      <h3
        style={{
          color: "#374151",
          fontSize: 18,
          marginBottom: 20,
          textAlign: "center",
        }}
      >
        📊 Single Series Area Chart
      </h3>
      <p
        style={{
          color: "#6b7280",
          fontSize: 14,
          marginBottom: 25,
          textAlign: "center",
        }}
      >
        단일 시리즈도 동일한 방식으로 사용할 수 있습니다.
      </p>

      <AreaChart
        labels={labels}
        series={singleSeries}
        height={300}
        areaOpacity={0.3}
        showPoints={true}
        showLines={true}
        pointRadius={4}
        lineWidth={2}
        tooltipTheme="dark"
      />
    </div>
  );
};
