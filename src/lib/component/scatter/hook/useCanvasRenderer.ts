import { useCallback } from "react";
import {
  ScatterChartSeries,
  ScatterChartConfig,
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
  series: ScatterChartSeries[],
  config: ScatterChartConfig,
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
        pointRadius,
        pointShape,
        showGrid,
        showAxes,
        xAxisLabel,
        yAxisLabel,
      } = config;

      ctx.clearRect(0, 0, width, height);

      const chartWidth = width - sidePadding * 2;
      const chartHeight = height - (TOP_PADDING + BOTTOM_PADDING);

      // 모든 데이터 포인트 수집
      const allPoints = series.flatMap((s) => s.data);

      // X, Y 범위 계산
      const xValues = allPoints.map((p) => p.x);
      const yValues = allPoints.map((p) => p.y);
      const minX = Math.min(...xValues);
      const maxX = Math.max(...xValues);
      const minY = Math.min(...yValues);
      const maxY = Math.max(...yValues);

      // 범위에 여유 공간 추가 (10%)
      const xRange = maxX - minX || 1;
      const yRange = maxY - minY || 1;
      const xPadding = xRange * 0.1;
      const yPadding = yRange * 0.1;
      const adjustedMinX = minX - xPadding;
      const adjustedMaxX = maxX + xPadding;
      const adjustedMinY = minY - yPadding;
      const adjustedMaxY = maxY + yPadding;
      const adjustedXRange = adjustedMaxX - adjustedMinX;
      const adjustedYRange = adjustedMaxY - adjustedMinY;

      const availableWidth = chartWidth - chartPadding * 2;
      const availableHeight = chartHeight - chartPadding * 2;

      // 축 그리기
      if (showAxes) {
        ctx.beginPath();
        ctx.strokeStyle = axisColor;
        ctx.lineWidth = 1;
        ctx.moveTo(sidePadding, TOP_PADDING);
        ctx.lineTo(sidePadding, height - BOTTOM_PADDING);
        ctx.lineTo(width - sidePadding, height - BOTTOM_PADDING);
        ctx.stroke();
      }

      // 격자 그리기
      if (showGrid) {
        const gridSteps = GRID_TEXT_DIV;

        // 수평 격자 (Y축)
        for (let i = 0; i <= gridSteps; i++) {
          const y =
            TOP_PADDING + chartPadding + (availableHeight / gridSteps) * i;
          const value = adjustedMaxY - (adjustedYRange / gridSteps) * i;

          ctx.beginPath();
          ctx.strokeStyle = gridColor;
          ctx.lineWidth = 1;
          ctx.moveTo(sidePadding, y);
          ctx.lineTo(width - sidePadding, y);
          ctx.stroke();

          // Y축 라벨
          ctx.fillStyle = gridTextColor;
          ctx.font = "12px Inter, sans-serif";
          ctx.textAlign = "right";
          ctx.fillText(
            value.toFixed(adjustedYRange < 10 ? 1 : 0),
            sidePadding - 10,
            y + 4
          );
        }

        // 수직 격자 (X축)
        for (let i = 0; i <= gridSteps; i++) {
          const x =
            sidePadding + chartPadding + (availableWidth / gridSteps) * i;
          const value = adjustedMinX + (adjustedXRange / gridSteps) * i;

          ctx.beginPath();
          ctx.strokeStyle = gridColor;
          ctx.lineWidth = 1;
          ctx.moveTo(x, TOP_PADDING);
          ctx.lineTo(x, height - BOTTOM_PADDING);
          ctx.stroke();

          // X축 라벨
          ctx.fillStyle = gridTextColor;
          ctx.font = "12px Inter, sans-serif";
          ctx.textAlign = "center";
          ctx.fillText(
            value.toFixed(adjustedXRange < 10 ? 1 : 0),
            x,
            height - BOTTOM_PADDING + 20
          );
        }
      }

      // 각 시리즈별로 포인트 그리기
      series.forEach((currentSeries) => {
        ctx.fillStyle = currentSeries.color;

        currentSeries.data.forEach((point) => {
          // 좌표 변환
          const x =
            sidePadding +
            chartPadding +
            ((point.x - adjustedMinX) / adjustedXRange) * availableWidth;
          const y =
            TOP_PADDING +
            chartPadding +
            availableHeight -
            ((point.y - adjustedMinY) / adjustedYRange) * availableHeight;

          // 포인트 크기 결정 (point.size가 있으면 사용, 없으면 기본값)
          const radius = (point.size || pointRadius) * easedProgress;

          // 포인트에 개별 색상이 있으면 적용, 없으면 시리즈 색상 사용
          const originalFillStyle = ctx.fillStyle;
          ctx.fillStyle = point.color || currentSeries.color;

          // 포인트 그리기
          drawPoint(ctx, x, y, radius, pointShape);

          ctx.fillStyle = originalFillStyle;
        });
      });

      // 축 라벨 그리기
      if (xAxisLabel) {
        ctx.fillStyle = labelTextColor;
        ctx.font = "14px Inter, sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(xAxisLabel, width / 2, height - 10);
      }

      if (yAxisLabel) {
        ctx.fillStyle = labelTextColor;
        ctx.font = "14px Inter, sans-serif";
        ctx.textAlign = "center";
        ctx.save();
        ctx.translate(15, height / 2);
        ctx.rotate(-Math.PI / 2);
        ctx.fillText(yAxisLabel, 0, 0);
        ctx.restore();
      }
    },
    [series, config, easedProgress]
  );

  const { canvasRef, containerRef } = useResponsiveCanvas({
    height: config.height,
    onDraw: drawChart,
    dependencies: [series, config, easedProgress],
  });

  return { canvasRef, containerRef };
};
