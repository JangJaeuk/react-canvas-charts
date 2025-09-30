import { TooltipInfo } from "../type/types";
import "../../chart.css";

interface TooltipProps {
  tooltip: TooltipInfo;
}

export const Tooltip = ({ tooltip }: TooltipProps) => {
  if (!tooltip.show) return null;

  return (
    <div
      className="chart-tooltip"
      style={
        {
          left: `${tooltip.x}px`,
          top: `${tooltip.y}px`,
          "--tooltip-bg-color": tooltip.theme === "white" ? "white" : "black",
          "--tooltip-text-color": tooltip.theme === "white" ? "black" : "white",
        } as React.CSSProperties
      }
    >
      {tooltip.content}
    </div>
  );
};
