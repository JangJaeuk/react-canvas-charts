import { useCallback } from "react";
import {
  LineChartSeries,
  LineChartConfig,
  PointShape,
  TOP_PADDING,
  BOTTOM_PADDING,
  GRID_TEXT_DIV,
} from "../type";
import { useResponsiveCanvas } from "../../common";

// 포인트 모양별 그리기 함수들
const drawCircle = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number
) => {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fill();
};

const drawTriangle = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number
) => {
  const height = radius * Math.sqrt(3);
  ctx.beginPath();
  ctx.moveTo(x, y - height * 0.6);
  ctx.lineTo(x - radius, y + height * 0.4);
  ctx.lineTo(x + radius, y + height * 0.4);
  ctx.closePath();
  ctx.fill();
};

const drawSquare = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number
) => {
  const size = radius * 1.4;
  ctx.beginPath();
  ctx.rect(x - size / 2, y - size / 2, size, size);
  ctx.fill();
};

const drawPoint = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  shape: PointShape
) => {
  switch (shape) {
    case "circle":
      drawCircle(ctx, x, y, radius);
      break;
    case "triangle":
      drawTriangle(ctx, x, y, radius);
      break;
    case "square":
      drawSquare(ctx, x, y, radius);
      break;
  }
};

export const useCanvasRenderer = (
  labels: string[],
  series: LineChartSeries[],
  config: LineChartConfig,
  easedProgress: number
) => {
  const drawChart = useCallback(
    (ctx: CanvasRenderingContext2D, width: number, height: number) => {
      const {
        sidePadding,
        chartPadding,
        axisColor,
        gridColor,
        labelTextColor,
        gridTextColor,
        lineWidth,
        pointRadius,
        pointShape,
        showPoints,
        showLines,
      } = config;

      ctx.clearRect(0, 0, width, height);

      const chartWidth = width - sidePadding * 2;
      const chartHeight = height - (TOP_PADDING + BOTTOM_PADDING);

      // 최대값 계산 (모든 시리즈의 최대값)
      const maxValue = Math.max(...series.flatMap((s) => s.data));

      const availableWidth = chartWidth - chartPadding * 2;
      const pointSpacing = availableWidth / (labels.length - 1);

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

      // 각 시리즈별로 라인과 포인트 그리기
      series.forEach((currentSeries) => {
        // 라인 그리기
        if (showLines && labels.length > 1) {
          ctx.beginPath();
          ctx.strokeStyle = currentSeries.color;
          ctx.lineWidth = lineWidth;
          ctx.lineJoin = "round";
          ctx.lineCap = "round";

          labels.forEach((_, labelIndex) => {
            const x = sidePadding + chartPadding + pointSpacing * labelIndex;
            const y =
              height -
              BOTTOM_PADDING -
              (currentSeries.data[labelIndex] / maxValue) *
                chartHeight *
                easedProgress;

            if (labelIndex === 0) {
              ctx.moveTo(x, y);
            } else {
              ctx.lineTo(x, y);
            }
          });
          ctx.stroke();
        }

        // 포인트 그리기
        if (showPoints) {
          ctx.fillStyle = currentSeries.color;

          labels.forEach((_, labelIndex) => {
            const x = sidePadding + chartPadding + pointSpacing * labelIndex;
            const y =
              height -
              BOTTOM_PADDING -
              (currentSeries.data[labelIndex] / maxValue) *
                chartHeight *
                easedProgress;

            drawPoint(ctx, x, y, pointRadius, pointShape);
          });
        }
      });

      // X축 라벨 그리기
      labels.forEach((label, index) => {
        const x = sidePadding + chartPadding + pointSpacing * index;
        ctx.fillStyle = labelTextColor;
        ctx.font = "12px Arial";
        ctx.textAlign = "center";
        ctx.fillText(label, x, height - BOTTOM_PADDING + 20);
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
