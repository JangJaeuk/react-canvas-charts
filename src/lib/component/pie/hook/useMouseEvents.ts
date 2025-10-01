import { useCallback } from "react";
import { PieChartDataPoint, PieChartConfig } from "../type";

export const useMouseEvents = (
  data: PieChartDataPoint[],
  config: PieChartConfig,
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

      // 마우스 위치가 파이 차트 내부인지 확인
      const distance = Math.sqrt(
        Math.pow(canvasX - centerX, 2) + Math.pow(canvasY - centerY, 2)
      );

      if (distance <= actualRadius) {
        // 각도 계산 (12시 방향 기준)
        let mouseAngle = Math.atan2(canvasY - centerY, canvasX - centerX);
        mouseAngle = (mouseAngle + Math.PI / 2 + 2 * Math.PI) % (2 * Math.PI);

        // 총합 계산
        const total = data.reduce((sum, item) => sum + item.value, 0);
        if (total === 0) return;

        // 어느 슬라이스에 마우스가 있는지 찾기
        let currentAngle = 0;
        for (let i = 0; i < data.length; i++) {
          const sliceAngle = (data[i].value / total) * 2 * Math.PI;

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
