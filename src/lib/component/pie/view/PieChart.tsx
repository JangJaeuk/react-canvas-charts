import { usePieChart } from "../hook/usePieChart";
import { PieChartDataPoint, PieChartConfig } from "../type";
import { Tooltip, TooltipTheme } from "../../tooltip";
import "../../chart.css";

interface PieChartProps {
  data: PieChartDataPoint[];
  className?: string;
  radius?: number;
  sidePadding?: number;
  chartPadding?: number;
  height?: number;
  showLabels?: boolean;
  labelTextColor?: string;
  strokeWidth?: number;
  strokeColor?: string;
  tooltipTheme?: TooltipTheme;
}

export const PieChart = ({
  data,
  className = "",
  radius = 100,
  sidePadding = 40,
  chartPadding = 40,
  height = 300,
  showLabels = true,
  labelTextColor = "#6b7280",
  strokeWidth = 2,
  strokeColor = "#ffffff",
  tooltipTheme = "dark",
}: PieChartProps) => {
  const config: PieChartConfig = {
    radius,
    sidePadding,
    chartPadding,
    height,
    showLabels,
    labelTextColor,
    strokeWidth,
    strokeColor,
  };

  const {
    canvasRef,
    containerRef,
    tooltip,
    handleMouseMove,
    handleMouseLeave,
  } = usePieChart(data, config, tooltipTheme);

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
