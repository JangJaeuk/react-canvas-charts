export interface AreaChartDataPoint {
  label: string;
  value: number;
}

export interface AreaChartSeries {
  name: string;
  color: string;
  data: number[];
}

export type PointShape = "circle" | "triangle" | "square";
