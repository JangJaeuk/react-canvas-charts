import { useCallback } from "react";
import {
  ScatterChartSeries,
  ScatterChartConfig,
  ScatterChartDataPoint,
  TOP_PADDING,
  BOTTOM_PADDING,
} from "../type";

export const useMouseEvents = (
  series: ScatterChartSeries[],
  config: ScatterChartConfig,
  showTooltip: (x: number, y: number, content: string) => void,
  hideTooltip: () => void
) => {
  const handleMouseMove = useCallback(
    (event: React.MouseEvent<HTMLCanvasElement>) => {
      const canvas = event.currentTarget;
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const { sidePadding, chartPadding, pointRadius } = config;

      // useResponsiveCanvas의 스케일링 로직과 동일하게 처리
      const responsiveWidth = 600; // useResponsiveCanvas의 기본값과 동일
      const rectWidth = rect.width;
      const rectHeight = rect.height;

      // 실제 렌더링 크기 계산 (useCanvasRenderer와 동일한 로직)
      let drawWidth: number;
      let drawHeight: number;

      if (rectWidth <= responsiveWidth) {
        drawWidth = responsiveWidth;
        drawHeight = config.height;
      } else {
        drawWidth = rectWidth;
        drawHeight = config.height;
      }

      // 화면 좌표계 기준으로 계산 (렌더링 크기 기준)
      const screenChartWidth = drawWidth - sidePadding * 2;
      const screenChartHeight = drawHeight - (TOP_PADDING + BOTTOM_PADDING);
      const screenAvailableWidth = screenChartWidth - chartPadding * 2;
      const screenAvailableHeight = screenChartHeight - chartPadding * 2;

      // 모든 데이터 포인트 수집
      const allPoints = series.flatMap((s) => s.data);

      // X, Y 범위 계산
      const xValues = allPoints.map((p) => p.x);
      const yValues = allPoints.map((p) => p.y);
      const minX = Math.min(...xValues);
      const maxX = Math.max(...xValues);
      const minY = Math.min(...yValues);
      const maxY = Math.max(...yValues);

      // 범위에 여유 공간 추가 (10%)
      const xRange = maxX - minX || 1;
      const yRange = maxY - minY || 1;
      const xPadding = xRange * 0.1;
      const yPadding = yRange * 0.1;
      const adjustedMinX = minX - xPadding;
      const adjustedMaxX = maxX + xPadding;
      const adjustedMinY = minY - yPadding;
      const adjustedMaxY = maxY + yPadding;
      const adjustedXRange = adjustedMaxX - adjustedMinX;
      const adjustedYRange = adjustedMaxY - adjustedMinY;

      // 마우스 위치를 렌더링 좌표계로 변환
      const mouseX = (x / rectWidth) * drawWidth;
      const mouseY = (y / rectHeight) * drawHeight;

      // 마우스 위치가 차트 영역 내부인지 확인 (렌더링 좌표계)
      const chartStartX = sidePadding + chartPadding;
      const chartEndX = drawWidth - sidePadding - chartPadding;
      const chartStartY = TOP_PADDING + chartPadding;
      const chartEndY = drawHeight - BOTTOM_PADDING - chartPadding;

      if (
        mouseX < chartStartX ||
        mouseX > chartEndX ||
        mouseY < chartStartY ||
        mouseY > chartEndY
      ) {
        hideTooltip();
        return;
      }

      // 가장 가까운 포인트 찾기 (렌더링 좌표계 사용)
      type ClosestPoint = {
        point: ScatterChartDataPoint;
        series: ScatterChartSeries;
      };
      let closestPoint: ClosestPoint | null = null;
      let minDistance = Infinity;
      // 포인트 반지름 + 여유 공간을 hitRadius로 설정 (렌더링 좌표계 기준)
      const hitRadius = (pointRadius || 5) * 2 + 5; // 픽셀 단위

      series.forEach((currentSeries) => {
        currentSeries.data.forEach((point) => {
          // 포인트의 렌더링 좌표 계산 (useCanvasRenderer와 동일한 로직)
          const pointX =
            sidePadding +
            chartPadding +
            ((point.x - adjustedMinX) / adjustedXRange) * screenAvailableWidth;
          const pointY =
            TOP_PADDING +
            chartPadding +
            screenAvailableHeight -
            ((point.y - adjustedMinY) / adjustedYRange) * screenAvailableHeight;

          // 마우스 위치와 포인트 위치의 거리 계산 (렌더링 좌표계)
          const distance = Math.sqrt(
            Math.pow(mouseX - pointX, 2) + Math.pow(mouseY - pointY, 2)
          );

          if (distance < minDistance && distance < hitRadius) {
            minDistance = distance;
            closestPoint = { point, series: currentSeries };
          }
        });
      });

      if (closestPoint) {
        const cp: ClosestPoint = closestPoint;

        // 포인트의 렌더링 좌표 계산 (이미 위에서 계산된 값 재사용)
        const pointXRender =
          sidePadding +
          chartPadding +
          ((cp.point.x - adjustedMinX) / adjustedXRange) * screenAvailableWidth;
        const pointYRender =
          TOP_PADDING +
          chartPadding +
          screenAvailableHeight -
          ((cp.point.y - adjustedMinY) / adjustedYRange) *
            screenAvailableHeight;

        // 렌더링 좌표를 화면 좌표로 변환 (툴팁 표시용)
        const pointXScreen = (pointXRender / drawWidth) * rectWidth;
        const pointYScreen = (pointYRender / drawHeight) * rectHeight;

        const tooltipContent = cp.point.label
          ? `<strong>${cp.point.label}</strong><br/>${cp.series.name}<br/>X: ${cp.point.x.toFixed(2)}<br/>Y: ${cp.point.y.toFixed(2)}`
          : `<strong>${cp.series.name}</strong><br/>X: ${cp.point.x.toFixed(2)}<br/>Y: ${cp.point.y.toFixed(2)}`;

        showTooltip(pointXScreen, pointYScreen - 10, tooltipContent);
      } else {
        hideTooltip();
      }
    },
    [series, config, showTooltip, hideTooltip]
  );

  const handleMouseLeave = useCallback(() => {
    hideTooltip();
  }, [hideTooltip]);

  return {
    handleMouseMove,
    handleMouseLeave,
  };
};
