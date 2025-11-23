import { PointShape } from "./types";

export interface ScatterChartConfig {
  sidePadding: number;
  chartPadding: number;
  height: number;
  axisColor: string;
  gridColor: string;
  labelTextColor: string;
  gridTextColor: string;
  pointRadius: number;
  pointShape: PointShape;
  showGrid: boolean;
  showAxes: boolean;
  xAxisLabel?: string;
  yAxisLabel?: string;
}
