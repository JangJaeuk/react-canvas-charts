import { useEffect, useRef, useState } from "react";

export const useAnimation = (duration: number = 1000) => {
  const animationRef = useRef<number>();
  const [animationProgress, setAnimationProgress] = useState(0);

  const animate = (timestamp: number) => {
    if (!animationRef.current) {
      animationRef.current = timestamp;
    }

    const progress = Math.min((timestamp - animationRef.current) / duration, 1);
    setAnimationProgress(progress);

    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  };

  const startAnimation = () => {
    animationRef.current = undefined;
    setAnimationProgress(0);
    requestAnimationFrame(animate);
  };

  const easeOutCubic = (x: number): number => {
    return 1 - Math.pow(1 - x, 3);
  };

  useEffect(() => {
    startAnimation();
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return {
    animationProgress,
    easedProgress: easeOutCubic(animationProgress),
    startAnimation,
  };
};
