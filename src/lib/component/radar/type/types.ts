export interface RadarChartDataPoint {
  category: string;
  value: number;
}

export interface RadarChartSeries {
  name: string;
  color: string;
  data: RadarChartDataPoint[];
  fillOpacity?: number;
  showPoints?: boolean;
  showLines?: boolean;
  showArea?: boolean;
}

