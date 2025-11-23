import { useCallback } from "react";
import { DonutChartDataPoint, DonutChartConfig } from "../type";

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

      // Canvas의 실제 크기와 표시 크기 비율 계산
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      const canvasX = x * scaleX;
      const canvasY = y * scaleY;

      // 중심점 계산
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // 실제 반지름 계산
      const maxRadius = Math.min(
        (canvas.width - config.sidePadding * 2) / 2,
        (canvas.height - config.sidePadding * 2) / 2
      );
      const actualRadius = Math.min(config.radius, maxRadius);
      const actualInnerRadius = Math.min(config.innerRadius, actualRadius - 10);

      // 마우스 위치가 도넛 차트 내부인지 확인 (외부 반지름과 내부 반지름 사이)
      const distance = Math.sqrt(
        Math.pow(canvasX - centerX, 2) + Math.pow(canvasY - centerY, 2)
      );

      if (distance >= actualInnerRadius && distance <= actualRadius) {
        // 각도 계산 (12시 방향 기준)
        let mouseAngle = Math.atan2(canvasY - centerY, canvasX - centerX);
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
            showTooltip(x, y - 10, tooltipContent);
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

