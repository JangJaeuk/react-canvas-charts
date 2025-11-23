import { useCallback } from "react";
import {
  DonutChartDataPoint,
  DonutChartConfig,
  LABEL_OFFSET,
  MIN_SLICE_ANGLE,
} from "../type";
import { useResponsiveCanvas } from "../../common";

interface LabelInfo {
  text: string;
  angle: number;
  x: number;
  y: number;
  width: number;
}

// 라벨 겹침 방지 함수
const drawNonOverlappingLabels = (
  ctx: CanvasRenderingContext2D,
  data: DonutChartDataPoint[],
  total: number,
  centerX: number,
  centerY: number,
  radius: number,
  labelTextColor: string,
  sliceGap: number = 0
) => {
  const labels: LabelInfo[] = [];
  const fontSize = 12;

  ctx.font = `${fontSize}px Inter, sans-serif`;
  ctx.fillStyle = labelTextColor;

  // sliceGap을 라디안으로 변환
  const gapAngle = (sliceGap * Math.PI) / 180;
  const totalGapAngle = gapAngle * data.length;
  const totalAngle = 2 * Math.PI - totalGapAngle;

  // 1단계: 라벨 정보 수집
  let currentAngle = -Math.PI / 2;

  data.forEach((item, index) => {
    const sliceAngle = (item.value / total) * totalAngle;

    if (sliceAngle > MIN_SLICE_ANGLE * 2) {
      const labelAngle = currentAngle + sliceAngle / 2;
      const percentage = ((item.value / total) * 100).toFixed(1);
      const labelText = `${item.label} (${percentage}%)`;

      const textWidth = ctx.measureText(labelText).width;
      const baseX = centerX + Math.cos(labelAngle) * (radius + LABEL_OFFSET);
      const baseY = centerY + Math.sin(labelAngle) * (radius + LABEL_OFFSET);

      labels.push({
        text: labelText,
        angle: labelAngle,
        x: baseX,
        y: baseY,
        width: textWidth,
      });
    }

    currentAngle += sliceAngle;
    
    // 마지막 슬라이스가 아니면 간격 추가
    if (index < data.length - 1) {
      currentAngle += gapAngle;
    }
  });

  // 2단계: 각도별로 정렬하여 겹침 해결
  const sortedLabels = [...labels].sort((a, b) => a.angle - b.angle);
  const adjustedLabels: LabelInfo[] = [];
  const minVerticalGap = 18; // 최소 세로 간격

  sortedLabels.forEach((label) => {
    let adjustedY = label.y;

    // 이전 라벨들과 충돌 검사
    for (const prevLabel of adjustedLabels) {
      const verticalDistance = Math.abs(adjustedY - prevLabel.y);
      const horizontalDistance = Math.abs(label.x - prevLabel.x);

      // 같은 쪽(좌/우)에 있고 세로로 가까우면 조정
      if (horizontalDistance < 50 && verticalDistance < minVerticalGap) {
        // 위쪽으로 이동할지 아래쪽으로 이동할지 결정
        if (adjustedY > prevLabel.y) {
          adjustedY = prevLabel.y + minVerticalGap;
        } else {
          adjustedY = prevLabel.y - minVerticalGap;
        }
      }
    }

    adjustedLabels.push({
      ...label,
      y: adjustedY,
    });
  });

  // 3단계: 라벨 그리기
  adjustedLabels.forEach((label) => {
    const originalY =
      centerY + Math.sin(label.angle) * (radius + LABEL_OFFSET);

    // 위치가 조정된 경우 연결선 그리기
    if (Math.abs(label.y - originalY) > 5) {
      ctx.strokeStyle = labelTextColor;
      ctx.lineWidth = 1;
      ctx.globalAlpha = 0.5;
      ctx.setLineDash([3, 3]);

      const connectionX = centerX + Math.cos(label.angle) * (radius + 8);
      const connectionY = centerY + Math.sin(label.angle) * (radius + 8);

      ctx.beginPath();
      ctx.moveTo(connectionX, connectionY);
      ctx.lineTo(label.x, label.y);
      ctx.stroke();

      ctx.setLineDash([]);
      ctx.globalAlpha = 1;
    }

    // 라벨 텍스트 그리기
    ctx.fillStyle = labelTextColor;
    ctx.textAlign = label.x > centerX ? "left" : "right";
    ctx.textBaseline = "middle";
    ctx.fillText(label.text, label.x, label.y);
  });
};

export const useCanvasRenderer = (
  data: DonutChartDataPoint[],
  config: DonutChartConfig,
  easedProgress: number
) => {
  const drawChart = useCallback(
    (ctx: CanvasRenderingContext2D, width: number, height: number) => {
      const {
        radius,
        innerRadius,
        sidePadding,
        showLabels,
        labelTextColor,
        strokeWidth,
        strokeColor,
        sliceGap = 0,
        centerText,
        centerTextColor = "#374151",
        centerTextSize = 24,
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
      const actualInnerRadius = Math.min(innerRadius, actualRadius - 10);

      // 총합 계산
      const total = data.reduce((sum, item) => sum + item.value, 0);
      if (total === 0) return;

      // 각도 계산 및 그리기
      let currentAngle = -Math.PI / 2; // 12시 방향부터 시작
      
      // sliceGap을 라디안으로 변환 (각 슬라이스 사이 간격)
      const gapAngle = (sliceGap * Math.PI) / 180; // 도를 라디안으로 변환
      const totalGapAngle = gapAngle * data.length;
      const totalAngle = 2 * Math.PI - totalGapAngle; // 전체 각도에서 간격 제외

      data.forEach((item, index) => {
        const sliceAngle = Math.max(
          (item.value / total) * totalAngle * easedProgress,
          MIN_SLICE_ANGLE
        );

        // 도넛 슬라이스 그리기
        ctx.beginPath();
        ctx.arc(
          centerX,
          centerY,
          actualRadius,
          currentAngle,
          currentAngle + sliceAngle
        );
        ctx.arc(
          centerX,
          centerY,
          actualInnerRadius,
          currentAngle + sliceAngle,
          currentAngle,
          true
        );
        ctx.closePath();
        ctx.fillStyle = item.color;
        ctx.fill();

        // 테두리 그리기
        if (strokeWidth > 0) {
          ctx.beginPath();
          ctx.arc(
            centerX,
            centerY,
            actualRadius,
            currentAngle,
            currentAngle + sliceAngle
          );
          ctx.arc(
            centerX,
            centerY,
            actualInnerRadius,
            currentAngle + sliceAngle,
            currentAngle,
            true
          );
          ctx.closePath();
          ctx.strokeStyle = strokeColor;
          ctx.lineWidth = strokeWidth;
          ctx.stroke();
        }

        currentAngle += sliceAngle;
        
        // 마지막 슬라이스가 아니면 간격 추가
        if (index < data.length - 1) {
          currentAngle += gapAngle;
        }
      });

      // 중앙 텍스트 그리기
      if (centerText) {
        ctx.fillStyle = centerTextColor;
        ctx.font = `bold ${centerTextSize}px Inter, sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(centerText, centerX, centerY);
      }

      // 라벨 그리기 (겹침 방지)
      if (showLabels) {
        drawNonOverlappingLabels(
          ctx,
          data,
          total,
          centerX,
          centerY,
          actualRadius,
          labelTextColor,
          sliceGap
        );
      }
    },
    [data, config, easedProgress]
  );

  const { canvasRef, containerRef } = useResponsiveCanvas({
    height: config.height,
    dependencies: [data, config, easedProgress],
    onDraw: drawChart,
  });

  return {
    canvasRef,
    containerRef,
  };
};

