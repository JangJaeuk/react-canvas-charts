import { useLineChart } from "../hook/useLineChart";
import { LineChartDataPoint, LineChartConfig, PointShape } from "../type";
import { Tooltip, TooltipTheme } from "../../tooltip";
import "../../chart.css";

interface LineChartProps {
  data: LineChartDataPoint[];
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
  tooltipTheme?: TooltipTheme;
}

const LineChart = ({
  data,
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
    lineColor,
    lineWidth,
    pointRadius,
    pointColor,
    pointShape,
  };

  const {
    canvasRef,
    containerRef,
    tooltip,
    handleMouseMove,
    handleMouseLeave,
  } = useLineChart(data, config, tooltipTheme);

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
