import React from "react";
import { LineChartSeries, LineChartConfig } from "../type";

export const useMouseEvents = (
  labels: string[],
  series: LineChartSeries[],
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
    const pointSpacing = availableWidth / (labels.length - 1);

    // 가장 가까운 포인트 찾기
    let closestIndex = -1;
    let minDistance = Infinity;

    labels.forEach((_, index) => {
      const pointX = sidePadding + chartPadding + pointSpacing * index;
      const distance = Math.abs(x - pointX);

      if (distance < minDistance && distance < pointSpacing / 2) {
        minDistance = distance;
        closestIndex = index;
      }
    });

    if (closestIndex !== -1) {
      const label = labels[closestIndex];
      const pointX = sidePadding + chartPadding + pointSpacing * closestIndex;

      // 모든 시리즈의 값 표시
      let tooltipContent = `<strong>${label}</strong><br/>`;

      series.forEach((s, index) => {
        const value = s.data[closestIndex];
        tooltipContent += `${s.name}: ${value}`;
        if (index < series.length - 1) {
          tooltipContent += "<br/>";
        }
      });

      showTooltip(pointX, y - 10, tooltipContent);
    } else {
      hideTooltip();
    }
  };

  const handleMouseLeave = () => {
    hideTooltip();
  };

  return { handleMouseMove, handleMouseLeave };
};
