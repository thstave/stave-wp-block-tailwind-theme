import { useEffect } from 'react';

/**
 * useEventListener
 * Supports both static and ref-based dynamic targets.
 *
 * @param {EventTarget | React.RefObject} target - DOM node or ref to attach listener to
 * @param {string} event - Event name (e.g., 'click', 'resize')
 * @param {Function} callback - Handler for the event
 */
export function useEventListener(target, event, callback) {
  useEffect(() => {
    const targetElement = target && 'current' in target ? target.current : target;
    if (!targetElement || !targetElement.addEventListener) return;

    targetElement.addEventListener(event, callback);
    return () => {
      targetElement.removeEventListener(event, callback);
    };
  }, [target, event, callback]);
}
