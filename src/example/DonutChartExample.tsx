import React from "react";
import { DonutChart } from "../lib";

const salesData = [
  { label: "온라인", value: 45.2, color: "#3b82f6" },
  { label: "오프라인", value: 32.8, color: "#ef4444" },
  { label: "모바일", value: 15.6, color: "#10b981" },
  { label: "기타", value: 6.4, color: "#f59e0b" },
];

const revenueData = [
  { label: "제품 A", value: 35.5, color: "#8b5cf6" },
  { label: "제품 B", value: 28.3, color: "#ec4899" },
  { label: "제품 C", value: 22.1, color: "#06b6d4" },
  { label: "제품 D", value: 14.1, color: "#f97316" },
];

const totalRevenue = 1250;

export const DonutChartExample = () => {
  return (
    <div>
      {/* 메인 도넛 차트 - 중앙 텍스트 포함 */}
      <div style={{ marginBottom: 50 }}>
        <h3
          style={{
            color: "#374151",
            fontSize: 20,
            marginBottom: 15,
            textAlign: "center",
          }}
        >
          💰 월간 매출 현황
        </h3>
        <p
          style={{
            color: "#6b7280",
            fontSize: 14,
            marginBottom: 25,
            textAlign: "center",
          }}
        >
          중앙에 총 매출액을 표시하고, 각 채널별 비율을 확인할 수 있습니다.
        </p>
        <DonutChart
          data={salesData}
          radius={120}
          innerRadius={70}
          height={400}
          showLabels={true}
          labelTextColor="#374151"
          strokeWidth={3}
          strokeColor="#ffffff"
          centerText={`₩${totalRevenue.toLocaleString()}만`}
          centerTextColor="#1f2937"
          centerTextSize={28}
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
          📦 제품별 매출 비율
        </h3>
        <p
          style={{
            color: "#6b7280",
            fontSize: 14,
            marginBottom: 25,
            textAlign: "center",
          }}
        >
          다양한 스타일과 옵션을 비교해보세요.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 30,
          }}
        >
          {/* 중앙 텍스트 있는 버전 */}
          <div>
            <h4
              style={{
                color: "#374151",
                fontSize: 16,
                marginBottom: 15,
                textAlign: "center",
              }}
            >
              🎯 중앙 텍스트 표시
            </h4>
            <DonutChart
              data={revenueData}
              radius={100}
              innerRadius={60}
              height={320}
              showLabels={true}
              labelTextColor="#374151"
              strokeWidth={2}
              strokeColor="#ffffff"
              centerText="총 매출"
              centerTextColor="#3b82f6"
              centerTextSize={20}
              tooltipTheme="white"
            />
          </div>

          {/* 중앙 텍스트 없는 버전 */}
          <div>
            <h4
              style={{
                color: "#374151",
                fontSize: 16,
                marginBottom: 15,
                textAlign: "center",
              }}
            >
              🎨 중앙 텍스트 숨김
            </h4>
            <DonutChart
              data={revenueData}
              radius={100}
              innerRadius={60}
              height={320}
              showLabels={true}
              labelTextColor="#374151"
              strokeWidth={2}
              strokeColor="#ffffff"
              tooltipTheme="dark"
            />
          </div>

          {/* 라벨 숨김 버전 */}
          <div>
            <h4
              style={{
                color: "#374151",
                fontSize: 16,
                marginBottom: 15,
                textAlign: "center",
              }}
            >
              🔍 라벨 숨김 (툴팁만)
            </h4>
            <DonutChart
              data={revenueData}
              radius={100}
              innerRadius={60}
              height={320}
              showLabels={false}
              strokeWidth={0}
              centerText="100%"
              centerTextColor="#6b7280"
              centerTextSize={18}
              tooltipTheme="dark"
            />
          </div>
        </div>
      </div>

      {/* 얇은 도넛 차트 예제 */}
      <div style={{ marginTop: 50 }}>
        <h3
          style={{
            color: "#374151",
            fontSize: 18,
            marginBottom: 20,
            textAlign: "center",
          }}
        >
          📊 얇은 도넛 차트
        </h3>
        <p
          style={{
            color: "#6b7280",
            fontSize: 14,
            marginBottom: 25,
            textAlign: "center",
          }}
        >
          innerRadius를 크게 설정하여 얇은 링 형태의 도넛 차트를 만들 수 있습니다.
        </p>
        <div style={{ maxWidth: 400, margin: "0 auto" }}>
          <DonutChart
            data={salesData}
            radius={120}
            innerRadius={100}
            height={300}
            showLabels={false}
            strokeWidth={0}
            centerText="매출 현황"
            centerTextColor="#374151"
            centerTextSize={22}
            tooltipTheme="dark"
          />
        </div>
      </div>

      {/* 슬라이스 간격 예제 */}
      <div style={{ marginTop: 50 }}>
        <h3
          style={{
            color: "#374151",
            fontSize: 18,
            marginBottom: 20,
            textAlign: "center",
          }}
        >
          ✂️ 슬라이스 간격 커스터마이징
        </h3>
        <p
          style={{
            color: "#6b7280",
            fontSize: 14,
            marginBottom: 25,
            textAlign: "center",
          }}
        >
          sliceGap prop을 사용하여 슬라이스 간 간격을 조절할 수 있습니다. (단위: 도)
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 30,
          }}
        >
          {/* 간격 없음 */}
          <div>
            <h4
              style={{
                color: "#374151",
                fontSize: 16,
                marginBottom: 15,
                textAlign: "center",
              }}
            >
              🔗 간격 없음 (sliceGap: 0)
            </h4>
            <DonutChart
              data={revenueData}
              radius={90}
              innerRadius={50}
              height={280}
              showLabels={false}
              strokeWidth={2}
              strokeColor="#ffffff"
              sliceGap={0}
              centerText="0°"
              centerTextColor="#6b7280"
              centerTextSize={18}
              tooltipTheme="dark"
            />
          </div>

          {/* 작은 간격 */}
          <div>
            <h4
              style={{
                color: "#374151",
                fontSize: 16,
                marginBottom: 15,
                textAlign: "center",
              }}
            >
              📏 작은 간격 (sliceGap: 2)
            </h4>
            <DonutChart
              data={revenueData}
              radius={90}
              innerRadius={50}
              height={280}
              showLabels={false}
              strokeWidth={2}
              strokeColor="#ffffff"
              sliceGap={2}
              centerText="2°"
              centerTextColor="#6b7280"
              centerTextSize={18}
              tooltipTheme="dark"
            />
          </div>

          {/* 큰 간격 */}
          <div>
            <h4
              style={{
                color: "#374151",
                fontSize: 16,
                marginBottom: 15,
                textAlign: "center",
              }}
            >
              📐 큰 간격 (sliceGap: 5)
            </h4>
            <DonutChart
              data={revenueData}
              radius={90}
              innerRadius={50}
              height={280}
              showLabels={false}
              strokeWidth={2}
              strokeColor="#ffffff"
              sliceGap={5}
              centerText="5°"
              centerTextColor="#6b7280"
              centerTextSize={18}
              tooltipTheme="dark"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

