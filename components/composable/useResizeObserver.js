import { useEffect } from "react";

export function useResizeObserver(targetRef, callback) {
  useEffect(() => {
    let observer;
    let rafId;

    const tryObserve = () => {
      const node = targetRef?.current;
      if (node && node.nodeType === 1) { // <-- 🛠 nodeType === 1 means it's an Element
        observer = new ResizeObserver(callback);
        observer.observe(node);
      } else {
        // Retry again next frame until node exists
        rafId = requestAnimationFrame(tryObserve);
      }
    };

    tryObserve();

    return () => {
      if (observer) observer.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [targetRef, callback]);
}
