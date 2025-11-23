import { useRadarChart } from "../hook/useRadarChart";
import { RadarChartSeries, RadarChartConfig } from "../type";
import { Tooltip, TooltipTheme } from "../../tooltip";
import "../../chart.css";

interface RadarChartProps {
  series: RadarChartSeries[];
  className?: string;
  radius?: number;
  sidePadding?: number;
  height?: number;
  axisColor?: string;
  gridColor?: string;
  labelTextColor?: string;
  gridTextColor?: string;
  lineWidth?: number;
  pointRadius?: number;
  showGrid?: boolean;
  showAxes?: boolean;
  gridLevels?: number;
  maxValue?: number;
  tooltipTheme?: TooltipTheme;
}

export const RadarChart = ({
  series,
  className = "",
  radius = 100,
  sidePadding = 60,
  height = 400,
  axisColor = "#e5e7eb",
  gridColor = "#f3f4f6",
  labelTextColor = "#6b7280",
  gridTextColor = "#6b7280",
  lineWidth = 2,
  pointRadius = 4,
  showGrid = true,
  showAxes = true,
  gridLevels = 5,
  maxValue,
  tooltipTheme = "dark",
}: RadarChartProps) => {
  const config: RadarChartConfig = {
    radius,
    sidePadding,
    height,
    axisColor,
    gridColor,
    labelTextColor,
    gridTextColor,
    lineWidth,
    pointRadius,
    showGrid,
    showAxes,
    gridLevels,
    maxValue,
  };

  const {
    canvasRef,
    containerRef,
    tooltip,
    handleMouseMove,
    handleMouseLeave,
  } = useRadarChart(series, config, tooltipTheme);

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

