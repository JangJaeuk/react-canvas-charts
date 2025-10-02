import { useLineChart } from "../hook/useLineChart";
import { LineChartSeries, LineChartConfig, PointShape } from "../type";
import { Tooltip, TooltipTheme } from "../../tooltip";
import "../../chart.css";

interface LineChartProps {
  labels: string[];
  series: LineChartSeries[];
  className?: string;
  sidePadding?: number;
  chartPadding?: number;
  height?: number;
  axisColor?: string;
  gridColor?: string;
  labelTextColor?: string;
  gridTextColor?: string;
  lineWidth?: number;
  pointRadius?: number;
  pointShape?: PointShape;
  showPoints?: boolean;
  showLines?: boolean;
  tooltipTheme?: TooltipTheme;
}

const LineChart = ({
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
  lineWidth = 2,
  pointRadius = 4,
  pointShape = "circle",
  showPoints = true,
  showLines = true,
  tooltipTheme = "dark",
}: LineChartProps) => {
  const config: LineChartConfig = {
    sidePadding,
    chartPadding,
    height,
    axisColor,
    gridColor,
    labelTextColor,
    gridTextColor,
    lineWidth,
    pointRadius,
    pointShape,
    showPoints,
    showLines,
  };

  const {
    canvasRef,
    containerRef,
    tooltip,
    handleMouseMove,
    handleMouseLeave,
  } = useLineChart(labels, series, config, tooltipTheme);

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

export { LineChart };
