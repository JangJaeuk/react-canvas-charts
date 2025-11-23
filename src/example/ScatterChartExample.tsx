import React from "react";
import { ScatterChart } from "../lib";

// 기본 산점도 데이터
const basicData = [
  { x: 10, y: 20 },
  { x: 15, y: 25 },
  { x: 20, y: 30 },
  { x: 25, y: 35 },
  { x: 30, y: 40 },
  { x: 35, y: 45 },
  { x: 40, y: 50 },
  { x: 45, y: 55 },
  { x: 50, y: 60 },
  { x: 55, y: 65 },
];

// 상관관계 데이터 (양의 상관관계)
const positiveCorrelation = Array.from({ length: 30 }, (_, i) => ({
  x: i * 2 + Math.random() * 5,
  y: i * 1.5 + Math.random() * 8 + 10,
}));

// 상관관계 데이터 (음의 상관관계)
const negativeCorrelation = Array.from({ length: 30 }, (_, i) => ({
  x: i * 2 + Math.random() * 5,
  y: 100 - i * 1.5 + Math.random() * 8,
}));

// 랜덤 분포 데이터
const randomData = Array.from({ length: 50 }, () => ({
  x: Math.random() * 100,
  y: Math.random() * 100,
}));

// 크기별 데이터 (3차원 정보)
const sizeBasedData = Array.from({ length: 20 }, (_, i) => ({
  x: i * 5 + Math.random() * 3,
  y: i * 4 + Math.random() * 5,
  size: Math.random() * 10 + 3,
  label: `Point ${i + 1}`,
}));

// 다중 시리즈 데이터
const multiSeriesData = [
  {
    name: "그룹 A",
    color: "#3b82f6",
    data: Array.from({ length: 15 }, (_, i) => ({
      x: i * 5 + Math.random() * 3,
      y: i * 3 + Math.random() * 5,
    })),
  },
  {
    name: "그룹 B",
    color: "#ef4444",
    data: Array.from({ length: 15 }, (_, i) => ({
      x: i * 5 + Math.random() * 3,
      y: i * 3 + Math.random() * 5 + 20,
    })),
  },
  {
    name: "그룹 C",
    color: "#10b981",
    data: Array.from({ length: 15 }, (_, i) => ({
      x: i * 5 + Math.random() * 3,
      y: i * 3 + Math.random() * 5 + 40,
    })),
  },
];

export const ScatterChartExample = () => {
  return (
    <div>
      {/* 기본 산점도 차트 */}
      <div style={{ marginBottom: 50 }}>
        <h3
          style={{
            color: "#374151",
            fontSize: 20,
            marginBottom: 15,
            textAlign: "center",
          }}
        >
          📊 기본 산점도 차트
        </h3>
        <p
          style={{
            color: "#6b7280",
            fontSize: 14,
            marginBottom: 25,
            textAlign: "center",
          }}
        >
          X, Y 좌표를 기반으로 데이터 포인트를 표시합니다. 각 포인트에 마우스를 올려보세요.
        </p>
        <ScatterChart
          series={[
            {
              name: "데이터 포인트",
              color: "#3b82f6",
              data: basicData,
            },
          ]}
          height={400}
          pointRadius={6}
          pointShape="circle"
          showGrid={true}
          showAxes={true}
          xAxisLabel="X 축"
          yAxisLabel="Y 축"
          tooltipTheme="dark"
        />
      </div>

      {/* 상관관계 분석 */}
      <div style={{ marginBottom: 50 }}>
        <h3
          style={{
            color: "#374151",
            fontSize: 18,
            marginBottom: 20,
            textAlign: "center",
          }}
        >
          📈 상관관계 분석
        </h3>
        <p
          style={{
            color: "#6b7280",
            fontSize: 14,
            marginBottom: 25,
            textAlign: "center",
          }}
        >
          양의 상관관계와 음의 상관관계를 비교해보세요.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
            gap: 30,
          }}
        >
          {/* 양의 상관관계 */}
          <div>
            <h4
              style={{
                color: "#374151",
                fontSize: 16,
                marginBottom: 15,
                textAlign: "center",
              }}
            >
              ↗️ 양의 상관관계
            </h4>
            <ScatterChart
              series={[
                {
                  name: "양의 상관관계",
                  color: "#10b981",
                  data: positiveCorrelation,
                },
              ]}
              height={350}
              pointRadius={4}
              pointShape="circle"
              showGrid={true}
              showAxes={true}
              tooltipTheme="dark"
            />
          </div>

          {/* 음의 상관관계 */}
          <div>
            <h4
              style={{
                color: "#374151",
                fontSize: 16,
                marginBottom: 15,
                textAlign: "center",
              }}
            >
              ↘️ 음의 상관관계
            </h4>
            <ScatterChart
              series={[
                {
                  name: "음의 상관관계",
                  color: "#ef4444",
                  data: negativeCorrelation,
                },
              ]}
              height={350}
              pointRadius={4}
              pointShape="circle"
              showGrid={true}
              showAxes={true}
              tooltipTheme="dark"
            />
          </div>
        </div>
      </div>

      {/* 포인트 모양 비교 */}
      <div style={{ marginBottom: 50 }}>
        <h3
          style={{
            color: "#374151",
            fontSize: 18,
            marginBottom: 20,
            textAlign: "center",
          }}
        >
          🎨 포인트 모양 커스터마이징
        </h3>
        <p
          style={{
            color: "#6b7280",
            fontSize: 14,
            marginBottom: 25,
            textAlign: "center",
          }}
        >
          다양한 포인트 모양을 사용할 수 있습니다.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 30,
          }}
        >
          {/* 원형 */}
          <div>
            <h4
              style={{
                color: "#374151",
                fontSize: 16,
                marginBottom: 15,
                textAlign: "center",
              }}
            >
              ⭕ 원형 (Circle)
            </h4>
            <ScatterChart
              series={[
                {
                  name: "원형 포인트",
                  color: "#3b82f6",
                  data: randomData.slice(0, 20),
                },
              ]}
              height={300}
              pointRadius={5}
              pointShape="circle"
              showGrid={true}
              showAxes={true}
              tooltipTheme="dark"
            />
          </div>

          {/* 삼각형 */}
          <div>
            <h4
              style={{
                color: "#374151",
                fontSize: 16,
                marginBottom: 15,
                textAlign: "center",
              }}
            >
              🔺 삼각형 (Triangle)
            </h4>
            <ScatterChart
              series={[
                {
                  name: "삼각형 포인트",
                  color: "#ef4444",
                  data: randomData.slice(0, 20),
                },
              ]}
              height={300}
              pointRadius={5}
              pointShape="triangle"
              showGrid={true}
              showAxes={true}
              tooltipTheme="dark"
            />
          </div>

          {/* 사각형 */}
          <div>
            <h4
              style={{
                color: "#374151",
                fontSize: 16,
                marginBottom: 15,
                textAlign: "center",
              }}
            >
              ⬜ 사각형 (Square)
            </h4>
            <ScatterChart
              series={[
                {
                  name: "사각형 포인트",
                  color: "#10b981",
                  data: randomData.slice(0, 20),
                },
              ]}
              height={300}
              pointRadius={5}
              pointShape="square"
              showGrid={true}
              showAxes={true}
              tooltipTheme="dark"
            />
          </div>
        </div>
      </div>

      {/* 크기 기반 산점도 (3차원 정보) */}
      <div style={{ marginBottom: 50 }}>
        <h3
          style={{
            color: "#374151",
            fontSize: 18,
            marginBottom: 20,
            textAlign: "center",
          }}
        >
          📏 크기 기반 산점도 (3차원 정보)
        </h3>
        <p
          style={{
            color: "#6b7280",
            fontSize: 14,
            marginBottom: 25,
            textAlign: "center",
          }}
        >
          포인트 크기로 세 번째 차원의 정보를 표현할 수 있습니다.
        </p>
        <ScatterChart
          series={[
            {
              name: "크기 기반 데이터",
              color: "#8b5cf6",
              data: sizeBasedData,
            },
          ]}
          height={400}
          pointRadius={5}
          pointShape="circle"
          showGrid={true}
          showAxes={true}
          xAxisLabel="X 값"
          yAxisLabel="Y 값"
          tooltipTheme="dark"
        />
      </div>

      {/* 다중 시리즈 */}
      <div>
        <h3
          style={{
            color: "#374151",
            fontSize: 18,
            marginBottom: 20,
            textAlign: "center",
          }}
        >
          🎯 다중 시리즈 산점도
        </h3>
        <p
          style={{
            color: "#6b7280",
            fontSize: 14,
            marginBottom: 25,
            textAlign: "center",
          }}
        >
          여러 그룹의 데이터를 한 차트에 표시하여 비교할 수 있습니다.
        </p>
        <ScatterChart
          series={multiSeriesData}
          height={450}
          pointRadius={5}
          pointShape="circle"
          showGrid={true}
          showAxes={true}
          xAxisLabel="X 축"
          yAxisLabel="Y 축"
          tooltipTheme="dark"
        />
      </div>
    </div>
  );
};

