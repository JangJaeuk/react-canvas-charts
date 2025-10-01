import React from "react";
import { PieChart } from "../lib";

const sampleData = [
  { label: "Desktop", value: 45.2, color: "#3b82f6" },
  { label: "Mobile", value: 32.8, color: "#ef4444" },
  { label: "Tablet", value: 15.6, color: "#10b981" },
  { label: "Smart TV", value: 4.1, color: "#f59e0b" },
  { label: "기타", value: 2.3, color: "#8b5cf6" },
];

const marketShareData = [
  { label: "Chrome", value: 65.4, color: "#4285f4" },
  { label: "Safari", value: 18.9, color: "#34a853" },
  { label: "Edge", value: 9.2, color: "#0078d4" },
  { label: "Firefox", value: 4.8, color: "#ff9500" },
  { label: "기타", value: 1.7, color: "#9aa0a6" },
];

export const PieChartExample = () => {
  return (
    <div>
      {/* 메인 파이 차트 */}
      <div style={{ marginBottom: 50 }}>
        <h3
          style={{
            color: "#374151",
            fontSize: 20,
            marginBottom: 15,
            textAlign: "center",
          }}
        >
          📱 디바이스별 웹사이트 접속 현황
        </h3>
        <p
          style={{
            color: "#6b7280",
            fontSize: 14,
            marginBottom: 25,
            textAlign: "center",
          }}
        >
          각 섹션에 마우스를 올려보세요. 비율과 정확한 수치를 확인할 수
          있습니다.
        </p>
        <PieChart
          data={sampleData}
          radius={120}
          height={400}
          showLabels={true}
          labelTextColor="#374151"
          strokeWidth={3}
          strokeColor="#ffffff"
          tooltipTheme="dark"
        />
      </div>

      {/* 비교 차트 섹션 */}
      <div>
        <h3
          style={{
            color: "#374151",
            fontSize: 18,
            marginBottom: 20,
            textAlign: "center",
          }}
        >
          🌐 브라우저 시장 점유율 비교
        </h3>
        <p
          style={{
            color: "#6b7280",
            fontSize: 14,
            marginBottom: 25,
            textAlign: "center",
          }}
        >
          라벨 표시 옵션과 다양한 스타일링을 비교해보세요.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 30,
          }}
        >
          {/* 라벨 있는 버전 */}
          <div>
            <h4
              style={{
                color: "#374151",
                fontSize: 16,
                marginBottom: 15,
                textAlign: "center",
              }}
            >
              🏷️ 라벨 표시
            </h4>
            <PieChart
              data={marketShareData}
              radius={80}
              height={280}
              showLabels={true}
              labelTextColor="#374151"
              strokeWidth={2}
              strokeColor="#ffffff"
              tooltipTheme="white"
            />
          </div>

          {/* 라벨 없는 버전 */}
          <div>
            <h4
              style={{
                color: "#374151",
                fontSize: 16,
                marginBottom: 15,
                textAlign: "center",
              }}
            >
              🎯 라벨 숨김 (툴팁만)
            </h4>
            <PieChart
              data={marketShareData}
              radius={80}
              height={280}
              showLabels={false}
              strokeWidth={0}
              tooltipTheme="dark"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
