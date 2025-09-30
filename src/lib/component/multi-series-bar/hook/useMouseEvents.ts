import React from "react";
import {
  BarChartSeries,
  MultiSeriesBarChartConfig,
  TOP_PADDING,
  BOTTOM_PADDING,
} from "../type";

export const useMouseEvents = (
  labels: string[],
  series: BarChartSeries[],
  config: MultiSeriesBarChartConfig,
  showTooltip: (x: number, y: number, content: string) => void,
  hideTooltip: () => void
) => {
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = e.currentTarget;
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const { barWidth, sidePadding, chartPadding, barSpacing } = config;
    const groupWidth =
      barWidth * series.length + barSpacing * (series.length - 1);
    const chartWidth = rect.width - sidePadding * 2;
    const availableWidth = chartWidth - chartPadding * 2;
    const spacing =
      (availableWidth - groupWidth * labels.length) / (labels.length - 1);

    let tooltipShown = false;

    labels.forEach((label, groupIndex) => {
      const groupX =
        sidePadding + chartPadding + (groupWidth + spacing) * groupIndex;

      series.forEach((serie, serieIndex) => {
        const barX = groupX + (barWidth + barSpacing) * serieIndex;
        const value = serie.data[groupIndex];
        const maxValue = Math.max(...series.flatMap((s) => s.data));
        const chartHeight = rect.height - (TOP_PADDING + BOTTOM_PADDING);
        const barHeight = (value / maxValue) * chartHeight;
        const barY = rect.height - BOTTOM_PADDING - barHeight;

        if (
          mouseX >= barX &&
          mouseX <= barX + barWidth &&
          mouseY >= barY &&
          mouseY <= barY + barHeight
        ) {
          showTooltip(
            barX + barWidth / 2,
            barY,
            `${serie.name} - ${label}: ${value}`
          );
          tooltipShown = true;
        }
      });
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
