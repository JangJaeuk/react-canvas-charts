import { useEffect, useRef } from "react";

// 기본 반응형 너비 (600px 이하일 때 스케일링 시작)
export const DEFAULT_RESPONSIVE_WIDTH = 600;

interface UseResponsiveCanvasProps {
  height: number;
  responsiveWidth?: number;
  dependencies: unknown[];
  onDraw: (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number
  ) => void;
}

export const useResponsiveCanvas = ({
  height,
  responsiveWidth = DEFAULT_RESPONSIVE_WIDTH,
  dependencies,
  onDraw,
}: UseResponsiveCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const handleResize = () => {
      const { width } = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;

      let drawWidth, drawHeight, scale;

      if (width <= responsiveWidth) {
        // 500px 이하일 때: 500px 기준으로 스케일링
        scale = width / responsiveWidth;
        drawWidth = responsiveWidth;
        drawHeight = height;

        canvas.style.width = `${width}px`;
        canvas.style.height = `${height * scale}px`;
      } else {
        // 500px 초과일 때: 컨테이너 width 따라감
        scale = 1;
        drawWidth = width;
        drawHeight = height;

        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
      }

      canvas.width = width * dpr;
      canvas.height = height * scale * dpr;

      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.scale(dpr * scale, dpr * scale);

        onDraw(ctx, drawWidth, drawHeight);
      }
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    return () => resizeObserver.disconnect();
  }, dependencies);

  return {
    canvasRef,
    containerRef,
  };
};
