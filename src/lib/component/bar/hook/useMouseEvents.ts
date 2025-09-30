import React from "react";
import {
  BarChartDataPoint,
  BarChartConfig,
  TOP_PADDING,
  BOTTOM_PADDING,
} from "../type";

export const useMouseEvents = (
  data: BarChartDataPoint[],
  config: BarChartConfig,
  showTooltip: (x: number, y: number, content: string) => void,
  hideTooltip: () => void
) => {
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = e.currentTarget;
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const { barWidth, sidePadding, chartPadding } = config;
    const chartWidth = rect.width - sidePadding * 2;
    const availableWidth = chartWidth - chartPadding * 2;
    const totalBarsWidth = barWidth * data.length;
    const spacing = (availableWidth - totalBarsWidth) / (data.length - 1);

    let tooltipShown = false;

    data.forEach((item, index) => {
      const barX = sidePadding + chartPadding + (barWidth + spacing) * index;
      const maxValue = Math.max(...data.map((d) => d.value));
      const chartHeight = rect.height - (TOP_PADDING + BOTTOM_PADDING);
      const barHeight = (item.value / maxValue) * chartHeight;
      const barY = rect.height - BOTTOM_PADDING - barHeight;

      if (
        mouseX >= barX &&
        mouseX <= barX + barWidth &&
        mouseY >= barY &&
        mouseY <= barY + barHeight
      ) {
        showTooltip(barX + barWidth / 2, barY, `${item.label}: ${item.value}`);
        tooltipShown = true;
      }
    });

    if (!tooltipShown) {
      hideTooltip();
    }
  };

  const handleMouseLeave = () => {
    hideTooltip();
  };

  return {
    handleMouseMove,
    handleMouseLeave,
  };
};
