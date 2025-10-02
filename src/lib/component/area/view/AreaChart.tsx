import { useAreaChart } from "../hook/useAreaChart";
import { AreaChartSeries, AreaChartConfig, PointShape } from "../type";
import { Tooltip, TooltipTheme } from "../../tooltip";
import "../../chart.css";

interface AreaChartProps {
  labels: string[];
  series: AreaChartSeries[];
  className?: string;
  sidePadding?: number;
  chartPadding?: number;
  height?: number;
  axisColor?: string;
  gridColor?: string;
  labelTextColor?: string;
  gridTextColor?: string;
  lineColor?: string;
  lineWidth?: number;
  pointRadius?: number;
  pointColor?: string;
  pointShape?: PointShape;
  areaOpacity?: number;
  showPoints?: boolean;
  showLines?: boolean;
  tooltipTheme?: TooltipTheme;
}

const AreaChart = ({
  labels,
  series,
  className = "",
  sidePadding = 40,
  chartPadding = 40,
  height = 300,
  axisColor = "#e5e7eb",
  gridColor = "#f3f4f6",
  labelTextColor = "#6b7280",
  gridTextColor = "#6b7280",
  lineColor = "#3b82f6",
  lineWidth = 2,
  pointRadius = 4,
  pointColor = "#3b82f6",
  pointShape = "circle",
  areaOpacity = 0.3,
  showPoints = true,
  showLines = true,
  tooltipTheme = "dark",
}: AreaChartProps) => {
  const config: AreaChartConfig = {
    sidePadding,
    chartPadding,
    height,
    axisColor,
    gridColor,
    labelTextColor,
    gridTextColor,
    lineColor,
    lineWidth,
    pointRadius,
    pointColor,
    pointShape,
    areaOpacity,
    showPoints,
    showLines,
  };

  const {
    canvasRef,
    containerRef,
    tooltip,
    handleMouseMove,
    handleMouseLeave,
  } = useAreaChart(labels, series, config, tooltipTheme);

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

export { AreaChart };
