import React from "react";
import "./chart.css";

export type TooltipTheme = "white" | "dark";

export interface TooltipInfo {
  show: boolean;
  x: number;
  y: number;
  content: string;
  theme: TooltipTheme;
}

interface TooltipProps {
  tooltip: TooltipInfo;
}

const Tooltip: React.FC<TooltipProps> = ({ tooltip }) => {
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

export default Tooltip;
