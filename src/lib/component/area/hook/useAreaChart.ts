import { AreaChartSeries, AreaChartConfig } from "../type";
import { useAnimation, useTooltip } from "../../common";
import { useCanvasRenderer } from "./useCanvasRenderer";
import { useMouseEvents } from "./useMouseEvents";

export const useAreaChart = (
  labels: string[],
  series: AreaChartSeries[],
  config: AreaChartConfig,
  tooltipTheme: "dark" | "white" = "dark"
) => {
  const { easedProgress } = useAnimation();
  const { tooltip, showTooltip, hideTooltip } = useTooltip(tooltipTheme);

  const { canvasRef, containerRef } = useCanvasRenderer(
    labels,
    series,
    config,
    easedProgress
  );

  const { handleMouseMove, handleMouseLeave } = useMouseEvents(
    labels,
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
