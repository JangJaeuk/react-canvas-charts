import { useCallback } from "react";
import {
  AreaChartSeries,
  AreaChartConfig,
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
  series: AreaChartSeries[],
  config: AreaChartConfig,
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
        areaOpacity,
        showPoints,
        showLines,
      } = config;

      ctx.clearRect(0, 0, width, height);

      const chartWidth = width - sidePadding * 2;
      const chartHeight = height - (TOP_PADDING + BOTTOM_PADDING);

      // 최대값 계산 (모든 시리즈의 누적 합계)
      const maxValue = Math.max(
        ...labels.map((_, labelIndex) =>
          series.reduce((sum, s) => sum + s.data[labelIndex], 0)
        )
      );

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

      // 스택형 영역 그리기 (뒤에서부터 그려서 앞의 시리즈가 위에 오도록)
      for (
        let seriesIndex = series.length - 1;
        seriesIndex >= 0;
        seriesIndex--
      ) {
        const currentSeries = series[seriesIndex];

        // 현재 시리즈까지의 누적값 계산
        const cumulativeValues = labels.map((_, labelIndex) => {
          let cumulative = 0;
          for (let i = 0; i <= seriesIndex; i++) {
            cumulative += series[i].data[labelIndex];
          }
          return cumulative;
        });

        // 이전 시리즈까지의 누적값 계산 (영역의 하단 경계)
        const previousCumulativeValues = labels.map((_, labelIndex) => {
          let cumulative = 0;
          for (let i = 0; i < seriesIndex; i++) {
            cumulative += series[i].data[labelIndex];
          }
          return cumulative;
        });

        // 영역 그리기
        ctx.beginPath();
        ctx.fillStyle = currentSeries.color;
        ctx.globalAlpha = areaOpacity;

        // 첫 번째 점에서 시작 (이전 누적값)
        const firstX = sidePadding + chartPadding;
        const firstY =
          height -
          BOTTOM_PADDING -
          (previousCumulativeValues[0] / maxValue) *
            chartHeight *
            easedProgress;
        ctx.moveTo(firstX, firstY);

        // 현재 시리즈의 상단 경계 그리기
        labels.forEach((_, labelIndex) => {
          const x = sidePadding + chartPadding + pointSpacing * labelIndex;
          const y =
            height -
            BOTTOM_PADDING -
            (cumulativeValues[labelIndex] / maxValue) *
              chartHeight *
              easedProgress;
          ctx.lineTo(x, y);
        });

        // 마지막 점에서 이전 누적값으로 연결
        const lastX =
          sidePadding + chartPadding + pointSpacing * (labels.length - 1);
        const lastY =
          height -
          BOTTOM_PADDING -
          (previousCumulativeValues[labels.length - 1] / maxValue) *
            chartHeight *
            easedProgress;
        ctx.lineTo(lastX, lastY);

        // 이전 누적값을 따라 뒤로 그리기
        for (
          let labelIndex = labels.length - 1;
          labelIndex >= 0;
          labelIndex--
        ) {
          const x = sidePadding + chartPadding + pointSpacing * labelIndex;
          const y =
            height -
            BOTTOM_PADDING -
            (previousCumulativeValues[labelIndex] / maxValue) *
              chartHeight *
              easedProgress;
          ctx.lineTo(x, y);
        }

        ctx.closePath();
        ctx.fill();

        // 라인 그리기 (상단 경계)
        if (showLines) {
          ctx.beginPath();
          ctx.strokeStyle = currentSeries.color;
          ctx.lineWidth = lineWidth;
          ctx.lineJoin = "round";
          ctx.lineCap = "round";
          ctx.globalAlpha = 1;

          labels.forEach((_, labelIndex) => {
            const x = sidePadding + chartPadding + pointSpacing * labelIndex;
            const y =
              height -
              BOTTOM_PADDING -
              (cumulativeValues[labelIndex] / maxValue) *
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

        // 포인트 그리기 (상단 경계)
        if (showPoints) {
          ctx.fillStyle = currentSeries.color;
          ctx.globalAlpha = 1;

          labels.forEach((_, labelIndex) => {
            const x = sidePadding + chartPadding + pointSpacing * labelIndex;
            const y =
              height -
              BOTTOM_PADDING -
              (cumulativeValues[labelIndex] / maxValue) *
                chartHeight *
                easedProgress;

            drawPoint(ctx, x, y, pointRadius, pointShape);
          });
        }
      }

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
