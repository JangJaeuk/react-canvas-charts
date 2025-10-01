import React from "react";
import { MultiSeriesBarChart } from "../lib";

const chartData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May"],
  series: [
    {
      name: "기업 A",
      color: "#3b82f6",
      data: [185, 105, 90, 80, 40],
    },
    {
      name: "기업 B",
      color: "#ef4444",
      data: [145, 122, 148, 68, 18],
    },
  ],
};

export const MultiSeriesBarChartExample = () => {
  return (
    <MultiSeriesBarChart
      labels={chartData.labels}
      series={chartData.series}
      barWidth={30}
      chartPadding={40}
      height={350}
      tooltipTheme="dark"
      barSpacing={10}
    />
  );
};
