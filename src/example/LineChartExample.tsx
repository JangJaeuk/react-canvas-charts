import React from "react";
import { LineChart } from "../lib";

const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];

// 단일 시리즈 예제 (기존 LineChart와 동일한 사용법)
const singleSeries = [
  {
    name: "Sales",
    color: "#ec4899",
    data: [65, 78, 90, 81, 95, 88, 102],
  },
];

// 다중 시리즈 예제
const multiSeries = [
  {
    name: "Q1 Sales",
    color: "#3b82f6",
    data: [65, 78, 90],
  },
  {
    name: "Q2 Sales",
    color: "#10b981",
    data: [81, 95, 88],
  },
];

const shortLabels = labels.slice(0, 5);
const shortSingleSeries = [
  {
    name: "Sales",
    color: "#3b82f6",
    data: [65, 78, 90, 81, 95],
  },
];

export const LineChartExample = () => {
  return (
    <div>
      {/* 단일 시리즈 차트 */}
      <div style={{ marginBottom: 40 }}>
        <h3
          style={{
            color: "#374151",
            fontSize: 18,
            marginBottom: 20,
            textAlign: "center",
          }}
        >
          📊 Single Series Line Chart
        </h3>
        <LineChart
          labels={labels}
          series={singleSeries}
          height={350}
          pointShape="triangle"
          pointRadius={6}
          lineWidth={3}
          tooltipTheme="dark"
        />
      </div>

      {/* 다중 시리즈 차트 */}
      <div style={{ marginBottom: 40 }}>
        <h3
          style={{
            color: "#374151",
            fontSize: 18,
            marginBottom: 20,
            textAlign: "center",
          }}
        >
          📈 Multi-Series Line Chart
        </h3>
        <LineChart
          labels={labels.slice(0, 3)}
          series={multiSeries}
          height={300}
          pointRadius={5}
          lineWidth={2}
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
              labels={shortLabels}
              series={shortSingleSeries}
              height={200}
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
              labels={shortLabels}
              series={shortSingleSeries}
              height={200}
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
              labels={shortLabels}
              series={shortSingleSeries}
              height={200}
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
