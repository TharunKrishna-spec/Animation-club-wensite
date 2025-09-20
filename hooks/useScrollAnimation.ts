import { useEffect, useRef, useState } from 'react';

type ObserverOptions = {
  threshold?: number;
  rootMargin?: string;
};

const useScrollAnimation = <T extends HTMLElement>(options: ObserverOptions = {}) => {
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add('is-visible');
          setIsVisible(true);
          observer.unobserve(element); // Animate only once
        }
      },
      {
        threshold: 0.2, // Trigger when 20% is visible
        ...options,
      }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [options]);

  return { ref, isVisible };
};

export default useScrollAnimation;
