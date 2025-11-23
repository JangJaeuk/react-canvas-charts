export interface ScatterChartDataPoint {
  x: number;
  y: number;
  size?: number;
  color?: string;
  label?: string;
}

export interface ScatterChartSeries {
  name: string;
  color: string;
  data: ScatterChartDataPoint[];
}

export type PointShape = "circle" | "triangle" | "square";
