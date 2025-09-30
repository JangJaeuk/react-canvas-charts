import { useEffect, useRef, useCallback } from "react";
import {
  LineChartDataPoint,
  LineChartConfig,
  PointShape,
  TOP_PADDING,
  BOTTOM_PADDING,
  GRID_TEXT_DIV,
} from "../type";

// 포인트 모양별 그리기 함수들 (컴포넌트 외부로 이동)
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
  const size = radius * 1.4; // 원과 비슷한 크기로 조정
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
  data: LineChartDataPoint[],
  config: LineChartConfig,
  easedProgress: number
) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const drawChart = useCallback(
    (ctx: CanvasRenderingContext2D, width: number, height: number) => {
      const {
        sidePadding,
        chartPadding,
        axisColor,
        gridColor,
        labelTextColor,
        gridTextColor,
        lineColor,
        lineWidth,
        pointRadius,
        pointColor,
        pointShape,
      } = config;

      ctx.clearRect(0, 0, width, height);

      const chartWidth = width - sidePadding * 2;
      const chartHeight = height - (TOP_PADDING + BOTTOM_PADDING);
      const maxValue = Math.max(...data.map((d) => d.value));

      const availableWidth = chartWidth - chartPadding * 2;
      const pointSpacing = availableWidth / (data.length - 1);

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

      // 라인 그리기
      if (data.length > 1) {
        ctx.beginPath();
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = lineWidth;
        ctx.lineJoin = "round";
        ctx.lineCap = "round";

        data.forEach((point, index) => {
          const x = sidePadding + chartPadding + pointSpacing * index;
          const y =
            height -
            BOTTOM_PADDING -
            (point.value / maxValue) * chartHeight * easedProgress;

          if (index === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        });
        ctx.stroke();
      }

      // 포인트 그리기
      data.forEach((point, index) => {
        const x = sidePadding + chartPadding + pointSpacing * index;
        const y =
          height -
          BOTTOM_PADDING -
          (point.value / maxValue) * chartHeight * easedProgress;

        // 포인트 모양별 그리기
        ctx.fillStyle = pointColor;
        drawPoint(ctx, x, y, pointRadius, pointShape);

        // X축 라벨
        ctx.fillStyle = labelTextColor;
        ctx.font = "12px Arial";
        ctx.textAlign = "center";
        ctx.fillText(point.label, x, height - BOTTOM_PADDING + 20);
      });
    },
    [data, config, easedProgress]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      const rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;

      canvas.width = rect.width * dpr;
      canvas.height = config.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${config.height}px`;

      ctx.scale(dpr, dpr);
      drawChart(ctx, rect.width, config.height);
    };

    resizeCanvas();

    const resizeObserver = new ResizeObserver(resizeCanvas);
    resizeObserver.observe(container);

    return () => resizeObserver.disconnect();
  }, [data, config, easedProgress, drawChart]);

  return { canvasRef, containerRef };
};
