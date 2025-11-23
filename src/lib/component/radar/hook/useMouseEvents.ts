import { useCallback } from "react";
import { RadarChartSeries, RadarChartConfig } from "../type";
import { DEFAULT_RESPONSIVE_WIDTH } from "../../common";

export const useMouseEvents = (
  series: RadarChartSeries[],
  config: RadarChartConfig,
  showTooltip: (x: number, y: number, content: string) => void,
  hideTooltip: () => void
) => {
  const handleMouseMove = useCallback(
    (event: React.MouseEvent<HTMLCanvasElement>) => {
      const canvas = event.currentTarget;
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      // useResponsiveCanvas의 스케일링 로직과 동일하게 처리
      const responsiveWidth = DEFAULT_RESPONSIVE_WIDTH;
      const rectWidth = rect.width;
      const rectHeight = rect.height;

      // 실제 렌더링 크기 계산
      let drawWidth: number;
      let drawHeight: number;

      if (rectWidth <= responsiveWidth) {
        drawWidth = responsiveWidth;
        drawHeight = config.height;
      } else {
        drawWidth = rectWidth;
        drawHeight = config.height;
      }

      // 마우스 위치를 렌더링 좌표계로 변환
      const mouseX = (x / rectWidth) * drawWidth;
      const mouseY = (y / rectHeight) * drawHeight;

      // 중심점 계산
      const centerX = drawWidth / 2;
      const centerY = drawHeight / 2;

      // 실제 반지름 계산
      const maxRadius = Math.min(
        (drawWidth - config.sidePadding * 2) / 2,
        (drawHeight - config.sidePadding * 2) / 2
      );
      const actualRadius = Math.min(config.radius, maxRadius);

      // 첫 번째 시리즈의 카테고리 수 확인
      if (series.length === 0 || series[0].data.length === 0) {
        hideTooltip();
        return;
      }

      const categories = series[0].data.map((d) => d.category);
      const categoryCount = categories.length;
      const angleStep = (2 * Math.PI) / categoryCount;

      // 최대값 계산
      const allValues = series.flatMap((s) => s.data.map((d) => d.value));
      const calculatedMaxValue = config.maxValue || Math.max(...allValues, 1);
      const normalizedMaxValue = calculatedMaxValue * 1.1;

      // 마우스 위치가 차트 영역 내부인지 확인
      const distance = Math.sqrt(
        Math.pow(mouseX - centerX, 2) + Math.pow(mouseY - centerY, 2)
      );

      if (distance <= actualRadius) {
        // 마우스 각도 계산
        let mouseAngle = Math.atan2(mouseY - centerY, mouseX - centerX);
        mouseAngle = (mouseAngle + Math.PI / 2 + 2 * Math.PI) % (2 * Math.PI);

        // 가장 가까운 축 찾기
        let closestCategoryIndex = -1;
        let minAngleDiff = Infinity;

        for (let i = 0; i < categoryCount; i++) {
          const categoryAngle = i * angleStep;
          const angleDiff = Math.abs(mouseAngle - categoryAngle);
          const normalizedAngleDiff = Math.min(
            angleDiff,
            2 * Math.PI - angleDiff
          );

          if (normalizedAngleDiff < minAngleDiff) {
            minAngleDiff = normalizedAngleDiff;
            closestCategoryIndex = i;
          }
        }

        // 각도 차이가 너무 크면 무시 (축 근처에 있을 때만)
        if (minAngleDiff < angleStep / 3 && closestCategoryIndex !== -1) {
          const category = categories[closestCategoryIndex];
          const hitRadius = config.pointRadius * 3;

          // 각 시리즈의 해당 카테고리 값 확인
          let tooltipContent = `<strong>${category}</strong><br/>`;

          series.forEach((s, index) => {
            const value = s.data[closestCategoryIndex]?.value || 0;
            tooltipContent += `${s.name}: ${value.toFixed(1)}`;
            if (index < series.length - 1) {
              tooltipContent += "<br/>";
            }
          });

          // 해당 축의 포인트 위치 계산
          const angle = closestCategoryIndex * angleStep - Math.PI / 2;
          const value = series[0].data[closestCategoryIndex]?.value || 0;
          const normalizedValue = Math.min(value / normalizedMaxValue, 1);
          const pointRadius = actualRadius * normalizedValue;
          const pointX = centerX + Math.cos(angle) * pointRadius;
          const pointY = centerY + Math.sin(angle) * pointRadius;

          // 포인트와의 거리 확인
          const pointDistance = Math.sqrt(
            Math.pow(mouseX - pointX, 2) + Math.pow(mouseY - pointY, 2)
          );

          if (pointDistance < hitRadius) {
            // 렌더링 좌표를 화면 좌표로 변환
            const tooltipXScreen = (pointX / drawWidth) * rectWidth;
            const tooltipYScreen = (pointY / drawHeight) * rectHeight;

            showTooltip(tooltipXScreen, tooltipYScreen - 10, tooltipContent);
            return;
          }
        }
      }

      hideTooltip();
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
