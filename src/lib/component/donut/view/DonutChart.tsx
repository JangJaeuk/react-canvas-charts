import { useDonutChart } from "../hook/useDonutChart";
import { DonutChartDataPoint, DonutChartConfig } from "../type";
import { Tooltip, TooltipTheme } from "../../tooltip";
import "../../chart.css";

interface DonutChartProps {
  data: DonutChartDataPoint[];
  className?: string;
  radius?: number;
  innerRadius?: number;
  sidePadding?: number;
  chartPadding?: number;
  height?: number;
  showLabels?: boolean;
  labelTextColor?: string;
  strokeWidth?: number;
  strokeColor?: string;
  sliceGap?: number;
  centerText?: string;
  centerTextColor?: string;
  centerTextSize?: number;
  tooltipTheme?: TooltipTheme;
}

export const DonutChart = ({
  data,
  className = "",
  radius = 100,
  innerRadius = 50,
  sidePadding = 40,
  chartPadding = 40,
  height = 300,
  showLabels = true,
  labelTextColor = "#6b7280",
  strokeWidth = 2,
  strokeColor = "#ffffff",
  sliceGap = 0,
  centerText,
  centerTextColor = "#374151",
  centerTextSize = 24,
  tooltipTheme = "dark",
}: DonutChartProps) => {
  const config: DonutChartConfig = {
    radius,
    innerRadius,
    sidePadding,
    chartPadding,
    height,
    showLabels,
    labelTextColor,
    strokeWidth,
    strokeColor,
    sliceGap,
    centerText,
    centerTextColor,
    centerTextSize,
  };

  const {
    canvasRef,
    containerRef,
    tooltip,
    handleMouseMove,
    handleMouseLeave,
  } = useDonutChart(data, config, tooltipTheme);

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
