import { RadarChartSeries, RadarChartConfig } from "../type";
import { useAnimation, useTooltip } from "../../common";
import { useCanvasRenderer } from "./useCanvasRenderer";
import { useMouseEvents } from "./useMouseEvents";

export const useRadarChart = (
  series: RadarChartSeries[],
  config: RadarChartConfig,
  tooltipTheme: "dark" | "white" = "dark"
) => {
  const { easedProgress } = useAnimation();
  const { tooltip, showTooltip, hideTooltip } = useTooltip(tooltipTheme);
  const { canvasRef, containerRef } = useCanvasRenderer(
    series,
    config,
    easedProgress
  );
  const { handleMouseMove, handleMouseLeave } = useMouseEvents(
    series,
    config,
    showTooltip,
    hideTooltip
  );

  return {
    canvasRef,
    containerRef,
    tooltip,
    handleMouseMove,
    handleMouseLeave,
  };
};
