import { useCallback } from "react";
import {
  BarChartSeries,
  BarChartConfig,
  TOP_PADDING,
  BOTTOM_PADDING,
  GRID_TEXT_DIV,
} from "../type";
import { useResponsiveCanvas } from "../../common";

export const useCanvasRenderer = (
  labels: string[],
  series: BarChartSeries[],
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
        barSpacing,
      } = config;

      ctx.clearRect(0, 0, width, height);

      const chartWidth = width - sidePadding * 2;
      const chartHeight = height - (TOP_PADDING + BOTTOM_PADDING);

      const maxValue = Math.max(...series.flatMap((s) => s.data));

      const groupWidth =
        barWidth * series.length + barSpacing * (series.length - 1);
      const availableWidth = chartWidth - chartPadding * 2;
      const spacing =
        (availableWidth - groupWidth * labels.length) / (labels.length - 1);

      // 축 그리기
      ctx.beginPath();
      ctx.strokeStyle = axisColor;
      ctx.lineWidth = 1;
      ctx.moveTo(sidePadding, TOP_PADDING);
      ctx.lineTo(sidePadding, height - BOTTOM_PADDING);
      ctx.lineTo(width - sidePadding, height - BOTTOM_PADDING);
      ctx.stroke();

      // 격자 그리기
      const gridSteps = GRID_TEXT_DIV;
      for (let i = 0; i <= gridSteps; i++) {
        const y = TOP_PADDING + (chartHeight / gridSteps) * i;
        const value = maxValue - (maxValue / gridSteps) * i;

        ctx.beginPath();
        ctx.strokeStyle = gridColor;
        ctx.lineWidth = 1;
        ctx.moveTo(sidePadding, y);
        ctx.lineTo(width - sidePadding, y);
        ctx.stroke();

        // Y축 라벨
        ctx.fillStyle = gridTextColor;
        ctx.font = "12px Arial";
        ctx.textAlign = "right";
        ctx.fillText(Math.round(value).toString(), sidePadding - 10, y + 4);
      }

      // 바 그리기
      labels.forEach((label, labelIndex) => {
        const groupX =
          sidePadding + chartPadding + (groupWidth + spacing) * labelIndex;

        series.forEach((s, seriesIndex) => {
          const value = s.data[labelIndex];
          const barX = groupX + seriesIndex * (barWidth + barSpacing);
          const barHeight = (value / maxValue) * chartHeight * easedProgress;
          const barY = height - BOTTOM_PADDING - barHeight;

          // 바 그리기 (둥근 모서리)
          ctx.beginPath();
          const radius = 4;
          ctx.moveTo(barX + radius, barY);
          ctx.lineTo(barX + barWidth - radius, barY);
          ctx.quadraticCurveTo(
            barX + barWidth,
            barY,
            barX + barWidth,
            barY + radius
          );
          ctx.lineTo(barX + barWidth, barY + barHeight - radius);
          ctx.quadraticCurveTo(
            barX + barWidth,
            barY + barHeight,
            barX + barWidth - radius,
            barY + barHeight
          );
          ctx.lineTo(barX + radius, barY + barHeight);
          ctx.quadraticCurveTo(
            barX,
            barY + barHeight,
            barX,
            barY + barHeight - radius
          );
          ctx.lineTo(barX, barY + radius);
          ctx.quadraticCurveTo(barX, barY, barX + radius, barY);
          ctx.fillStyle = s.color;
          ctx.fill();
        });

        // X축 라벨
        ctx.fillStyle = labelTextColor;
        ctx.font = "12px Arial";
        ctx.textAlign = "center";
        ctx.fillText(
          label,
          groupX + groupWidth / 2,
          height - BOTTOM_PADDING + 20
        );
      });
    },
    [labels, series, config, easedProgress]
  );

  const { canvasRef, containerRef } = useResponsiveCanvas({
    height: config.height,
    onDraw: drawChart,
    dependencies: [labels, series, config, easedProgress, drawChart],
  });

  return { canvasRef, containerRef };
};
