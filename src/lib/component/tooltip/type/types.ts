export type TooltipTheme = "white" | "dark";

export interface TooltipInfo {
  show: boolean;
  x: number;
  y: number;
  content: string;
  theme: TooltipTheme;
}
