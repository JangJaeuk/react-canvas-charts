import React, { useEffect, useRef, useState } from "react";
import "./chart.css";

// 데이터 그룹
interface DataSeries {
  name: string;
  color: string;
  data: number[];
}

interface MultiSeriesBarChartProps {
  labels: string[];
  series: DataSeries[];
  className?: string;
  barWidth?: number;
  sidePadding?: number;
  chartPadding?: number;
  height?: number;
  axisColor?: string;
  gridColor?: string;
  labelTextColor?: string;
  gridTextColor?: string;
  tooltipTheme?: "dark" | "white";
}

interface Tooltip {
  show: boolean;
  x: number;
  y: number;
  content: string;
}

const TOP_PADDING = 40 as const;
const BOTTOM_PADDING = 60 as const;
const GRID_TEXT_DIV = 10 as const;

const MultiSeriesBarChart: React.FC<MultiSeriesBarChartProps> = ({
  labels,
  series,
  className = "",
  barWidth = 30,
  sidePadding = 40,
  chartPadding = 40,
  height = 300,
  axisColor = "#e5e7eb",
  gridColor = "#f3f4f6",
  labelTextColor = "#6b7280",
  gridTextColor = "#6b7280",
  tooltipTheme = "dark",
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [tooltip, setTooltip] = useState<Tooltip>({
    show: false,
    x: 0,
    y: 0,
    content: "",
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const handleResize = () => {
      const { width } = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;

      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      canvas.width = width * dpr;
      canvas.height = height * dpr;

      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.scale(dpr, dpr);
        drawChart(ctx, width, height);
      }
    };

    // 리사이즈
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    return () => resizeObserver.disconnect();
  }, [labels, series, height, barWidth, sidePadding, chartPadding]);

  const drawChart = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
  ) => {
    ctx.clearRect(0, 0, width, height);

    const chartWidth = width - sidePadding * 2;
    const chartHeight = height - (TOP_PADDING + BOTTOM_PADDING);

    const maxValue = Math.max(...series.flatMap((s) => s.data));

    const groupWidth = barWidth * series.length;
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
        const x = groupX + barWidth * serieIndex;
        const barHeight = (value / maxValue) * chartHeight;
        const y = height - BOTTOM_PADDING - barHeight;

        ctx.beginPath();
        const radius = 4;
        ctx.moveTo(x, y + radius);
        ctx.lineTo(x, y + barHeight);
        ctx.lineTo(x + barWidth, y + barHeight);
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
        height - BOTTOM_PADDING + 24,
      );
    });

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

  // 마우스 호버시 바에 호버하는 경우 툴팁 띄우기
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const groupWidth = barWidth * series.length;
    const chartWidth = rect.width - sidePadding * 2;
    const availableWidth = chartWidth - chartPadding * 2;
    const spacing =
      (availableWidth - groupWidth * labels.length) / (labels.length - 1);

    let tooltipShown = false;

    labels.forEach((label, groupIndex) => {
      const groupX =
        sidePadding + chartPadding + (groupWidth + spacing) * groupIndex;

      series.forEach((serie, serieIndex) => {
        const barX = groupX + barWidth * serieIndex;
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
          setTooltip({
            show: true,
            x: barX + barWidth / 2,
            y: barY,
            content: `${serie.name} - ${label}: ${value}`,
          });
          tooltipShown = true;
        }
      });
    });

    if (!tooltipShown) {
      setTooltip((prev) => ({ ...prev, show: false }));
    }
  };

  const handleMouseLeave = () => {
    setTooltip((prev) => ({ ...prev, show: false }));
  };

  return (
    <div ref={containerRef} className={`chart-container ${className}`}>
      <canvas
        ref={canvasRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="chart-canvas"
      />
      {tooltip.show && (
        <div
          className="chart-tooltip"
          style={
            {
              left: `${tooltip.x}px`,
              top: `${tooltip.y}px`,
              "--tooltip-bg-color":
                tooltipTheme === "white" ? "white" : "black",
              "--tooltip-text-color":
                tooltipTheme === "white" ? "black" : "white",
            } as React.CSSProperties
          }
        >
          {tooltip.content}
        </div>
      )}
    </div>
  );
};

export default MultiSeriesBarChart;
