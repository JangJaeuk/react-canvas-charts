import React, { useState } from "react";
import { BarChartExample } from "./BarChartExample";
import { MultiSeriesBarChartExample } from "./MultiSeriesBarChartExample";
import { LineChartExample } from "./LineChartExample";
import { PieChartExample } from "./PieChartExample";

type ChartType = "bar" | "multiSeries" | "line" | "pie";

export const ExamplesDashboard = () => {
  const [activeChart, setActiveChart] = useState<ChartType>("bar");

  const chartOptions = [
    { key: "bar" as ChartType, label: "Bar Chart", icon: "📊" },
    { key: "multiSeries" as ChartType, label: "Multi-Series Bar", icon: "📈" },
    {
      key: "line" as ChartType,
      label: "Line Chart & Point Shapes",
      icon: "📉",
    },
    { key: "pie" as ChartType, label: "Pie Chart", icon: "🥧" },
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
              각 바에 마우스를 올려보세요. 색상과 축 스타일을 커스터마이징할 수
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

      case "multiSeries":
        return (
          <div>
            <h2 style={{ color: "#374151", marginBottom: 20, fontSize: 24 }}>
              📈 Multi-Series Bar Chart
            </h2>
            <p style={{ color: "#6b7280", marginBottom: 30 }}>
              여러 데이터 시리즈를 비교할 수 있는 차트입니다. 각 시리즈는 다른
              색상으로 표시됩니다.
            </p>
            <div
              style={{
                backgroundColor: "#ffffff",
              }}
            >
              <MultiSeriesBarChartExample />
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
