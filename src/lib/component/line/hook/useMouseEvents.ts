import React from "react";
import { LineChartDataPoint, LineChartConfig } from "../type";

export const useMouseEvents = (
  data: LineChartDataPoint[],
  config: LineChartConfig,
  showTooltip: (x: number, y: number, content: string) => void,
  hideTooltip: () => void
) => {
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = e.currentTarget;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const { sidePadding, chartPadding } = config;
    const chartWidth = rect.width - sidePadding * 2;
    const availableWidth = chartWidth - chartPadding * 2;
    const pointSpacing = availableWidth / (data.length - 1);

    // 가장 가까운 포인트 찾기
    let closestIndex = -1;
    let minDistance = Infinity;

    data.forEach((point, index) => {
      const pointX = sidePadding + chartPadding + pointSpacing * index;
      const distance = Math.abs(x - pointX);

      if (distance < minDistance && distance < pointSpacing / 2) {
        minDistance = distance;
        closestIndex = index;
      }
    });

    if (closestIndex !== -1) {
      const point = data[closestIndex];
      const pointX = sidePadding + chartPadding + pointSpacing * closestIndex;

      showTooltip(pointX, y - 10, `${point.label}: ${point.value}`);
    } else {
      hideTooltip();
    }
  };

  const handleMouseLeave = () => {
    hideTooltip();
  };

  return { handleMouseMove, handleMouseLeave };
};
