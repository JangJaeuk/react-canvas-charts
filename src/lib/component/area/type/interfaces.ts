import { PointShape } from "./types";

export interface AreaChartConfig {
  sidePadding: number;
  chartPadding: number;
  height: number;
  axisColor: string;
  gridColor: string;
  labelTextColor: string;
  gridTextColor: string;
  lineColor: string;
  lineWidth: number;
  pointRadius: number;
  pointColor: string;
  pointShape: PointShape;
  areaOpacity: number;
  showPoints: boolean;
  showLines: boolean;
}
