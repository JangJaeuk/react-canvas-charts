import React from "react";
import { AreaChart } from "../lib";

const labels = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const stackedSeries = [
  {
    name: "2021",
    color: "#94a3b8",
    data: [0, 0, 0, 0, 0, 0, 120, 180, 150, 200, 160, 140],
  },
  {
    name: "2022",
    color: "#10b981",
    data: [200, 300, 250, 180, 220, 280, 320, 350, 300, 280, 320, 290],
  },
  {
    name: "2023",
    color: "#f59e0b",
    data: [250, 350, 300, 220, 280, 320, 380, 400, 350, 320, 380, 340],
  },
  {
    name: "2024",
    color: "#3b82f6",
    data: [300, 400, 350, 280, 320, 380, 450, 480, 420, 400, 450, 420],
  },
];

const shortLabels = labels.slice(0, 6);
const shortSeries = stackedSeries.map((s) => ({
  ...s,
  data: s.data.slice(0, 6),
}));

export const AreaChartExample = () => {
  return (
    <div>
      {/* 메인 스택형 영역 차트 */}
      <div style={{ marginBottom: 40 }}>
        <AreaChart
          labels={labels}
          series={stackedSeries}
          height={400}
          areaOpacity={0.7}
          showPoints={false}
          showLines={true}
          lineWidth={2}
          tooltipTheme="dark"
        />
      </div>

      {/* 스타일 비교 섹션 */}
      <div>
        <h3
          style={{
            color: "#374151",
            fontSize: 18,
            marginBottom: 20,
            textAlign: "center",
          }}
        >
          🎨 Different Area Chart Styles
        </h3>
        <p
          style={{
            color: "#6b7280",
            fontSize: 14,
            marginBottom: 25,
            textAlign: "center",
          }}
        >
          스택형 영역 차트의 다양한 스타일 옵션을 확인해보세요.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 25,
          }}
        >
          <div>
            <h4
              style={{
                color: "#374151",
                fontSize: 14,
                marginBottom: 12,
                textAlign: "center",
              }}
            >
              🔵 With Points & Lines
            </h4>
            <AreaChart
              labels={shortLabels}
              series={shortSeries}
              height={250}
              areaOpacity={0.6}
              showPoints={true}
              showLines={true}
              pointRadius={3}
              lineWidth={2}
            />
          </div>

          <div>
            <h4
              style={{
                color: "#374151",
                fontSize: 14,
                marginBottom: 12,
                textAlign: "center",
              }}
            >
              🌸 Lines Only
            </h4>
            <AreaChart
              labels={shortLabels}
              series={shortSeries}
              height={250}
              areaOpacity={0.5}
              showPoints={false}
              showLines={true}
              lineWidth={3}
            />
          </div>

          <div>
            <h4
              style={{
                color: "#374151",
                fontSize: 14,
                marginBottom: 12,
                textAlign: "center",
              }}
            >
              🌿 Areas Only
            </h4>
            <AreaChart
              labels={shortLabels}
              series={shortSeries}
              height={250}
              areaOpacity={0.8}
              showPoints={false}
              showLines={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
