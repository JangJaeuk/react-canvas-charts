import { LineChartDataPoint, LineChartConfig } from "../type";
import { useAnimation, useTooltip } from "../../common";
import { useCanvasRenderer } from "./useCanvasRenderer";
import { useMouseEvents } from "./useMouseEvents";

export const useLineChart = (
  data: LineChartDataPoint[],
  config: LineChartConfig,
  tooltipTheme: "dark" | "white" = "dark"
) => {
  const { easedProgress } = useAnimation();
  const { tooltip, showTooltip, hideTooltip } = useTooltip(tooltipTheme);

  const { canvasRef, containerRef } = useCanvasRenderer(
    data,
    config,
    easedProgress
  );

  const { handleMouseMove, handleMouseLeave } = useMouseEvents(
    data,
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
