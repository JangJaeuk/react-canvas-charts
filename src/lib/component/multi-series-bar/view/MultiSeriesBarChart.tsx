import { useMultiSeriesBarChart } from "../hook/useMultiSeriesBarChart";
import { BarChartSeries, MultiSeriesBarChartConfig } from "../type";
import { Tooltip, TooltipTheme } from "../../tooltip";
import "../../chart.css";

interface MultiSeriesBarChartProps {
  labels: string[];
  series: BarChartSeries[];
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
  barSpacing?: number;
}

export const MultiSeriesBarChart = ({
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
  barSpacing = 4,
}: MultiSeriesBarChartProps) => {
  const config: MultiSeriesBarChartConfig = {
    barWidth,
    sidePadding,
    chartPadding,
    height,
    axisColor,
    gridColor,
    labelTextColor,
    gridTextColor,
    barSpacing,
  };

  const {
    canvasRef,
    containerRef,
    tooltip,
    handleMouseMove,
    handleMouseLeave,
  } = useMultiSeriesBarChart(labels, series, config, tooltipTheme);

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
