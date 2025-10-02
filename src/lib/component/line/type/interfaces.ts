import { PointShape } from "./types";

export interface LineChartConfig {
  sidePadding: number;
  chartPadding: number;
  height: number;
  axisColor: string;
  gridColor: string;
  labelTextColor: string;
  gridTextColor: string;
  lineWidth: number;
  pointRadius: number;
  pointShape: PointShape;
  showPoints: boolean;
  showLines: boolean;
}
