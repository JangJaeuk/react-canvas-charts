import { useCallback } from "react";
import {
  BarChartDataPoint,
  BarChartConfig,
  TOP_PADDING,
  BOTTOM_PADDING,
  GRID_TEXT_DIV,
} from "../type";
import { useResponsiveCanvas } from "../../common";

export const useCanvasRenderer = (
  data: BarChartDataPoint[],
  config: BarChartConfig,
  easedProgress: number
) => {
  const drawChart = useCallback(
    (ctx: CanvasRenderingContext2D, width: number, height: number) => {
      const {
        barWidth,
        sidePadding,
        chartPadding,
        axisColor,
        gridColor,
        labelTextColor,
        gridTextColor,
      } = config;

      ctx.clearRect(0, 0, width, height);

      const chartWidth = width - sidePadding * 2;
      const chartHeight = height - (TOP_PADDING + BOTTOM_PADDING);
      const maxValue = Math.max(...data.map((d) => d.value));

      const availableWidth = chartWidth - chartPadding * 2;
      const totalBarsWidth = barWidth * data.length;
      const spacing = (availableWidth - totalBarsWidth) / (data.length - 1);

      // 축 그리기
      ctx.beginPath();
      ctx.strokeStyle = axisColor;
      ctx.lineWidth = 1;
      ctx.moveTo(sidePadding, TOP_PADDING);
      ctx.lineTo(sidePadding, height - BOTTOM_PADDING);
      ctx.lineTo(width - sidePadding, height - BOTTOM_PADDING);
      ctx.stroke();

      // 그리드 및 그리드 텍스트 그리기
      const gridLines = 5;
      ctx.strokeStyle = gridColor;
      for (let i = 0; i <= gridLines; i++) {
        const y = TOP_PADDING + (chartHeight * i) / gridLines;
        ctx.beginPath();
        ctx.moveTo(sidePadding, y);
        ctx.lineTo(width - sidePadding, y);
        ctx.stroke();

        const value = Math.round(maxValue - (maxValue * i) / gridLines);
        ctx.fillStyle = gridTextColor;
        ctx.font = "12px Inter, sans-serif";
        ctx.textAlign = "right";
        ctx.fillText(value.toString(), sidePadding - GRID_TEXT_DIV, y + 4);
      }

      // 바 그리기
      data.forEach((item, index) => {
        const x = sidePadding + chartPadding + (barWidth + spacing) * index;
        const barHeight = (item.value / maxValue) * chartHeight;
        const animatedHeight = barHeight * easedProgress;
        const y = height - BOTTOM_PADDING - animatedHeight;

        ctx.beginPath();
        const radius = 4;
        ctx.moveTo(x, y + radius);
        ctx.lineTo(x, y + animatedHeight);
        ctx.lineTo(x + barWidth, y + animatedHeight);
        ctx.lineTo(x + barWidth, y + radius);
        ctx.quadraticCurveTo(x + barWidth, y, x + barWidth - radius, y);
        ctx.lineTo(x + radius, y);
        ctx.quadraticCurveTo(x, y, x, y + radius);
        ctx.fillStyle = item.color;
        ctx.fill();

        ctx.fillStyle = labelTextColor;
        ctx.font = "12px Inter, sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(
          item.label,
          x + barWidth / 2,
          height - BOTTOM_PADDING + 24
        );
      });
    },
    [data, config, easedProgress]
  );

  const { canvasRef, containerRef } = useResponsiveCanvas({
    height: config.height,
    onDraw: drawChart,
    dependencies: [data, config, easedProgress, drawChart],
  });

  return {
    canvasRef,
    containerRef,
  };
};
