import React from "react";
import { AreaChartSeries, AreaChartConfig } from "../type";

export const useMouseEvents = (
  labels: string[],
  series: AreaChartSeries[],
  config: AreaChartConfig,
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

      // 모든 시리즈의 값과 누적값 계산 (아래에서 위로 순서)
      let tooltipContent = `<strong>${label}</strong><br/>`;
      let total = 0;

      // 스택형 차트에서는 아래에서 위로 순서대로 표시
      series.forEach((s, index) => {
        const value = s.data[closestIndex];
        total += value;
        tooltipContent += `${s.name}: ${value}`;
        if (index < series.length - 1) {
          tooltipContent += "<br/>";
        }
      });

      tooltipContent += `<br/><strong>Total: ${total}</strong>`;

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
