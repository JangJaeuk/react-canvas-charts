import React from "react";
import { LineChart } from "../lib";

const chartData = [
  { label: "Jan", value: 65 },
  { label: "Feb", value: 78 },
  { label: "Mar", value: 90 },
  { label: "Apr", value: 81 },
  { label: "May", value: 95 },
  { label: "Jun", value: 88 },
  { label: "Jul", value: 102 },
];

const shortData = chartData.slice(0, 5);

export const LineChartExample = () => {
  return (
    <div>
      {/* 메인 라인 차트 */}
      <div style={{ marginBottom: 40 }}>
        <LineChart
          data={chartData}
          height={350}
          lineColor="#ec4899"
          pointColor="#be185d"
          pointShape="triangle"
          pointRadius={6}
          lineWidth={3}
          tooltipTheme="dark"
        />
      </div>

      {/* 포인트 모양 비교 섹션 */}
      <div>
        <h3
          style={{
            color: "#374151",
            fontSize: 18,
            marginBottom: 20,
            textAlign: "center",
          }}
        >
          🔸 Different Point Shapes
        </h3>
        <p
          style={{
            color: "#6b7280",
            fontSize: 14,
            marginBottom: 25,
            textAlign: "center",
          }}
        >
          라인 차트의 포인트를 원형, 삼각형, 사각형으로 변경할 수 있습니다.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
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
              🔵 Circle Points
            </h4>
            <LineChart
              data={shortData}
              height={200}
              lineColor="#3b82f6"
              pointColor="#1d4ed8"
              pointShape="circle"
              pointRadius={5}
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
              🔺 Triangle Points
            </h4>
            <LineChart
              data={shortData}
              height={200}
              lineColor="#ec4899"
              pointColor="#be185d"
              pointShape="triangle"
              pointRadius={5}
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
              🔷 Square Points
            </h4>
            <LineChart
              data={shortData}
              height={200}
              lineColor="#10b981"
              pointColor="#047857"
              pointShape="square"
              pointRadius={5}
              lineWidth={2}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
