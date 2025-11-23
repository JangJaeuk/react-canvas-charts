import { DonutChartDataPoint, DonutChartConfig } from "../type";
import { useAnimation, useTooltip } from "../../common";
import { useCanvasRenderer } from "./useCanvasRenderer";
import { useMouseEvents } from "./useMouseEvents";

export const useDonutChart = (
  data: DonutChartDataPoint[],
  config: DonutChartConfig,
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

