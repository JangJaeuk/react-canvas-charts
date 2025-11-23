import React from "react";
import { RadarChart } from "../lib";

// 기본 레이더 차트 데이터
const basicData = [
  {
    name: "성능",
    color: "#3b82f6",
    data: [
      { category: "속도", value: 80 },
      { category: "정확도", value: 90 },
      { category: "안정성", value: 75 },
      { category: "효율성", value: 85 },
      { category: "확장성", value: 70 },
    ],
  },
];

// 다중 시리즈 데이터
const multiSeriesData = [
  {
    name: "제품 A",
    color: "#3b82f6",
    fillOpacity: 0.2,
    data: [
      { category: "디자인", value: 85 },
      { category: "기능성", value: 90 },
      { category: "가격", value: 70 },
      { category: "품질", value: 95 },
      { category: "서비스", value: 80 },
      { category: "브랜드", value: 75 },
    ],
  },
  {
    name: "제품 B",
    color: "#ef4444",
    fillOpacity: 0.2,
    data: [
      { category: "디자인", value: 75 },
      { category: "기능성", value: 85 },
      { category: "가격", value: 90 },
      { category: "품질", value: 80 },
      { category: "서비스", value: 85 },
      { category: "브랜드", value: 90 },
    ],
  },
  {
    name: "제품 C",
    color: "#10b981",
    fillOpacity: 0.2,
    data: [
      { category: "디자인", value: 90 },
      { category: "기능성", value: 75 },
      { category: "가격", value: 85 },
      { category: "품질", value: 85 },
      { category: "서비스", value: 90 },
      { category: "브랜드", value: 85 },
    ],
  },
];

// 스킬 평가 데이터
const skillData = [
  {
    name: "현재 실력",
    color: "#8b5cf6",
    fillOpacity: 0.3,
    data: [
      { category: "React", value: 85 },
      { category: "TypeScript", value: 80 },
      { category: "Node.js", value: 70 },
      { category: "CSS", value: 90 },
      { category: "알고리즘", value: 75 },
      { category: "데이터베이스", value: 65 },
    ],
  },
  {
    name: "목표 실력",
    color: "#ec4899",
    fillOpacity: 0.2,
    showArea: false,
    data: [
      { category: "React", value: 95 },
      { category: "TypeScript", value: 90 },
      { category: "Node.js", value: 85 },
      { category: "CSS", value: 95 },
      { category: "알고리즘", value: 90 },
      { category: "데이터베이스", value: 85 },
    ],
  },
];

export const RadarChartExample = () => {
  return (
    <div>
      {/* 기본 레이더 차트 */}
      <div style={{ marginBottom: 50 }}>
        <h3
          style={{
            color: "#374151",
            fontSize: 20,
            marginBottom: 15,
            textAlign: "center",
          }}
        >
          📊 기본 레이더 차트
        </h3>
        <p
          style={{
            color: "#6b7280",
            fontSize: 14,
            marginBottom: 25,
            textAlign: "center",
          }}
        >
          여러 카테고리를 극좌표계로 표시하여 다차원 데이터를 비교할 수 있습니다.
        </p>
        <RadarChart
          series={basicData}
          radius={120}
          height={400}
          showGrid={true}
          showAxes={true}
          gridLevels={5}
          tooltipTheme="dark"
        />
      </div>

      {/* 다중 시리즈 비교 */}
      <div style={{ marginBottom: 50 }}>
        <h3
          style={{
            color: "#374151",
            fontSize: 18,
            marginBottom: 20,
            textAlign: "center",
          }}
        >
          🎯 다중 시리즈 비교
        </h3>
        <p
          style={{
            color: "#6b7280",
            fontSize: 14,
            marginBottom: 25,
            textAlign: "center",
          }}
        >
          여러 그룹의 데이터를 한 차트에 표시하여 한눈에 비교할 수 있습니다.
        </p>
        <RadarChart
          series={multiSeriesData}
          radius={120}
          height={450}
          showGrid={true}
          showAxes={true}
          gridLevels={5}
          lineWidth={2}
          pointRadius={5}
          tooltipTheme="dark"
        />
      </div>

      {/* 스타일 옵션 비교 */}
      <div style={{ marginBottom: 50 }}>
        <h3
          style={{
            color: "#374151",
            fontSize: 18,
            marginBottom: 20,
            textAlign: "center",
          }}
        >
          🎨 스타일 옵션 비교
        </h3>
        <p
          style={{
            color: "#6b7280",
            fontSize: 14,
            marginBottom: 25,
            textAlign: "center",
          }}
        >
          영역, 선, 포인트 표시 옵션을 조절할 수 있습니다.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
            gap: 30,
          }}
        >
          {/* 영역 + 선 + 포인트 */}
          <div>
            <h4
              style={{
                color: "#374151",
                fontSize: 16,
                marginBottom: 15,
                textAlign: "center",
              }}
            >
              🎨 전체 표시
            </h4>
            <RadarChart
              series={[
                {
                  name: "데이터",
                  color: "#3b82f6",
                  fillOpacity: 0.3,
                  showArea: true,
                  showLines: true,
                  showPoints: true,
                  data: basicData[0].data,
                },
              ]}
              radius={100}
              height={350}
              showGrid={true}
              showAxes={true}
              gridLevels={4}
              tooltipTheme="dark"
            />
          </div>

          {/* 선 + 포인트만 */}
          <div>
            <h4
              style={{
                color: "#374151",
                fontSize: 16,
                marginBottom: 15,
                textAlign: "center",
              }}
            >
              📈 선 + 포인트
            </h4>
            <RadarChart
              series={[
                {
                  name: "데이터",
                  color: "#ef4444",
                  showArea: false,
                  showLines: true,
                  showPoints: true,
                  data: basicData[0].data,
                },
              ]}
              radius={100}
              height={350}
              showGrid={true}
              showAxes={true}
              gridLevels={4}
              tooltipTheme="dark"
            />
          </div>

          {/* 영역만 */}
          <div>
            <h4
              style={{
                color: "#374151",
                fontSize: 16,
                marginBottom: 15,
                textAlign: "center",
              }}
            >
              🎯 영역만
            </h4>
            <RadarChart
              series={[
                {
                  name: "데이터",
                  color: "#10b981",
                  fillOpacity: 0.4,
                  showArea: true,
                  showLines: false,
                  showPoints: false,
                  data: basicData[0].data,
                },
              ]}
              radius={100}
              height={350}
              showGrid={true}
              showAxes={true}
              gridLevels={4}
              tooltipTheme="dark"
            />
          </div>
        </div>
      </div>

      {/* 스킬 평가 예제 */}
      <div>
        <h3
          style={{
            color: "#374151",
            fontSize: 18,
            marginBottom: 20,
            textAlign: "center",
          }}
        >
          💪 스킬 평가 차트
        </h3>
        <p
          style={{
            color: "#6b7280",
            fontSize: 14,
            marginBottom: 25,
            textAlign: "center",
          }}
        >
          현재 실력과 목표 실력을 비교하여 성장 방향을 시각화할 수 있습니다.
        </p>
        <RadarChart
          series={skillData}
          radius={130}
          height={450}
          showGrid={true}
          showAxes={true}
          gridLevels={5}
          maxValue={100}
          lineWidth={2}
          pointRadius={5}
          tooltipTheme="dark"
        />
      </div>
    </div>
  );
};

