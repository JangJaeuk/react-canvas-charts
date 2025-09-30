import { useEffect, useRef } from "react";
import {
  BarChartSeries,
  MultiSeriesBarChartConfig,
  TOP_PADDING,
  BOTTOM_PADDING,
  GRID_TEXT_DIV,
} from "../type";

export const useCanvasRenderer = (
  labels: string[],
  series: BarChartSeries[],
  config: MultiSeriesBarChartConfig,
  easedProgress: number
) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const drawChart = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number
  ) => {
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

    // 바 및 범례 그리기
    labels.forEach((label, groupIndex) => {
      const groupX =
        sidePadding + chartPadding + (groupWidth + spacing) * groupIndex;

      series.forEach((serie, serieIndex) => {
        const value = serie.data[groupIndex];
        const x = groupX + (barWidth + barSpacing) * serieIndex;
        const barHeight = (value / maxValue) * chartHeight;
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
        ctx.fillStyle = serie.color;
        ctx.fill();
      });

      ctx.fillStyle = labelTextColor;
      ctx.font = "12px Inter, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(
        label,
        groupX + groupWidth / 2,
        height - BOTTOM_PADDING + 24
      );
    });

    // 범례 그리기
    const legendY = height - 25;
    const legendItemWidth = 100;
    const legendStartX = (width - series.length * legendItemWidth) / 2;

    series.forEach((serie, index) => {
      const x = legendStartX + index * legendItemWidth;

      ctx.fillStyle = serie.color;
      ctx.fillRect(x, legendY, 12, 12);

      ctx.fillStyle = labelTextColor;
      ctx.font = "12px Inter, sans-serif";
      ctx.textAlign = "left";
      ctx.fillText(serie.name, x + 20, legendY + 10);
    });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const handleResize = () => {
      const { width } = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;

      canvas.style.width = `${width}px`;
      canvas.style.height = `${config.height}px`;
      canvas.width = width * dpr;
      canvas.height = config.height * dpr;

      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.scale(dpr, dpr);
        drawChart(ctx, width, config.height);
      }
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    return () => resizeObserver.disconnect();
  }, [labels, series, config, easedProgress]);

  return {
    canvasRef,
    containerRef,
  };
};
