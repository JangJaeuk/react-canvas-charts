import { useCallback } from "react";
import {
  RadarChartSeries,
  RadarChartConfig,
  DEFAULT_GRID_LEVELS,
  LABEL_OFFSET,
} from "../type";
import { useResponsiveCanvas } from "../../common";

export const useCanvasRenderer = (
  series: RadarChartSeries[],
  config: RadarChartConfig,
  easedProgress: number
) => {
  const drawChart = useCallback(
    (ctx: CanvasRenderingContext2D, width: number, height: number) => {
      const {
        radius,
        sidePadding,
        axisColor,
        gridColor,
        labelTextColor,
        gridTextColor,
        lineWidth,
        pointRadius,
        showGrid,
        showAxes,
        gridLevels = DEFAULT_GRID_LEVELS,
        maxValue,
      } = config;

      ctx.clearRect(0, 0, width, height);

      // 중심점 계산
      const centerX = width / 2;
      const centerY = height / 2;

      // 실제 반지름 계산 (패딩 고려)
      const maxRadius = Math.min(
        (width - sidePadding * 2) / 2,
        (height - sidePadding * 2) / 2
      );
      const actualRadius = Math.min(radius, maxRadius);

      // 첫 번째 시리즈의 카테고리 수 확인
      if (series.length === 0 || series[0].data.length === 0) return;

      const categories = series[0].data.map((d) => d.category);
      const categoryCount = categories.length;
      const angleStep = (2 * Math.PI) / categoryCount;

      // 최대값 계산
      const allValues = series.flatMap((s) => s.data.map((d) => d.value));
      const calculatedMaxValue = maxValue || Math.max(...allValues, 1);
      const normalizedMaxValue = calculatedMaxValue * 1.1; // 10% 여유 공간

      // 격자 그리기
      if (showGrid) {
        for (let level = 1; level <= gridLevels; level++) {
          const levelRadius = (actualRadius / gridLevels) * level;
          const levelValue = (normalizedMaxValue / gridLevels) * level;

          ctx.beginPath();
          ctx.strokeStyle = gridColor;
          ctx.lineWidth = 1;

          for (let i = 0; i < categoryCount; i++) {
            const angle = i * angleStep - Math.PI / 2; // 12시 방향부터 시작
            const x = centerX + Math.cos(angle) * levelRadius;
            const y = centerY + Math.sin(angle) * levelRadius;

            if (i === 0) {
              ctx.moveTo(x, y);
            } else {
              ctx.lineTo(x, y);
            }
          }
          ctx.closePath();
          ctx.stroke();

          // 격자 레벨 값 표시
          ctx.fillStyle = gridTextColor;
          ctx.font = "10px Inter, sans-serif";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          const labelX = centerX;
          const labelY = centerY - levelRadius;
          ctx.fillText(
            levelValue.toFixed(calculatedMaxValue < 10 ? 1 : 0),
            labelX,
            labelY
          );
        }
      }

      // 축 그리기
      if (showAxes) {
        ctx.strokeStyle = axisColor;
        ctx.lineWidth = 1;

        for (let i = 0; i < categoryCount; i++) {
          const angle = i * angleStep - Math.PI / 2;
          const x = centerX + Math.cos(angle) * actualRadius;
          const y = centerY + Math.sin(angle) * actualRadius;

          ctx.beginPath();
          ctx.moveTo(centerX, centerY);
          ctx.lineTo(x, y);
          ctx.stroke();

          // 카테고리 라벨 표시
          const labelX =
            centerX + Math.cos(angle) * (actualRadius + LABEL_OFFSET);
          const labelY =
            centerY + Math.sin(angle) * (actualRadius + LABEL_OFFSET);

          ctx.fillStyle = labelTextColor;
          ctx.font = "12px Inter, sans-serif";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(categories[i], labelX, labelY);
        }
      }

      // 각 시리즈별로 그리기
      series.forEach((currentSeries) => {
        const {
          color,
          fillOpacity = 0.2,
          showPoints = true,
          showLines = true,
          showArea = true,
        } = currentSeries;

        // 영역 그리기
        if (showArea) {
          ctx.beginPath();
          ctx.globalAlpha = fillOpacity * easedProgress;

          for (let i = 0; i < categoryCount; i++) {
            const angle = i * angleStep - Math.PI / 2;
            const value = currentSeries.data[i]?.value || 0;
            const normalizedValue = Math.min(
              (value / normalizedMaxValue) * easedProgress,
              1
            );
            const pointRadius = actualRadius * normalizedValue;
            const x = centerX + Math.cos(angle) * pointRadius;
            const y = centerY + Math.sin(angle) * pointRadius;

            if (i === 0) {
              ctx.moveTo(x, y);
            } else {
              ctx.lineTo(x, y);
            }
          }
          ctx.closePath();
          ctx.fillStyle = color;
          ctx.fill();
          ctx.globalAlpha = 1;
        }

        // 선 그리기
        if (showLines) {
          ctx.beginPath();
          ctx.strokeStyle = color;
          ctx.lineWidth = lineWidth;
          ctx.lineJoin = "round";

          for (let i = 0; i < categoryCount; i++) {
            const angle = i * angleStep - Math.PI / 2;
            const value = currentSeries.data[i]?.value || 0;
            const normalizedValue = Math.min(
              (value / normalizedMaxValue) * easedProgress,
              1
            );
            const pointRadius = actualRadius * normalizedValue;
            const x = centerX + Math.cos(angle) * pointRadius;
            const y = centerY + Math.sin(angle) * pointRadius;

            if (i === 0) {
              ctx.moveTo(x, y);
            } else {
              ctx.lineTo(x, y);
            }
          }
          ctx.closePath();
          ctx.stroke();
        }

        // 포인트 그리기
        if (showPoints) {
          ctx.fillStyle = color;

          for (let i = 0; i < categoryCount; i++) {
            const angle = i * angleStep - Math.PI / 2;
            const value = currentSeries.data[i]?.value || 0;
            const normalizedValue = Math.min(
              (value / normalizedMaxValue) * easedProgress,
              1
            );
            const pointDistance = actualRadius * normalizedValue;
            const x = centerX + Math.cos(angle) * pointDistance;
            const y = centerY + Math.sin(angle) * pointDistance;

            ctx.beginPath();
            ctx.arc(x, y, pointRadius, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      });
    },
    [series, config, easedProgress]
  );

  const { canvasRef, containerRef } = useResponsiveCanvas({
    height: config.height,
    dependencies: [series, config, easedProgress],
    onDraw: drawChart,
  });

  return { canvasRef, containerRef };
};
