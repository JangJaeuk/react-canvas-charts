import React, { useEffect, useRef, useState } from "react";
import "./chart.css";
import Tooltip, { TooltipInfo, TooltipTheme } from "./Tooltip";

interface DataPoint {
  label: string;
  value: number;
  color: string;
}

interface BarChartProps {
  data: DataPoint[];
  className?: string;
  barWidth?: number;
  sidePadding?: number;
  chartPadding?: number;
  height?: number;
  axisColor?: string;
  gridColor?: string;
  labelTextColor?: string;
  gridTextColor?: string;
  tooltipTheme?: TooltipTheme;
}

const TOP_PADDING = 30 as const;
const BOTTOM_PADDING = 40 as const;
const GRID_TEXT_DIV = 10 as const;

const BarChart: React.FC<BarChartProps> = ({
  data,
  className = "",
  barWidth = 60,
  sidePadding = 40,
  chartPadding = 40,
  height = 300,
  axisColor = "#e5e7eb",
  gridColor = "#f3f4f6",
  labelTextColor = "#6b7280",
  gridTextColor = "#6b7280",
  tooltipTheme = "dark",
}) => {
  const animationRef = useRef<number>();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [tooltip, setTooltip] = useState<TooltipInfo>({
    show: false,
    x: 0,
    y: 0,
    content: "",
    theme: tooltipTheme,
  });
  const [animationProgress, setAnimationProgress] = useState(0);

  useEffect(() => {
    requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

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
  }, [data, height, barWidth, chartPadding, sidePadding, animationProgress]);

  const animate = (timestamp: number) => {
    if (!animationRef.current) {
      animationRef.current = timestamp;
    }

    // 1초 동안 애니메이션
    const progress = Math.min((timestamp - animationRef.current) / 1000, 1);
    setAnimationProgress(progress);

    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  };

  const drawChart = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
  ) => {
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

    const easeOutCubic = (x: number): number => {
      return 1 - Math.pow(1 - x, 3);
    };
    const easedProgress = easeOutCubic(animationProgress);

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
      ctx.fillText(item.label, x + barWidth / 2, height - BOTTOM_PADDING + 24);
    });
  };

  // 마우스 호버시 바에 호버하는 경우 툴팁 띄우기
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

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
        setTooltip({
          show: true,
          x: barX + barWidth / 2,
          y: barY,
          content: `${item.label}: ${item.value}`,
          theme: tooltipTheme,
        });
        tooltipShown = true;
      }
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
      <Tooltip tooltip={tooltip} />
    </div>
  );
};

export default BarChart;
