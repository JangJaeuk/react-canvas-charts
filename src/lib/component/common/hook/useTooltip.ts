import { useState } from "react";
import { TooltipInfo } from "../../tooltip";

export const useTooltip = (theme: "dark" | "white" = "dark") => {
  const [tooltip, setTooltip] = useState<TooltipInfo>({
    show: false,
    x: 0,
    y: 0,
    content: "",
    theme,
  });

  const showTooltip = (x: number, y: number, content: string) => {
    setTooltip({
      show: true,
      x,
      y,
      content,
      theme,
    });
  };

  const hideTooltip = () => {
    setTooltip((prev: TooltipInfo) => ({ ...prev, show: false }));
  };

  return {
    tooltip,
    showTooltip,
    hideTooltip,
  };
};
