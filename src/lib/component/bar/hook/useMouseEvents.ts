import React from "react";
import { BarChartSeries, BarChartConfig } from "../type";

export const useMouseEvents = (
  labels: string[],
  series: BarChartSeries[],
  config: BarChartConfig,
  showTooltip: (x: number, y: number, content: string) => void,
  hideTooltip: () => void
) => {
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = e.currentTarget;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const { barWidth, sidePadding, chartPadding, barSpacing } = config;
    const chartWidth = rect.width - sidePadding * 2;
    const availableWidth = chartWidth - chartPadding * 2;
    const groupWidth =
      barWidth * series.length + barSpacing * (series.length - 1);
    const spacing =
      (availableWidth - groupWidth * labels.length) / (labels.length - 1);

    // 가장 가까운 그룹 찾기
    let closestIndex = -1;
    let minDistance = Infinity;

    labels.forEach((_, index) => {
      const groupX =
        sidePadding + chartPadding + (groupWidth + spacing) * index;
      const groupCenterX = groupX + groupWidth / 2;
      const distance = Math.abs(x - groupCenterX);

      if (distance < minDistance && distance < groupWidth / 2) {
        minDistance = distance;
        closestIndex = index;
      }
    });

    if (closestIndex !== -1) {
      const label = labels[closestIndex];
      const groupX =
        sidePadding + chartPadding + (groupWidth + spacing) * closestIndex;
      const groupCenterX = groupX + groupWidth / 2;

      // 모든 시리즈의 값과 총합 계산
      let tooltipContent = `<strong>${label}</strong><br/>`;
      let total = 0;

      series.forEach((s, index) => {
        const value = s.data[closestIndex];
        total += value;
        tooltipContent += `${s.name}: ${value}`;
        if (index < series.length - 1) {
          tooltipContent += "<br/>";
        }
      });

      tooltipContent += `<br/><strong>Total: ${total}</strong>`;

      showTooltip(groupCenterX, y - 10, tooltipContent);
    } else {
      hideTooltip();
    }
  };

  const handleMouseLeave = () => {
    hideTooltip();
  };

  return { handleMouseMove, handleMouseLeave };
};
