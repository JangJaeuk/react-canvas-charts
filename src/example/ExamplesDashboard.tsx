import React, { useState } from "react";
import { BarChartExample } from "./BarChartExample";
import { LineChartExample } from "./LineChartExample";
import { PieChartExample } from "./PieChartExample";
import { AreaChartExample } from "./AreaChartExample";
import { SingleAreaChartExample } from "./SingleAreaChartExample";
import { DonutChartExample } from "./DonutChartExample";
import { ScatterChartExample } from "./ScatterChartExample";
import { RadarChartExample } from "./RadarChartExample";

type ChartType =
  | "bar"
  | "line"
  | "pie"
  | "area"
  | "donut"
  | "scatter"
  | "radar";

export const ExamplesDashboard = () => {
  const [activeChart, setActiveChart] = useState<ChartType>("bar");

  const chartOptions = [
    { key: "bar" as ChartType, label: "Bar Chart", icon: "📊" },
    {
      key: "line" as ChartType,
      label: "Line Chart & Point Shapes",
      icon: "📉",
    },
    { key: "area" as ChartType, label: "Area Chart", icon: "🏔️" },
    { key: "pie" as ChartType, label: "Pie Chart", icon: "🥧" },
    { key: "donut" as ChartType, label: "Donut Chart", icon: "🍩" },
    { key: "scatter" as ChartType, label: "Scatter Chart", icon: "🎯" },
    { key: "radar" as ChartType, label: "Radar Chart", icon: "🕸️" },
  ];

  const renderChart = () => {
    switch (activeChart) {
      case "bar":
        return (
          <div>
            <h2 style={{ color: "#374151", marginBottom: 20, fontSize: 24 }}>
              📊 Interactive Bar Chart
            </h2>
            <p style={{ color: "#6b7280", marginBottom: 30 }}>
              단일 시리즈와 다중 시리즈를 모두 지원하는 통합 바 차트입니다. 각
              바에 마우스를 올려보세요. 색상과 축 스타일을 커스터마이징할 수
              있습니다.
            </p>
            <div
              style={{
                backgroundColor: "#ffffff",
              }}
            >
              <BarChartExample />
            </div>
          </div>
        );

      case "line":
        return (
          <div>
            <h2 style={{ color: "#374151", marginBottom: 20, fontSize: 24 }}>
              📉 Interactive Line Chart & Point Shapes
            </h2>
            <p style={{ color: "#6b7280", marginBottom: 30 }}>
              시간에 따른 데이터 변화를 보여주는 라인 차트입니다. 포인트에
              마우스를 올려보세요. 다양한 포인트 모양(원형, 삼각형, 사각형)을
              지원합니다.
            </p>
            <div
              style={{
                backgroundColor: "#ffffff",
              }}
            >
              <LineChartExample />
            </div>
          </div>
        );

      case "area":
        return (
          <div>
            <h2 style={{ color: "#374151", marginBottom: 20, fontSize: 24 }}>
              🏔️ Interactive Area Chart
            </h2>
            <p style={{ color: "#6b7280", marginBottom: 30 }}>
              스택형 영역 차트로 여러 데이터 시리즈를 누적하여 표시합니다. 각
              시리즈의 기여도와 전체 합계를 한눈에 파악할 수 있습니다.
            </p>
            <div
              style={{
                backgroundColor: "#ffffff",
              }}
            >
              <AreaChartExample />
            </div>

            {/* 단일 시리즈 예제 추가 */}
            <div
              style={{
                marginTop: 40,
                padding: 20,
                backgroundColor: "#f8fafc",
                borderRadius: 12,
              }}
            >
              <SingleAreaChartExample />
            </div>
          </div>
        );

      case "pie":
        return (
          <div>
            <h2 style={{ color: "#374151", marginBottom: 20, fontSize: 24 }}>
              🥧 Interactive Pie Chart
            </h2>
            <p style={{ color: "#6b7280", marginBottom: 30 }}>
              비율 데이터를 시각화하는 파이 차트입니다. 각 섹션에 마우스를
              올려보세요. 라벨 표시 옵션과 다양한 스타일링을 지원합니다.
            </p>
            <div
              style={{
                backgroundColor: "#ffffff",
              }}
            >
              <PieChartExample />
            </div>
          </div>
        );

      case "donut":
        return (
          <div>
            <h2 style={{ color: "#374151", marginBottom: 20, fontSize: 24 }}>
              🍩 Interactive Donut Chart
            </h2>
            <p style={{ color: "#6b7280", marginBottom: 30 }}>
              파이 차트의 변형인 도넛 차트입니다. 중앙에 추가 정보를 표시할 수
              있어 더욱 유용합니다. 각 섹션에 마우스를 올려보세요. 내부 반지름과
              중앙 텍스트를 커스터마이징할 수 있습니다.
            </p>
            <div
              style={{
                backgroundColor: "#ffffff",
              }}
            >
              <DonutChartExample />
            </div>
          </div>
        );

      case "scatter":
        return (
          <div>
            <h2 style={{ color: "#374151", marginBottom: 20, fontSize: 24 }}>
              🎯 Interactive Scatter Chart
            </h2>
            <p style={{ color: "#6b7280", marginBottom: 30 }}>
              X, Y 좌표를 기반으로 데이터 포인트를 표시하는 산점도 차트입니다.
              두 변수 간의 상관관계를 분석하는 데 유용합니다. 각 포인트에
              마우스를 올려보세요. 포인트 크기로 3차원 정보를 표현할 수
              있습니다.
            </p>
            <div
              style={{
                backgroundColor: "#ffffff",
              }}
            >
              <ScatterChartExample />
            </div>
          </div>
        );

      case "radar":
        return (
          <div>
            <h2 style={{ color: "#374151", marginBottom: 20, fontSize: 24 }}>
              🕸️ Interactive Radar Chart
            </h2>
            <p style={{ color: "#6b7280", marginBottom: 30 }}>
              극좌표계를 사용하여 여러 카테고리의 데이터를 한눈에 비교할 수 있는
              레이더 차트입니다. 다차원 데이터를 시각화하는 데 유용합니다. 각
              포인트에 마우스를 올려보세요. 영역, 선, 포인트 표시 옵션을
              커스터마이징할 수 있습니다.
            </p>
            <div
              style={{
                backgroundColor: "#ffffff",
              }}
            >
              <RadarChartExample />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f8fafc",
        padding: "20px",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
        }}
      >
        {/* 헤더 */}
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <h1
            style={{
              fontSize: 36,
              fontWeight: "bold",
              color: "#1f2937",
              marginBottom: 10,
            }}
          >
            🎨 React Canvas Charts
          </h1>
          <p
            style={{
              fontSize: 18,
              color: "#6b7280",
              maxWidth: 600,
              margin: "0 auto",
            }}
          >
            HTML Canvas를 사용한 고성능 React 차트 라이브러리입니다. 다양한 차트
            타입과 커스터마이징 옵션을 제공합니다.
          </p>
        </div>

        {/* 네비게이션 */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: 40,
            gap: 10,
            flexWrap: "wrap",
          }}
        >
          {chartOptions.map((option) => (
            <button
              key={option.key}
              onClick={() => setActiveChart(option.key)}
              style={{
                padding: "12px 24px",
                borderRadius: 12,
                border: "none",
                backgroundColor:
                  activeChart === option.key ? "#3b82f6" : "#ffffff",
                color: activeChart === option.key ? "#ffffff" : "#374151",
                fontSize: 16,
                fontWeight: "500",
                cursor: "pointer",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                transition: "all 0.2s ease",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
              onMouseEnter={(e) => {
                if (activeChart !== option.key) {
                  e.currentTarget.style.backgroundColor = "#f3f4f6";
                }
              }}
              onMouseLeave={(e) => {
                if (activeChart !== option.key) {
                  e.currentTarget.style.backgroundColor = "#ffffff";
                }
              }}
            >
              <span>{option.icon}</span>
              {option.label}
            </button>
          ))}
        </div>

        {/* 차트 컨테이너 */}
        <div
          style={{
            backgroundColor: "#ffffff",
            padding: 40,
            borderRadius: 16,
            boxShadow:
              "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
          }}
        >
          {renderChart()}
        </div>

        {/* 푸터 */}
        <div
          style={{
            textAlign: "center",
            marginTop: 40,
            padding: 20,
            color: "#6b7280",
          }}
        >
          <p>Built with ❤️ using React 19 and HTML Canvas</p>
        </div>
      </div>
    </div>
  );
};
