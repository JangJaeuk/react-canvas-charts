import { useScatterChart } from "../hook/useScatterChart";
import { ScatterChartSeries, ScatterChartConfig, PointShape } from "../type";
import { Tooltip, TooltipTheme } from "../../tooltip";
import "../../chart.css";

interface ScatterChartProps {
  series: ScatterChartSeries[];
  className?: string;
  sidePadding?: number;
  chartPadding?: number;
  height?: number;
  axisColor?: string;
  gridColor?: string;
  labelTextColor?: string;
  gridTextColor?: string;
  pointRadius?: number;
  pointShape?: PointShape;
  showGrid?: boolean;
  showAxes?: boolean;
  xAxisLabel?: string;
  yAxisLabel?: string;
  tooltipTheme?: TooltipTheme;
}

export const ScatterChart = ({
  series,
  className = "",
  sidePadding = 40,
  chartPadding = 40,
  height = 400,
  axisColor = "#e5e7eb",
  gridColor = "#f3f4f6",
  labelTextColor = "#6b7280",
  gridTextColor = "#6b7280",
  pointRadius = 5,
  pointShape = "circle",
  showGrid = true,
  showAxes = true,
  xAxisLabel,
  yAxisLabel,
  tooltipTheme = "dark",
}: ScatterChartProps) => {
  const config: ScatterChartConfig = {
    sidePadding,
    chartPadding,
    height,
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
  };

  const {
    canvasRef,
    containerRef,
    tooltip,
    handleMouseMove,
    handleMouseLeave,
  } = useScatterChart(series, config, tooltipTheme);

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

