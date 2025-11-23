import { useCallback } from "react";
import { DonutChartDataPoint, DonutChartConfig } from "../type";
import { DEFAULT_RESPONSIVE_WIDTH } from "../../common";

export const useMouseEvents = (
  data: DonutChartDataPoint[],
  config: DonutChartConfig,
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

      // 마우스 위치를 렌더링 좌표계로 변환
      const mouseX = (x / rectWidth) * drawWidth;
      const mouseY = (y / rectHeight) * drawHeight;

      // 중심점 계산 (렌더링 좌표계)
      const centerX = drawWidth / 2;
      const centerY = drawHeight / 2;

      // 실제 반지름 계산 (렌더링 좌표계)
      const maxRadius = Math.min(
        (drawWidth - config.sidePadding * 2) / 2,
        (drawHeight - config.sidePadding * 2) / 2
      );
      const actualRadius = Math.min(config.radius, maxRadius);
      const actualInnerRadius = Math.min(config.innerRadius, actualRadius - 10);

      // 마우스 위치가 도넛 차트 내부인지 확인 (외부 반지름과 내부 반지름 사이)
      const distance = Math.sqrt(
        Math.pow(mouseX - centerX, 2) + Math.pow(mouseY - centerY, 2)
      );

      if (distance >= actualInnerRadius && distance <= actualRadius) {
        // 각도 계산 (12시 방향 기준)
        let mouseAngle = Math.atan2(mouseY - centerY, mouseX - centerX);
        mouseAngle = (mouseAngle + Math.PI / 2 + 2 * Math.PI) % (2 * Math.PI);

        // 총합 계산
        const total = data.reduce((sum, item) => sum + item.value, 0);
        if (total === 0) return;

        // sliceGap을 라디안으로 변환
        const gapAngle = ((config.sliceGap || 0) * Math.PI) / 180;
        const totalGapAngle = gapAngle * data.length;
        const totalAngle = 2 * Math.PI - totalGapAngle;

        // 어느 슬라이스에 마우스가 있는지 찾기
        let currentAngle = 0;
        for (let i = 0; i < data.length; i++) {
          const sliceAngle = (data[i].value / total) * totalAngle;

          if (
            mouseAngle >= currentAngle &&
            mouseAngle < currentAngle + sliceAngle
          ) {
            const percentage = ((data[i].value / total) * 100).toFixed(1);
            const tooltipContent = `${data[i].label}: ${data[i].value} (${percentage}%)`;

            // 슬라이스의 중심 각도 계산
            const sliceCenterAngle = currentAngle + sliceAngle / 2;
            // 슬라이스 중심 위치 계산 (렌더링 좌표계)
            const tooltipRadius = (actualRadius + actualInnerRadius) / 2;
            const tooltipX =
              centerX +
              Math.cos(sliceCenterAngle - Math.PI / 2) * tooltipRadius;
            const tooltipY =
              centerY +
              Math.sin(sliceCenterAngle - Math.PI / 2) * tooltipRadius;

            // 렌더링 좌표를 화면 좌표로 변환
            const tooltipXScreen = (tooltipX / drawWidth) * rectWidth;
            const tooltipYScreen = (tooltipY / drawHeight) * rectHeight;

            showTooltip(tooltipXScreen, tooltipYScreen - 10, tooltipContent);
            return;
          }

          currentAngle += sliceAngle;

          // 마지막 슬라이스가 아니면 간격 추가
          if (i < data.length - 1) {
            currentAngle += gapAngle;
          }
        }
      }

      hideTooltip();
    },
    [data, config, showTooltip, hideTooltip]
  );

  const handleMouseLeave = useCallback(() => {
    hideTooltip();
  }, [hideTooltip]);

  return {
    handleMouseMove,
    handleMouseLeave,
  };
};
