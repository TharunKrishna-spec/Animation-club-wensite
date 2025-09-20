import { useState, useEffect, useRef } from 'react';

// Easing function for a more natural animation
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

const useCountUp = (end: number, duration: number, start: boolean): number => {
  const [count, setCount] = useState(0);
  const animationFrameId = useRef<number | null>(null);

  useEffect(() => {
    if (!start) return;

    let startTime: number | null = null;
    const startValue = 0;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const progressRatio = Math.min(progress / duration, 1);
      const easedProgress = easeOutCubic(progressRatio);
      
      const currentCount = Math.floor(easedProgress * (end - startValue) + startValue);
      setCount(currentCount);

      if (progress < duration) {
        animationFrameId.current = requestAnimationFrame(animate);
      } else {
        setCount(end); // Ensure it finishes on the exact number
      }
    };

    animationFrameId.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [end, duration, start]);

  return count;
};

export default useCountUp;
